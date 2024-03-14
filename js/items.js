class Items {
    constructor() {
        this.griglia = [];
        this.griglia_by_col = [];
        this.n_scatter = 0; // conteggio scatter
    }
    /**
     * restituisce un item casuale
     */
    get() {
        // numero casuale utile all'estrazione
        const numero = random.min_max(0, config.max_random_number);
        // risultato finale - usato anche per iterare
        const length = config.rarita.length - 1;
        let result = length;
        for (let i = 0; i < length; i++) {
            // numero < max_number * n% dove n < 1
            if (numero < (config.max_random_number * config.rarita[i])) {
                result = i;
                break;
            }
        }
        return result;
    }
    /**
     * gestisce l'intero processo di restituzione degli elementi
     * @param {Number} indice crea una griglia di un singolo simbolo **sperimentale
     */
    set_griglia(indice = null) {
        // inizializzo
        this.griglia = this._init_griglia();
        this.n_scatter = 0;
        // ----
        for (let r = 0; r < config.righe; r++) {
            for (let c = 0; c < config.colonne; c++) {
                this.griglia[r][c] = this.inizializza_nuovo_simbolo(r, c, indice);
                if (this.griglia[r][c].index == config.indice_scatter) {
                    this.n_scatter++;
                }
            }
        }
    }
    /**
     * restituisce l'array della griglia
     * @returns {Array} griglia
     */
    _init_griglia() {
        let matrice = [];
        for (let riga = 0; riga < config.righe; riga++) {
            let riga_matrice = [];
            for (let colonna = 0; colonna < config.colonne; colonna++) {
                riga_matrice.push(0);
            }
            matrice.push(riga_matrice);
        }
        return matrice;
    }
    /**
     * 
     * @param {Number} riga 
     * @param {Number} colonna 
     * @param {Number} indice forzatura indice
     * @returns 
     */
    inizializza_nuovo_simbolo(riga, colonna, indice = null) {
        const indice_del_simbolo = indice != null ? indice : this.get(config.rarita);
        // creo un nuovo oggetto per memorizzare l'item
        const result = {
            r: riga,
            c: colonna,
            index: indice_del_simbolo,
        };
        return result;
    }
}

const items = new Items();