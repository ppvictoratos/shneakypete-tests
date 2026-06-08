import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Pages';

test.describe('Home Page', () => {
  test('loads with correct title and heading', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectLoaded();
  });

  test('displays Portokali LLC copyright', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(home.copyright).toBeVisible();
  });

  test('has no broken images', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectAllImagesLoaded();
  });
});
