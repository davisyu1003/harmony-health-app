// Cloudflare Worker for 小鱼健康数据同步
// 部署到: https://workers.cloudflare.com

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // 解析路径: /sync/{userId}
    if (path.startsWith('/sync/')) {
      const userId = path.split('/')[2];

      if (request.method === 'GET') {
        // 获取用户数据
        const data = await env.HARMONY_KV.get(userId);
        return new Response(data || '{}', {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        // 保存用户数据
        const body = await request.json();
        await env.HARMONY_KV.put(userId, JSON.stringify(body));
        return new Response(JSON.stringify({ success: true, userId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 健康检查
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'harmony-health-sync' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
