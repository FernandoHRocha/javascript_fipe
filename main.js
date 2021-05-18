/*
PARA INFORMAÇÕES A RESPEITO DA API ACESSAR O ENDEREÇO ABAIXO
https://deividfortuna.github.io/fipe/
*/

var codigomarca = null
var codigomodelo = null
var codigoano = null

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
menumodelo.addEventListener('change', () => { modeloEscolhido(menumodelo.value) })

//INTERAÇÕES COM A BUSCA DO ANO
var divano = document.getElementById('divano')
divano.style.display = 'none'
var menuano = document.getElementById('suspensoano')
menuano.addEventListener('focusin', () => {
    getLista('https://parallelum.com.br/fipe/api/v1/carros/marcas/' + codigomarca + '/modelos/'+ codigomodelo +"/anos", menuano, 'codigo', 'nome', null)
})
menuano.addEventListener('change', () => { anoEscolhido(menuano.value) })

//ENCONTRA As SEÇÕES QUE INICIAM ESCONDIDAS
var conteudo_resultado = document.getElementById('conteudo_resultado')
conteudo_resultado.style.display = 'none'
var conteudo_busca = document.getElementById('conteudo_busca')
conteudo_busca.style.display = 'none'
var conteudo_sobre = document.getElementById('conteudo_sobre')
conteudo_sobre.style.display = 'block'

//ENCONTRA OS TÍTULOS DE MODELO E PREÇO
var h1_modelo = document.getElementById('h1_modelo')
var h3_valor = document.getElementById('h3_valor')

//INTERAÇÕES COM A PÁGINA
function trocarConteudo(idmostra, idesconde){
    document.getElementById(idesconde).style.display = 'none'
    document.getElementById(idmostra).style.display = 'block'
    conteudo_resultado.style.display = 'none'
    limpaMenu(menumarca)
    limpaMenu(menumodelo)
    limpaMenu(menuano)
    divmodelo.style.display = 'none'
    divano.style.display = 'none'
}
//LIMPAR MENU SUSPENSO
function limpaMenu(menu) {
    menu.selectedIndex = 0
}
//RETORNA OS DADOS DA REQUISIÇÃO HTTP
function getData(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
//CHAMA A REQUISIÇÃO
function getLista(endpoint, menususpenso, chave, valor, tipo) {
    data = getData(endpoint)
    let itens = JSON.parse(data)
    //COMPARA SE EXISTEM NOVOS VALORES A SEREM ADICIONADOS,SENDO VERDADE LIMPA A LISTA E ADICIONA OS NOVOS
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
    if(codigomarca !== codigo && menumodelo.childElementCount > 1){
        for (n = menumodelo.childElementCount; n >= 1; n--) {
            menumodelo.remove(n)
        }
        limpaMenu(menumodelo)
        divano.style.display = 'none'
    }
    codigomarca = codigo
    if (divmodelo.style.display === 'none') {
        divmodelo.style.display = 'block'
    }
}

function modeloEscolhido(codigo) {
    if(codigomodelo !== codigo && menuano.childElementCount > 1){
        for (n = menuano.childElementCount; n >= 1; n--) {
            menuano.remove(n)
        }
        limpaMenu(menuano)
    }
    codigomodelo = codigo
    if (divano.style.display === 'none') {
        divano.style.display = 'block'
    }
}

function anoEscolhido(codigo) {
    if(codigoano !== codigo){
        mostrarReferencia(codigo)
    }
}

function mostrarReferencia(codigo) {
    let result = JSON.parse(getData('https://parallelum.com.br/fipe/api/v1/carros/marcas/' + codigomarca + '/modelos/'+ codigomodelo +"/anos/"+ codigo))
    h1_modelo.textContent = result["Marca"] + " - " + result["Modelo"]
    h3_valor.textContent = result["Valor"]
    conteudo_busca.style.display = 'none'
    conteudo_resultado.style.display = 'block'
}
;