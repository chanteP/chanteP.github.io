#!/bin/bash

set -e

# 检查是否有未提交的改动
if [ -n "$(git status --porcelain)" ]; then
	echo "检测到未提交的改动，部署终止。"
	exit 1
fi

# 构建项目
echo "开始构建..."
pnpm build

# 切换到 master 分支
echo "切换到 master 分支..."
git checkout master


# 清理 master 分支的旧文件，但保留 dist 和 node_modules 目录
echo "清理 master 分支的旧文件（保留 dist 和 node_modules 目录）..."
find . -type f ! -path './dist/*' ! -path './.git/*' ! -path './node_modules/*' -delete

# 复制构建产物到 master 分支
echo "复制构建产物到 master 分支..."
cp -r dist/* .

# 提交更改到 master 分支
echo "提交更改到 master 分支..."
# git add .
# git commit -m "Update dist to master"
# git push origin master

# 切换回 next 分支
echo "切换回 next 分支..."
git checkout next

echo "部署完成。"
