#!/bin/bash

# Script for generating Subresource Integrity (SRI) hashes
# این اسکریپت هش‌های SRI را برای فایل‌های استاتیک تولید می‌کند
# SRI به مرورگر اجازه می‌دهد تا بررسی کند که منابع بارگیری شده دستکاری نشده‌اند
#
# @see https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
# @see https://www.w3.org/TR/SRI/

# رنگ‌ها برای خروجی
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# دایرکتوری‌های هدف برای تولید هش SRI
STATIC_DIRS=("public" ".next/static")
OUTPUT_FILE="public/sri-manifest.json"

echo -e "${YELLOW}Generating SRI hashes for static assets...${NC}"

# ایجاد فایل JSON خروجی
echo "{" > $OUTPUT_FILE

first_entry=true

# پیمایش تمام دایرکتوری‌های هدف
for dir in "${STATIC_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo -e "${GREEN}Processing directory: $dir${NC}"
    
    # پیدا کردن تمام فایل‌های JS و CSS
    find "$dir" -type f $$ -name "*.js" -o -name "*.css" $$ | while read file; do
      # محاسبه هش SHA-384 برای فایل
      hash=$(cat "$file" | openssl dgst -sha384 -binary | openssl base64 -A)
      
      # مسیر نسبی فایل برای استفاده در JSON
      rel_path=${file#./}
      
      # اضافه کردن به فایل JSON
      if [ "$first_entry" = true ]; then
        first_entry=false
      else
        echo "," >> $OUTPUT_FILE
      fi
      
      echo -e "  \"$rel_path\": \"sha384-$hash\"" >> $OUTPUT_FILE
      
      echo -e "${GREEN}Generated SRI for: ${NC}$rel_path"
    done
  else
    echo -e "${RED}Directory not found: $dir${NC}"
  fi
done

# بستن فایل JSON
echo -e "\n}" >> $OUTPUT_FILE

echo -e "${GREEN}SRI hashes generated and saved to: ${NC}$OUTPUT_FILE"
echo -e "${YELLOW}Use these hashes in your HTML with the integrity attribute:${NC}"
echo -e "${YELLOW}<script src=\"script.js\" integrity=\"sha384-[hash]\" crossorigin=\"anonymous\"></script>${NC}"
