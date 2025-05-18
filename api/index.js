import AsaasManager from './managers/asaas-manager.js'
import express from 'express';

const app = express();
const PORT = 3003;

app.use(express.json());

app.post('/authorize', (req, res) => {
    res.status(200).json({ status: 'APPROVED' });
});

app.post('/sendPix', async (req, res) => {
    try {
        const { value, pixAddressKey } = req.body;

        const asaasManager = new AsaasManager();

        const { success, errorMessage, statusCode } = await asaasManager.sendPix(value, pixAddressKey, req.get('access_token'))

        const payload = { success };

        if (errorMessage) {
            payload.errorMessage = errorMessage;
        }

        return res.status(statusCode).json(payload);
    } catch (error) {
        return res.status(500).json({ success: false, errorMessage: "Ocorreu um erro desconhecido. Se fodeu" });
    }
});

app.get('/authentication', async (req, res) => {
    const asaasManager = new AsaasManager();

    const { success, errorMessage, statusCode, balance } = await asaasManager.getBalance(req.get('access_token'))

    const payload = { success };

    if (!success && errorMessage) {
        payload.errorMessage = errorMessage;
    }

    if (balance) {
        payload.balance = balance
    }

    return res.status(statusCode).json(payload);
});

app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});