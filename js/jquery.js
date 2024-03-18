$(document).ready(() => {
    adatta_display();
    local.init();
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
    // finestre
    $(document).on('click', '.close', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        finestra.close(target);
    });
    $(document).on('click', '.open', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        finestra.open(target);
    });
    $('#bc_finestre').click((bc) => {
        bc = bc.currentTarget;
        const target = $(bc).attr('data-target');
        finestra.close(target);
    });
    // ---
    // utente
    $('#reset_game').click(() => {
        utente.reset();
    });
    // impostazioni
    $('#velocita_slot').change((option) => {
        option = option.currentTarget;
        animazione.velocita_animazione = Number($(option).val()) * 100;
    });
    // puntata
    $(document).on('change', '#puntata', (puntata) => {
        puntata = parseFloat($(puntata.currentTarget).val());
        slot.puntata = puntata;
        // --- pay for: funzione bonus
        slot.prezzo_funzione_bonus = slot.puntata * config.moltiplicatore_acquista_bonus;
        $('#prezzo_funzione_bonus').text(slot.prezzo_funzione_bonus.toFixed(2));
    });
    // compra funzione bonus
    $('#compra_funzione_bonus').click(() => {
        const conferma = confirm('Sicuro di voler procedere all\'acquisto della funzione bonus per ' + slot.prezzo_funzione_bonus + '€?');
        if (conferma) {
            finestra.close('finestra_puntata');
            utente.compra_funzione_bonus();
        }
    });
});

const finestra = {
    open(target) {
        dom.show('#' + target)
        $('#bc_finestre').attr('data-target', target);
        dom.show('#bc_finestre')
    },
    close(target) {
        dom.hide('#' + target)
        dom.hide('#bc_finestre')
    }
}

function spin_game() {
    const puntata = parseFloat($('#puntata').val());
    const procedi = utente.spin(puntata);
    if (animazione.is_shuffle || !procedi) return;
    html.spin();
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