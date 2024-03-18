class Slot {
    constructor() {
        this._scatter = false; // flag per memorizzare se la funzione scatter è attiva o menoù
        this.simboli_espansione = [];
        this.giri_bonus = 0;
        this.simboli_vincenti = [];
        this.vincita_giro = 0;
        this.puntata = 0;
    }
    init() {
        const l = config.n_emoji;
        configuratore.rarita._init_manuale();
        config.rarita = math.proporzione_percentuali(config.rarita, config.rarita[l - 1], l);
    }
    /**
     * esegue l'azione di spin della macchina
     * @returns {Array} array degli elementi del rullo
     */
    spin(puntata) {
        // ---
        this.puntata = puntata;
        // animazione
        items.set_griglia();
        animazione.shuffle();
        this.simboli_vincenti = [];
        // ---
        const vincita = this.calcola_vincita(items.griglia_indici);
        return vincita;
    }
    /**
     * gestisce la logica di implementazione degli scatter
     */
    scatter() {
        // se ci sono piu di tre scatter nel giro si attiva la funzione bonus
        if (items.n_scatter >= 3) {
            // ---
            let nuovo_simbolo_espansione = null;
            if (this.simboli_espansione.length < 4) {
                nuovo_simbolo_espansione = random.min_max(1, config.n_emoji - 1);
                while (this.simboli_espansione.includes(nuovo_simbolo_espansione)) {
                    nuovo_simbolo_espansione = random.min_max(1, config.n_emoji - 1);
                }
            }
            this.simboli_espansione.push(nuovo_simbolo_espansione);
            /*
            Se lo scatter è già attivo allora il massimo numero di giri bonus è 7
            se no è 12 di default
            */
            const MAX_giri_bonus = this._scatter ? 7 : 12;
            const giri_bonus = random.min_max(3, MAX_giri_bonus);
            // ---
            this.giri_bonus += giri_bonus;
            // indico che la funzione scatter è attiva
            this._scatter = true;
            html.scatter();
            // animazione
            alert('Complimenti! Hai attivato la funzione bonus! Clicca ok per continuare.');
            animazione.attivazione_scatter(nuovo_simbolo_espansione, giri_bonus, MAX_giri_bonus);
        }
    }
    calcola_vincita(g, colonna = 0) {
        // ---
        const griglia = g.map(subArray => [...subArray]);
        const simboli_prima_colonna = this.rimuovi_duplicati(griglia[colonna]);
        let vincita = 0;
        this.vincita_giro = 0;
        // ---
        for (let s = 0; s < simboli_prima_colonna.length; s++) {
            const simbolo = simboli_prima_colonna[s];
            if (simbolo == config.i_wild && colonna < config.colonne) {
                vincita += this.calcola_vincita(griglia, colonna + 1);
            }
            vincita += this.calcola_vincita_linea(simbolo, griglia, colonna);
        }
        this.vincita_giro = vincita;
        return vincita;
    }
    /**
     * restituisce per quanto la puntata deve essere moltiplicata
     * @param {Number} index indice dell'elemento da verificare
     */
    calcola_vincita_linea(index, griglia) {
        // ---
        let m = 1;
        const g = griglia;
        const n_colonne = griglia.length;
        let c = 0;
        // ---
        for (c = 0; c < n_colonne; c++) {
            // quante volte è presente il simbolo nella colonna successiva
            const occorrenze = this.conta_occorrenze(g[c], index);
            if (occorrenze > 0) {
                // m += occorrenze > 1 ? occorrenze : 0;
                m *= occorrenze;
            } else {
                break;
            }
        }
        // ---
        // o 2 o 3 dipende
        const elementi_minimi_simbolo = config.colonne - config.moltiplicatori[index].length + 1;
        if (c >= elementi_minimi_simbolo) {
            const moltiplicatore_simbolo = config.moltiplicatori[index][c - elementi_minimi_simbolo];
            let vincita_linea = moltiplicatore_simbolo * this.puntata;
            if (m > 0) {
                vincita_linea *= m;
            }
            // memorizzo che questo indice ha vinto
            this.simboli_vincenti.push({
                index: index, // indice del simbolo che ha vinto
                colonna: c, // fino alla colonna c
            });
            // html
            html.mostra_calcoli(config.nomi_emoji[index] + ": " + vincita_linea.toFixed(2) + '€ = ' + moltiplicatore_simbolo + " * " + (m == 0 ? 1 : m) + " * " + this.puntata);
            // ---
            // restituisco la vincita
            return vincita_linea;
        } else {
            return 0;
        }
        // ---
    }
    conta_occorrenze(array, element) {
        let occorrenze = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == element || array[i] == config.i_wild) {
                occorrenze++;
            }
        }
        return occorrenze;
    }
    rimuovi_duplicati(array) {
        const set = new Set(array);
        return [...set];
    }
}

const slot = new Slot();