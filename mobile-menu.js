const mobileNav = document.querySelector('.mobile-nav')
const mobileButton = document.querySelector('#mobile-menu-button')

mobileButton.addEventListener('click', (e) => {
    mobileNav.style.display = 'block'
})

window.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
        mobileNav.style.display = 'none'
    }
})