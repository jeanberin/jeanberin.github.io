const question = document.getElementById('question');
const cards = document.getElementById('cards');
const sumText = document.getElementById('sum');
const dealer = document.getElementById('dealer');
const startGameBtn = document.getElementById('start');
const drawCardBtn = document.getElementById('newCard');
const standBtn = document.getElementById('stand');
let drawnCards;
const minValueCard = 2;
const maxValueCard = 11;
const minValueDealerCard = 4;
const maxValueDealerCard = 31;
let arrToCombineString;
let stringDrawnCards;
let dealerCard;
let sum = 0;

function startGame() {
    sum = 0;
    drawnCards = [];
    startGameBtn.innerHTML = 'NEW GAME';
    let firstCard = getRandom(minValueCard, maxValueCard);
    let secondCard = getRandom(minValueCard, maxValueCard);
    dealerCard = getRandom(minValueDealerCard, maxValueDealerCard);
    sum = firstCard + secondCard;
    drawnCards = [firstCard, secondCard];
    arrToCombineString = drawnCards.toString();
    stringDrawnCards = arrToCombineString.split(',').join(', ');
    cards.innerHTML = `Cards: ${stringDrawnCards}`;
    sumText.innerHTML = `Your Card Value: ${sum}`;
    dealer.innerHTML = `Dealer Card Value: `;

    if (sum === 21) {
        question.innerHTML = 'Congrats! You got blackjack! &#127881;';
        dealer.innerHTML = `Dealer Card Value: ${dealerCard}`;
    } else if (sum > 21) {
        question.innerHTML = `You've lost &#128531;`;
        dealer.innerHTML = `Dealer Card Value: ${dealerCard}`;
    } else {
        question.innerHTML = 'Do you want to draw a new card?';
        drawCardBtn.style.visibility = "visible";
        standBtn.style.visibility = "visible";
    }
}

function drawCard() {
    let thirdCard = getRandom(minValueCard, maxValueCard);
    drawnCards.push(thirdCard);
    sum += thirdCard;

    showCard();
}

function showCard() {
    if (sum === 21) {
        question.innerHTML = 'Congrats! You got blackjack! &#127881;';
    } else if ((dealerCard > 21 && sum  < 21) || (sum > dealerCard && sum < 21)) {
        question.innerHTML = 'Congrats! You beat the dealer!';
    } else {
        question.innerHTML = `You've lost &#128531;`;
    }

    arrToCombineString = drawnCards.toString();
    stringDrawnCards = arrToCombineString.split(',').join(', ');
    cards.innerHTML = `Cards: ${stringDrawnCards}`;
    sumText.innerHTML = `Your Card Value: ${sum}`;
    dealer.innerHTML = `Dealer Card Value: ${dealerCard}`;
    drawCardBtn.style.visibility = "hidden";
    standBtn.style.visibility = "hidden";
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






