
const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');
const sound3 = document.getElementById('sound3');
const sound4 = document.getElementById('sound4');

sound1.addEventListener("click", () => {
    const audio = new Audio('assets/sounds/StarWars.mp3');
    audio.play();
})

sound2.addEventListener("click", () => {
    const audio = new Audio('assets/sounds/Nirvana - Come As You Are.mp3');
    audio.play();
})

sound3.addEventListener("click", () => {
    const audio = new Audio('assets/sounds/Still D.R.E Dr dre feat Snoop dogg.mp3');
    audio.play();
})

sound4.addEventListener("click", () => {
    const audio = new Audio('assets/sounds/Jul - On Mappelle Lovni  Clip Officiel  2016.mp3');
    audio.play();
})