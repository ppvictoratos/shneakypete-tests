# shneakypete-tests 🍊

End-to-end Playwright test suite for [shneakypete.neocities.org](https://shneakypete.neocities.org).

Built with TypeScript and the Page Object Model pattern.

## Structure

```
shneakypete-tests/
├── playwright.config.ts      # Config: baseURL, projects (desktop + mobile)
├── tests/
│   ├── navigation.spec.ts    # Full nav flow, back/forward, link integrity
│   ├── home.spec.ts          # Homepage smoke tests
│   ├── music.spec.ts         # Music page + audio/embed hooks
│   └── pages.spec.ts         # Photos, Snoop, Dashboard
├── pages/
│   ├── BasePage.ts           # Shared locators, nav helpers, image checks
│   └── Pages.ts              # Page-specific POMs (Home, Music, Photos, Snoop, Dashboard)
└── utils/
    └── helpers.ts            # Link checker, media ready helper
```

## Getting Started

```bash
npm install
npx playwright install
npm test
```

## Useful Commands

```bash
npm run test:headed    # Watch tests run in browser
npm run test:ui        # Playwright UI mode (great for debugging)
npm run test:mobile    # Run suite on iPhone 13 viewport
npm run test:report    # Open last HTML report
```

## Roadmap

- [ ] Add music page audio player tests (once embedded)
- [ ] Add video page for morning milk content 🥛
- [ ] Visual regression snapshots
- [ ] GitHub Actions CI workflow
- [ ] Accessibility checks (axe-playwright)
