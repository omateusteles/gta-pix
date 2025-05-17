import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/authorize', (req, res) => {
    res.status(200).json({ status: 'APPROVED' });
});


app.post('/sendPix', (req, res) => {
});

app.post('/authentication', (req, res) => {
});

app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
