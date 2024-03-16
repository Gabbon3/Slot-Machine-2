$(document).ready(() => {
    adatta_display();
    $('#spin').click(() => {
        if (animazione.is_shuffle) return;
        html.spin();
    });
    $(document).keydown(event => {
        if (event.keyCode === 32) {
            if (animazione.is_shuffle) return;
            html.spin();
        }
    });
    // Chiama la funzione ogni volta che la finestra viene ridimensionata
    $(window).resize(function() {
        adatta_display();
    });
});

function adatta_display() {
    const larghezza_finestra = window.innerWidth;
    const altezza_finestra = window.innerHeight * 0.9;

    // Calcola la larghezza e l'altezza della griglia in base alla dimensione minore
    let larghezza_display, altezza_display;

    if ((larghezza_finestra / 7) * 8 <= altezza_finestra) {
        larghezza_display = larghezza_finestra;
        altezza_display = (larghezza_finestra / 7) * 8;
    } else {
        altezza_display = altezza_finestra;
        larghezza_display = (altezza_finestra / 8) * 7;
    }

    // Imposta le dimensioni della griglia
    document.getElementById("display").style.width = larghezza_display + "px";
    document.getElementById("display").style.height = altezza_display + "px";
}