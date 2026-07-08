const fs = require('fs');
const path = require('path');

const files = [];
function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) files.push(p);
  });
}
walk('./src');

let total = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const regex = /\[lang as 'ar' \| 'en'\]/g;
  if (regex.test(content)) {
    content = content.replace(regex, "[lang as 'ar' | 'en' | 'ku']");
    fs.writeFileSync(f, content, 'utf8');
    total++;
    console.log('Updated ' + f);
  }
});
console.log('Total files updated: ' + total);
