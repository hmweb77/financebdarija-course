"use client";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState('products'); // 'products' or 'checkout'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
    console.log("test:",response)
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const printfulProducts = await response.json();
    
        const productsWithLinks = await Promise.all(
          printfulProducts.map(async (product) => {
            try {
              const priceResponse = await fetch('/api/stripe-create-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product }),
              });
            
              if (!priceResponse.ok) {
                throw new Error('Failed to create Stripe product');
              }
              const { stripePriceId } = await priceResponse.json();
    
              return { 
                ...product, 
                stripePriceId // Store the price ID with the product
              };
            } catch (error) {
              console.error(`Error processing product ${product.name}:`, error);
              return { ...product, stripePriceId: null };
            }
          })
        );
      
        setProducts(productsWithLinks);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setCheckoutStep('checkout');
  };

  const handleCheckoutSubmit = async (shippingInfo) => {
    try {
      // First, create the Stripe product and price
      const priceResponse = await fetch('/api/stripe-create-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct }),
      });

      if (!priceResponse.ok) {
        throw new Error('Failed to create Stripe product');
      }
      const { stripePriceId } = await priceResponse.json();

      // Create payment link with shipping info in metadata
      const paymentResponse = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: selectedProduct.stripePriceId,
          metadata: {
            variant_id: selectedProduct.variants[0].id,
            shipping_name: shippingInfo.name,
            shipping_email: shippingInfo.email,
            shipping_address1: shippingInfo.address1,
            shipping_address2: shippingInfo.address2,
            shipping_city: shippingInfo.city,
            shipping_state: shippingInfo.state,
            shipping_zip: shippingInfo.zipCode,
            shipping_country: shippingInfo.country,
            shipping_phone: shippingInfo.phone,
          }
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment link');
      }
      const { paymentLink } = await paymentResponse.json();

      // Redirect to payment
      window.location.href = paymentLink;
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (checkoutStep === 'checkout') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => setCheckoutStep('products')}
          className="mb-4 text-blue-500 hover:text-blue-600"
        >
          ← Back to Products
        </button>
        <CheckoutForm 
          product={selectedProduct}
          onSubmit={handleCheckoutSubmit}
        />
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Products</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                width={100}
                height={100}
                  alt={product.name}
                  src={product.thumbnail_url}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.variants[0].retail_price} USD</p>
              <button
                onClick={() => handleBuyNow(product)}
                className="mt-2 inline-block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
