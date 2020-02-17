/* Variaveis */
let select = document.getElementById('garantia');
let parc = document.getElementById('parcelas');
let valorGarantia = document.getElementById('valor-garantia');
let rangeGarantia = document.getElementById('valor-garantia-range');
let rangeEmprestimo = document.getElementById('valor-emprestimo-range');
let valorEmprestimo = document.getElementById('valor-emprestimo');
let spanRange = document.getElementsByClassName('range__values');
/* Definindo valores de cada garantia */
const changeGarantia = () => {
    /* Definindo parcelas */
    if(select.value == 'veiculo'){
        /* Definindo os valores no select de parcelas */
        for(var i =0; i<3; i++){
            parc.options[i].innerHTML = 12*(i+2);
            parc.options[i].value = 12*(i+2);
        }
        /* Definindo valor maximo e minimo do valor-garantia-range */
        rangeEmprestimo.min = 3000;
        rangeEmprestimo.max = 100000;
        /* Definindo o value do range-emprestimo com o valor minimo do valor-emprestimo-range*/
        rangeEmprestimo.value = rangeEmprestimo.min;
        /* Definindo dinamicamente o value do valor-emprestimo com o value do valor-emprestimo-range */
        valorEmprestimo.value = rangeEmprestimo.value;
        /* Definindo valor maximo e minimo do valor-range-garantia */
        rangeGarantia.min = valorEmprestimo.value * 1.2;
        rangeGarantia.max = valorEmprestimo.value * 2;
        /* Definindo o value do valor-garantia com o minimo do valor-range-garantia */
        rangeGarantia.value = rangeGarantia.min;
        /* Definindo o value do valor-garantia com o value do valor-range-garantia */
        valorGarantia.value = rangeGarantia.value;
        /* Defindo os valores a serem visualizados com os minimos e maximos dos ranges */
        spanRange[0].children[0].innerHTML = rangeGarantia.min;
        spanRange[0].children[1].innerHTML = rangeGarantia.max;        
        spanRange[1].children[0].innerHTML = rangeEmprestimo.min;
        spanRange[1].children[1].innerHTML = rangeEmprestimo.max;
        /* Definindo o maximo de caracteres dos inputs */
        valorEmprestimo.maxLength = '6';
        valorGarantia.maxLength = '4';
    }else if(select.value == 'imovel'){
        /* Definindo os valores no select de parcelas */
        for(var i=0; i<3; i++){
            parc.options[i].innerHTML = 60*(i+2);
            parc.options[i].value = 60*(i+2);
        }
        /* Definindo valor maximo e minimo do valor-emprestimo-range */
        rangeEmprestimo.min = 30000;
        rangeEmprestimo.max = 4500000;
        /* Definindo o value do range-emprestimo com o valor minimo do valor-emprestimo-range*/
        rangeEmprestimo.value = rangeEmprestimo.min;
        /* Definindo dinamicamente o value do valor-emprestimo com o value do valor-emprestimo-range */        
        valorEmprestimo.value = rangeEmprestimo.value;
        /* Definindo valor maximo e minimo do valor-range-garantia */
        rangeGarantia.min = valorEmprestimo.value * 1.2;
        rangeGarantia.max = valorEmprestimo.value * 2;
        /* Definindo o value do valor-garantia com o minimo do valor-range-garantia */
        rangeGarantia.value = rangeGarantia.min;
        /* Definindo o value do valor-garantia com o value do valor-range-garantia */        
        valorGarantia.value = rangeGarantia.value;
        /* Defindo os valores a serem visualizados com os minimos e maximos dos ranges */        
        spanRange[0].children[0].innerHTML = rangeGarantia.min;
        spanRange[0].children[1].innerHTML = rangeGarantia.max;        
        spanRange[1].children[0].innerHTML = rangeEmprestimo.min;
        spanRange[1].children[1].innerHTML = rangeEmprestimo.max;
        /* Definindo o maximo de caracteres dos inputs */        
        valorEmprestimo.maxLength = '7';
        valorGarantia.maxLength = '5';
    }else{
        console.log('Erro ao tentar selecionar a garantia desejada');       
    }
}
/* Definindo valores dos inputs dinamicamente ao utilizar o range */
const changeRange = () => {
    /* Setando valores nos inputs dinamicamente */
    valorEmprestimo.value = rangeEmprestimo.value;
    valorGarantia.value = rangeGarantia.value;
    /* Setando os valores minimo e maximo do valor-garantia-range */
    rangeGarantia.min = valorEmprestimo.value * 1.2;
    rangeGarantia.max = valorEmprestimo.value * 2;
    /* Definindo o maximo de caracteres possiveis no input valor-garantia*/
    valorGarantia.maxLength = valorEmprestimo.value.length;
    /* Setando os valores minimos e maximos do range*/        
    spanRange[0].children[0].innerHTML = rangeGarantia.min;
    spanRange[0].children[1].innerHTML = rangeGarantia.max;
    /* Definindo cor da borda dos inputs */
    valorEmprestimo.style.borderColor = '#1eb98a';
    valorGarantia.style.borderColor = '#1eb98a';
}
valorGarantia.addEventListener('input', function(){
    /* Recebendo valores minimo e maximo do valor-garantia-range e formatando pra FLOAT*/
    let min = parseFloat(rangeGarantia.min);
    let max = parseFloat(rangeGarantia.max);
    /* Condicional para saber se o value do valor-garantia e menor ou maior que o valor minimo e maixmo do valor-garantia-range */
    if(valorGarantia.value<min){
        /* Setando a cor da borda do input de vermelho*/
        valorGarantia.style.borderColor = '#b62d2d';
    }else if(valorGarantia.value>max){
        /* Setando a cor da borda do input de vermelho*/
        valorGarantia.style.borderColor = '#b62d2d';
    }else{
        /* Setando a cor da borda do input de verde*/
        valorGarantia.style.borderColor = '#1eb98a';
    }
    /* Setando valor dinamicamente ao inserir valor no input */    
    rangeGarantia.value = valorGarantia.value;
});

valorEmprestimo.addEventListener('input', function(){
    /* Recebendo valores minimo e maximo do valor-garantia-range e formatando pra FLOAT*/
    let min = parseFloat(rangeEmprestimo.min);
    let max = parseFloat(rangeEmprestimo.max);
    /* Condicional para saber se o value do valor-emprestimo e menor ou maior que o valor minimo e maixmo do valor-emprestimo-range */    
    if(valorEmprestimo.value<min){
        /* Setando a cor da borda do input de vermelho*/        
        valorEmprestimo.style.borderColor = '#b62d2d';
    }else if(valorEmprestimo.value>max){  
        /* Setando a cor da borda do input de vermelho*/
        valorEmprestimo.style.borderColor = '#b62d2d';
    }else{
        /* Setando a cor da borda do input de verde*/
        valorEmprestimo.style.borderColor = '#1eb98a';
    }
    /* Setando valor dinamicamente ao inserir valor no input */    
    rangeEmprestimo.value = valorEmprestimo.value;
});
/* Calculando resultado ao clicar no button resultado*/
document.querySelector('#resultado').addEventListener('click',function(event){
    /* Recebendo valores */
    const prazo = parc.value;
    const iof = 6.38;
    const taxaDeJuros = 2.34;
    /* Calculando valor total a pagar */
    const valorTotalAPagar = ((iof / 100) + (taxaDeJuros / 100) + (prazo / 1000) + 1) * parseFloat(valorEmprestimo.value);
    /* Calculando valor das parcelas */
    const valorPrazo = valorTotalAPagar / prazo;
    /* Inserindo valor no elementos do formulario*/
    document.getElementsByClassName('quota')[0].children[1].innerHTML = valorPrazo.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
    document.getElementsByClassName('amount_container')[0].children[1].innerHTML = 'R$ '+valorTotalAPagar.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
    document.getElementsByClassName('tax__container')[0].children[1].innerHTML = taxaDeJuros+'%';
    /* Metodo pra que a função so execute de forma explicita */
    event.preventDefault();
});