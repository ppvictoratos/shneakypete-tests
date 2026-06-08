import { test, expect } from '@playwright/test';
import { BasePage, NAV_LINKS } from '../pages/BasePage';
import { checkAllNavLinksResolve } from '../utils/helpers';

test.describe('Navigation', () => {
  test('all nav links resolve with 200', async ({ page }) => {
    await checkAllNavLinksResolve(page);
  });

  test('nav bar is present on every page', async ({ page }) => {
    const base = new BasePage(page);

    for (const { path, label } of NAV_LINKS) {
      await page.goto(path);
      const navLink = page.getByRole('link', { name: label });
      // The current page link may not be an anchor — check at least one nav link is visible
      const homeLink = page.getByRole('link', { name: 'Home' });
      await expect(homeLink.or(navLink)).toBeVisible();
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
      await expect(page).toHaveURL(new RegExp(link.path.replace('/', '\\/').replace('.', '\\.')));
    }
  });

  test('back/forward browser navigation works', async ({ page }) => {
    await page.goto('/');
    await page.goto('/music.html');
    await page.goto('/photos.html');

    await page.goBack();
    await expect(page).toHaveURL(/music\.html/);

    await page.goForward();
    await expect(page).toHaveURL(/photos\.html/);
  });
});
