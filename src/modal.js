/* Pegando os elementos */
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];
/* Butão close */
span.onclick = function(){
    modal.style.display = 'none';
}
/* Ao clicar fora da janela modal ela se fecha*/
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display='none';
    }
}
/* Ao clicar em ajuda abre o modal */
document.querySelector('.help').addEventListener('click', function(){
    modal.style.display = 'flex';
});