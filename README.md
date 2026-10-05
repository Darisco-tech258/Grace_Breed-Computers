# TechStore E-Commerce Website

A responsive professional computer/laptop e-commerce frontend.

## Included
- Product catalogue
- Search and filters for brand, processor/core series, RAM and storage
- Custom computer configurator
- Dynamic estimated pricing
- Shopping cart using localStorage
- Customer checkout form
- Delivery address, city and state
- Payment-method selection
- Order reference generation
- Responsive mobile/tablet/desktop design

## Run
Open `index.html` in a modern browser.

## Production payment
The checkout currently uses a demo payment step. For a live Nigerian store, connect Paystack (or another payment provider) from a secure backend. Never expose secret API keys in `app.js`.

A production backend should also handle:
- authenticated admin dashboard
- product/inventory database
- order database
- payment verification through webhooks
- email/SMS/WhatsApp notifications
- delivery/shipping calculations
- refunds and order status
- customer accounts/password reset
- server-side price validation
- HTTPS and security controls

Replace the sample business email/phone and product catalogue with your real business details.
