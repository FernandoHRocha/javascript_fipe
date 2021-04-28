function getData(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function main() {
    data = getData('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    let marcas = JSON.parse(data)
    console.log(marcas)
}

main()