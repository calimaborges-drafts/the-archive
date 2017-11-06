'use strict';

const kDbFile = 'db.file';
const fs = require('fs');
const request = require('superagent');
require('superagent-proxy')(request);
const cheerio = require('cheerio');
require('dotenv').config()
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const url = 'http://www.esaf.fazenda.gov.br/assuntos/concursos_publicos/em-andamento-1/agencia-nacional-de-aviacao-civil-anac'
const kIntervaloVerificacao = 60 * 1000;

var ultimaQuantidadeLinhasTabela = function() {
    if (!fs.existsSync(kDbFile)) {
        setUltimaQuantidadeLinhasTabela(0);
    }
    return parseInt(fs.readFileSync(kDbFile).toString());
};

var setUltimaQuantidadeLinhasTabela = function(quantidade) {
    fs.writeFileSync(kDbFile, quantidade);
};

function verificarAtualizacao() {
    var req = request.get(url)

    if (process.env.http_proxy) {
        req.proxy(process.env.http_proxy)
    }

    req.end( (err, res ) => {
        var $ = cheerio.load(res.text);
        var quantidadeLinhasTabela = $("#parent-fieldname-text table.plain tr").length

        if (quantidadeLinhasTabela > ultimaQuantidadeLinhasTabela()) {
            var text = 'Houve uma atualização na página da ANAC. ';
            text += 'Acesse: ' + url;
            text += ' Contagem antes: ' + ultimaQuantidadeLinhasTabela() + ' Contagem depois: ' + quantidadeLinhasTabela;

            var data = {
              from: process.env.MAILGUN_FROM,
              to: process.env.MAILGUN_TO,
              subject: 'Atualização ANAC',
              text: text
            };

            mailgun.messages().send(data, function(error, body) {
                if (error) console.error(error);
                if (body) console.log(body);
            });

            setUltimaQuantidadeLinhasTabela(quantidadeLinhasTabela);
        }
    });
}

setInterval(verificarAtualizacao, kIntervaloVerificacao);
