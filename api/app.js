const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  const valor = await ask('Digite o valor (em reais): ')
        .then(v => parseFloat(v.replace(',', '.')));
  const chavePix = await ask('Digite a chave Pix: ')
        .then(k => k.trim());
    const access_token = await ask("Digite a chave de API da conta Asaas: ")
        .then((k) => k.trim());

  try {
    const { success, errorMessage, statusCode } = await sendPix(valor, chavePix, access_token);
    if (success) {
      console.log('✅ Transferência criada com sucesso!');
    } else {
      console.log(`⚠️  Falhou (${statusCode}): ${errorMessage}`);
    }
  } catch (err) {
    console.error('❌ Erro inesperado:', err);
  }

  rl.close();
})();

function ask(pergunta) {
  return new Promise(res => rl.question(pergunta, res));
}

/**
 * Cria a transferência Pix no Asaas
 * @param {number} value
 * @param {string} pixAddressKey
 * @returns {{success:boolean, errorMessage?:string, statusCode:number}}
 */
async function sendPix(value, pixAddressKey, access_token) {

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.asaas.com/v3/transfers',
      headers: {
        'Content-Type': 'application/json',
        'access_token': access_token
      },
      validateStatus: status => status >= 200 && status < 500,
      data: {
        value,
        pixAddressKey
      }
    });

    const { status, data } = response;
    const success = data?.success ?? (status >= 200 && status < 300);
    const errorMessage = success ? undefined : data?.errorMessage || 'Erro desconhecido';

    return { success, errorMessage, statusCode: status };

  } catch (error) {
    return { success: false, errorMessage: error.message, statusCode: 500 };
  }
}
