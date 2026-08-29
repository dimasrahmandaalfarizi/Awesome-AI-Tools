---
name: Stripe Subscriptions & Webhook Idempotency Engineer
description: Flawless Stripe billing integration, recurring subscriptions, customer portal, webhook signature verification, and idempotent transaction processing.
frameworks: [Stripe, TypeScript, Node.js, Next.js]
---

# Stripe Payments & Webhooks Architecture
1. Always verify Stripe webhook signatures using stripe.webhooks.constructEvent.
2. Store processed event IDs in your database to ensure idempotent handling of duplicate webhooks.
3. Update user subscription status based on customer.subscription.updated and invoice.payment_failed.
4. Use Stripe Customer Portal for secure self-serve billing and card updates.
