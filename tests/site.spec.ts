import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work', '/work/paicafes', '/work/laba-taxi', '/systems', '/technology', '/timeline', '/about', '/contact', '/cv'];

for (const route of routes) {
  test(`${route} renders one h1, no console errors, no horizontal overflow`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveCount(1);
    const width = info.project.use.viewport!.width;
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, 'no horizontal overflow').toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });

  test(`${route} passes axe (WCAG 2.1 AA)`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('hero exposes every featured build without WebGL', async ({ page }) => {
  await page.goto('/');
  const builds = page.getByRole('group', { name: 'Explore featured builds' }).getByRole('button');
  await expect(builds).toHaveCount(9);
  await builds.nth(2).click();
  await expect(page.getByRole('link', { name: /Reiwa Sakura — Technology leadership/ })).toBeVisible();
});

test('reduced motion disables the WebGL offer and reveals content', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: /Enable 3D/ })).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'How I work.' })).toBeVisible();
  await context.close();
});

test('mobile navigation opens and links to every route', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'mobile only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const links = page.getByRole('dialog').getByRole('link');
  await expect(links).toHaveCount(7);
  await links.filter({ hasText: 'Systems' }).click();
  await expect(page).toHaveURL(/\/systems$/);
});

test('metadata, sitemap and robots are published', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Thu Ya Kyaw — CTO · Systems Architect · Product Engineer');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://thuyakyaw.com');
  expect(await page.locator('script[type="application/ld+json"]').innerHTML()).toContain('"@type":"Person"');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('/work/paicafes');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('sitemap.xml');
});

test('legacy routes redirect', async ({ request }) => {
  for (const [from, to] of [['/skills', '/technology'], ['/services', '/systems'], ['/experience', '/timeline']]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()['location']).toContain(to);
  }
});
