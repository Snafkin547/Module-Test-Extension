GREEN="\033[0;32m"
NC="\033[0m"

echo "${GREEN}Cleaning old build...${NC}"
rm -R chrome*

echo "${GREEN}Packing into zip file...${NC}"
python3 package_chrome.py

echo "${GREEN}Unpacking zip file to \"chrome-extension\"${NC}"
unzip chrome* -d chrome-extension

echo "${GREEN}Removing zip file...${NC}"
rm chrome-extension.zip