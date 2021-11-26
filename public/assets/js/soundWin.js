const sound = document.getElementById('sound');
const pause = document.getElementById('pause');
const audio = new Audio('assets/sounds/aliPerry.mp3');


sound.addEventListener("click", () => {
    audio.play();
})
pause.addEventListener("click", () => {
    audio.pause();
})
