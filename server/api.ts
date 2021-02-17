import { JsonRpc } from './rpc-client';
import { ApiRoutes } from './api-routes';
import { SiteRoutes } from './site-routes';
import fetch from 'node-fetch';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const rpcClient = new JsonRpc(process.env.rpchost, process.env.rpcuser, process.env.rpcpass);

const apiRoutes = new ApiRoutes(rpcClient);
const siteRoutes = new SiteRoutes();

app.use('/', siteRoutes.router);
app.use('/', apiRoutes.router);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

const getCurrentExchangeRate = async (fiat: string = 'usd') => {
  const request = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=neblio&vs_currencies=${fiat}`);
  const response = await request.json();

  const price  = response.neblio[fiat];

  globalThis.price = parseFloat(price);
}

getCurrentExchangeRate(process.env.base_currency);

// Update exchange rate price every 3 minutes
setInterval(() => getCurrentExchangeRate(process.env.base_currency), 3 * 60 * 1000);