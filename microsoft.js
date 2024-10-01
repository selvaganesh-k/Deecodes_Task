// menu
function menutoggle(x){
    x.classList.toggle('change');
    document.querySelector('.nav-menu').classList.toggle('active');
    let icon=document.querySelector('#hamburger');
    let iconvalue=icon.getAttribute('class');
    if(iconvalue === 'bi bi-list'){
        icon.setAttribute('class', 'bi bi-x');
    }
    else{
        icon.setAttribute('class', 'bi bi-list');
    }
}

function menulisttoggle(x,index){
    x.classList.toggle('change');
    let inner_ul=document.querySelectorAll('.inner-ul');
    inner_ul[index].classList.toggle('active');
    let icon = x.querySelector('i');
    if (icon.classList.contains('bi-chevron-down')) {
        icon.classList.remove('bi-chevron-down');
        icon.classList.add('bi-chevron-up');
    } else {
        icon.classList.remove('bi-chevron-up');
        icon.classList.add('bi-chevron-down');
    }
}
function microsofttoggle(x){
    x.classList.toggle('active');
    document.querySelector('.microsoft-menu').classList.toggle('active');
}

// back to top
window.onscroll=()=>{scrollFuncetion()};

function scrollFuncetion(){
    const backToTop=document.querySelector('#back-to-top');
    if(document.body.scrollTop>50 || document.documentElement.scrollTop >50 ){
        backToTop.classList.add("show");
        backToTop.classList.remove("hide");
    }
    else{
        backToTop.classList.remove("show");
        backToTop.classList.add("hide");
    }
}
function scrollToTop(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
}

// slider

let currentindex=1;
let autoSlideIntervel;
const slides=document.querySelectorAll('.slide');
const next=document.querySelector('#next');
const prev=document.querySelector('#prev');
const slider_list=document.querySelector('.slider-list')

const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);
slider_list.appendChild(firstSlide);
slider_list.insertBefore(lastSlide, slides[0]);
let slidewidth=100;

function updateSliderPosition() {
    slider_list.style.transform = `translateX(-${currentindex * slidewidth}%)`;
    slider_list.style.transition = 'transform 0.8s ease-in-out';
}

function handleInfiniteSlide() {
    if (currentindex >= slides.length + 1) {
        slider_list.style.transition = 'none';
        currentindex = 1;
        updateSliderPosition();
    } else if (currentindex <= 0) {
        slider_list.style.transition = 'none';
        currentindex = slides.length; 
        updateSliderPosition();
    }
}

function showSlide(index) {
    currentindex = index;
    updateSliderPosition();
    setTimeout(handleInfiniteSlide, 500);
}

function startAutoSlide() {
    autoSlideIntervel = setInterval(() => {
        currentindex++;
        updateSliderPosition();
        setTimeout(handleInfiniteSlide, 4000);
    }, 4000);
}

next.addEventListener('click', () => {
    currentindex++;
    updateSliderPosition();
    resetAutoSlide();
    setTimeout(handleInfiniteSlide, 4000);
    next.classList.add('active');  
    prev.classList.remove('active');
    next.getAttribute('class')==='slide-i-right active' ? next.style.border='3px dotted black' : next.style.border='none';
    prev.getAttribute('class')==='slide-i-left active' ? prev.style.border='3px dotted black' : prev.style.border='none';

});

prev.addEventListener('click', () => {
    currentindex--;
    updateSliderPosition();
    resetAutoSlide();
    setTimeout(handleInfiniteSlide, 500);
    prev.classList.add('active');
    next.classList.remove('active');
    prev.getAttribute('class')==='slide-i-left active' ? prev.style.border='3px dotted black' : prev.style.border='none';
    next.getAttribute('class')==='slide-i-right active' ? next.style.border='3px dotted black' : next.style.border='none';

});
function resetAutoSlide() {
    clearInterval(autoSlideIntervel);
    startAutoSlide();
}
function stopAutoSlide() {
    clearInterval(autoSlideIntervel);
}

updateSliderPosition();
startAutoSlide();

// play pause

let play = document.querySelector('#play');
let playicon=document.querySelector('#playicon');
let isPaused = false;

play.addEventListener('click', () => {
    play.classList.toggle('pause');
    isPaused = !isPaused;
    isPaused ? stopAutoSlide() : startAutoSlide();
    playicon.classList.toggle('bi-pause-circle');
    playicon.classList.toggle('bi-play-circle-fill');
});

play.addEventListener('mouseover', () => {
    if (playicon.classList.contains('bi-play-circle')) {
        playicon.classList.add('bi-play-circle-fill');
        playicon.classList.remove('bi-play-circle');
    }
    else{
        playicon.classList.add('bi-pause-circle-fill');
        playicon.classList.remove('bi-pause-circle');
    }
});
play.addEventListener('mouseleave', () => {
    if (playicon.classList.contains('bi-play-circle-fill')) {
        playicon.classList.add('bi-play-circle');
        playicon.classList.remove('bi-play-circle-fill');
    }
    else{
        playicon.classList.add('bi-pause-circle');
        playicon.classList.remove('bi-pause-circle-fill');
    }
});

