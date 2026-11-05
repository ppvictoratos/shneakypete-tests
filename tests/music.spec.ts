import { test, expect } from '@playwright/test';
import { MusicPage } from '../pages/Pages';
import { waitForMediaReady } from '../utils/helpers';

test.describe('Music Page', () => {
  test('loads successfully', async ({ page }) => {
    const music = new MusicPage(page);
    await music.goto();
    await music.expectLoaded();
  });

  test('has no broken images', async ({ page }) => {
    const music = new MusicPage(page);
    await music.goto();
    await music.expectAllImagesLoaded();
  });

  test('audio player is present and ready', async ({ page }) => {
    // Page currently has one <audio> element (/LOVE.wav).
    const music = new MusicPage(page);
    await music.goto();
    await music.expectAudioPlayersPresent(1);
    await waitForMediaReady(page);
  });

  // Spotify embeds don't exist on the page yet. Re-enable when they're added:
  //
  // test('spotify embeds load', async ({ page }) => {
  //   const music = new MusicPage(page);
  //   await music.goto();
  //   await music.expectSpotifyEmbedsPresent();
  // });
});
