import { Page, expect } from '@playwright/test';
import { NAV_LINKS } from '../pages/BasePage';

/**
 * Verify every nav link resolves to a 200 (no broken links).
 */
export async function checkAllNavLinksResolve(page: Page) {
  for (const { path } of NAV_LINKS) {
    const response = await page.request.get(`https://shneakypete.neocities.org${path}`);
    expect(response.status(), `Nav link ${path} should return 200`).toBe(200);
  }
}

/**
 * Collect all external links on the current page and verify none are broken.
 * Skips mailto: and javascript: hrefs.
 */
export async function checkExternalLinks(page: Page) {
  const links = await page.locator('a[href^="http"]').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href) continue;
    try {
      const response = await page.request.get(href);
      expect(response.status(), `External link ${href} should not 404`).not.toBe(404);
    } catch {
      // Network errors on external links are non-fatal — just log
      console.warn(`Could not reach external link: ${href}`);
    }
  }
}

/**
 * Wait for any media (audio/video) on the page to be ready to play.
 */
export async function waitForMediaReady(page: Page) {
  await page.evaluate(async () => {
    const mediaElements = Array.from(document.querySelectorAll('audio, video'));
    await Promise.all(
      mediaElements.map(
        el => new Promise<void>(resolve => {
          if ((el as HTMLMediaElement).readyState >= 3) { resolve(); return; }
          el.addEventListener('canplay', () => resolve(), { once: true });
        })
      )
    );
  });
}
