// Service Worker for 小鱼健康 PWA
const CACHE_VERSION = 'v11';
const STATIC_CACHE = `harmony-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `harmony-dynamic-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/harmony-health-app/',
  '/harmony-health-app/index.html',
  '/harmony-health-app/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

// 安装
self.addEventListener('install', event => {
  console.log('[SW] 安装', CACHE_VERSION);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活 - 清理所有旧缓存
self.addEventListener('activate', event => {
  console.log('[SW] 激活', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
            .map(k => {
              console.log('[SW] 删除旧缓存:', k);
              return caches.delete(k);
            })
      )
    ).then(() => self.clients.claim())
  );
});

// 拦截请求
self.addEventListener('fetch', event => {
  const { request } = event;

  // PUT/POST 不缓存，直接走网络
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // JSONBin API 走网络优先
  if (request.url.includes('jsonbin.io')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // HTML 页面走网络优先（确保每次都拿最新代码）
  if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 其他静态资源（图片、图标等）走缓存优先
  event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match('/harmony-health-app/index.html');
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match('/harmony-health-app/index.html');
  }
}
