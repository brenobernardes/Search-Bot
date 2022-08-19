const axios = require('axios');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let botId = getParam('id');
let chatId = getParam('chat');
let botToken = getParam('token');

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
        let precoSemDesconto = res.data.PrecoProdutos[0].PrecoVenda.PrecoSemDesconto
        let parcelamento = res.data.PrecoProdutos[0].PrecoVenda.Parcelamento
        console.log(res.data.PrecoProdutos[0].PrecoVenda.PrecoSemDesconto)
        console.log(res.data.PrecoProdutos[0].PrecoVenda.Parcelamento)

        sendTelegramMessage(precoSemDesconto, parcelamento);
    })
    .catch(console.error)
}

function sendTelegramMessage (precoSemDesconto, parcelamento) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.telegram.org/bot${botId}:${botToken}/sendMessage?chat_id=${chatId}&text=${precoSemDesconto}%20${parcelamento}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send();
}

setInterval (() => {
    getData();
}, 5000);