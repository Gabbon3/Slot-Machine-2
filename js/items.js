class Items {
    constructor() {
        this.griglia = []; // contiene una lista di array, ogni array rappresenta una colonna
        this.griglia_indici = [];
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
        for (let c = 0; c < config.colonne; c++) {
            let numero_righe = this.griglia[c].length;
            for (let r = 0; r < numero_righe; r++) {
                const nuovo_simbolo = this.inizializza_nuovo_simbolo(c, r, indice)
                this.griglia[c][r] = nuovo_simbolo;
                this.griglia_indici[c][r] = nuovo_simbolo.index;
                if (this.griglia[c][r].index == config.indice_scatter) {
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
        this.griglia_indici = [];
        // per ogni colonna
        for (let c = 0; c < config.colonne; c++) {
            let numero_righe = random.min_max(2, config.righe);
            let colonna_matrice = [];
            // per ogni riga
            for (let r = 0; r < numero_righe; r++) {
                colonna_matrice.push(0);
            }
            this.griglia_indici.push([...colonna_matrice]);
            matrice.push(colonna_matrice);
        }
        return matrice;
    }
    /**
     * 
     * @param {Number} colonna 
     * @param {Number} riga 
     * @param {Number} indice forzatura indice
     * @returns 
     */
    inizializza_nuovo_simbolo(colonna, riga, indice = null) {
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