// Variables necesarias 
 const cards = 
 [ 
    { name: "Chlamydia is primarily spread through sexual contact (vaginal, anal, or oral sex) with an infected person. It can also be passed from an infected mother to her baby during childbirth, potentially causing eye infections or pneumonia in the newborn", img: "🧬", category: "Célula" }, 
    { name: "How Chlamydia is trasmited", img: "🌱", category: "Célula" }, 
    { name: "how to prevent Chlamydia", img: "⚛️", category: "Átomo" }, 
    { name: "Consistent and correct use of condoms during sexual activity.Regular STI screening, especially for sexually active individuals Limiting the number of sexual partners.", img: "⚛️", category: "Átomo" }, 
    { name: "Chlamydia is a common sexually transmitted infection (STI) caused by the bacterium Chlamydia trachomatis. It can infect both men and women, typically affecting the genital area, but it can also impact the eyes, throat, and rectum.", img: "🦠", category: "Organismo" }, 
    { name: "what is chlamydia", img: "🦠", category: "Organismo" }, 
    { name: "sympthoms of chlamydia in women", img: "🧬", category: "Molécula" }, 
    { name: "In women: Abnormal vaginal discharge, pain during sex, bleeding between periods, or pelvic pain.", img: "🧬", category: "Molécula" }, 
    { name: "sympthoms of chlamydia in men", img: "🍄", category: "Organismo" }, 
    { name: "In men: Discharge from the penis, pain or burning during urination, or swollen testicles.", img: "🍄", category: "Organismo" }, 
];

let flippedCards = [];
let matchedCards = [];
let score = 0;

// Función para mezclar las cartas aleatoriamente
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Crear el tablero del juego
function createBoard() {
    shuffle(cards);
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ""; // Limpiar el tablero antes de crear nuevas cartas

    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;
        cardElement.dataset.category = card.category; // Guardamos la categoría de cada carta

        cardElement.addEventListener("click", flipCard); // Añadir evento de click
        gameBoard.appendChild(cardElement);
    });
}

// Función para voltear las cartas
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.name; // Mostrar el nombre de la carta
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch(); // Comprobar si las cartas coinciden
        }
    }
}

// Función para verificar si las cartas volteadas son iguales
function checkMatch() {
    const [card1, card2] = flippedCards;

    // Compara las categorías en lugar de los nombres
    if (card1.dataset.category === card2.dataset.category) {
        // Si son del mismo grupo (categoría), se emparejan
        card1.classList.add("matched");
        card2.classList.add("matched");
        score += 10; // Aumentamos el puntaje por la coincidencia
        updateScore();
        showResult(true); // Mostrar chulito ✔
    } else {
        // Si no son iguales, las volteamos nuevamente después de 1 segundo
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = ""; // Limpiamos el contenido de las cartas
            card2.textContent = ""; // Limpiamos el contenido de las cartas
            showResult(false); // Mostrar X ❌
        }, 1000); // Esperamos 1 segundo antes de voltear las cartas
    }

    flippedCards = []; // Limpiamos el array de cartas volteadas
}

// Mostrar el resultado de la comparación de las cartas
function showResult(isMatch) {
    if (isMatch) {
        flippedCards.forEach(card => {
            card.classList.add("check");
            card.textContent = "✔"; // Chulito ✔
        });
    } else {
        flippedCards.forEach(card => {
            card.classList.add("x");
            card.textContent = "❌"; // X ❌
        });
    }
}

// Función para actualizar el puntaje
function updateScore() {
    document.getElementById("score").textContent = `Puntaje: ${score}`;
}

// Inicializar el juego
createBoard();
