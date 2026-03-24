#!/usr/bin/env python3
"""从 health.png 生成各尺寸 PWA 图标"""
from PIL import Image
import os

def generate_icons():
    # 确保目录存在
    os.makedirs('icons', exist_ok=True)
    
    # 加载原始图片
    print("📂 加载 health.png...")
    img = Image.open('health.png')
    print(f"   原始尺寸: {img.size}")
    
    # 需要生成的尺寸
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("\n🎨 生成各尺寸图标...")
    for size in sizes:
        # 调整大小
        resized = img.resize((size, size), Image.LANCZOS)
        
        # 保存
        filename = f'icons/icon-{size}.png'
        resized.save(filename, 'PNG', optimize=True)
        print(f"   ✅ {filename} ({size}x{size})")
    
    print("\n🎉 图标生成完成!")
    print(f"📁 共生成 {len(sizes)} 个图标文件")

if __name__ == '__main__':
    generate_icons()
