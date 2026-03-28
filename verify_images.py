#!/usr/bin/env python3
"""Verify all generated cake images."""

from PIL import Image
import os
import glob

WORKSPACE_PATH = r"c:\Jackstone\Personal\Sandbox\Projects\React\Development\cakes-frontend\raelyncakes"
PUBLIC_PATH = os.path.join(WORKSPACE_PATH, "public", "cakes")

def verify_images():
    """Verify all images are 768x768 JPG."""
    jpg_files = glob.glob(os.path.join(PUBLIC_PATH, "**", "*.jpg"), recursive=True)
    
    print(f"Found {len(jpg_files)} JPG files\n")
    
    valid_count = 0
    invalid_count = 0
    errors = []
    
    for jpg_file in sorted(jpg_files):
        try:
            img = Image.open(jpg_file)
            width, height = img.size
            file_size_kb = os.path.getsize(jpg_file) / 1024
            
            if width == 768 and height == 768:
                print(f"✓ {os.path.basename(jpg_file)}: {width}x{height} ({file_size_kb:.1f}KB)")
                valid_count += 1
            else:
                print(f"✗ {os.path.basename(jpg_file)}: {width}x{height} (Expected 768x768) ({file_size_kb:.1f}KB)")
                invalid_count += 1
                errors.append(f"{jpg_file}: {width}x{height}")
        except Exception as e:
            print(f"✗ {os.path.basename(jpg_file)}: ERROR - {str(e)}")
            invalid_count += 1
            errors.append(f"{jpg_file}: {str(e)}")
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Valid (768x768): {valid_count}")
    print(f"  Invalid: {invalid_count}")
    print(f"  Total: {len(jpg_files)}")
    print(f"{'='*60}")
    
    if errors:
        print(f"\nErrors found:")
        for error in errors:
            print(f"  - {error}")
    else:
        print(f"\n✓ All images are valid 768x768 JPG files!")

if __name__ == "__main__":
    print("Verifying cake images...\n")
    verify_images()
