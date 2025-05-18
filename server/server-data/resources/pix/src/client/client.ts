import './car';
import './position';
import './bank';

import { formatValue, cleanString, validatePixAddressKey, formatPixAddressKey } from '../shared/utils';
import { addChatMessage } from './utils';
import { isInBankArea } from './bank';


let apiKey: string | null = null;

RegisterCommand('login', (source: number, args: string[]) => {
    if (!isInBankArea) {
        addChatMessage("[PIX] Para realizar transações Pix vá até o banco mais próximo.");
        return;
    }

    if (args.length === 0) {
        addChatMessage("[PIX] Por favor, forneça uma API key. Uso: /login [apiKey]");

        return;
    }

    const apiKey = args[0];
    emitNet('pix:auth', apiKey)
}, false);

RegisterCommand('pix', (source: number, args: string[]) => {
    if (!isInBankArea) {
        addChatMessage("[PIX] Para realizar transações Pix vá até o banco mais próximo.");
        return;
    }

    if (args.length === 0) {
        addChatMessage("[PIX] Por favor, forneça um valor. Uso: /pix [chave-pix] [valor]");
        return;
    }

    const value = parseFloat(args[1]);

    if (isNaN(value)) {
        addChatMessage("[PIX] Por favor, forneça um valor válido. Uso: /pix [chave-pix] [valor]");
        return;
    }

    console.log(apiKey)
    if (!apiKey) {
        addChatMessage("[PIX] Realize login primeiro com /login [apiKey]");
        return;
    }

    const pixAddressKey = cleanString(args[0]);

    if (!validatePixAddressKey(pixAddressKey)) {
        addChatMessage("[PIX] Chave PIX inválida. Uso: /pix [chave-pix] [valor]");
        return;
    }

    addChatMessage("[PIX] Iniciando transferência no valor de " + formatValue(value) + " para " + formatPixAddressKey(pixAddressKey) + ".");
    emitNet('pix:transfer', source, apiKey, pixAddressKey, value);
}, false);

onNet('pix:authResponse:success', (accessToken: string, balance: number) => {
    apiKey = accessToken;

    console.log(apiKey)

    addChatMessage("[PIX] Login realizado com sucesso! Seu saldo atual é de " + formatValue(balance) + ".");
});

onNet('pix:authResponse:error', (message: string) => {
    addChatMessage("[PIX] Erro ao autenticar: " + message);
});

onNet('pix:transferResponse:success', (message: string) => {
    addChatMessage("[PIX] Transferência PIX realizada com sucesso!");
});

onNet('pix:transferResponse:error', (message: string) => {
    addChatMessage("[PIX] Erro ao realizar transferência PIX: " + message);
});

