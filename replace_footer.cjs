const fs = require('fs');
const path = require('path');

const footerPath = path.join(__dirname, 'src', 'components', 'Footer.tsx');
let content = fs.readFileSync(footerPath, 'utf8');

content = content.replace(/hover:text-white/g, 'hover:text-text-primary');
content = content.replace(/text-white/g, 'text-text-primary');

fs.writeFileSync(footerPath, content, 'utf8');
console.log('Footer updated');
