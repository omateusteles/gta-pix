const axios = require("axios")

class AsaasManager {

    async sendPix(value, pixAddressKey, accessToken) {
        try {
            value = parseFloat(value)

            if (isNaN(value) || value <= 0) {
                return {
                    success: false,
                    errorMessage: "O valor da transferência precisa ser maior do que zero. Se fodeu.",
                    statusCode: 400,
                };
            }

            const pixAddressKeyType = this.buildAddressKeyType(pixAddressKey);

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
                    "access_token": accessToken
                },
                data: {
                    value: value,
                    pixAddressKey: pixAddressKey,
                    pixAddressKeyType: pixAddressKeyType
                }
            });

            const { status, data } = response;
            const success = data?.success ?? (status >= 200 && status < 300);

            const errorMessage = this.buildErrorMessage(success, data)

            return { success, errorMessage, statusCode: status };
        } catch (error) {
            return { success: false, errorMessage: error.message, statusCode: 500 };
        }
    }

    async getBalance(accessToken) {
        try {
            if (!accessToken) {
                return {
                    success: false,
                    errorMessage: "A chave da API do Asaas é obrigatória. Se fodeu.",
                    statusCode: 400,
                };
            }

            const response = await axios({
                method: "GET",
                url: "https://api.asaas.com/v3/finance/balance",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": accessToken
                },
                validateStatus: (status) => status >= 200 && status < 500
            });

            const { status, data } = response;
            const success = data?.success ?? (status >= 200 && status < 300);

            const errorMessage = this.buildErrorMessage(success, data)

            return { success, errorMessage, statusCode: status, balance: data.balance };
        } catch (error) {
            return { success: false, errorMessage: error.message, statusCode: 500 };
        }
    }

    buildErrorMessage(success, data) {
        if(success) return null
        
        if(!data){
            return "Erro desconhecido. Se fodeu."
        }

        return data.errors[0].description
    }

    buildAddressKeyType(pixAddressKey) {
        const cpfValidatorRegex = /^[0-9]{11}$/;
        const cnpjValidatorRegex = /^[0-9]{14}$/;
        const phoneValidatorRegex = /^\+[1-9]\d{1,14}$/;
        const emailValidatorRegex = /^[a-z0-9.!#$&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

        if (!pixAddressKey) return null;

        if (cpfValidatorRegex.test(pixAddressKey)) return "CPF";
        if (cnpjValidatorRegex.test(pixAddressKey)) return "CNPJ";
        if (phoneValidatorRegex.test(pixAddressKey)) return "PHONE";
        if (emailValidatorRegex.test(pixAddressKey)) return "EMAIL";

        return null;
    }
}

module.exports = AsaasManager
