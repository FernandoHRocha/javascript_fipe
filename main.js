/*
PARA INFORMAÇÕES A RESPEITO DA API ACESSAR O ENDEREÇO ABAIXO
https://deividfortuna.github.io/fipe/
*/
var menumarca = document.getElementById('suspensomarca')
var primeiro = true
menumarca.addEventListener('focusin',()=>{
    getLista('https://parallelum.com.br/fipe/api/v1/carros/marcas', menumarca, 'codigo', 'nome')})


/*
RESPONSAVEL POR PEGAR OS DADOS DE UMA REQUISIÇÃO
*/
function getData(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
/*
ENDPOINT É O ENDEREÇO DA API
MENUSUSPENSO É O OBJETO A SER POPULADO
CHAVE É O CODIGO A SER REPASSADO A CADA OPÇÃO
VALOR É O NOME DADO AO CÓDIGO, APRESENTAÇÃO PARA O USUARIO
*/
function getLista(endpoint, menususpenso, chave, valor) {
    //FAZ A REQUISIÇÃO PARA A API
    data = getData(endpoint)
    let itens = JSON.parse(data)
    //COMPARA SE EXISTEM NOVOS VALORES A SEREM ADICIONADOS
    //EM CASO VERDADEIRO LIMPA A LISTA E ADICIONA OS NOVOS
    if(menususpenso.childElementCount-1!==itens.length){
        if(primeiro){
            for (item in itens){
                var opcao = document.createElement('option')
                opcao.text = itens[item][valor]
                opcao.value = itens[item][chave]
                menususpenso.add(opcao)
            }
            primeiro = false
        }else{
            for(n=menususpenso.childElementCount; n>=1; n--){
                menususpenso.remove(n)
            }
            for (item in itens){
                var opcao = document.createElement('option')
                opcao.text = itens[item][valor]
                opcao.value = itens[item][chave]
                menususpenso.add(opcao)
            }
        }
    }
}
;