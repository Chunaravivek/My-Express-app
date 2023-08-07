const fs = require('fs');

// Synchronous read file example
try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('Synchronous Read:', data);
} catch (err) {
  console.error('Error reading file:', err);
}

console.log('Synchronous Read operation is complete.');
