# Cloudflare Worker 部署指南

## 前置条件
1. 注册 Cloudflare 账号: https://cloudflare.com
2. 已登录 Cloudflare 控制台

---

## 步骤 1: 创建 Worker

1. 访问 https://dash.cloudflare.com/workers
2. 点击「Create Application」
3. 点击「Create Worker」
4. 输入名称: `harmony-health-sync`
5. 点击「Deploy」

---

## 步骤 2: 配置 KV 存储

1. 在 Worker 页面点击「KV」
2. 点击「Create namespace」
3. 输入名称: `HARMONY_KV`
4. 点击「Save」

---

## 步骤 3: 绑定 KV 到 Worker

1. 返回 Worker 页面，点击「Settings」
2. 点击「Variables」→ 「KV Namespace Bindings」
3. 点击「Edit variables」
4. 添加:
   - **Variable name**: `HARMONY_KV`
   - **KV namespace**: 选择 `HARMONY_KV`
5. 点击「Save」

---

## 步骤 4: 部署代码

1. 在 Worker 页面点击「Edit code」
2. 复制 `worker.js` 全部内容
3. 粘贴到编辑器中
4. 点击「Save and Deploy」

---

## 步骤 5: 获取 Worker URL

1. 部署完成后，页面显示 Worker URL
2. 格式类似: `https://harmony-health-sync.your-account.workers.dev`
3. **将此 URL 告诉我**，我会更新应用代码

---

## 测试 Worker

部署后可以用以下命令测试:

```bash
# 测试健康检查
curl https://harmony-health-sync.xxx.workers.dev/health

# 测试保存数据
curl -X POST https://harmony-health-sync.xxx.workers.dev/sync/xiaoyuer \
  -H "Content-Type: application/json" \
  -d '{"note":"test","bmi":22}'

# 测试读取数据
curl https://harmony-health-sync.xxx.workers.dev/sync/xiaoyuer
```

---

## 完成后告诉我

**请回复你的 Worker URL**，格式如:
```
https://xxxxx.workers.dev
```

我会立即更新应用代码并推送。
