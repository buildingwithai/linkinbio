const fs = require('fs');
const path = require('path');

// Create directories
const dirs = [
  'src/app',
  'src/components',
  'src/types',
  'public'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Copy files from current location to appropriate locations
function copyFile(source, destination) {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    console.log(`Copied: ${source} to ${destination}`);
  } else {
    console.error(`Source file not found: ${source}`);
  }
}

// Create a placeholder image
const placeholderPath = path.join('public', 'placeholder-profile.jpg');
fs.writeFileSync(placeholderPath, '// Placeholder image file');
console.log(`Created placeholder: ${placeholderPath}`);

console.log('Setup completed!'); 