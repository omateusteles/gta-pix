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

    apiKey = args[0];
    
    addChatMessage("[PIX] Login realizado com sucesso!");
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

    const pixAddressKey = cleanString(args[0]);

    if (!validatePixAddressKey(pixAddressKey)) {
        addChatMessage("[PIX] Chave PIX inválida. Uso: /pix [chave-pix] [valor]");
        return;
    }

    addChatMessage("[PIX] Iniciando transferência no valor de " + formatValue(value) + " para " + formatPixAddressKey(pixAddressKey) + ".");
    emitNet('pix:transfer', source, "12345", pixAddressKey, value);
}, false);

onNet('pix:transferResponse', (data: [boolean, string]) => {
    const [success, message] = data;

    if (success) {
        addChatMessage("[PIX] Transferência PIX realizada com sucesso!");
    } else {
        addChatMessage("[PIX] Erro ao realizar transferência PIX: " + message);
    }
});

