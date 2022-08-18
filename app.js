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

let myRequest = new Request(`https://npreco.api-casasbahia.com.br/Produtos/PrecoVenda/?idsproduto=${products}&composicao=DescontoFormaPagamento`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
});

function fetchData () {
    fetch(myRequest).then(function(res) {
        return res.json()
    }).then(function(data) {
        let { PrecoSemDesconto, Parcelamento } = data.PrecoProdutos[0].PrecoVenda;
        sendTelegramMessage(PrecoSemDesconto, Parcelamento);
    })
}

function sendTelegramMessage (precoSemDesconto, parcelamento) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.telegram.org/bot${botId}:${botToken}/sendMessage?chat_id=${chatId}&text=${precoSemDesconto}%20${parcelamento}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send();
}

function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

setInterval (() => {
    fetchData();
}, 5000);
