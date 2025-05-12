
// initializes the page
function init() {
    addEventListeners();
}

// adds event listeners to the page elements
function addEventListeners() {

    document.getElementById('page-nav-collapser').addEventListener('click', (e)=> {
        const btn = e.target;
        const nav = document.querySelector('.page-nav');
        btn.classList.toggle('expanded');
        nav.classList.toggle('expanded');
        if (btn.classList.contains('expanded')) {
            let contentWidth = nav.scrollWidth;
            let navStyle = window.getComputedStyle(nav)
            let paddingWidth = parseFloat(navStyle.paddingLeft) + parseFloat(navStyle.paddingRight);
            nav.style.maxWidth = contentWidth + paddingWidth;
            nav.style.width = contentWidth + paddingWidth;
        } else {
            nav.style.maxWidth = '';
            nav.style.width = '';
        }
    })
}






window.addEventListener('DOMContentLoaded', init)