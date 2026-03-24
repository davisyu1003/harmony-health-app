# 🚀 GitHub 部署指南 - 快速步骤

## 前置要求
- GitHub 账户已登录
- Git 已安装

## 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. 打开浏览器访问: https://github.com/new
2. 填写仓库信息:
   - **Repository name**: `harmony-health-app`
   - **Description**: 小鱼健康 - 个人健康管理应用
   - **Visibility**: Public
3. **不要勾选** "Initialize this repository with:"
4. 点击 **"Create repository"**

### 步骤 2: 推送代码到 GitHub

在终端执行以下命令：

```bash
cd /Users/davis/.qclaw/workspace/harmony-health-app

# 确保远程仓库地址正确
git remote set-url origin https://github.com/davisyu1003/harmony-health-app.git

# 推送代码
git push -u origin main
```

**如果提示需要认证:**
- 使用 GitHub 用户名和密码（或 Personal Access Token）
- 或者使用 SSH 密钥

### 步骤 3: 启用 GitHub Pages

1. 进入仓库页面: https://github.com/davisyu1003/harmony-health-app
2. 点击 **Settings** (设置)
3. 左侧菜单选择 **Pages**
4. 在 "Source" 部分:
   - 选择 **"Deploy from a branch"**
   - Branch: **main**
   - Folder: **/ (root)**
5. 点击 **Save**

### 步骤 4: 等待部署完成

- GitHub Pages 通常需要 1-2 分钟完成部署
- 你会看到一个绿色的提示，显示应用已发布

### 步骤 5: 访问在线应用

部署完成后，访问:
```
https://davisyu1003.github.io/harmony-health-app/
```

---

## 📱 应用功能

✅ BMI 计算与追踪  
✅ 健康状态记录  
✅ 养生计划打卡  
✅ 数据可视化  
✅ 完全离线使用  

---

## 🔧 故障排除

### 问题: "Repository not found"
**解决**: 确保已在 GitHub 上创建仓库

### 问题: 推送被拒绝
**解决**: 
```bash
# 使用 SSH 而不是 HTTPS
git remote set-url origin git@github.com:davisyu1003/harmony-health-app.git
git push -u origin main
```

### 问题: GitHub Pages 没有显示
**解决**: 
1. 检查 Settings > Pages 是否已启用
2. 等待 1-2 分钟
3. 清除浏览器缓存后重新访问

---

## 📞 需要帮助？

- GitHub 文档: https://docs.github.com/
- GitHub Pages 帮助: https://docs.github.com/en/pages

---

**部署完成后，你的应用将在全球范围内可访问！** 🌍
