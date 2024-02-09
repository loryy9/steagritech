function openPopup() {
    var popup = document.getElementById("popup");
    anime({
        targets: popup,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 300,
        begin: function () {
            popup.style.display = 'block';
        }
    });
}

function closePopup() {
    var popup = document.getElementById("popup");
    anime({
        targets: popup,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 300,
        complete: function () {
            popup.style.display = 'none';
        }
    });
}

function animateColumns() {
    anime({
        targets: '#leftColumn',
        translateX: [-200, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 1000
    });

    anime({
        targets: '#rightColumn',
        translateX: [200, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 1000
    });
}

// Chiamare la funzione all'avvio della pagina
window.onload = function () {
    animateColumns();
};

document.addEventListener("DOMContentLoaded", function () {
    var numbers = document.querySelectorAll(".number");
    var descriptions = document.querySelectorAll(".descrizione");

    numbers.forEach(function (number) {
        var value = parseInt(number.getAttribute("data-number"));
        var increment = Math.ceil(value / 100);

        anime({
            targets: number,
            innerHTML: [0, value],
            easing: "linear",
            round: 1,
            duration: 2000,
            update: function (anim) {
                number.innerHTML = anim.animations[0].currentValue.toLocaleString();
            }
        });
    });

    descriptions.forEach(function (description) {
        anime({
            targets: description,
            translateY: [20, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: anime.stagger(500),
        });
    });

    // Aggiunta della parte per associare la funzione openPopup al click del link
    var contactLink = document.querySelector(".about-me-button a");
    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault();
            openPopup();
        });
    }
});
