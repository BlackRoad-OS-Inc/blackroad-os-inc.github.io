const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  beforeEach(() => {
    document.open();
    document.write(html);
    document.close();
  });

  test('has correct page title', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('BlackRoad OS');
  });

  test('has meta description', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta.getAttribute('content')).toBeTruthy();
  });

  test('has hero section with h1', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('BlackRoad OS');
  });

  test('has tagline', () => {
    const tagline = document.querySelector('.tagline');
    expect(tagline).not.toBeNull();
    expect(tagline.textContent).toContain('Your AI');
  });

  test('has GitHub link', () => {
    const githubLink = document.querySelector('a[href*="github.com/BlackRoad-OS-Inc"]');
    expect(githubLink).not.toBeNull();
  });

  test('has stats section', () => {
    const stats = document.querySelectorAll('.stat');
    expect(stats.length).toBeGreaterThan(0);
  });

  test('has footer with copyright', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('BlackRoad OS');
  });
});
