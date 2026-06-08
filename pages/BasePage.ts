import { Page, Locator, expect } from '@playwright/test';

export const SITE_URL = 'https://shneakypete.neocities.org';

export const NAV_LINKS = [
  { label: 'Home',      path: '/'             },
  { label: 'Music',     path: '/music.html'   },
  { label: 'Photo',     path: '/photos.html'  },
  { label: 'Snoop',     path: '/snoop.html'   },
  { label: 'Dashboard', path: '/dashboard.html' },
] as const;

export type NavLabel = typeof NAV_LINKS[number]['label'];

export class BasePage {
  readonly page: Page;
  readonly nav: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page     = page;
    this.nav      = page.locator('nav, header');
    this.footer   = page.locator('footer, [class*="footer"]');
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async expectPageLoaded(titleContains?: string) {
    await expect(this.page).toHaveURL(new RegExp(SITE_URL));
    if (titleContains) {
      await expect(this.page).toHaveTitle(new RegExp(titleContains, 'i'));
    }
    // No broken page (basic check)
    const bodyText = await this.page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(0);
  }

  async clickNavLink(label: NavLabel) {
    await this.page.getByRole('link', { name: label }).first().click();
  }

  async expectNoConsoleErrors() {
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    // Give page a moment to settle
    await this.page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  }

  async expectAllImagesLoaded() {
    const images = this.page.locator('img');
    const count  = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const loaded = await img.evaluate((el: HTMLImageElement) =>
        el.complete && el.naturalWidth > 0
      );
      expect(loaded, `Image ${i} failed to load`).toBe(true);
    }
  }
}
