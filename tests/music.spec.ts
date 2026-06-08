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

  // Uncomment and adjust once audio/embeds exist on the page:
  //
  // test('audio players are present and ready', async ({ page }) => {
  //   const music = new MusicPage(page);
  //   await music.goto();
  //   await music.expectAudioPlayersPresent();
  //   await waitForMediaReady(page);
  // });
  //
  // test('spotify embeds load', async ({ page }) => {
  //   const music = new MusicPage(page);
  //   await music.goto();
  //   await music.expectSpotifyEmbedsPresent();
  // });
});
