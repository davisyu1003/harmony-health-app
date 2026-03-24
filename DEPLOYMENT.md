# GitHub 部署指南

## 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new)
2. 创建新仓库，名称为 `harmony-health-app`
3. 选择 **Public** 或 **Private**（根据需要）
4. 不要初始化 README（我们已经有了）
5. 点击 "Create repository"

## 步骤 2: 添加远程仓库并推送

在本地项目目录运行：

```bash
cd /Users/davis/.qclaw/workspace/harmony-health-app

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/davisyu1003/harmony-health-app.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 3: 启用 GitHub Pages

1. 进入仓库设置 (Settings)
2. 左侧菜单选择 "Pages"
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择分支为 `main`，文件夹为 `/ (root)`
5. 点击 "Save"

## 步骤 4: 访问在线应用

部署完成后，你可以通过以下 URL 访问应用：

```
https://davisyu1003.github.io/harmony-health-app/
```

（替换 `davisyu1003` 为你的 GitHub 用户名）

## 验证部署

- ✅ 应用已成功部署到 GitHub
- ✅ 所有功能正常运转
- ✅ 数据存储在浏览器 LocalStorage 中
- ✅ 支持离线使用

## 后续更新

如果需要更新应用，只需：

```bash
# 修改文件后
git add .
git commit -m "Update: 描述你的更改"
git push origin main
```

GitHub Pages 会自动更新（通常需要 1-2 分钟）。

## 常见问题

### Q: 如何自定义域名？
A: 在 Settings > Pages 中的 "Custom domain" 输入你的域名

### Q: 数据会丢失吗？
A: 数据存储在浏览器中，清除缓存会丢失。建议定期导出数据。

### Q: 如何添加后端功能？
A: 可以集成 Firebase、Supabase 等服务来实现云同步。

---

**部署完成！** 🎉
