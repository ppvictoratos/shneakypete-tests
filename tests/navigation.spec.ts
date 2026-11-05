import { test, expect } from '@playwright/test';
import { BasePage, NAV_LINKS, pathPattern } from '../pages/BasePage';
import { checkAllNavLinksResolve } from '../utils/helpers';

test.describe('Navigation', () => {
  test('all nav links resolve with 200', async ({ page }) => {
    await checkAllNavLinksResolve(page);
  });

  test('every nav link is visible on every page', async ({ page }) => {
    // Stricter than before: each label must be a visible link on each page,
    // instead of passing if the Home link alone is visible.
    for (const { path } of NAV_LINKS) {
      await page.goto(path);
      for (const { label } of NAV_LINKS) {
        await expect(
          page.getByRole('link', { name: label }).first(),
          `"${label}" link missing on ${path}`
        ).toBeVisible();
      }
    }
  });

  test('can navigate through all pages sequentially', async ({ page }) => {
    const base = new BasePage(page);
    await page.goto('/');

    const sequence: Array<typeof NAV_LINKS[number]['label']> = [
      'Music', 'Photo', 'Snoop', 'Dashboard', 'Home'
    ];

    for (const label of sequence) {
      await base.clickNavLink(label);
      await page.waitForLoadState('networkidle');
      const link = NAV_LINKS.find(l => l.label === label)!;
      await expect(page).toHaveURL(pathPattern(link.path));
    }
  });

  test('back/forward browser navigation works', async ({ page }) => {
    await page.goto('/');
    await page.goto('/music.html');
    await page.goto('/photos.html');

    await page.goBack();
    await expect(page).toHaveURL(pathPattern('/music.html'));

    await page.goForward();
    await expect(page).toHaveURL(pathPattern('/photos.html'));
  });
});
