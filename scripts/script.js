
// initializes the page
export function init() {
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
}






window.addEventListener('DOMContentLoaded', init)