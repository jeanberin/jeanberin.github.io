
const body = document.querySelector('body');

const intro = document.getElementById('intro-header');

const bgMusic = new Audio("happy-cat-song.mp3");


// Get the buttons and the result message
const initialBg = document.getElementById('card');

const yesBtn = document.getElementById('yesBtn');

const noBtn = document.getElementById('noBtn');

const resultMessage = document.getElementById('resultMessage');

const happyCat = document.getElementById('happyCat');

const sadCat = document.getElementById('sadCat');

const catImage = document.getElementById('catImage');

const buttons = document.querySelector('.buttons');

// Get the date details section

const dateDetails = document.createElement('div');

dateDetails.classList.add('date-details');

dateDetails.textContent = "Date: Feb 16, 2025 at UP Diliman, Sunken Garden";

dateDetails.classList.add('hidden');

document.querySelector('.container').appendChild(dateDetails);

const container = document.querySelector('.container');



initialBg.addEventListener('click', () => {
initialBg.style.display = 'none';
container.style.display = 'flex';
body.style.backgroundColor = 'ffcccb';



});

// Event listener for Yes button

yesBtn.addEventListener('click', () => {
    intro.innerHTML = '';

    resultMessage.textContent = "I'm looking forward to our first picnic together love 💖";

    happyCat.classList.remove('hidden');

    sadCat.classList.add('hidden');
    dateDetails.classList.remove('hidden');

    // resultMessage.style.color = "#ff4d94";

    // Hide the original cat image and buttons

    catImage.classList.add('hidden');

    buttons.classList.add('hidden');

    bgMusic.play();
    bgMusic.loop = true; // Optional: Loops the music

});

// Ensure the No button is positioned absolutely


function moveButtonRandomly() {
    // Get the window width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Generate random coordinates within the window's dimensions
    const randomX = Math.random() * (windowWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (windowHeight - noBtn.offsetHeight);

    // Smoothly animate the button's movement
    noBtn.style.transition = "top 0.3s ease-in-out, left 0.3s ease-in-out";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

let count = 0;
let moveInterval; // To store the interval

// Event listener for No button
noBtn.addEventListener("click", () => {
    count++;

    if (count === 1) {
        noBtn.textContent = "Are you sure?";
        noBtn.style.padding = "5px 15px";
        noBtn.style.fontSize = "0.6rem";

        yesBtn.style.fontSize = "5rem";
    } else if (count > 1) {
        noBtn.style.position = "absolute";

        if (noBtn.textContent === "Pretty please") {
            noBtn.textContent = "Miss na kita";
        } else if (noBtn.textContent === "Miss na kita") {
            noBtn.textContent = "Are you sure?";
        } else if (noBtn.textContent === "Are you sure?") {
            noBtn.textContent = "Pretty please";
        }
        noBtn.style.padding = "8px 20px";
        noBtn.style.fontSize = "1.2rem";

        // Start moving the button every 700ms
        if (!moveInterval) {
            moveInterval = setInterval(moveButtonRandomly, 700);
        }
    }
});


