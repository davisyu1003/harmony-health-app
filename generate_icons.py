#!/usr/bin/env python3
"""
生成 PWA 图标脚本
需要安装: pip3 install Pillow
"""
import os
from PIL import Image, ImageDraw

def create_icon(size):
    """创建指定尺寸的图标"""
    # 创建图片
    img = Image.new('RGB', (size, size), '#C8694A')
    draw = ImageDraw.Draw(img)
    
    # 绘制简单的鱼形状
    center = size // 2
    
    # 鱼身（椭圆）
    body_width = int(size * 0.35)
    body_height = int(size * 0.25)
    draw.ellipse([
        center - body_width,
        center - body_height,
        center + body_width,
        center + body_height
    ], fill='white')
    
    # 鱼尾（三角形）
    tail_size = int(size * 0.2)
    draw.polygon([
        center + body_width,
        center,
        center + body_width + tail_size,
        center - tail_size // 2,
        center + body_width + tail_size,
        center + tail_size // 2
    ], fill='white')
    
    # 鱼眼
    eye_radius = max(2, int(size * 0.03))
    eye_x = center - int(body_width * 0.3)
    eye_y = center - int(body_height * 0.2)
    draw.ellipse([
        eye_x - eye_radius,
        eye_y - eye_radius,
        eye_x + eye_radius,
        eye_y + eye_radius
    ], fill='#C8694A')
    
    return img

def main():
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("🎨 开始生成 PWA 图标...")
    
    for size in sizes:
        img = create_icon(size)
        filename = f"icons/icon-{size}.png"
        img.save(filename, 'PNG')
        print(f"✅ 生成: {filename} ({size}x{size})")
    
    print("\n🎉 所有图标生成完成！")
    print(f"📁 共生成 {len(sizes)} 个图标文件")

if __name__ == '__main__':
    main()
