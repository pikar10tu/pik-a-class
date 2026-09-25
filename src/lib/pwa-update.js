/**
 * PWA Update & Instant Navigation Manager
 * - ตรวจจับ Service Worker อัปเดตและแจ้งเตือนผู้ใช้ทันที
 * - ตรวจสอบการอัปเดตเมื่อสลับกลับเข้าแอพ (visibilitychange)
 * - เร่งความเร็วการเปิดหน้าถัดไป (Instant Navigation / Prefetching)
 */

let refreshing = false;

export function initPwaUpdate() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  // 1. ตรวจสอบการอัปเดตทันทีเมื่อผู้ใช้สลับกลับเข้าแอพ (Resume from background)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker.ready.then((reg) => {
        reg.update().catch(() => {});
      }).catch(() => {});
    }
  });

  // 2. ดักจับเมื่อมี Service Worker ตัวใหม่เข้าควบคุม (controllerchange)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;

    // ถ้าไม่อยู่ระหว่างการทำข้อสอบ (เช่น อยู่หน้า Dashboard, Profile, Login) ให้ reload ทันที
    const isPlaying = document.getElementById('play-view') && !document.getElementById('play-view').hidden;
    if (!isPlaying) {
      window.location.reload();
    } else {
      showUpdateToast();
    }
  });

  // 3. ตรวจจับ Service Worker เมื่อโหลดเสร็จ
  navigator.serviceWorker.ready.then((reg) => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateToast();
        }
      });
    });
  }).catch(() => {});
}

/**
 * แสดง Toast แจ้งเตือนเมื่อมีเวอร์ชันใหม่พร้อมใช้งาน
 */
function showUpdateToast() {
  if (document.getElementById('pwa-update-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'pwa-update-toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="pwa-toast-content">
      <span class="pwa-toast-icon">⚡</span>
      <span class="pwa-toast-text">มีเวอร์ชันใหม่พร้อมใช้งาน!</span>
    </div>
    <button type="button" class="pwa-toast-btn" id="pwa-refresh-btn">อัปเดตเลย</button>
  `;

  document.body.appendChild(toast);

  document.getElementById('pwa-refresh-btn')?.addEventListener('click', () => {
    window.location.reload();
  });
}

/**
 * เพิ่มความลื่นไหลในการเปลี่ยนหน้า (Instant Navigation)
 * - ใส่ Speculation Rules API ให้เบราว์เซอร์ Prerender หน้าสำคัญล่วงหน้า
 * - Prefetch เมื่อผู้ใช้นิ้วแตะโดนปุ่มลิงก์ (Touchstart / Pointerdown)
 */
export function initInstantNavigation() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 1. ใส่ Speculation Rules หากเบราว์เซอร์รองรับ
  if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
    const existing = document.getElementById('app-speculation-rules');
    if (!existing) {
      const base = import.meta.env?.BASE_URL || '/pik-a-class/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      const script = document.createElement('script');
      script.id = 'app-speculation-rules';
      script.type = 'speculationrules';
      script.textContent = JSON.stringify({
        prerender: [
          {
            source: 'list',
            urls: [
              `${cleanBase}dashboard.html`,
              `${cleanBase}learn/index.html`,
              `${cleanBase}vocab/index.html`,
              `${cleanBase}vocab/cafe.html`,
              `${cleanBase}handbook.html`
            ],
            eagerness: 'moderate'
          }
        ]
      });
      document.head.appendChild(script);
    }
  }

  // 2. Prefetch on touchstart / pointerdown สำหรับทุกลิงก์ภายในเว็บ
  const prefetchedUrls = new Set();

  function prefetchUrl(url) {
    if (!url || prefetchedUrls.has(url)) return;
    try {
      const targetUrl = new URL(url, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (!targetUrl.pathname.endsWith('.html') && !targetUrl.pathname.endsWith('/')) return;

      prefetchedUrls.add(url);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = targetUrl.href;
      document.head.appendChild(link);
    } catch {
      // ignore
    }
  }

  document.addEventListener('pointerdown', (e) => {
    const a = e.target.closest('a');
    if (a && a.href) {
      prefetchUrl(a.href);
    }
  }, { passive: true });
}
