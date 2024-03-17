$(document).ready(() => {
    adatta_display();
    $('#spin').click(() => {
        spin_game();
    });
    $(document).keydown(event => {
        if (event.keyCode === 32) {
            spin_game();
        }
    });
    // Chiama la funzione ogni volta che la finestra viene ridimensionata
    $(window).resize(function() {
        adatta_display();
    });
    // vincita
    $('#vincita').click(() => {
        $('#vincita').hide();
    });
    // btn open and close
    $(document).on('click', '.close', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        $('#' + target).fadeOut(100);
        $('#bc_finestre').fadeOut(100);
    });
    $(document).on('click', '.open', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        $('#' + target).fadeIn(100);
        $('#bc_finestre').attr('data-target', target);
        $('#bc_finestre').fadeIn(100);
    });
    $('#bc_finestre').click((bc) => {
        bc = bc.currentTarget;
        const target = $(bc).attr('data-target');
        $('#' + target).fadeOut(100);
        $(bc).fadeOut(100);
    });
    // utente
    $('#reset_game').click(() => {
        utente.reset();
    });
    // impostazioni
    $('#velocita_slot').change((option) => {
        option = option.currentTarget;
        animazione.velocita_animazione = Number($(option).val()) * 100;
    });
});

function spin_game() {
    const puntata = parseFloat($('#puntata').val());
    const procedi = utente.spin(puntata);
    if (animazione.is_shuffle || !procedi) return;
    html.spin(puntata);
}

function adatta_display() {
    const larghezza_finestra = window.innerWidth;
    const altezza_finestra = window.innerHeight * 0.9;

    // Calcola la larghezza e l'altezza della griglia in base alla dimensione minore
    let larghezza_display, altezza_display;

    // proporzioni per altezza e larghezza
    const w = 9;
    const h = 8;

    if ((larghezza_finestra / h) * w <= altezza_finestra) {
        larghezza_display = larghezza_finestra;
        altezza_display = (larghezza_finestra / h) * w;
    } else {
        altezza_display = altezza_finestra;
        larghezza_display = (altezza_finestra / w) * h;
    }

    // Imposta le dimensioni della griglia
    document.getElementById("display").style.width = larghezza_display + "px";
    document.getElementById("display").style.height = altezza_display + "px";
}