const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lock = false;

function flipCard(){
    if (lock) return;

    if(this === firstCard) return;

    // adiciona a class flipClass ao elemento que estamos selecionando no momento
    this.classList.add('flipClass'); 

    // verifica se está setado como false, e irá ativar true ao clicar na carta
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkCards();
}

function checkCards(){
    if (firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    } 
    unFlipCard();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlipCard(){
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flipClass');
        secondCard.classList.remove('flipClass');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/* embaralha as cartas, função chamada sempre que se inicia o jogo */
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

// reiniciar o jogo dando um refresh na página
function restartGame() {
    window.location.reload();
}

// percorre toda a lista de cards que vierem no queryselector
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});