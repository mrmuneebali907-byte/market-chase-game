// ==== Market Chase HD Game.js ====

const hero = document.getElementById("hero");
const thief = document.getElementById("thief");
const gameArea = document.getElementById("gameArea");

let level = 1;
let score = 0;

// Hero movement
document.addEventListener("keydown", (e) => {
    let left = parseInt(window.getComputedStyle(hero).left);
    let bottom = parseInt(window.getComputedStyle(hero).bottom);

    if (e.key === "ArrowRight") left += 20;
    if (e.key === "ArrowLeft") left -= 20;
    if (e.key === "ArrowUp") bottom += 50; // Jump
    hero.style.left = left + "px";
    hero.style.bottom = bottom + "px";

    // Reset jump after 300ms
    if (e.key === "ArrowUp") setTimeout(() => {
        hero.style.bottom = "20px";
    }, 300);
});

// Thief automatic running
let thiefLeft = parseInt(window.getComputedStyle(thief).right);
let thiefSpeed = 5;

function moveThief() {
    thiefLeft += thiefSpeed;
    thief.style.right = thiefLeft + "px";

    // Reset thief when off screen
    if (thiefLeft > gameArea.offsetWidth) {
        thiefLeft = 0;
        thiefSpeed += 0.5; // Speed increase per lap
    }
}

// Collision detection
function checkCollision() {
    const heroPos = hero.getBoundingClientRect();
    const thiefPos = thief.getBoundingClientRect();

    if (
        heroPos.x < thiefPos.x + thiefPos.width &&
        heroPos.x + heroPos.width > thiefPos.x &&
        heroPos.y < thiefPos.y + thiefPos.height &&
        heroPos.height + heroPos.y > thiefPos.y
    ) {
        score += 10;
        alert(`MUNEEB caught the thief! Score: ${score}`);
        level += 1;
        thiefLeft = 0;
        thiefSpeed = 5 + level * 0.5; // increase speed per level
        alert(`Level Up! Level: ${level}`);
        spawnCoins(level);
    }
}

// Coins / collectibles
function spawnCoins(lvl) {
    // Remove old coins
    const oldCoins = document.querySelectorAll(".coin");
    oldCoins.forEach(c => c.remove());

    // Spawn new coins
    for (let i = 0; i < lvl + 2; i++) {
        const coin = document.createElement("img");
        coin.src = "assets/coin.png";
        coin.classList.add("coin");
        coin.style.position = "absolute";
        coin.style.width = "30px";
        coin.style.bottom = `${Math.floor(Math.random() * 200) + 50}px`;
        coin.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        gameArea.appendChild(coin);
    }
}

// Hero collects coins
function checkCoinCollection() {
    const coins = document.querySelectorAll(".coin");
    const heroPos = hero.getBoundingClientRect();

    coins.forEach(coin => {
        const coinPos = coin.getBoundingClientRect();
        if (
            heroPos.x < coinPos.x + coinPos.width &&
            heroPos.x + heroPos.width > coinPos.x &&
            heroPos.y < coinPos.y + coinPos.height &&
            heroPos.height + heroPos.y > coinPos.y
        ) {
            score += 5;
            coin.remove();
            console.log(`Coin collected! Score: ${score}`);
        }
    });
}

// Game loop
setInterval(() => {
    moveThief();
    checkCollision();
    checkCoinCollection();
}, 100);

// Initialize first coins
spawnCoins(level);
