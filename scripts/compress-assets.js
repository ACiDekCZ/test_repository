const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const outDir = path.resolve(__dirname, '../public');

function compressFile(filePath) {
  const data = fs.readFileSync(filePath);
  const gz = zlib.gzipSync(data);
  fs.writeFileSync(`${filePath}.gz`, gz);
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      compressFile(fullPath);
    }
  });
}

walk(outDir);
