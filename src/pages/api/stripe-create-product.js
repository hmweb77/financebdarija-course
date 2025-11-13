//stripe-create-product.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { product } = req.body;

      if (!product.name || !product.thumbnail_url || !product.variants || !product.variants[0].retail_price) {
        throw new Error('Invalid product data');
      }

      const stripeProduct = await stripe.products.create({
        name: product.name,
        images: [product.thumbnail_url],
      });

      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.variants[0].retail_price * 100),
        currency: "usd",
      });

      res.status(200).json({ stripePriceId: stripePrice.id });
    } catch (error) {
      console.error("Error creating Stripe product/price:", error);
      res.status(500).json({ error: "Failed to create Stripe product or price" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
