import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, 'src', 'icons');
const outPath = path.join(__dirname, 'src', 'components', 'react', 'Icons.tsx');
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.astro'));

let out = `import React from 'react';\n\n`;

for (const file of files) {
    const name = file.replace('.astro', '');
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf8');
    let jsx = content
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
        .replace(/class=/g, 'className=')
        .replace(/xmlns:xlink/g, 'xmlnsXlink')
        .replace(/xml:space/g, 'xmlSpace')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/clip-path/g, 'clipPath')
        .replace(/viewbox/gi, 'viewBox')
        .replace(/<!--.*?-->/gs, '');

    // Make the component name valid React (Capitalized)
    let componentName = name.replace(/[^a-zA-Z0-9]/g, '');
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    // specific renames to avoid collision
    if (name === 'type') componentName = 'TypeScript';

    out += `export const ${componentName} = () => (\n${jsx}\n);\n\n`;
}

fs.writeFileSync(outPath, out);
console.log('Icons generated successfully!');
