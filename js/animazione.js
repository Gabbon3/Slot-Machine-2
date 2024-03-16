class Animazione {
    constructor() {
        this.is_shuffle = false;
    }
    shuffle() {
        if (this.is_shuffle) return;
        this.is_shuffle = true;
        const colonne = geta('.col');
        this.for_interval((i) => {
            this.anima_colonna(colonne[i], i, 600, 1);
        }, 0, config.colonne - 1, 50);
    }
    /**
     * 
     * @param {HTML} result 
     * @returns 
     */
    genera_colonna(result) {
        const span = document.createElement('span');
        let txt = '';
        let numero_righe = result ? result.length : random.min_max(2, config.righe);
        let height = 100 / numero_righe;
        for (let i = 0; i < numero_righe; i++) {
            const item = result ? result[i].index : items.get();
            txt += `<div class="item motif ${html.item_bc(item)}" style="height: ${height}%">${html.items_to_emoji(item)}</div>`;
        }
        span.innerHTML = txt;
        return span;
    }
    /**
     * 
     * @param {HTML} colonna indice colonna
     * @param {*} timeout millisecondi
     * @param {*} n quante volte animarla
     */
    anima_colonna(colonna, indice_colonna, timeout, n = 3) {
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
            const new_span = animazione.genera_colonna(items.griglia[indice_colonna], true);
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
                    // se ultima colonna
                    if (indice_colonna == (config.colonne - 1)) {
                        animazione.is_shuffle = false;
                    }
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