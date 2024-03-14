class Animazione {
    constructor() {
        this.is_shuffle = false;
    }
    shuffle() {
        if (this.is_shuffle) return;
        this.is_shuffle = true;
        const colonne = geta('.col');
        this.for_interval((i) => {
            this.anima_colonna(colonne[i], 600, 4);
        }, 0, config.colonne - 1, 100);
        this.is_shuffle = false;
    }
    genera_colonna(result) {
        const span = document.createElement('span');
        let txt = '';
        let numero_righe = random.min_max(2, config.righe);
        let height = 100 / numero_righe;
        for (let i = 0; i < numero_righe; i++) {
            const item = result ? result[i] : items.get();
            txt += `<div class="item motif ${html.item_bc(item)}" style="height: ${height}%">${html.items_to_emoji(item)}</div>`;
        }
        span.innerHTML = txt;
        return span;
    }
    /**
     * 
     * @param {*} colonna indice colonna
     * @param {*} timeout millisecondi
     * @param {*} n quante volte animarla
     * @param {*} result il risultato finale che bisogna ottenere alla fine
     */
    anima_colonna(colonna, timeout, n = 3, result) {
        let span = colonna.querySelector('span');
        let i = 0;
        let ease = 'linear';
        // sposto il primo sotto
        setTimeout(() => {
            $(span).animate({
                top: '100%'
            }, {
                duration: (timeout * 0.5),
                easing: ease,
                complete: () => {
                    $(span).remove();
                }
            });
        }, (timeout * 0.5));
        let ciclo = setInterval(() => {
            // creo ed inserisco la nuova colonna
            const new_span = this.genera_colonna();
            new_span.style.top = '-100%';
            colonna.appendChild(new_span);
            // sposto la precedente sotto e la nuova alla posizione 0
            $(new_span).animate({
                top: '100%'
            }, {
                duration: timeout,
                easing: ease,
                complete: () => {
                    // rimuovo la vecchia
                    $(new_span).remove();
                }
            });
            // ripeto se non raggiungo il numero di animazioni desiderato
            if (i == n) {
                setTimeout(() => {
                    ultimo_giro();
                }, timeout * 0.5);
                clearInterval(ciclo);
            }
            i++;
        }, (timeout * 0.5));
        // ultimo giro
        function ultimo_giro() {
            const new_span = animazione.genera_colonna(result);
            new_span.style.top = '-100%';
            colonna.appendChild(new_span);
            $(new_span).animate({
                top: '15px'
            }, {
                duration: (timeout * 0.5),
                easing: ease,
                complete: () => {
                    $(new_span).animate({
                        top: 0
                    }, 70);
                }
            });
        }
    }
    /**
     * è letteralmente un ciclo for ma attendendo un determinato tempo ad ogni iterazione
     * esempio
    this.for_interval((i) => {
        console.log(i);
    }, 0, 5, 200);
     * in questo esempio ogni 200ms verra stampato i per un totale di 5 volte
     */
    /**
     * 
     * @param {Function} azione 
     * @param {Int} i valore iniziale
     * @param {Int} n valore finale
     * @param {Int} intervallo tra un'iterazione e l'altra
     * @param {Function} azione_finale funzione finale da avviare una volta terminato 
     */
    for_interval(azione, i = 0, n = 0, intervallo = 1000, azione_finale) {
        let ciclo = setInterval(() => {
            azione(i);
            if (i == n) {
                if (azione_finale) {
                    azione_finale();
                }
                clearInterval(ciclo);
            }
            i++;
        }, intervallo);
    }
}

const animazione = new Animazione();