import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// ─── Home ────────────────────────────────────────────────────────────────────
export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    super(page);
    this.heading   = page.getByText("Welcome to Ptor's Domain");
    this.copyright = page.getByText('Portokali LLC');
  }

  async goto() { await super.goto('/'); }

  async expectLoaded() {
    await this.expectPageLoaded('shneakypete');
    await expect(this.heading).toBeVisible();
    await expect(this.copyright).toBeVisible();
  }
}

// ─── Music ───────────────────────────────────────────────────────────────────
export class MusicPage extends BasePage {
  readonly audioPlayers: Locator;
  readonly spotifyEmbeds: Locator;

  constructor(page: Page) {
    super(page);
    this.audioPlayers  = page.locator('audio');
    this.spotifyEmbeds = page.locator('iframe[src*="spotify"]');
  }

  async goto() { await super.goto('/music.html'); }

  async expectLoaded() {
    await this.expectPageLoaded('music');
  }

  async expectAudioPlayersPresent(count?: number) {
    await expect(this.audioPlayers.first()).toBeVisible();
    if (count !== undefined) {
      await expect(this.audioPlayers).toHaveCount(count);
    }
  }

  async expectSpotifyEmbedsPresent() {
    await expect(this.spotifyEmbeds.first()).toBeVisible();
  }
}

// ─── Photos ──────────────────────────────────────────────────────────────────
export class PhotosPage extends BasePage {
  readonly images: Locator;

  constructor(page: Page) {
    super(page);
    this.images = page.locator('img');
  }

  async goto() { await super.goto('/photos.html'); }

  async expectLoaded() {
    await this.expectPageLoaded('photo');
  }

  async expectPhotosPresent() {
    await expect(this.images.first()).toBeVisible();
    await this.expectAllImagesLoaded();
  }
}

// ─── Snoop ───────────────────────────────────────────────────────────────────
export class SnoopPage extends BasePage {
  readonly images: Locator;

  constructor(page: Page) {
    super(page);
    this.images = page.locator('img');
  }

  async goto() { await super.goto('/snoop.html'); }

  async expectLoaded() {
    await this.expectPageLoaded('snoop');
  }

  async expectSnoopPhotosPresent() {
    const count = await this.images.count();
    expect(count, 'Snoop page should have at least one photo').toBeGreaterThan(0);
    await this.expectAllImagesLoaded();
  }
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export class DashboardPage extends BasePage {
  constructor(page: Page) { super(page); }

  async goto() { await super.goto('/dashboard.html'); }

  async expectLoaded() {
    await this.expectPageLoaded('dashboard');
  }
}
