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
});


