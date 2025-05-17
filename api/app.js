const axios = require("axios");

//#region DEBUG
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    const value = await ask("Digite o valor (em reais): ")
        .then(v => parseFloat(v.replace(",", ".")));
    const pixAddressKey = await ask("Digite a chave Pix: ")
        .then(k => k.trim());
    const access_token = await ask("Digite a chave de API da conta Asaas: ")
        .then((k) => k.trim());

    try {
        const { success, errorMessage, statusCode } = await sendPix(value, pixAddressKey, access_token);
        if (success) {
            console.log("✅ Transferência criada com sucesso!");
        } else {
            console.log("⚠️  Falhou (${statusCode}): ${errorMessage}");
        }
    } catch (err) {
        console.error("❌ Erro inesperado:", err);
    }

    rl.close();
})();

function ask(pergunta) {
    return new Promise((res) => rl.question(pergunta, res));
}
//#endregion

const cpfValidatorRegex = /^[0-9]{11}$/;
const cnpjValidatorRegex = /^[0-9]{14}$/;
const phoneValidatorRegex = /^\+[1-9]\d{1,14}$/;
const emailValidatorRegex = /^[a-z0-9.!#$&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

async function sendPix(value, pixAddressKey, access_token) {
    try {
        value = parseFloat(value)

        if (isNaN(value) || value <= 0) {
            return {
                success: false,
                errorMessage: "O valor da transferência precisa ser maior do que zero. Se fodeu.",
                statusCode: 400,
            };
        }

        const pixAddressKeyType = buildAddressKeyType(pixAddressKey);

        if (!pixAddressKeyType) {
            return {
                success: false,
                errorMessage: "A chave pix é inválida. Se fodeu.",
                statusCode: 400,
            };
        }

        const response = await axios({
            method: "POST",
            url: "https://api.asaas.com/v3/transfers",
            headers: {
                "Content-Type": "application/json",
                "access_token": access_token
            },
            validateStatus: (status) => status >= 200 && status < 500,
            data: {
                value: value,
                pixAddressKey: pixAddressKey,
                pixAddressKeyType: pixAddressKeyType
            }
        });

        const { status, data } = response;
        const success = data?.success ?? (status >= 200 && status < 300);

        const errorMessage = success
            ? null
            : data?.errors[0].description || "Erro desconhecido. Se fodeu.";

        return { success, errorMessage, statusCode: status };
    } catch (error) {
        return { success: false, errorMessage: error.message, statusCode: 500 };
    }
}

function buildAddressKeyType(pixAddressKey) {
    if (!pixAddressKey) return null;

    if (cpfValidatorRegex.test(pixAddressKey)) return "CPF";
    if (cnpjValidatorRegex.test(pixAddressKey)) return "CNPJ";
    if (phoneValidatorRegex.test(pixAddressKey)) return "PHONE";
    if (emailValidatorRegex.test(pixAddressKey)) return "EMAIL";

    return null;
}