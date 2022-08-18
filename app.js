var myInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

let myRequest = new Request("https://npreco.api-casasbahia.com.br/Produtos/PrecoVenda/?idsproduto=12814057,13588058,13588575,26414488,37338104,26415380,39185373,22034246,24715505,24715605,32387811,32387409,46838756&composicao=DescontoFormaPagamento&utm_source=gp_branding&utm_medium=cpc&utm_campaign=gg_brd_inst_cb_exata", myInit)
let jsonData1
let jsonData2

function fetchData () {
    fetch(myRequest)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        jsonData1 = data.PrecoProdutos[0].PrecoVenda.PrecoSemDesconto,
        jsonData2 = data.PrecoProdutos[0].PrecoVenda.Parcelamento
        
        sendTelegramMessage()

        console.log(jsonData1)
        console.log(jsonData2)
        console.log(data.PrecoProdutos[0].PrecoVenda.Parcelamento)
    })
}

function sendTelegramMessage () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.telegram.org/bot<token>/sendMessage?chat_id=<group chat id>&text=${jsonData1}%20${jsonData2}`);
      
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
        
    xhr.onload = () => console.log(xhr.responseText);
        
    xhr.send();
}

setInterval (() => {
    fetchData();
}, 5000)