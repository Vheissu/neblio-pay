import express from 'express';
import crypto from 'crypto';
import fs from 'fs';
import QRCode from 'qrcode';

export class SiteRoutes {
    public router = express.Router();

    constructor() {
        this.router.get('/', (request: express.Request, response: express.Response) => {
            return response.status(200).send(`Let's make some money.`)
        });

        this.router.get('/price', (request: express.Request, response: express.Response) => {
            return response.status(200).send(`${globalThis.price}`);
        });

        this.router.get(`/generate-qr/:text`, this.generateQrCode);
    }

    public generateQrCode = async (request: express.Request, response: express.Response) => {
        const text = request.params.text;

        const filename = 'qr/' + crypto.createHash('sha1').update(decodeURIComponent(text)).digest('hex') + '.png';
    }
}