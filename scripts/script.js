
import * as fns from './functions.js'

// data stored across pages
export let globalData = {
    darkMode: true,
    colors: {
        dark: {
            color_primary: 'rgb(124, 30, 255)',
            color_secondary: 'rgb(24, 0, 118)',
            color_tertiary: 'rgb(7, 0, 86)',
            color_quaternary: 'rgb(3, 0, 50)',
            text_color: 'rgb(255, 255, 255)',
            text_color_hover: 'rgb(200, 255, 0)'
        },
        light: {
            color_primary: 'rgb(0, 0, 0)',
            color_secondary: 'rgb(255, 255, 255)',
            color_tertiary: '   rgb(199, 199, 199)',
            color_quaternary: 'rgb(255, 255, 255)',
            text_color: 'rgb(0, 0, 0)',
            text_color_hover: 'rgb(255, 255, 255)'
        }
    }
}

// sets the root colors
function updateColors() {
    let colors;
    if (globalData.darkMode) { 
        colors = globalData.colors.dark;
    } else {
        colors = globalData.colors.light;
    }
    for (const [name, value] of Object.entries(colors)) {
        fns.setRootVar(name, value);
    }
}

// fetches data from session storage
function fetchData() {
    if (sessionStorage.getItem('globalData')) {
        globalData = JSON.parse(sessionStorage.getItem('globalData'));
    }
}

// saves data to session storage
function saveData() {
    sessionStorage.setItem('globalData', JSON.stringify(globalData));
}

// transitions to another page
async function transitionPage(url) {
    let transition = document.querySelector('.page-transition');
    transition.style.opacity = 1;
    await fns.awaitEvent(transition, 'transitionend');
    window.location.replace(url);
}

// moves every carousel item's index by a value
function moveCarousel(container, value=1) {
    let items = container.querySelectorAll('.carousel-item');
    let maxIndex = items.length - 1;
    for (const item of items) {
        let newOrder = parseInt(item.dataset.order) + value;
        if (newOrder < 0) {
            newOrder = maxIndex;
        } else if (newOrder > maxIndex) {
            newOrder = 0;
        }
        item.dataset.order = newOrder.toString();
    }
}

// displays an enlarged image on the page
function displayImage(src, alt='') {
    let overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    let image = document.createElement('img');
    image.alt = alt;
    image.src = src;
    overlay.appendChild(image);
    document.querySelector('.page-wrapper').appendChild(overlay);
    overlay.addEventListener('click', async ()=> {
        overlay.style.animation = 'fade-out 200ms ease';
        await fns.awaitAnimation(overlay);
        overlay.remove();
    }, {once: true})
}

// initializes the page
export function init() {
    document.querySelector('.page-transition').style.opacity = 0;
    fetchData();
    updateColors();
    addEventListeners();
}

// adds event listeners to the page elements
function addEventListeners() {

    // allows user to collapse and expand the page nav
    document.getElementById('page-nav-collapser').addEventListener('click', (e)=> {
        const btn = e.target;
        btn.children[0].classList.toggle('fa-flip-horizontal');
        document.querySelector('.page-nav').classList.toggle('expanded');
    })

    // page nav burger menu for mobile
    document.getElementById('page-nav-burger').addEventListener('click', (e)=> {
        const burger = e.target;
        const nav = document.querySelector('.page-nav');
        nav.classList.toggle('expanded');
    })

    // dark mode toggle
    document.querySelector('.dark-mode').addEventListener('click', ()=> {
        globalData.darkMode = !globalData.darkMode;
        updateColors();
        saveData();
    })

    // page transition
    document.addEventListener('click', async(e)=> {
        if (e.target.matches('a') && !e.target.classList.contains('external')) {
            e.preventDefault();
            const url = e.target.getAttribute('href');
            transitionPage(url);
        }
    });

    // carousel arrows
    document.querySelector('.projects-carousel .left-arrow')?.addEventListener('click', (e)=> {
        moveCarousel(e.target.parentElement, 1);
    })
    document.querySelector('.projects-carousel .right-arrow')?.addEventListener('click', (e)=> {
        moveCarousel(e.target.parentElement, -1);
    })

    // carousel items
    document.querySelectorAll('.projects-carousel .carousel-item')?.forEach((item => {
        item.addEventListener('click', (e)=> {
            transitionPage(e.target.dataset.href);
        })
    }))

    // gallery items
    document.querySelectorAll('.gallery-item')?.forEach((item => {
        item.addEventListener('click', ()=> {
            let image = item.querySelector('img');
            displayImage(image.src, image.alt)
        })
    }))
}


window.addEventListener('DOMContentLoaded', init)