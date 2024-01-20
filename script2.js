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
            offset: '90%' 
        });
    });
});
