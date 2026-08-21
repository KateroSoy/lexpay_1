const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'pages', 'home-sections'),
  path.join(__dirname, 'src', 'components')
];

const replacements = [
  // Backgrounds
  { pattern: /bg-\[#09090b\]/g, replacement: 'bg-bg-main' },
  { pattern: /bg-\[#18181b\]/g, replacement: 'bg-bg-card' },
  // Borders
  { pattern: /border-white\/10/g, replacement: 'border-border-main' },
  // Text
  { pattern: /text-white\/60/g, replacement: 'text-text-secondary' },
  { pattern: /text-white\/40/g, replacement: 'opacity-60 text-text-secondary' }, // close enough
  // Buttons
  { pattern: /bg-white text-black/g, replacement: 'bg-btn-bg text-btn-text' },
  { pattern: /bg-white text-white/g, replacement: 'bg-btn-bg text-btn-text' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // processDirectory(fullPath); // already doing home-sections explicitly
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { pattern, replacement } of replacements) {
        content = content.replace(pattern, replacement);
      }
      
      // Specifically target `text-white` but avoid replacing it when inside `bg-lex-purple text-white` or similar
      // A safe way is to replace `text-white` with `text-text-primary`, but only when it's not preceded by specific colors
      // Actually, since text-white is used heavily, let's just do it and manually fix any purple buttons if they look wrong,
      // or use a regex negative lookbehind if supported. JS supports it!
      // Negative lookbehind: (?<!bg-lex-purple )(?<!bg-red-500 )text-white
      // For simplicity, let's just replace `text-white` -> `text-text-primary` except in Header where it's complex
      
      if (!fullPath.includes('Header.tsx') && !fullPath.includes('Footer.tsx')) {
        content = content.replace(/(?<!bg-[a-zA-Z0-9-]+\s+)text-white(?!\/)/g, 'text-text-primary');
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

directories.forEach(processDirectory);
console.log('Done!');
