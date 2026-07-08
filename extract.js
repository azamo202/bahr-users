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

const strings = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Need to handle both single and double quotes, and template literals
  const matches = content.match(/t\(\s*(['"`])([^'"`]+)\1\s*,\s*(['"`])([^'"`]+)\3\s*\)/g);
  if (matches) {
    matches.forEach(m => {
      const match = m.match(/t\(\s*(['"`])([^'"`]+)\1\s*,\s*(['"`])([^'"`]+)\3\s*\)/);
      if (match) strings.add(match[2]);
    });
  }
});

fs.writeFileSync('strings.json', JSON.stringify([...strings], null, 2));
console.log(`Extracted ${strings.size} unique strings to strings.json`);
