//lib/printful.js
import axios from 'axios';

const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY; // Store your API key in an environment variable

// Fetch product details for a specific product ID
export const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`https://api.printful.com/store/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      },
    });
    return response.data.result; // Includes detailed product and variant data
  } catch (error) {
    console.error(`Error fetching details for product ${productId}:`, error);
    throw error;
  }
};

// Fetch all products with prices
export const fetchPrintfulProductsWithPrices = async () => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    const products = response.data.result;
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const details = await fetchProductDetails(product.id); // Use the fetchProductDetails function
        return {
          ...product,
          variants: details.sync_variants.map((variant) => ({
            id: variant.id,
            name: variant.name,
            retail_price: variant.retail_price, // Price in the product currency
            sku: variant.sku,
          })),
        };
      })
    );

    console.log('Products with Prices:', JSON.stringify(productsWithDetails, null, 2));

    return productsWithDetails;
  } catch (error) {
    console.error('Error fetching Printful products with prices:', error);
    throw error;
  }
};
