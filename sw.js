// Service Worker for 小鱼健康 PWA
const CACHE_NAME = 'harmony-health-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
  console.log('[SW] 安装中...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] 缓存静态资源');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('[SW] 激活中...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // API 请求使用网络优先策略
  if (url.origin.includes('jsonbin.io')) {
    event.respondWith(networkFirst(request));
  } 
  // 静态资源使用缓存优先策略
  else {
    event.respondWith(cacheFirst(request));
  }
});

// 缓存优先策略
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
  } catch (error) {
    // 离线时返回缓存首页
    return caches.match('/index.html');
  }
}

// 网络优先策略
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('离线状态', { status: 503 });
  }
}

// 后台同步
self.addEventListener('sync', event => {
  if (event.tag === 'sync-health-data') {
    event.waitUntil(syncHealthData());
  }
});

async function syncHealthData() {
  console.log('[SW] 后台同步健康数据');
  // 从 IndexedDB 获取离线数据并同步
}

// 推送通知
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '新的健康提醒',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'record', title: '记录健康' },
      { action: 'close', title: '关闭' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('小鱼健康', options)
  );
});

// 通知点击
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'record') {
    event.waitUntil(
      clients.openWindow('/?action=record')
    );
  }
});
