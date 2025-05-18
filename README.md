# PIX DO GTA

# Sumário
1. [API](#api)
2. [App mobile](#app)
3. [Mod](#mod)
4. [Contato](#contato)

## APP

## API

Essa API foi criada com **Node.js** para envio de pagamentos via **Pix** integrando com a API da plataforma **Asaas**. A documentação da API do Asaas pode ser encontrada [aqui](https://docs.asaas.com/docs).

### 🚀 Endpoints

#### `GET /authentication`

Endpoint que valida se a chave da API do Asaas é valida.

##### Headers
- `access_token` (string, obrigatório)

##### Requisição
```http
GET /authentication
```

##### Respostas

**Sucesso (200):**
```json
{
  "success": true,
  "balance": 1250.75
}
```

**Erro (400/500):**
```json
{
  "success": false,
  "errorMessage": "Mensagem de erro descritiva"
}
```

---

#### `POST /sendPix`

Envia um pagamento via Pix para uma chave específica utilizando a API do Asaas.

##### Headers
- `access_token` (string, obrigatório): Token de acesso da API do Asaas.

##### Body
```json
{
  "value": 100.50,
  "pixAddressKey": "chave@pix.com.br"
}
```

##### Respostas

**Sucesso (200):**
```json
{
  "success": true
}
```

**Erro (400/500):**
```json
{
  "success": false,
  "errorMessage": "Mensagem de erro descritiva"
}
```

---

#### `POST /authorize`

Endpoint que vai ser chamado pelo weebhook do Asaas e vai autorizar a transação PIX.

##### Requisição
```http
POST /authorize
```

##### Resposta
```json
{
  "status": "APPROVED"
}
```

---

### 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Asaas API](https://docs.asaas.com/)

---

### 📦 Como Rodar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
node index.js
```

A API estará rodando em: `http://localhost:3003`

4. Configurações da API do Asaas

    4.1. Crie uma conta Asaas para realizar o envio de Pix, o que pode ser feito por [aqui](https://www.asaas.com/onboarding/createAccount?customerSignUpOriginChannel=DOCUMENTATION). 
 
    4.2. Gere a chave da API. Acesse a [documentação](https://docs.asaas.com/docs/autentica%C3%A7%C3%A3o-1) para mais informações.

    4.3. Configure o webhook para autorização de transferências. Acesse a [documentação](https://docs.asaas.com/docs/mecanismo-para-validacao-de-saque-via-webhooks) para mais informações.

---

### ⚠️ Observações

- O token de acesso do Asaas **deve ser passado no header** `access_token`.
- A integração depende da classe `AsaasManager`, que deve conter a lógica para chamada da API do Asaas.

---

## MOD

## 📫 Contato

Em caso de dúvidas ou sugestões, abra uma [issue](https://github.com/omateusteles/gta-pix/issues) ou envie um PR!