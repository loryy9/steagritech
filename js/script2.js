document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        new Waypoint({
            element: card,
            handler: function() {
                anime({
                    targets: card,
                    opacity: 1,
                    translateX: 0,
                    easing: 'easeOutExpo',
                    duration: 1500
                });
                this.destroy(); 
            },
            offset: isMobile() ? '70%' : '90%'  // Usa '50%' per dispositivi mobili, altrimenti '90%'
        });
    });

    // Funzione per verificare se il dispositivo è mobile
    function isMobile() {
        return window.innerWidth <= 768;  // Puoi regolare questo valore in base alle tue esigenze
    }
});