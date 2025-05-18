onNet('pix:transfer', (apiKey: string, chavePix: string, valor: number) => {
    const playerId = source
    try {
        const success = true;
        emitNet('pix:transferResponse', playerId, [success, null]);
    } catch (error) {
        const success = false;
        const message = 'Erro ao realizar transferência: ' + error;
        emitNet('pix:transferResponse', playerId, [success, message]);
    }
});

