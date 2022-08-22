require('dotenv').config();
const axios = require('axios');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
    axios.get(url)
    .then((res) => {

        for (i = 0; i < res.data.PrecoProdutos.length; i++) {

            let precoSemDesconto = res.data.PrecoProdutos[i].PrecoVenda.PrecoSemDesconto
            let parcelamento = res.data.PrecoProdutos[i].PrecoVenda.Parcelamento
            let estoque = res.data.PrecoProdutos[i].PrecoVenda.DisponibilidadeEstoque
            let disponibilidade =  estoque.toString()

            console.log(disponibilidade)
    
            sendTelegramMessage(precoSemDesconto, parcelamento, disponibilidade); 
        }
        
    })
    .catch(console.error)
}

function sendTelegramMessage (precoSemDesconto, parcelamento, disponibilidade) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.telegram.org/bot${botId}:${botToken}/sendMessage?chat_id=${chatId}&text=Loja%20Casas%20Bahia%0APreco%20${precoSemDesconto}%0AParcelamento%20${parcelamento}%0ADisponibilidade%20${disponibilidade}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send();
}

setInterval (() => {
    getData();
}, 6000);