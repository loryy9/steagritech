document.addEventListener("DOMContentLoaded", function () {
    // Funzione per verificare se è un dispositivo mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Funzione per avviare l'animazione dei numeri
    function startNumberAnimation(number) {
        var value = parseInt(number.querySelector(".number").getAttribute("data-number"));

        number.anim = {
            targets: number,
            translateY: [30, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: anime.stagger(500),
        };

        // Imposta l'opacità a 0 inizialmente
        anime.set(number, { opacity: 0 });

        // Aggiunge l'animazione alla classe 'animate-riga-info'
        number.anim.begin = function (anim) {
            number.classList.add("animate-riga-info");
        };

        anime(number.anim);

        anime({
            targets: number.querySelector(".number"),
            innerHTML: [0, value],
            easing: "linear",
            round: 1,
            duration: 2000,
            update: function (anim) {
                number.querySelector(".number").innerHTML = anim.animations[0].currentValue.toLocaleString();
            }
        });
    }

    // Imposta l'animazione solo per gli elementi che entrano nella viewport
    var waypoint = new Waypoint({
        element: document.querySelector(".riga-info"),
        handler: function () {
            var animatedNumbers = document.querySelectorAll(".number-container");

            // Avvia l'animazione solo se è un dispositivo mobile o se è nella viewport
            animatedNumbers.forEach(function (number) {
                if (isMobile() || isElementInViewport(number)) {
                    startNumberAnimation(number);
                }
            });

            this.destroy(); // Disabilita Waypoint dopo l'animazione
        },
        offset: "80%",
    });

    // Funzione per verificare se un elemento è nella viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
