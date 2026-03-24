#!/bin/bash

# 小鱼健康 - 本地开发服务器启动脚本

echo "🚀 启动小鱼健康应用..."
echo ""

# 检查 Python 是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 Python3"
    echo "请先安装 Python3"
    exit 1
fi

# 获取当前目录
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# 查找可用的端口
PORT=8000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
    PORT=$((PORT + 1))
done

echo "📁 项目目录: $DIR"
echo "🌐 服务器地址: http://localhost:$PORT"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动服务器
python3 -m http.server $PORT --directory "$DIR"
