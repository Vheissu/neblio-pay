# Neblio Pay

A self-hosted Node.js-based Neblio payment processor. Provides a REST API that allows you to easily process Neblio payments securely with zero fees (other than the network fee).

- Create invoices to request payments
- Check when an invoice has been paid
- Callback based API when payment has been made or times out
- No 3rd parties (uses a Neblio wallet or daemon)
- Keeps your wallet and keys secure

The `client` directory contains an application that interacts with the server. Please see `client` folder for instructions on running the client.

The `server` directory contains the backend API which handles processing payments and watching for address.