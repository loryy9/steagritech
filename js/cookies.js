var COOKIE_CONSENT_KEY = "cookieConsent";

// Funzione per impostare un cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (0 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Funzione per leggere un cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Funzione per mostrare il banner dei cookie
function showCookieConsentBanner() {
    var cookieConsentBanner = document.getElementById("cookie-container");
    cookieConsentBanner.style.display = "flex";

    document.getElementById("accept-cookies").addEventListener("click", function () {
        setCookie(COOKIE_CONSENT_KEY, "true", 30); // Cookie valido per 1 giorno per test
        cookieConsentBanner.style.display = "none";
        console.log("Cookie consent accepted and set.");
        initializeYouTubeAPI(); // Chiama la tua funzione per l'inizializzazione dell'API di YouTube
    });

    document.getElementById("denie-cookies").addEventListener("click", function () {
        setCookie(COOKIE_CONSENT_KEY, "false", 30); // Cookie valido per 1 giorno per test
        cookieConsentBanner.style.display = "none";
        console.log("Cookie consent denied and set.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var cookieConsent = getCookie(COOKIE_CONSENT_KEY);
    console.log("Cookie consent value on load:", cookieConsent);
    if (!cookieConsent) {
        showCookieConsentBanner();
    } else {
        console.log("Cookie consent already given.");
    }
});

function openPopupInfo() {
    var popup = document.getElementById("popup-info");

    popup.style.display = 'block';
    void popup.offsetWidth; // Forza il reflow per garantire che la transizione funzioni
    popup.classList.add('open');
}


function closePopupInfo() {
    var popup = document.getElementById("popup-info");

    popup.classList.remove('open');
    setTimeout(function () {
        popup.style.display = 'none';
    }, 500); // Assicura che la transizione sia completata prima di nascondere definitivamente
}
