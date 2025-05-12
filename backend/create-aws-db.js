import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'app-escola.cavcuu64g3e3.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'Fiap1234',
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

async function createDatabase() {
    try {
        console.log('Tentando conectar...');
        await client.connect();
        console.log('Conectado ao PostgreSQL na AWS');
        
        console.log('Criando banco de dados...');
        await client.query('CREATE DATABASE "app-escola"');
        console.log('Banco de dados app-escola criado com sucesso!');
    } catch (err) {
        if (err.code === '42P04') {
            console.log('O banco de dados já existe, isso não é um problema!');
        } else {
            console.error('Erro detalhado:', err);
        }
    } finally {
        await client.end();
    }
}

createDatabase();