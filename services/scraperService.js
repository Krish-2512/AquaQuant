import { chromium } from 'playwright';

export async function scrapeOpenQuant() {
  // Launch in HEADED mode (headless: false) for the first run to see if it works
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    console.log("🔗 Opening OpenQuant...");
    // Use 'commit' to get past the initial handshake, then wait manually
    await page.goto('https://openquant.co/questions', { waitUntil: 'domcontentloaded' });
    
    // Manual wait for content to appear
    await page.waitForTimeout(5000);

    const urls = await page.$$eval('a[href^="/questions/"]', anchors => 
      anchors.map(a => a.href)
    );

    const targetUrls = [...new Set(urls)].slice(0, 5); // Test with 5 first
    const results = [];

    for (const url of targetUrls) {
      const qPage = await context.newPage();
      try {
        console.log(`🔎 Scraping: ${url.split('/').pop()}`);
        
        // Random delay to mimic human reading speed
        await new Promise(r => setTimeout(r, Math.random() * 3000 + 2000));

        await qPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Use a more generic selector if h1 is failing
        await qPage.waitForSelector('main', { timeout: 15000 });

        const data = await qPage.evaluate(() => {
          const title = document.querySelector('h1')?.innerText;
          // OpenQuant often puts the main content in an <article> tag
          const content = document.querySelector('article')?.innerText || 
                          document.querySelector('main')?.innerText;
          const tags = Array.from(document.querySelectorAll('a[href*="topic"]'))
                            .map(el => el.innerText);

          return { title, content, tags };
        });

        if (data.title) {
          results.push({
            ...data,
            url,
            source: 'OpenQuant',
            category: data.tags[0] || 'General'
          });
          console.log(`✅ Success: ${data.title}`);
        }
      } catch (err) {
        console.log(`❌ Still blocked on ${url.split('/').pop()}`);
      } finally {
        await qPage.close();
      }
    }
    return results;
  } finally {
    await browser.close();
  }
}