/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('index.html', () => {
  test('has a title containing BlackRoad OS', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('BlackRoad OS');
  });

  test('has a meta description', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta.getAttribute('content').length).toBeGreaterThan(0);
  });

  test('has an h1 element', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('BlackRoad OS');
  });

  test('has a tagline paragraph', () => {
    const tagline = document.querySelector('.tagline');
    expect(tagline).not.toBeNull();
    expect(tagline.textContent).toBeTruthy();
  });

  test('has a GitHub link', () => {
    const link = document.querySelector('a[href*="github.com/BlackRoad-OS-Inc"]');
    expect(link).not.toBeNull();
  });

  test('has a stats section with four stats', () => {
    const stats = document.querySelectorAll('.stat');
    expect(stats.length).toBe(4);
  });

  test('has a footer with copyright', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('2026');
  });

  test('has Open Graph metadata', () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogTitle).not.toBeNull();
    expect(ogDesc).not.toBeNull();
  });

  test('has a skip-nav link for accessibility', () => {
    const skip = document.querySelector('.skip-nav');
    expect(skip).not.toBeNull();
    expect(skip.getAttribute('href')).toBe('#main');
  });

  test('has a navigation bar', () => {
    const nav = document.querySelector('nav');
    expect(nav).not.toBeNull();
  });

  test('has a features section with four cards', () => {
    const cards = document.querySelectorAll('.feature-card');
    expect(cards.length).toBe(4);
  });
});

describe('404.html', () => {
  let errorDoc;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../404.html'), 'utf8');
    errorDoc = new DOMParser().parseFromString(html, 'text/html');
  });

  test('has a title containing 404', () => {
    const title = errorDoc.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('404');
  });

  test('has a link back to home', () => {
    const link = errorDoc.querySelector('a[href="/"]');
    expect(link).not.toBeNull();
  });
});
