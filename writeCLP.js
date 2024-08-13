const ModbusTCP = require('modbus-tcp');
const client = new ModbusTCP.Client();

const options = {
    host: '0.0.0.0',  // Substitua pelo IP do seu CLP
    port: 502               // Porta padrão do Modbus-TCP
};

// Conectando ao CLP via Modbus-TCP
client.connect(options.port, options.host, () => {
    console.log('Conectado ao CLP via Modbus-TCP');

    // Exemplo: Escrever TRUE em um Coil no endereço 5
    client.writeSingleCoil(5, true, (err, response) => {
        if (err) {
            console.error('Erro ao escrever no Coil:', err);
        } else {
            console.log('Coil escrito com sucesso:', response);
        }

        // Fechando a conexão
        client.close();
    });
});

// Tratando erros de conexão
client.on('error', (err) => {
    console.error('Erro na conexão:', err);
});
