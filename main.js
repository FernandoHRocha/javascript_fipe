/*
PARA INFORMAÇÕES A RESPEITO DA API ACESSAR O ENDEREÇO ABAIXO
https://deividfortuna.github.io/fipe/
*/
var codigomarca
var opcaomarca = document.getElementById('opcaomarca')

//INTERAÇÕES COM A BUSCA DA MARCA
var menumarca = document.getElementById('suspensomarca')
menumarca.addEventListener('focusin', () => {
    getLista('https://parallelum.com.br/fipe/api/v1/carros/marcas', menumarca, 'codigo', 'nome', null)
})
menumarca.addEventListener('change', () => { marcaEscolhida(menumarca.value) })

//INTERAÇÕES COM A BUSCA DO MODELO
var divmodelo = document.getElementById('divmodelo')
divmodelo.style.display = 'none'
var menumodelo = document.getElementById('suspensomodelo')
menumodelo.addEventListener('focusin', () => {
    getLista('https://parallelum.com.br/fipe/api/v1/carros/marcas/' + codigomarca + '/modelos', menumodelo, 'codigo', 'nome', 'modelos')
})
/*
RETORNA OS DADOS DA REQUISIÇÃO
*/
function getData(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
/*
CHAMA A REQUISIÇÃO
ENDPOINT É O ENDEREÇO DA API
MENUSUSPENSO É O MENU A SER POPULADO
CHAVE É O CODIGO A SER REPASSADO A CADA OPÇÃO
VALOR É O NOME DADO AO CÓDIGO, APRESENTAÇÃO PARA O USUARIO
*/
function getLista(endpoint, menususpenso, chave, valor, tipo) {
    data = getData(endpoint)
    let itens = JSON.parse(data)
    //COMPARA SE EXISTEM NOVOS VALORES A SEREM ADICIONADOS
    //EM CASO VERDADEIRO LIMPA A LISTA E ADICIONA OS NOVOS
    if (menususpenso.childElementCount - 1 !== itens.length) {
        for (n = menususpenso.childElementCount; n >= 1; n--) {
            menususpenso.remove(n)
        }
        if(tipo !== null){
            for (item in itens[tipo]) {
                var opcao = document.createElement('option')
                opcao.text = itens[tipo][item][valor]
                opcao.value = itens[tipo][item][chave]
                menususpenso.add(opcao)
            }
        }else{
            for (item in itens) {
                var opcao = document.createElement('option')
                opcao.text = itens[item][valor]
                opcao.value = itens[item][chave]
                menususpenso.add(opcao)
            }
        }
    }
}

function marcaEscolhida(codigo) {
    codigomarca = codigo
    if (divmodelo.style.display === 'none') {
        divmodelo.style.display = 'block'
    }
}
;