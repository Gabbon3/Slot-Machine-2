class Animazione {
    constructor() {
        this.is_shuffle = false;
        this.velocita_animazione = 500; //
    }
    shuffle() {
        if (this.is_shuffle) return;
        this.is_shuffle = true;
        $('#vincita').hide();
        const colonne = geta('.col');
        let k = 0;
        for (let i = 0; i < config.colonne; i++) {
            this.anima_colonna(colonne[i], i, this.velocita_animazione, k);
            k++;
        }
    }
    /**
     * 
     * @param {HTML} result 
     * @returns 
     */
    genera_colonna(result, indice_colonna = 0) {
        const span = document.createElement('span');
        let txt = '';
        let numero_righe = result ? result.length : random.min_max(2, config.righe);
        let height = 100 / numero_righe;
        for (let r = 0; r < numero_righe; r++) {
            const item = result ? result[r].index : items.get();
            txt += `<div id='cr${indice_colonna}${r}' class="item motif ${html.item_bc(item)}" style="height: ${height}%">${html.items_to_emoji(item)}</div>`;
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
            const new_span = animazione.genera_colonna(items.griglia[indice_colonna], indice_colonna);
            new_span.style.top = '-100%';
            colonna.appendChild(new_span);
            $(new_span).animate({
                top: animazione.velocita_animazione > 500 ? '15px' : '20px'
            }, {
                duration: (timeout * 0.5),
                easing: animazione.velocita_animazione > 500 ? 'linear' : 'swing',
                complete: () => {
                    $(new_span).animate({
                        top: 0
                    }, 70);
                    // se ultima colonna
                    if (indice_colonna == (config.colonne - 1)) {
                        animazione.mostra_vincita();
                    }
                }
            });
        }
    }
    /**
     * evidenzia i simboli che hanno vinto
     */
    mostra_vincita() {
        if (slot.simboli_vincenti.length == 0) {
            end();
            return;
        }
        this.for_interval((i) => {
            // simbolo vincente
            const vincente = slot.simboli_vincenti[i];
            // console.log(vincente);
            // per ogni colonna
            for (let c = 0; c < vincente.colonna; c++) {
                // per ogni riga presente nella colonna[c]
                for (let r = 0; r < items.griglia[c].length; r++) {
                    const current = items.griglia_indici[c][r];
                    if (current == vincente.index || current == config.i_wild) {
                        const target = `#cr${c}${r}`;
                        $(target).addClass('win');
                    }
                }
            }
        }, 0, (slot.simboli_vincenti.length - 1), 350, () => {
            end();
            // stampa il guadagno
        });
        function end() {
            if (slot.simboli_espansione.length > 0) {
                animazione.simboli_espansione();
            } else {
                // verifico la presenta degli scatter
                slot.scatter();
                $('#vincita').show();
                $('#vincita').html(html.better_value(slot.vincita_giro));
                // utente
                utente.wallet += slot.vincita_giro;
                utente.html_wallet();
                html.mostra_calcoli(' = ' + slot.vincita_giro.toFixed(2) + '€');
                animazione.is_shuffle = false;
            }
            // ---
        }
    }
    simboli_espansione() {
        const copia_griglia = items.griglia_indici.map(subArray => [...subArray]);
        this.for_interval((s) => {
            const simbolo_espansione = slot.simboli_espansione[s];
            const elementi_minimi_simbolo = config.colonne - config.moltiplicatori[simbolo_espansione].length + 1;
            // creo una copia deglla griglia
            const g = items.griglia_indici.map(subArray => [...subArray]);
            const griglia_espansione = [];
            for (let c = 0; c < config.colonne; c++) {
                // se la colonna attuale contiene il simbolo espansione
                if (g[c].includes(simbolo_espansione)) {
                    let colonna_espansione = [];
                    // lo espando
                    for (let i = 0; i < g[c].length; i++) {
                        g[c][i] = simbolo_espansione;
                        colonna_espansione.push(simbolo_espansione);
                    }
                    griglia_espansione.push(colonna_espansione);
                }
            }
            if (griglia_espansione.length >= elementi_minimi_simbolo) {
                slot.vincita_giro += slot.calcola_vincita(griglia_espansione, 0);
                animazione.espandi_griglia(g, simbolo_espansione);
            }
        }, 0, (slot.simboli_espansione.length - 1), 650, () => {
            // verifico la presenta degli scatter
            slot.scatter();
            // ---
            $('#vincita').show();
            $('#vincita').text(html.better_value(slot.vincita_giro));
            // utente
            utente.wallet += slot.vincita_giro;
            utente.html_wallet();
            // ---
            html.mostra_calcoli(' = <b>' + slot.vincita_giro.toFixed(2) + '€</b>');
            animazione.is_shuffle = false;
            slot.giri_bonus--;
            $('#giri_bonus').text(slot.giri_bonus);
            // disattivo la funzione scatter
            if (slot.giri_bonus == 0) {
                slot._scatter = false;
                slot.simboli_espansione = [];
                slot.moltiplicatori_scatter = {};
                config.moltiplicatori = slot.copia_moltiplicatori.slice();
            }
            html.scatter();
        });
    }
    espandi_griglia(griglia_espansa, simbolo_espansione) {
        // per ogni colonna
        for (let c = 0; c < config.colonne; c++) {
            this.for_interval((r) => {
                if (items.griglia_indici[c][r] != griglia_espansa[c][r] || items.griglia_indici[c][r] == simbolo_espansione) {
                    $(`#cr${c}${r}`).addClass('win');
                    $(`#cr${c}${r}`).html(html.items_to_emoji(simbolo_espansione));
                } else {
                    $(`#cr${c}${r}`).removeClass('win');
                    $(`#cr${c}${r}`).html(html.items_to_emoji(items.griglia_indici[c][r]));
                }
            }, 0, (items.griglia_indici[c].length - 1), 20);
        }
    }
    /**
     * gestisce l'animazione per i giri bonus
     * @param {Int} simbolo_espansione 
     * @param {Int} giri_bonus 
     */
    attivazione_scatter(simbolo_espansione, giri_bonus, max_giri) {
        $('#scatter_container').fadeIn(100);
        $('#giri_bonus').hide();
        this.for_interval((i) => {
            // ---
            result();
            // ---
        }, 0, 20, 100, () => {
            let timeout = 200;
            animazione.for_interval((j) => {
                // ---
                result();
                // ---
                timeout += 200;
            }, 0, 5, timeout, () => {
                // stampa finale
                result(simbolo_espansione, giri_bonus);
            });
        });
        function result(simbolo, giri) {
            if (!simbolo) {
                simbolo = config.emoji[random.min_max(1, config.n_emoji - 1)];
                giri = random.min_max(2, max_giri);
            } else {
                simbolo = config.emoji[simbolo];
            }
            // ---
            if (simbolo_espansione) {
                $('#simbolo_espansione_scatter').html(simbolo);
            } else {
                $('#simbolo_espansione_scatter').html('');
            }
            $('#numero_giri').text(giri);
            setTimeout(() => {
                $('#scatter_container').fadeOut(100);
                $('#giri_bonus').show();
            }, 5000);
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