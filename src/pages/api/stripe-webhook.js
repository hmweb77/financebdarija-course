import { buffer } from 'micro';
import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const PRINTFUL_API_URL = 'https://api.printful.com/orders';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function createPrintfulOrder(session, variantId) {
  try {
    const response = await axios.post(
      PRINTFUL_API_URL,
      {
        external_id: session.id, // Use Stripe session ID as external reference
        recipient: {
          name: session.customer_details.name,
          email: session.customer_details.email,
          address1: session.customer_details.address.line1,
          address2: session.customer_details.address.line2 || '',
          city: session.customer_details.address.city,
          state_code: session.customer_details.address.state,
          country_code: session.customer_details.address.country,
          zip: session.customer_details.address.postal_code,
          phone: session.customer_details.phone || '',
        },
        items: [
          {
            external_variant_id: variantId,
            quantity: parseInt(session.metadata.quantity) || 1,
            retail_price: session.amount_total / 100, // Convert from cents to dollars
          },
        ],
        retail_costs: {
          currency: session.currency.toUpperCase(),
          subtotal: session.amount_subtotal / 100,
          discount: (session.total_details?.amount_discount || 0) / 100,
          shipping: (session.total_details?.amount_shipping || 0) / 100,
          tax: (session.total_details?.amount_tax || 0) / 100,
          total: session.amount_total / 100,
        },
        gift: session.metadata.is_gift === 'true' ? {
          subject: session.metadata.gift_subject || '',
          message: session.metadata.gift_message || '',
        } : undefined,
        shipping: session.shipping_cost ? {
          preference: session.metadata.shipping_preference || 'STANDARD',
        } : undefined,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Printful order creation failed:', error.response?.data || error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Ensure we have the required variant ID in metadata
      if (!session.metadata.variant_id) {
        throw new Error('Missing variant_id in session metadata');
      }

      // Create the order in Printful
      const printfulOrder = await createPrintfulOrder(
        session,
        session.metadata.variant_id
      );

      // Store the Printful order ID for future reference
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...session.metadata,
          printful_order_id: printfulOrder.id,
        },
      });

      return res.status(200).json({
        received: true,
        printful_order_id: printfulOrder.id,
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({
      error: `Webhook Error: ${error.message}`,
    });
  }
}