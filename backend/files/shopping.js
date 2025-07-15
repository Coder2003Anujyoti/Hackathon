const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const { authenticateToken,authorizeRoles }=require("../middleware/authMiddleware.js")
const app = express();
//*Flipkart Scrapper
let browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

// ✅ Create optimized page
async function createOptimizedPage() {
  const browser = await browserPromise;
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resource = req.resourceType();
    if (['image', 'stylesheet', 'font', 'media'].includes(resource)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  return page;
}
// ✅ Flipkart Scraper
async function scrapeFlipkart(query) {
  const page = await createOptimizedPage();
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  try {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await page.waitForSelector('div[data-id]', { timeout: 60000 });
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('div[data-id]');
      const results = [];
      items.forEach((item) => {
        const name =
          item.querySelector('a.VJA3rP')?.innerText ||
          item.querySelector('a.wjcEIp')?.innerText;
        const price = item.querySelector('.Nx9bqj')?.innerText;
        const rating = item.querySelector('.XQDdHH')?.innerText;
        const image = item.querySelector('img.DByuf4')?.src;
        const quantity = item.querySelector('.NqpwHC')?.innerText;

        const linkTag = item.querySelector('a.VJA3rP') || item.querySelector('a.wjcEIp');
        const link = linkTag ? `https://www.flipkart.com${linkTag.getAttribute('href')}` : 'No link';

        if (name && price) {
          results.push({
            name,
            price,
            rating: rating || 'No rating',
            image: image || 'No image',
            quantity: quantity || 'N/A',
            link,
            source: 'Flipkart'
          });
        }
      });

      return results;
    });

    await page.close();
    return products;

  } catch (err) {
    console.error('❌ Error scraping Flipkart:', err.message || err);
    await page.close();
    return [{
      error: 'Flipkart scrape failed: site may have blocked the request, structure may have changed, or the request timed out.',
      details: err.message || String(err)
    }];
  }
}
//*Amazon Scrapper
async function getAmazonProducts(item) {
  const query = item.trim().replace(/ /g, '+');
  const url = `https://www.amazon.in/s?k=${query}`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/',
        'Connection': 'keep-alive',
      },
    });
    const $ = cheerio.load(data);
    const results = [];
    $('div.s-main-slot div[data-component-type="s-search-result"]').each((_, el) => {
      const name = $(el).find('h2 span').text().trim();
      const priceWhole = $(el).find('.a-price-whole').first().text().replace(/[^\d]/g, '');
      const priceFraction = $(el).find('.a-price-fraction').first().text().replace(/[^\d]/g, '');
      const price = priceWhole ? `₹${priceWhole}.${priceFraction || '00'}` : 'Not Available';
      const rating = $(el).find('span.a-icon-alt').first().text().trim() || 'No Rating';
      const linkSuffix = $(el).find('a.a-link-normal').attr('href');
      const link = linkSuffix ? `https://www.amazon.in${linkSuffix}` : 'No Link Found';
      const image = $(el).find('img.s-image').attr('src') || 'No Image Found';
      if (name) {
        results.push({
          name,
          price,
          rating,
          link,
          image,
          source: 'Amazon',
        });
      }
    });
    return results.length > 0
      ? results
      : [{ error: 'No products found for your search on Amazon.' }];
  } catch (err) {
    console.error('❌ Error fetching from Amazon:', err);

    return [{
      error: 'Unable to fetch products from Amazon. Possible reasons:',
      details: [
        'Blocked by Amazon (robot detection)',
        'Network or server issue',
        `Actual error: ${err.message || 'Unknown error'}`
      ],
      source: 'Amazon'
    }];
  }
}
//*Routes for Amazon and Flipkart
 router.get('/amazon', authenticateToken, authorizeRoles("admin","user"), async (req, res) => {
  const item = req.query.item;
  if (!item) return res.status(400).json({ error: 'Missing item query' });
  try {
    const data = await getAmazonProducts(item);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Amazon scraping failed.' });
  }
});
router.get('/flipkart', authenticateToken, authorizeRoles("admin","user"), async (req, res) => {
  const item = req.query.item;
  if (!item) return res.status(400).json({ error: 'Missing item query' });
  try {
    const data = await scrapeFlipkart(item);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Flipkart scraping failed.' });
  }
});
router.get('/scrape',authenticateToken, authorizeRoles("admin","user"), async (req, res) => {
  const item = req.query.item;
  if (!item) return res.status(400).json({ error: 'Missing item query' });
  try {
    const [amazonData, flipkartData] = await Promise.all([
      getAmazonProducts(item),
      scrapeFlipkart(item)
    ]);
    const combinedResults = [...amazonData, ...flipkartData];
    res.json(combinedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed.', details: err.message || String(err) });
  }
});

module.exports=router;
