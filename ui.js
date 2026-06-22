document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. JSON se menu data fetch karo
    const response = await fetch('/routes.json');
    const routes = await response.json();
    const currentPath = window.location.pathname;

    // 2. Desktop Sidebar Generate (Glassmorphism)
    const sidebarHtml = `
      <aside class="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white/40 backdrop-blur-xl border-r border-white/50 shadow-lg z-40">
        <div class="p-6 text-2xl font-black text-blue-700 tracking-tighter">MistaHub</div>
        <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
          ${routes.map(r => `
            <a href="${r.url}" class="flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === r.url || currentPath === r.url + '.html' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'}">
              <span class="text-xl">${r.icon}</span>
              <span class="font-bold">${r.name}</span>
            </a>
          `).join('')}
        </nav>
      </aside>
    `;

    // 3. Top Header Generate (With Native Share Button)
    const headerHtml = `
      <header class="fixed top-0 w-full md:w-[calc(100%-16rem)] md:ml-64 bg-white/40 backdrop-blur-xl border-b border-white/50 shadow-sm z-30 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800 truncate">${document.title}</h2>
        <button onclick="navigator.share ? navigator.share({title: document.title, url: window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>alert('Link Copied!'))" class="p-2 bg-white/50 rounded-full hover:bg-white/80 transition shadow-sm border border-white/50 text-sm font-bold text-blue-600 flex items-center gap-2">
          🔗 Share
        </button>
      </header>
    `;

    // 4. Mobile Bottom Navigation Generate (App Feel)
    // (Note: Sirf pehle 4-5 items hi bottom nav me dikhayenge taaki UI clean rahe)
    const bottomNavHtml = `
      <nav class="md:hidden fixed bottom-0 w-full bg-white/70 backdrop-blur-xl border-t border-white/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex justify-around items-center pb-safe pt-2 pb-4 px-2">
         ${routes.slice(0, 4).map(r => `
            <a href="${r.url}" class="flex flex-col items-center p-2 ${currentPath === r.url || currentPath === r.url + '.html' ? 'text-blue-600 transform -translate-y-1 transition' : 'text-gray-500'}">
              <span class="text-2xl">${r.icon}</span>
              <span class="text-[10px] font-bold mt-1">${r.name}</span>
            </a>
         `).join('')}
      </nav>
    `;

    // 5. HTML ke andar elements inject karo
    document.getElementById('dynamic-sidebar').innerHTML = sidebarHtml;
    document.getElementById('dynamic-header').innerHTML = headerHtml;
    document.getElementById('dynamic-mobile-nav').innerHTML = bottomNavHtml;

  } catch (error) {
    console.error("Failed to load navigation routes", error);
  }
});
