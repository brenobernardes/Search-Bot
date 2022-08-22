require('dotenv').config();

const axios = require('axios');

let botId = process.env.BOT_ID
let botToken = process.env.BOT_TOKEN
let chatId = process.env.CHAT_ID

let products = [
    12814057, // Pneu
    13588058, // Produto 2
    13588575,
    26414488,
    37338104,
    26415380,
    39185373,
    22034246,
    24715505,
    24715605,
    32387811,
    32387409,
    46838756
].join(',');

const url = `https://npreco.api-casasbahia.com.br/Produtos/PrecoVenda/?idsproduto=${products}&composicao=DescontoFormaPagamento`

const getData = () => {
    axios.get(url).then((res) => {
        for (i = 0; i < res.data.PrecoProdutos.length; i++) {
            let { PrecoSemDesconto, Parcelamento, DisponibilidadeEstoque } = res.data.PrecoProdutos[i].PrecoVenda;
            let disponibilidade =  DisponibilidadeEstoque.toString()

            sendTelegramMessage(PrecoSemDesconto, Parcelamento, disponibilidade); 
        }
    }).catch(console.error)
}

function sendTelegramMessage (precoSemDesconto, parcelamento, disponibilidade) {
    axios.post(`https://api.telegram.org/bot${botId}:${botToken}/sendMessage`, {
        chat_id: chatId,
        text: (`Loja Casas Bahia
                Preco ${precoSemDesconto}
                Parcelamento ${parcelamento}
                Disponibilidade ${disponibilidade}`).replace(/(\n)\s+/g, '$1')
    });
}

setInterval (() => {
    getData();
}, 6000);