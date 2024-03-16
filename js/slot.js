class Slot {
    constructor() {
        this.giri_bonus = -1;
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
        // animazione
        items.set_griglia();
        animazione.shuffle();
        // ---
        const vincita = this.calcola_vincita(puntata);
        return vincita;
    }
    calcola_vincita(puntata, colonna = 0) {
        // ---
        const simboli_prima_colonna = items.griglia_indici[colonna];
        let vincita = 0;
        // ---
        for (let s = 0; s < simboli_prima_colonna.length; s++) {
            const simbolo = simboli_prima_colonna[s];
            if (simbolo == config.i_wild) {
                vincita += this.calcola_vincita(puntata, colonna + 1);
            }
            vincita += this.calcola_vincita_linea(simbolo, puntata, colonna);
        }
        return vincita;
    }
    /**
     * restituisce per quanto la puntata deve essere moltiplicata
     * @param {Number} index indice dell'elemento da verificare
     */
    calcola_vincita_linea(index, puntata, colonna) {
        // ---
        let m = 1;
        const g = items.griglia_indici;
        let c = 1;
        // ---
        for (c = colonna + 1; c < config.colonne; c++) {
            // quante volte è presente il simbolo nella colonna successiva
            const occorrenze = this.conta_occorrenze(g[c], index);
            if (occorrenze > 0) {
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
            const vincita_linea = moltiplicatore_simbolo * m * puntata;
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