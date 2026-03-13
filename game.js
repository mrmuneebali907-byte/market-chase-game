const hero = document.getElementById("hero");
const thief = document.getElementById("thief");

// Hero movement
document.addEventListener("keydown", (e) => {
    let left = parseInt(window.getComputedStyle(hero).left);
    if(e.key === "ArrowRight") left += 20;
    if(e.key === "ArrowLeft") left -= 20;
    hero.style.left = left + "px";
});

// Thief automatic running
let thiefLeft = parseInt(window.getComputedStyle(thief).right);
setInterval(() => {
    thiefLeft += 5; // thief moves to the right
    thief.style.right = thiefLeft + "px";
}, 100);

// Optional: Detect catch
setInterval(() => {
    const heroPos = hero.getBoundingClientRect();
    const thiefPos = thief.getBoundingClientRect();
    if(
        heroPos.x < thiefPos.x + thiefPos.width &&
        heroPos.x + heroPos.width > thiefPos.x &&
        heroPos.y < thiefPos.y + thiefPos.height &&
        heroPos.height + heroPos.y > thiefPos.y
    ){
        alert("MUNEEB caught the thief!");
        thiefLeft = 0; // reset thief position
    }
}, 100);
