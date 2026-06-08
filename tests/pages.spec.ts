import { test } from '@playwright/test';
import { PhotosPage, SnoopPage, DashboardPage } from '../pages/Pages';

// ─── Photos ──────────────────────────────────────────────────────────────────
test.describe('Photos Page', () => {
  test('loads successfully', async ({ page }) => {
    const photos = new PhotosPage(page);
    await photos.goto();
    await photos.expectLoaded();
  });

  test('photos are present and fully loaded', async ({ page }) => {
    const photos = new PhotosPage(page);
    await photos.goto();
    await photos.expectPhotosPresent();
  });
});

// ─── Snoop ───────────────────────────────────────────────────────────────────
test.describe('Snoop Page 🐕', () => {
  test('loads successfully', async ({ page }) => {
    const snoop = new SnoopPage(page);
    await snoop.goto();
    await snoop.expectLoaded();
  });

  test('snoop photos load without error', async ({ page }) => {
    const snoop = new SnoopPage(page);
    await snoop.goto();
    await snoop.expectSnoopPhotosPresent();
  });
});

// ─── Dashboard ───────────────────────────────────────────────────────────────
test.describe('Dashboard Page', () => {
  test('loads successfully', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.expectLoaded();
  });
});
