import pkg from 'pg';
import fs from 'fs';
const { Client } = pkg;

const client = new Client({
    host: 'app-escola.cavcuu64g3e3.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'Fiap1234',
    database: 'app-escola',
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDatabase() {
    try {
        console.log('Conectando ao banco...');
        await client.connect();
        
        console.log('Lendo arquivo SQL...');
        const sql = fs.readFileSync('init.sql', 'utf8');
        
        console.log('Executando SQL...');
        await client.query(sql);
        
        console.log('Banco inicializado com sucesso!');
    } catch (err) {
        console.error('Erro:', err);
    } finally {
        await client.end();
    }
}

initDatabase();