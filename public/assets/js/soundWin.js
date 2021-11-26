
const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');
const sound4 = document.getElementById('sound4');
const pause1 = document.getElementById('pause1');
const pause2 = document.getElementById('pause2');
const pause3 = document.getElementById('pause3');
const pause4 = document.getElementById('pause4');
const audio1 = new Audio('assets/sounds/StarWars.mp3');
const audio2 = new Audio('assets/sounds/Nirvana - Come As You Are.mp3');
const audio3 = new Audio('assets/sounds/Still D.R.E Dr dre feat Snoop dogg.mp3');
const audio4 = new Audio('assets/sounds/Jul - On Mappelle Lovni  Clip Officiel  2016.mp3');

sound1.addEventListener("click", () => {
    audio1.play();
})
pause1.addEventListener("click", () => {
    audio1.pause();
})

sound2.addEventListener("click", () => {
    audio2.play();
})
pause2.addEventListener("click", () => {
    audio2.pause();
})

sound3.addEventListener("click", () => {
    audio3.play();
})
pause3.addEventListener("click", () => {
    audio3.pause();
})

sound4.addEventListener("click", () => {
    audio4.play();
})
pause4.addEventListener("click", () => {
    audio4.pause();
})