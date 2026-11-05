import { Page, expect } from '@playwright/test';
import { NAV_LINKS, SITE_URL } from '../pages/BasePage';

/**
 * Verify every nav link resolves to a 200 (no broken links).
 * Uses the same SITE_URL as the rest of the suite instead of a second hardcoded copy.
 */
export async function checkAllNavLinksResolve(page: Page) {
  for (const { path } of NAV_LINKS) {
    const response = await page.request.get(`${SITE_URL}${path}`);
    expect(response.status(), `Nav link ${path} should return 200`).toBe(200);
  }
}

/**
 * Collect all external links on the current page and verify none are broken.
 * Only network failures are tolerated (logged). Assertion failures always fail the test.
 */
export async function checkExternalLinks(page: Page) {
  const links = await page.locator('a[href^="http"]').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href) continue;

    let status: number | null = null;
    try {
      status = (await page.request.get(href)).status();
    } catch {
      console.warn(`Could not reach external link (network error): ${href}`);
      continue;
    }
    expect(status, `External link ${href} should not 404`).not.toBe(404);
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
