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
                this.destroy(); // Una volta entrata la carta, distruggi il waypoint per evitare ripetizioni
            },
            offset: '90%' // Quando la carta è al 90% all'interno della viewport
        });
    });
});
