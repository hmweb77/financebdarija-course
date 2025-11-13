//create-payment-link.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const { priceId, metadata } = req.body;

      // Create a Payment Link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
       metadata: metadata || {},
        shipping_address_collection: { allowed_countries: ['US', 'CA', 'MA'] }, // Add your supported countries
        billing_address_collection: 'required',
      });


      res.status(200).json({ paymentLink: paymentLink.url });
    } catch (error) {
      console.error("Error creating payment link:", error);
      res.status(500).json({ error: "Failed to create payment link" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
