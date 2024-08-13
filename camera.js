const net = require('net');

// Define a variável "saco"
let saco = false; // Inicialmente false

// Cria o cliente TCP
const client = new net.Socket();

// Conecta ao dispositivo na porta 9004 no IP especificado
client.connect(9004, '0.0.0.0', () => { // setar IP
    console.log('Conectado ao dispositivo');
});

// Função para enviar o comando "LON[CR]" se "saco" for true
function enviarLONSeSacoTrue() {
    // Testar conexão com servidor antes
    if (saco) {
        client.write('LON\r');
        console.log('Comando "LON[CR]" enviado porque saco é true');
    } else {
        console.log('Variável "saco" é false, comando "LON[CR]" não enviado');
    }
}

// Manipula os dados recebidos apenas se "saco" for true
client.on('data', (data) => {
    if (saco) {
        console.log('Dados recebidos: ' + data.toString());
        client.write('LOFF\r');
        saco = false;
    } else {
        console.log('Dados recebidos, mas "saco" é false. Dados ignorados.');
    }
});

// Simulação de mudança na variável "saco"
setTimeout(() => {
    saco = true;  // Alterar o valor de "saco"
    enviarLONSeSacoTrue();  // Verificar e enviar o comando
}, 15000);  // Aguarda 15 segundos antes de mudar "saco" para true e tentar enviar

// Lida com o fechamento da conexão
client.on('close', () => {
    console.log('Conexão fechada');
});

// Lida com erros
client.on('error', (err) => {
    console.error('Erro: ' + err.message);
});
