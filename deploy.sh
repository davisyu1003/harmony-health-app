#!/bin/bash

# 小鱼健康 - GitHub 自动部署脚本
# Harmony Health App - GitHub Auto Deployment Script

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     小鱼健康 - GitHub 自动部署脚本                       ║"
echo "║     Harmony Health App - GitHub Auto Deployment           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误: 未找到 Git"
    echo "请先安装 Git: https://git-scm.com/download"
    exit 1
fi

# 获取项目目录
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

echo "📁 项目目录: $PROJECT_DIR"
echo ""

# 检查 Git 仓库
if [ ! -d ".git" ]; then
    echo "❌ 错误: 不是 Git 仓库"
    exit 1
fi

# 获取用户信息
echo "🔐 GitHub 部署配置"
echo ""
read -p "请输入 GitHub 用户名 (davisyu1003): " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-davisyu1003}

read -p "请输入仓库名 (harmony-health-app): " REPO_NAME
REPO_NAME=${REPO_NAME:-harmony-health-app}

REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "📋 部署信息:"
echo "  GitHub 用户: $GITHUB_USER"
echo "  仓库名: $REPO_NAME"
echo "  仓库 URL: $REPO_URL"
echo ""

# 确认部署
read -p "确认部署? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消部署"
    exit 1
fi

echo ""
echo "🚀 开始部署..."
echo ""

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改"
    git status
    read -p "是否提交这些更改? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Auto commit before deployment"
    fi
fi

# 设置远程仓库
echo "📡 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
echo "✅ 远程仓库已配置"

# 推送代码
echo ""
echo "📤 推送代码到 GitHub..."
if git push -u origin main; then
    echo "✅ 代码推送成功"
else
    echo "❌ 推送失败"
    echo ""
    echo "💡 可能的原因:"
    echo "  1. 仓库不存在 - 请先在 GitHub 创建仓库"
    echo "  2. 认证失败 - 请检查 GitHub 用户名和密码"
    echo "  3. 网络问题 - 请检查网络连接"
    echo ""
    echo "📖 手动部署步骤:"
    echo "  1. 访问: https://github.com/new"
    echo "  2. 创建仓库: $REPO_NAME"
    echo "  3. 运行: git push -u origin main"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  ✅ 部署成功！                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📚 后续步骤:"
echo ""
echo "1️⃣  启用 GitHub Pages"
echo "   访问: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "   - 点击 Save"
echo ""
echo "2️⃣  等待部署完成 (1-2 分钟)"
echo ""
echo "3️⃣  访问在线应用"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "📖 仓库地址: $REPO_URL"
echo ""
