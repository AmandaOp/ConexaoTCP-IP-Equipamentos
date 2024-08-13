const ModbusTCP = require('modbus-tcp');
const client = new ModbusTCP.Client();

const options = {
    host: '0.0.0.0',  // Substitua pelo IP do seu CLP
    port: 502               // Porta padrão do Modbus-TCP
};

// Conectando ao CLP via Modbus-TCP
client.connect(options.port, options.host, () => {
    console.log('Conectado ao CLP via Modbus-TCP');

    // Exemplo: Lendo 10 Coils a partir do endereço 0
    client.readCoils(0, 10, (err, response) => {
        if (err) {
            console.error('Erro ao ler Coils:', err);
        } else {
            console.log('Coils lidos:', response);
        }

        // Fechando a conexão
        client.close();
    });
});

// Tratando erros de conexão
client.on('error', (err) => {
    console.error('Erro na conexão:', err);
});
