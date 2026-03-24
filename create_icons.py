#!/usr/bin/env python3
"""
生成 PWA 图标
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size):
    """创建指定尺寸的图标"""
    # 创建图像
    img = Image.new('RGB', (size, size), '#C8694A')
    draw = ImageDraw.Draw(img)
    
    # 绘制圆角矩形背景
    draw.rounded_rectangle(
        [(0, 0), (size-1, size-1)],
        radius=size//6,
        fill='#C8694A'
    )
    
    # 绘制小鱼图形（简化的）
    center = size // 2
    
    # 鱼身（椭圆）
    fish_width = size * 0.5
    fish_height = size * 0.35
    draw.ellipse(
        [
            (center - fish_width//2, center - fish_height//2),
            (center + fish_width//2, center + fish_height//2)
        ],
        fill='white'
    )
    
    # 鱼尾（三角形）
    tail_size = size * 0.15
    draw.polygon(
        [
            (center + fish_width//2 - tail_size, center - tail_size),
            (center + fish_width//2 + tail_size, center),
            (center + fish_width//2 - tail_size, center + tail_size)
        ],
        fill='white'
    )
    
    # 鱼眼
    eye_size = size * 0.05
    eye_x = center - fish_width * 0.15
    eye_y = center - fish_height * 0.1
    draw.ellipse(
        [
            (eye_x - eye_size, eye_y - eye_size),
            (eye_x + eye_size, eye_y + eye_size)
        ],
        fill='#C8694A'
    )
    
    # 添加心形（健康象征）
    heart_size = size * 0.12
    heart_x = center
    heart_y = center + fish_height * 0.3
    draw.ellipse(
        [
            (heart_x - heart_size, heart_y - heart_size//2),
            (heart_x + heart_size, heart_y + heart_size//2)
        ],
        fill='#E24B4A'
    )
    
    # 如果尺寸足够大，添加文字
    if size >= 96:
        try:
            font_size = size // 8
            draw.text(
                (center, size * 0.82),
                '小鱼健康',
                fill='white',
                anchor='mm',
                font=ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', font_size)
            )
        except:
            # 字体加载失败，跳过文字
            pass
    
    return img

def main():
    """生成所有尺寸的图标"""
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    # 确保目录存在
    os.makedirs('icons', exist_ok=True)
    
    print('🎨 开始生成 PWA 图标...')
    print(f'📂 工作目录: {os.getcwd()}')
    print()
    
    for size in sizes:
        img = create_icon(size)
        filename = f'icons/icon-{size}.png'
        img.save(filename, 'PNG', optimize=True)
        print(f'✅ 生成: {filename} ({size}x{size})')
    
    print()
    print(f'🎉 完成！共生成 {len(sizes)} 个图标文件')
    print('📍 图标位置: icons/')

if __name__ == '__main__':
    main()
