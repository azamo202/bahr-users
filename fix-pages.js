const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'src/app/page.tsx', depth: 0, component: 'HomePage' },
  { file: 'src/app/about/page.tsx', depth: 1, component: 'AboutPage' },
  { file: 'src/app/contact/page.tsx', depth: 1, component: 'ContactPage' },
  { file: 'src/app/support/page.tsx', depth: 1, component: 'SupportPage' },
  { file: 'src/app/products/page.tsx', depth: 1, component: 'ProductsPage' },
  { file: 'src/app/products/[id]/page.tsx', depth: 2, component: 'ProductDetailPage' },
];

pages.forEach(({ file, depth, component }) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // prepend use client
  if (!content.startsWith('"use client"')) {
    content = '"use client";\n' + content;
  }

  // replace link imports
  content = content.replace(/import\s+{\s*Link\s*}\s+from\s+['"]react-router['"];/, "import Link from 'next/link';");
  
  if (content.includes('useParams } from \'react-router\'')) {
    content = content.replace(/import\s+{\s*Link,\s*useParams\s*}\s+from\s+['"]react-router['"];/, "import Link from 'next/link';\nimport { useParams } from 'next/navigation';");
  }

  if (content.includes('useSearchParams } from \'react-router\'')) {
    content = content.replace(/import\s+{\s*Link,\s*useSearchParams\s*}\s+from\s+['"]react-router['"];/, "import Link from 'next/link';\nimport { useSearchParams } from 'next/navigation';");
  }

  // replace <Link to= with <Link href=
  content = content.replace(/<Link\s+to=/g, '<Link href=');

  // replace export function with export default function
  content = content.replace(new RegExp(`export\\s+function\\s+${component}`), `export default function ${component}`);

  // fix relative imports based on depth
  // original was from src/app/pages/ => to src/app/context/AppContext (../context)
  // depth 0 (src/app/) => ./context
  // depth 1 (src/app/about/) => ../context
  // depth 2 (src/app/products/[id]/) => ../../context
  let newRel = depth === 0 ? './' : '../'.repeat(depth);
  content = content.replace(/from\s+['"]\.\.\/(context|data|components)/g, `from '${newRel}$1`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', file);
});
