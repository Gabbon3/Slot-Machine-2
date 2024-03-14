class Slot {
    constructor() {
        this.percorsi = [
            [
                [[0, 0], [0, 1], [1, 2], [2, 3], [2, 4]], // -\\- . -00-
                [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // ----
                [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]], // \\// . 0011
            ], // riga 1
            [
                [[1, 0], [0, 1], [0, 2], [0, 3], [1, 4]], // /--\ . 1--0
                [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // ----
                [[1, 0], [2, 1], [2, 2], [2, 3], [1, 4]], // \--/ . 0--1
            ], // riga 2
            [
                [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // ----
                [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], // //\\ . 1100
                [[2, 0], [2, 1], [1, 2], [0, 3], [0, 4]], // -//- . -11-
                [[2, 0], [1, 1], [1, 2], [1, 3], [0, 4]], // /--/ . 1--1
            ], // riga 3
        ];
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
        
    }
}

const slot = new Slot();