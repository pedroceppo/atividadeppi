import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const server = express();

server.listen(porta, host, () => {
    console.log(`Servidor escutando http://${host}:${porta}`);
});

server.get('/', (requisicao, resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reajuste</title>
        </head>
        <body>
            <h2>informe na url de exemplo os seguintes dados: 
            http://localhost:3000/validar?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345...</h2>
        </body>
        </html>
    `);
});

server.get('/validar', (requisicao, resposta) => {

    const idade = parseInt(requisicao.query.idade);
    const sexo = requisicao.query.sexo;
    const salario_base = parseFloat(requisicao.query.salario_base);
    const anoContratacao = parseInt(requisicao.query.anoContratacao);
    const matricula = parseInt(requisicao.query.matricula);

    if (idade <= 16 || idade > 99) {
        return resposta.send(`
            <script>alert("Idade inválida, precisa ser maior que 16 anos até 99");</script>
        `);
    }
    else if (sexo != "M" && sexo != "F" && sexo != "m" && sexo != "f") {
        return resposta.send(`
            <script>alert("Digite uma letra válida (M/F)");</script>
        `);
    }
    else if (isNaN(salario_base) || salario_base <= 0) {
        return resposta.send(`
            <script>alert("Salário inválido, precisa ser um número válido e não negativo");</script>
        `);
    }
    else if (anoContratacao < 1960) {
        return resposta.send(`
            <script>alert("Ano de contratação inválido, precisa ser maior que 1960");</script>
        `);
    }
    else if (matricula <= 0) {
        return resposta.send(`
            <script>alert("Matrícula inválida, precisa ser maior que zero");</script>
        `);
    }
    else {
        resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reajuste</title>
        </head>
        <body>
            <h2>Acesse os dados reajustados copie e cole a URL : 
            http://localhost:3000/dados?idade=${idade}&sexo=${sexo}&salario_base=${salario_base}&anoContratacao=${anoContratacao}&matricula=${matricula}</h2>   
        </body>
        </html>
        `);
    }
});

server.get('/dados', (requisicao, resposta) => {

    const idade = parseInt(requisicao.query.idade);
    const sexo = requisicao.query.sexo;
    const salario_base = parseFloat(requisicao.query.salario_base);
    const anoContratacao = parseInt(requisicao.query.anoContratacao);
    const matricula = parseInt(requisicao.query.matricula);

    let reajuste;
    let desconto;
    let acrescimo;
    let total;
    let anoempresa;

    const anoAtual = 2026;
    anoempresa = anoAtual - anoContratacao;

    if (idade >= 18 && idade <= 39 && (sexo == 'M' || sexo == 'm')) {
        reajuste = 0.1;
        desconto = 10;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 17;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    if (idade >= 18 && idade <= 39 && (sexo == 'F' || sexo == 'f')) {
        reajuste = 0.08;
        desconto = 11;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 16;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    if (idade >= 40 && idade <= 69 && (sexo == 'M' || sexo == 'm')) {
        reajuste = 0.08;
        desconto = 5;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 15;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    if (idade >= 40 && idade <= 69 && (sexo == 'F' || sexo == 'f')) {
        reajuste = 0.1;
        desconto = 7;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 14;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    if (idade >= 70 && idade <= 99 && (sexo == 'M' || sexo == 'm')) {
        reajuste = 0.15;
        desconto = 15;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 13;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    if (idade >= 70 && idade <= 99 && (sexo == 'F' || sexo == 'f')) {
        reajuste = 0.17;
        desconto = 17;
        if (anoempresa <= 10) {
            total = salario_base + (salario_base * reajuste) - desconto;
        } else {
            acrescimo = 12;
            total = salario_base + (salario_base * reajuste) + acrescimo;
        }
    }

    resposta.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reajuste</title>
    </head>
    <body>
        <h1>Dados digitados + Reajuste:</h1>
        <h2>IDADE:${idade}; SEXO:${sexo}; SALÁRIO BASE:R$${salario_base}; ANO CONTRATAÇÃO:${anoContratacao}; MATRÍCULA:${matricula}</h2>
        <h2>REAJUSTE:R$${total}</h2>
    </body>
    </html>
    `);
});
