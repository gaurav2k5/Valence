const fs = require('fs');
fetch('https://motionsites.ai/').then(r => r.text()).then(html => {
  const matches = html.match(/https:\/\/[^\s\"']+\.(mp4|webm)/g);
  console.log('Matches:', matches ? [...new Set(matches)] : 'None');
});
