// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';

function setup({ controller, path = '/pik-a-class/dashboard.html', body = '' }) {
  vi.resetModules();
  document.body.innerHTML = body;
  window.history.replaceState(null, '', path);

  const sw = new EventTarget();
  sw.controller = controller;
  sw.ready = new Promise(() => {});
  Object.defineProperty(navigator, 'serviceWorker', { value: sw, configurable: true });

  const reload = vi.fn();
  Object.defineProperty(window, 'location', {
    value: { ...window.location, pathname: path, reload },
    configurable: true,
  });
  return { sw, reload };
}

async function init() {
  const mod = await import('./pwa-update.js');
  mod.initPwaUpdate();
}

describe('initPwaUpdate', () => {
  beforeEach(() => {
    document.getElementById('pwa-update-toast')?.remove();
  });

  it('does not reload on the very first service worker install', async () => {
    const { sw, reload } = setup({ controller: null });
    await init();
    sw.dispatchEvent(new Event('controllerchange'));
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads an idle page when a new version takes over', async () => {
    const { sw, reload } = setup({ controller: {} });
    await init();
    sw.dispatchEvent(new Event('controllerchange'));
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('shows a toast instead of reloading mid-game', async () => {
    const { sw, reload } = setup({ controller: {}, body: '<section id="cafe-game-stage"></section>' });
    await init();
    sw.dispatchEvent(new Event('controllerchange'));
    expect(reload).not.toHaveBeenCalled();
    expect(document.getElementById('pwa-update-toast')).not.toBeNull();
  });

  it('shows a toast instead of reloading on admin pages', async () => {
    const { sw, reload } = setup({ controller: {}, path: '/pik-a-class/admin/exercise.html' });
    await init();
    sw.dispatchEvent(new Event('controllerchange'));
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads once when a stale chunk fails to load after a deploy', async () => {
    sessionStorage.clear();
    const { reload } = setup({ controller: {} });
    await init();
    window.dispatchEvent(new Event('vite:preloadError', { cancelable: true }));
    window.dispatchEvent(new Event('vite:preloadError', { cancelable: true }));
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
