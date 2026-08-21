const fs = require('fs');
const path = require('path');

const map = {
  ArrowLeft: 'PiArrowLeft',
  Star: 'PiStarFill',
  Clock: 'PiClock',
  MapPin: 'PiMapPin',
  CheckCircle2: 'PiCheckCircle',
  Search: 'PiMagnifyingGlass',
  SearchIcon: 'PiMagnifyingGlass', // alias
  ArrowRight: 'PiArrowRight',
  Truck: 'PiTruck',
  Check: 'PiCheck',
  Gamepad2: 'PiGameController',
  Smartphone: 'PiDeviceMobile',
  Wifi: 'PiWifiHigh',
  Wallet: 'PiWallet',
  Zap: 'PiLightning',
  Ticket: 'PiTicket',
  Receipt: 'PiReceipt',
  LayoutGrid: 'PiSquaresFour',
  X: 'PiX',
  QrCode: 'PiQrCode',
  CreditCard: 'PiCreditCard',
  ShieldCheck: 'PiShieldCheck',
  Trash2: 'PiTrash',
  HardDrive: 'PiHardDrive',
  Wrench: 'PiWrench',
  Home: 'PiHouse',
  Compass: 'PiCompass',
  Package: 'PiPackage',
  User: 'PiUser',
  Menu: 'PiList',
  ShoppingBag: 'PiTote',
  Sun: 'PiSun',
  Moon: 'PiMoon'
};

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllFiles(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('lucide-react')) {
    // 1. Find the import statement and extract icons
    const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
    let match;
    let newImports = new Set();
    let iconsInFile = [];

    while ((match = importRegex.exec(content)) !== null) {
      const icons = match[1].split(',').map(i => i.trim());
      for (let icon of icons) {
        if (!icon) continue;
        let original = icon;
        let local = icon;
        if (icon.includes(' as ')) {
          [original, local] = icon.split(' as ').map(i => i.trim());
        }
        
        iconsInFile.push(local);
        const piIcon = map[original] || 'PiPlaceholder';
        newImports.add(piIcon);
      }
    }

    if (iconsInFile.length > 0) {
      // replace the import
      content = content.replace(importRegex, `import { ${Array.from(newImports).join(', ')} } from "react-icons/pi"`);
      
      // replace the tags `<IconName` and `</IconName>`
      for (const icon of iconsInFile) {
        const originalName = icon.includes(' as ') ? icon.split(' as ')[0].trim() : icon;
        const piIcon = map[originalName] || map[icon] || 'PiPlaceholder';
        
        const tagStartRegex = new RegExp(`<${icon}(\\s|>)`, 'g');
        content = content.replace(tagStartRegex, `<${piIcon}$1`);
        
        const tagEndRegex = new RegExp(`</${icon}>`, 'g');
        content = content.replace(tagEndRegex, `</${piIcon}>`);
      }
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Done mapping icons!');
