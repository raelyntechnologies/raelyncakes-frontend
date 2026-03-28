#!/usr/bin/env python3
"""Generate professional photorealistic cake images."""

from PIL import Image, ImageDraw, ImageFilter
import os
import colorsys
import math

WORKSPACE_PATH = r"c:\Jackstone\Personal\Sandbox\Projects\React\Development\cakes-frontend\raelyncakes"
PUBLIC_PATH = os.path.join(WORKSPACE_PATH, "public", "cakes")

# Enhanced color schemes for each cake with multiple colors
CAKE_DESIGNS = {
    "Classic Vanilla": {
        "background": "#FFF8E7",
        "cake_base": "#F4E4C1",
        "frosting": "#FFE4B5",
        "accent": "#D4AF37",
        "details": ["#8B4513", "#DAA520"]
    },
    "Black Forest": {
        "background": "#2F2F2F",
        "cake_base": "#3D2817",
        "frosting": "#5C3D2E",
        "accent": "#8B0000",
        "details": ["#FFFFFF", "#8B4513"]
    },
    "White Forest": {
        "background": "#F0F8FF",
        "cake_base": "#FFFAF0",
        "frosting": "#FFFFFF",
        "accent": "#E6F0FF",
        "details": ["#FFB6C1", "#FF69B4"]
    },
    "Red Velvet": {
        "background": "#2F1B1F",
        "cake_base": "#8B3A3A",
        "frosting": "#F5F5F5",
        "accent": "#DC143C",
        "details": ["#C41E3A", "#FFFFFF"]
    },
    "Purple Velvet": {
        "background": "#2F1B4E",
        "cake_base": "#663399",
        "frosting": "#DDA0DD",
        "accent": "#9B59B6",
        "details": ["#E6D7D7", "#8B008B"]
    },
    "Vancho Cake": {
        "background": "#3D2817",
        "cake_base": "#D2691E",
        "frosting": "#F4A460",
        "accent": "#CD853F",
        "details": ["#8B4513", "#FFD700"]
    },
    "Coffee Cake": {
        "background": "#1A0F08",
        "cake_base": "#6F4E37",
        "frosting": "#8B6F47",
        "accent": "#A0826D",
        "details": ["#3D2817", "#D2B48C"]
    },
    "Tender Coconut Cake": {
        "background": "#FFFACD",
        "cake_base": "#F0E68C",
        "frosting": "#FFFACD",
        "accent": "#FFE4B5",
        "details": ["#DAA520", "#8B7500"]
    },
    "Rainbow Cake": {
        "background": "#FFDBAC",
        "cake_base": "#FFD700",
        "frosting": "#FFB6C1",
        "accent": "#FF69B4",
        "details": ["#FF1493", "#FFD700"]
    },
    "Mango": {
        "background": "#FFF8DC",
        "cake_base": "#FFB90F",
        "frosting": "#FFD700",
        "accent": "#FFA500",
        "details": ["#FF8C00", "#8B4513"]
    },
    "Orange": {
        "background": "#FFF5EE",
        "cake_base": "#FF8C00",
        "frosting": "#FFA500",
        "accent": "#FFD700",
        "details": ["#FF6347", "#8B4513"]
    },
    "Strawberry": {
        "background": "#FFE4E1",
        "cake_base": "#FFB6C1",
        "frosting": "#FFC0CB",
        "accent": "#FF69B4",
        "details": ["#FF1493", "#FF6347"]
    },
    "Blueberry": {
        "background": "#E6E6FA",
        "cake_base": "#6A5ACD",
        "frosting": "#9370DB",
        "accent": "#8A2BE2",
        "details": ["#4B0082", "#FFFFFF"]
    },
    "Blackcurrant": {
        "background": "#1a0f2e",
        "cake_base": "#2F1B4E",
        "frosting": "#663399",
        "accent": "#8B008B",
        "details": ["#4B0082", "#FFFFFF"]
    },
    "Pineapple": {
        "background": "#FFFACD",
        "cake_base": "#FFD700",
        "frosting": "#FFEBCD",
        "accent": "#FFA500",
        "details": ["#FF8C00", "#8B4513"]
    },
    "Kiwi": {
        "background": "#E8F5E9",
        "cake_base": "#7CB342",
        "frosting": "#9CCC65",
        "accent": "#558B2F",
        "details": ["#33691E", "#FFFFFF"]
    },
    "Mixed Fruits": {
        "background": "#FFE4B5",
        "cake_base": "#F4A460",
        "frosting": "#FFD700",
        "accent": "#FF6347",
        "details": ["#FF1493", "#9CCC65"]
    },
    "Butterscotch": {
        "background": "#8B5A2B",
        "cake_base": "#D2691E",
        "frosting": "#FF8C00",
        "accent": "#DAA520",
        "details": ["#8B4513", "#FFD700"]
    },
    "Nutty Bubble": {
        "background": "#FFF0F5",
        "cake_base": "#DDA0DD",
        "frosting": "#FFB6C1",
        "accent": "#FF1493",
        "details": ["#FF69B4", "#FFFFFF"]
    },
    "Cassata": {
        "background": "#F0FFF0",
        "cake_base": "#90EE90",
        "frosting": "#FFB6C1",
        "accent": "#98FB98",
        "details": ["#32CD32", "#8B4513"]
    },
    "Neapolitan": {
        "background": "#8B4513",
        "cake_base": "#8B4513",
        "frosting": "#FFB6C1",
        "accent": "#FFFAF0",
        "details": ["#FF69B4", "#DAA520"]
    },
    "Pistachio": {
        "background": "#F0FFF0",
        "cake_base": "#A4C957",
        "frosting": "#B8D4A8",
        "accent": "#98FB98",
        "details": ["#558B2F", "#FFFFFF"]
    },
    "Raffaello Cake": {
        "background": "#FFFACD",
        "cake_base": "#F5DEB3",
        "frosting": "#FFFACD",
        "accent": "#DEB887",
        "details": ["#8B6F47", "#DAA520"]
    },
    "Rose Milk Almond Cake": {
        "background": "#FFE4E1",
        "cake_base": "#FFB6C1",
        "frosting": "#FFC0CB",
        "accent": "#DDA0DD",
        "details": ["#DEB887", "#FFFFFF"]
    },
    "Rasamalai Cake": {
        "background": "#FFFACD",
        "cake_base": "#F0E68C",
        "frosting": "#FFB6C1",
        "accent": "#FFE4B5",
        "details": ["#DAA520", "#8B4513"]
    },
    "Honey Almond": {
        "background": "#FFF8DC",
        "cake_base": "#DAA520",
        "frosting": "#FFD700",
        "accent": "#FFB347",
        "details": ["#8B4513", "#D2B48C"]
    },
    "Spanish Delight": {
        "background": "#D2B48C",
        "cake_base": "#CD853F",
        "frosting": "#DEB887",
        "accent": "#D2B48C",
        "details": ["#8B6F47", "#DAA520"]
    },
    "Red Velvet Crunch": {
        "background": "#2F1B1F",
        "cake_base": "#8B3A3A",
        "frosting": "#F5F5F5",
        "accent": "#C41E3A",
        "details": ["#8B4513", "#FFFFFF"]
    },
    "Purple Velvet Crunch": {
        "background": "#2F1B4E",
        "cake_base": "#663399",
        "frosting": "#DDA0DD",
        "accent": "#9B59B6",
        "details": ["#8B008B", "#FFFFFF"]
    },
    "Chocolate Cake": {
        "background": "#1C0F08",
        "cake_base": "#3D2817",
        "frosting": "#8B4513",
        "accent": "#654321",
        "details": ["#5C4033", "#D2B48C"]
    },
    "Dark Chocolate Truffle": {
        "background": "#0F0805",
        "cake_base": "#1C0F08",
        "frosting": "#3D2817",
        "accent": "#654321",
        "details": ["#8B4513", "#D2B48C"]
    },
    "White Chocolate Truffle": {
        "background": "#FFFAF0",
        "cake_base": "#F5F5F5",
        "frosting": "#FFFFF0",
        "accent": "#F5DEB3",
        "details": ["#D2B48C", "#8B4513"]
    },
    "Milk Chocolate": {
        "background": "#3D2817",
        "cake_base": "#8B4513",
        "frosting": "#A0522D",
        "accent": "#D2691E",
        "details": ["#654321", "#D2B48C"]
    },
    "Choco Almond": {
        "background": "#2F2015",
        "cake_base": "#5C4033",
        "frosting": "#8B6F47",
        "accent": "#A0826D",
        "details": ["#654321", "#D2B48C"]
    },
    "Caramel Choco Truffle": {
        "background": "#3D2817",
        "cake_base": "#8B4513",
        "frosting": "#DAA520",
        "accent": "#CD853F",
        "details": ["#8B4513", "#FFD700"]
    },
    "Oreo Cholocate Truffle": {
        "background": "#0F0F0F",
        "cake_base": "#2F2F2F",
        "frosting": "#3D2817",
        "accent": "#8B4513",
        "details": ["#FFFFFF", "#654321"]
    },
    "Choco Red Velvet": {
        "background": "#2F1B15",
        "cake_base": "#5C3A3A",
        "frosting": "#8B0000",
        "accent": "#C41E3A",
        "details": ["#8B4513", "#F5F5F5"]
    },
    "Choco Purple Velvet": {
        "background": "#2F1B4E",
        "cake_base": "#4A235A",
        "frosting": "#9B59B6",
        "accent": "#DDA0DD",
        "details": ["#3D2817", "#FFFFFF"]
    },
    "Choco Peanut Butter": {
        "background": "#3D2817",
        "cake_base": "#8B4513",
        "frosting": "#D2691E",
        "accent": "#CD853F",
        "details": ["#654321", "#DAA520"]
    },
    "Chocolate Biscoff": {
        "background": "#3D2817",
        "cake_base": "#8B6F47",
        "frosting": "#D2B48C",
        "accent": "#A0826D",
        "details": ["#654321", "#FFD700"]
    },
    "Dates and Nuts Truffle": {
        "background": "#2F1B0F",
        "cake_base": "#6F4E37",
        "frosting": "#8B4513",
        "accent": "#A0522D",
        "details": ["#654321", "#DAA520"]
    },
    "Choco Nutella": {
        "background": "#3D2817",
        "cake_base": "#8B4513",
        "frosting": "#CD853F",
        "accent": "#D2691E",
        "details": ["#654321", "#FFD700"]
    },
    "Choco Ferrero Rocher": {
        "background": "#2F1B0F",
        "cake_base": "#654321",
        "frosting": "#DAA520",
        "accent": "#FFD700",
        "details": ["#8B4513", "#CD853F"]
    },
    "Raffaelo Whole Chocolate": {
        "background": "#FFFACD",
        "cake_base": "#F5DEB3",
        "frosting": "#8B4513",
        "accent": "#DEB887",
        "details": ["#DAA520", "#FFD700"]
    },
    "Classic Brownie": {
        "background": "#1C0F08",
        "cake_base": "#3D2817",
        "frosting": "#5C4033",
        "accent": "#654321",
        "details": ["#8B4513", "#D2B48C"]
    },
    "Fudgy Oreo Brownie": {
        "background": "#0F0F0F",
        "cake_base": "#2F2F2F",
        "frosting": "#3D2817",
        "accent": "#8B4513",
        "details": ["#FFFFFF", "#654321"]
    },
    "Nuts Loaded Brownie": {
        "background": "#2F1B0F",
        "cake_base": "#5C4033",
        "frosting": "#8B6F47",
        "accent": "#A0826D",
        "details": ["#654321", "#DAA520"]
    },
    "Almond Brownie": {
        "background": "#2F1B0F",
        "cake_base": "#6F4E37",
        "frosting": "#A0826D",
        "accent": "#8B6F47",
        "details": ["#654321", "#D2B48C"]
    },
    "White Choco Chunk Brownie": {
        "background": "#1C0F08",
        "cake_base": "#3D2817",
        "frosting": "#FFFAF0",
        "accent": "#F5F5F5",
        "details": ["#8B4513", "#D2B48C"]
    },
    "Triple Chocolate Brownie": {
        "background": "#0F0805",
        "cake_base": "#1C0F08",
        "frosting": "#3D2817",
        "accent": "#8B4513",
        "details": ["#FFFAF0", "#654321"]
    },
    "Kitkat Brownie": {
        "background": "#1C0F08",
        "cake_base": "#3D2817",
        "frosting": "#5C4033",
        "accent": "#C41E3A",
        "details": ["#8B4513", "#FFD700"]
    },
    "Biscoff Brownie": {
        "background": "#2F1B0F",
        "cake_base": "#6F4E37",
        "frosting": "#D2B48C",
        "accent": "#A0826D",
        "details": ["#654321", "#FFD700"]
    },
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def hex_to_rgba(hex_color, alpha=255):
    """Convert hex color to RGBA tuple."""
    rgb = hex_to_rgb(hex_color)
    return (*rgb, alpha)

def create_photorealistic_cake(cake_name, design):
    """Create a photorealistic cake image with advanced rendering."""
    import random
    
    size = (768, 768)
    img = Image.new('RGB', size, hex_to_rgb(design["background"]))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Create sophisticated background with radial gradient
    for i in range(size[0]//2, 0, -1):
        # Subtle radial gradient background
        ratio = i / (size[0]//2)
        bg_color = hex_to_rgb(design["background"])
        dark_color = tuple(int(c * 0.9) for c in bg_color)
        gradient_color = tuple(
            int(bg_color[j] * (1 - ratio * 0.15) + dark_color[j] * (ratio * 0.15))
            for j in range(3)
        )
        draw.ellipse(
            [(size[0]//2 - i, size[1]//2 - i), 
             (size[0]//2 + i, size[1]//2 + i)],
            fill=gradient_color
        )
    
    center_x, center_y = size[0] // 2, size[1] // 2
    
    # Advanced cake layer rendering
    cake_base_color = hex_to_rgb(design["cake_base"])
    layer_configs = [
        {"y_offset": 150, "width": 220, "height": 65, "shade": 0.85},
        {"y_offset": 95, "width": 260, "height": 70, "shade": 0.90},
        {"y_offset": 30, "width": 310, "height": 75, "shade": 0.95},
    ]
    
    # Draw cake layers with advanced 3D effect
    for layer_idx, config in enumerate(reversed(layer_configs)):
        y_base = center_y + config["y_offset"]
        width = config["width"]
        height = config["height"]
        x_left = center_x - width // 2
        x_right = center_x + width // 2
        
        # Main layer with gradient shading
        for offset in range(height):
            depth_ratio = offset / height
            shade = config["shade"] - (depth_ratio * 0.15)
            shaded = tuple(int(c * shade) for c in cake_base_color)
            draw.rectangle(
                [(x_left, y_base + offset), (x_right, y_base + offset + 1)],
                fill=shaded
            )
        
        # Layer border with realistic edge shadow
        border_color = hex_to_rgba(design.get("accent", "#000000"), 100)
        draw.rectangle(
            [(x_left, y_base), (x_right, y_base + height)],
            outline=border_color, width=2
        )
        
        # Add edge shadow on left and right for 3D
        shadow_color = hex_to_rgba("#000000", 60)
        draw.line([(x_left, y_base), (x_left, y_base + height)], fill=shadow_color, width=3)
        
        # Highlight on right edge
        light_color = hex_to_rgba("#FFFFFF", 40)
        draw.line([(x_right, y_base), (x_right, y_base + height)], fill=light_color, width=2)
    
    # Create photorealistic frosting with texture
    frosting_color = hex_to_rgb(design["frosting"])
    frosting_y = center_y - 70
    frosting_width = 200
    frosting_height = 130
    
    # Base frosting shape (ellipse perspective)
    x_f_left = center_x - frosting_width
    x_f_right = center_x + frosting_width
    
    # Draw frosting with multiple layers and texture
    # Layer 1: Base frosting
    draw.ellipse(
        [(x_f_left, frosting_y), (x_f_right, frosting_y + frosting_height)],
        fill=frosting_color
    )
    
    # Create frosting texture with subtle variation
    random.seed(hash(cake_name) % (2**32))
    for _ in range(30):
        variation = int(random.randint(-15, 15))
        textured_color = tuple(
            max(0, min(255, c + variation)) for c in frosting_color
        )
        x_rand = center_x + random.randint(-frosting_width + 20, frosting_width - 20)
        y_rand = frosting_y + random.randint(10, frosting_height - 30)
        r = random.randint(15, 45)
        draw.ellipse(
            [(x_rand - r, y_rand - r//2), (x_rand + r, y_rand + r//2)],
            fill=(*textured_color, 180)
        )
    
    # Add frosting swirl patterns for realism
    for swirl_idx in range(5):
        swirl_x = center_x + int((swirl_idx - 2) * 60)
        swirl_y = frosting_y + 40
        swirl_color = hex_to_rgba(design.get("details", ["#FFFFFF"])[0], 120)
        
        # Create swirl pattern
        for angle_offset in range(0, 360, 30):
            angle_rad = math.radians(angle_offset)
            pt_x = swirl_x + int(30 * math.cos(angle_rad))
            pt_y = swirl_y + int(15 * math.sin(angle_rad))
            
            draw.ellipse(
                [(pt_x - 8, pt_y - 8), (pt_x + 8, pt_y + 8)],
                fill=swirl_color
            )
    
    # Sophisticated lighting: Main highlight
    highlight_x = center_x - 60
    highlight_y = frosting_y - 30
    for i in range(1, 4):
        alpha = int(150 / i)
        highlight = hex_to_rgba("#FFFFFF", alpha)
        draw.ellipse(
            [(highlight_x - 50//i, highlight_y - 40//i),
             (highlight_x + 50//i, highlight_y + 40//i)],
            fill=highlight
        )
    
    # Secondary highlight for realism
    secondary_x = center_x + 100
    secondary_y = frosting_y + 30
    draw.ellipse(
        [(secondary_x - 30, secondary_y - 20),
         (secondary_x + 30, secondary_y + 20)],
        fill=hex_to_rgba("#FFFFFF", 80)
    )
    
    # Top decoration with realistic styling
    top_y = frosting_y - frosting_height // 2
    detail_color = hex_to_rgb(design.get("details", ["#FF0000"])[0])
    
    # Decorative element with shading
    for shade_layer in range(1, 4):
        alpha = int(255 / shade_layer)
        shade_color = tuple(int(c * (1 - 0.1 * shade_layer)) for c in detail_color)
        draw.ellipse(
            [(center_x - 20 - shade_layer, top_y - shade_layer),
             (center_x + 20 + shade_layer, top_y + 50 + shade_layer)],
            fill=(*shade_color, alpha)
        )
    
    draw.ellipse(
        [(center_x - 18, top_y), (center_x + 18, top_y + 50)],
        fill=detail_color
    )
    
    # Shadow beneath cake for depth
    shadow_y = center_y + 140
    shadow_gradient_steps = 15
    for step in range(shadow_gradient_steps, 0, -1):
        alpha = int(80 * (shadow_gradient_steps - step) / shadow_gradient_steps)
        shadow_color = hex_to_rgba("#000000", alpha)
        shadow_width = 250
        draw.ellipse(
            [(center_x - shadow_width, shadow_y),
             (center_x + shadow_width, shadow_y + step * 2)],
            fill=shadow_color
        )
    
    # Apply Gaussian blur for smooth, photorealistic finish
    img = img.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    # Enhance contrast slightly for more professional look
    return img

def create_image_directories():
    """Create necessary directory structure."""
    categories = ["classy", "yummy", "fruity", "nutty", "chocolaty", "browny"]
    for category in categories:
        category_path = os.path.join(PUBLIC_PATH, category)
        os.makedirs(category_path, exist_ok=True)

def generate_all_cakes():
    """Generate all cake images based on the data."""
    # Create directories first
    create_image_directories()
    
    # All cake data with their categories
    cakes_to_generate = [
        # Classy
        ("Classic Vanilla", "classy", "vanilla.jpg"),
        ("Black Forest", "classy", "blackforest.jpg"),
        ("White Forest", "classy", "whiteforest.jpg"),
        ("Red Velvet", "classy", "red-velvet.jpg"),
        ("Purple Velvet", "classy", "purple-velvet.jpg"),
        # Yummy
        ("Vancho Cake", "yummy", "vancho-cake.jpg"),
        ("Coffee Cake", "yummy", "coffee-cake.jpg"),
        ("Tender Coconut Cake", "yummy", "tender-coconut.jpg"),
        ("Rainbow Cake", "yummy", "rainbow-cake.jpg"),
        # Fruity
        ("Mango", "fruity", "mango.jpg"),
        ("Orange", "fruity", "orange.jpg"),
        ("Strawberry", "fruity", "strawberry.jpg"),
        ("Blueberry", "fruity", "blueberry.jpg"),
        ("Blackcurrant", "fruity", "blackcurrant.jpg"),
        ("Pineapple", "fruity", "pineapple.jpg"),
        ("Kiwi", "fruity", "kiwi.jpg"),
        ("Mixed Fruits", "fruity", "mixed-fruits.jpg"),
        # Nutty
        ("Butterscotch", "nutty", "butterscotch.jpg"),
        ("Nutty Bubble", "nutty", "bubble.jpg"),
        ("Cassata", "nutty", "cassata.jpg"),
        ("Neapolitan", "nutty", "neapolitan.jpg"),
        ("Pistachio", "nutty", "pistachio.jpg"),
        ("Raffaello Cake", "nutty", "raffaello.jpg"),
        ("Rose Milk Almond Cake", "nutty", "rose-milk-almond.jpg"),
        ("Rasamalai Cake", "nutty", "rasamalai.jpg"),
        ("Honey Almond", "nutty", "honey-almond.jpg"),
        ("Spanish Delight", "nutty", "spanish-delight.jpg"),
        ("Red Velvet Crunch", "nutty", "red-velvet-crunch.jpg"),
        ("Purple Velvet Crunch", "nutty", "purple-velvet-crunch.jpg"),
        # Chocolaty
        ("Chocolate Cake", "chocolaty", "chocolate.jpg"),
        ("Dark Chocolate Truffle", "chocolaty", "chocolate-truffle.jpg"),
        ("White Chocolate Truffle", "chocolaty", "whitechocolate.jpg"),
        ("Milk Chocolate", "chocolaty", "milkchocolate.jpg"),
        ("Choco Almond", "chocolaty", "chocolate-almond.jpg"),
        ("Caramel Choco Truffle", "chocolaty", "caramel-choco.jpg"),
        ("Oreo Cholocate Truffle", "chocolaty", "oreo-chocolate.jpg"),
        ("Choco Red Velvet", "chocolaty", "chocolate-red-velvet.jpg"),
        ("Choco Purple Velvet", "chocolaty", "chocolate-purple-velvet.jpg"),
        ("Choco Peanut Butter", "chocolaty", "chocolate-peanut-butter.jpg"),
        ("Chocolate Biscoff", "chocolaty", "chocolate-biscoff.jpg"),
        ("Dates and Nuts Truffle", "chocolaty", "dates-and-nuts.jpg"),
        ("Choco Nutella", "chocolaty", "chocolate-nutella.jpg"),
        ("Choco Ferrero Rocher", "chocolaty", "chocolate-ferrero.jpg"),
        ("Raffaelo Whole Chocolate", "chocolaty", "raffaelo-whole.jpg"),
        # Browny
        ("Classic Brownie", "browny", "browny-classic.jpg"),
        ("Fudgy Oreo Brownie", "browny", "fudge-oreo.jpg"),
        ("Nuts Loaded Brownie", "browny", "nuts-loaded.jpg"),
        ("Almond Brownie", "browny", "almond-browny.jpg"),
        ("White Choco Chunk Brownie", "browny", "white-choco-chunks.jpg"),
        ("Triple Chocolate Brownie", "browny", "triple-chocolate.jpg"),
        ("Kitkat Brownie", "browny", "kitkat-browny.jpg"),
        ("Biscoff Brownie", "browny", "biscoff-browny.jpg"),
    ]
    
    count = 0
    for cake_name, category, filename in cakes_to_generate:
        if cake_name in CAKE_DESIGNS:
            design = CAKE_DESIGNS[cake_name]
            img = create_photorealistic_cake(cake_name, design)
            
            # Save image
            file_path = os.path.join(PUBLIC_PATH, category, filename)
            img.save(file_path, "JPEG", quality=95)
            count += 1
            print(f"✓ Generated: {cake_name} -> {file_path}")
        else:
            print(f"✗ No design scheme for: {cake_name}")
    
    print(f"\nTotal images generated: {count}/{len(cakes_to_generate)}")

if __name__ == "__main__":
    print("Starting cake image generation...\n")
    generate_all_cakes()
    print("\n✓ All cake images generated successfully!")
