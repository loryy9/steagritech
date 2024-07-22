function openPopup() {
    var popup = document.getElementById("popup");

    popup.style.display = 'block';
    void popup.offsetWidth; // Forza il reflow per garantire che la transizione funzioni
    popup.classList.add('open');
}

function closePopup() {
    var popup = document.getElementById("popup");

    popup.classList.remove('open');
    setTimeout(function () {
        popup.style.display = 'none';
    }, 500); // Assicura che la transizione sia completata prima di nascondere definitivamente
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

    // Aggiunta della parte per associare la funzione openPopup al click del link "Contattami"
    var contattamiLink = document.querySelector(".contattami a");
    if (contattamiLink) {
        contattamiLink.addEventListener("click", function (event) {
            event.preventDefault();
            openPopup();
        });
    }

    // Aggiunta della parte per associare la funzione closePopup al click del link "Chi sono"
    var chiSonoLink = document.querySelector(".nav-links a[href='chisono.html']");
    if (chiSonoLink) {
        chiSonoLink.addEventListener("click", function (event) {
            closePopup(); // Chiudi il popup quando viene cliccato il link "Chi sono"
        });
    }

    // Aggiunta della parte per associare la funzione closePopup al click del link nel popup
    var chiudiPopupLink = document.querySelector("#popup button");
    if (chiudiPopupLink) {
        chiudiPopupLink.addEventListener("click", function (event) {
            closePopup(); // Chiudi il popup quando viene cliccato il link nel popup
        });
    }
});
