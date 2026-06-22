// sitemap.js
const myDocs = [
  { title: "API Gateway", path: "/lib/gateway", desc: "Main Cloudflare routing logic aur endpoints." },
  { title: "Payment System", path: "/lib/payments", desc: "Razorpay aur Stripe integration setups." },
  { title: "Player Module", path: "/lib/player", desc: "Video streaming aur player event handling." }
];

// Sidebar Auto-Generate Logic
window.autoSidebar = myDocs.map(doc => `* [${doc.title}](${doc.path})`).join('\n');

// Home Page Cards Auto-Generate Logic
window.autoHomeCards = myDocs.map(doc => `
<div class="glass-card">
  <h2>${doc.title}</h2>
  <p>${doc.desc}</p>
  <div class="card-actions">
    <a href="${doc.path}" class="read-btn">Read Docs</a>
    <button onclick="shareLink('${doc.path}')" class="share-btn">🔗 Share</button>
  </div>
</div>
`).join('');
