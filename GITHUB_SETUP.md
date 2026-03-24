# 📋 GitHub 仓库创建指南

## ⚠️ 当前状态

代码已准备好，但需要在 GitHub 上创建仓库。

## 🔧 创建 GitHub 仓库 (3 步)

### 步骤 1: 打开 GitHub 创建页面

访问: **https://github.com/new**

### 步骤 2: 填写仓库信息

```
Repository name: harmony-health-app
Description: 小鱼健康 - 个人健康管理应用
Visibility: Public (公开)
```

**重要**: 不要勾选 "Initialize this repository with:"

### 步骤 3: 创建仓库

点击 **"Create repository"** 按钮

---

## 📤 推送代码到 GitHub

创建仓库后，在终端执行：

```bash
cd /Users/davis/.qclaw/workspace/harmony-health-app

# 推送代码
git push -u origin main
```

如果提示需要认证，使用你的 GitHub 用户名和密码（或 Personal Access Token）。

---

## 🌐 启用 GitHub Pages

1. 进入仓库页面: https://github.com/davisyu1003/harmony-health-app
2. 点击 **Settings** (设置)
3. 左侧菜单选择 **Pages**
4. 在 "Source" 部分:
   - 选择 **"Deploy from a branch"**
   - Branch: **main**
   - Folder: **/ (root)**
5. 点击 **Save**

---

## ✨ 部署完成

等待 1-2 分钟后，访问:

```
https://davisyu1003.github.io/harmony-health-app/
```

---

## 🔑 GitHub 认证问题？

如果推送时出现认证问题，可以使用 Personal Access Token:

1. 访问: https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择 "repo" 权限
4. 复制 token
5. 推送时使用 token 作为密码

---

**创建仓库后，再运行部署脚本或手动推送代码！**
