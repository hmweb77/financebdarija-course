//product.js
import { fetchPrintfulProductsWithPrices } from '@/lib/printful.js';

export default async function handler(req, res) {
  try {
    const products = await fetchPrintfulProductsWithPrices();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products with prices' });
  }
}
