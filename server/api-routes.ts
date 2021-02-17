import { JsonRpc } from './rpc-client';
import express from 'express';

export class ApiRoutes {
    public path = '/api';
    public router = express.Router();
    public rpcClient: JsonRpc;

    constructor(rpcClient: JsonRpc) {
        this.rpcClient = rpcClient;

        this.router.get(`${this.path}/getlatestblock`, this.getLatestBlock);
        this.router.get(`${this.path}/getblockbynumber/:blocknumber`, this.getBlockByNumber);
        this.router.get(`${this.path}/getblockhash/:blocknumber`, this.getBlockHash);
        this.router.get(`${this.path}/getblock/:hash`, this.getBlock);
        this.router.get(`${this.path}/getrawtransaction/:txid`, this.getRawTransaction);
        this.router.get(`${this.path}/getrawmempool`, this.getRawMemPool);
        this.router.get(`${this.path}/getbalance`, this.getBalance);
        this.router.get(`${this.path}/getntp1balance/:identifier`, this.getNtp1Balance);
        //this.router.get(`${this.path}/getnewaddress/:label`, this.getNewAddress);

        this.router.get(`${this.path}/request/:amount/:memo/:seller/:buyer`, this.requestPayment);
    }

    public requestPayment = async (request: express.Request, response: express.Response) => {
        // Each Neblio is equal to 100 million nibbles
        // One Nibble represents 0.00000001 NEBL (equal to Neblios eight decimal)
        const nibbles = Math.floor((request.params.amount as any / globalThis.price) * 100000000);

        // The amount of Neblio required to complete the transaction in fiat price
        const nebl = nibbles / 100000000;
    }

    public getLatestBlock = async (request: express.Request, response: express.Response) => {
        const rpcResponse = await this.rpcClient.request('getblockcount');

        return response.json(rpcResponse.result);
    }

    public getBlockByNumber = async (request: express.Request, response: express.Response) => {
        const blockNumber = request.params.blocknumber;

        const rpcResponse = await this.rpcClient.request('getblockbynumber', [parseInt(blockNumber), true]);

        return response.json(rpcResponse.result);
    }

    public getBlockHash = async (request: express.Request, response: express.Response) => {
        const blockNumber = request.params.blocknumber;

        const rpcResponse = await this.rpcClient.request('getblockhash', [parseInt(blockNumber)]);

        return response.json(rpcResponse.result);
    }

    public getBlock = async (request: express.Request, response: express.Response) => {
        const blockHash = request.params.hash;

        const rpcResponse = await this.rpcClient.request('getblock', [blockHash, true, true]);

        return response.json(rpcResponse.result);
    }

    public getRawTransaction = async (request: express.Request, response: express.Response) => {
        const txid = request.params.txid;

        const rpcResponse = await this.rpcClient.request('getrawtransaction', [txid, true]);

        return response.json(rpcResponse.result);
    }

    public getRawMemPool = async (request: express.Request, response: express.Response) => {
        const rpcResponse = await this.rpcClient.request('getrawmempool');

        return response.json(rpcResponse.result);
    }

    // public getNewAddress = async (request: express.Request, response: express.Response) => {
    //     const label = request.params.label;

    //     const rpcResponse = await this.rpcClient.request('getnewaddress', [label]);

    //     return response.json(rpcResponse.result);
    // }

    public getBalance = async (request: express.Request, response: express.Response) => {
        const rpcResponse = await this.rpcClient.request('getbalance');

        return response.json(rpcResponse.result);
    }

    public getNtp1Balance = async (request: express.Request, response: express.Response) => {
        // tokenId or name
        const identifier = request.params.identifier;

        const rpcResponse = await this.rpcClient.request('getntp1balance', [identifier]);

        return response.json(rpcResponse.result);
    }
}