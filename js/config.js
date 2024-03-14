class Config {
    constructor() {
        this.righe = 7;
        this.colonne = 6;
        this.i_wild = 0; // indice del wild
        this.i_scatter = 0; // indice dello scatter
        // this.emoji = [
        //     '💲',
        //     '🛸',
        //     '👽',
        //     '🛰️',
        //     '🚀',
        //     '📡',
        //     '🌍'
        // ];
        this.emoji = [
            '<img src="./img/tavola_aliena_oro.png"></img>', // 1 - wild e scatter
            '<img src="./img/faraone_alieno.png"></img>', // 2
            '<img src="./img/guardia_faraone.png"></img>', // 3
            '<img src="./img/piramide.png"></img>', // 4
            '<img src="./img/ufo.png"></img>', // 5
            '<img src="./img/card_a.png"></img>', // 6
            '<img src="./img/card_k.png"></img>', // 7
            '<img src="./img/card_q.png"></img>', // 8
            '<img src="./img/card_j.png"></img>', // 9
            '<img src="./img/card_10.png"></img>', // 10
        ];
        this.n_emoji = this.emoji.length;
        this.max_random_number = 10000;
        this.rarita = [
            10,
            15,
            20,
            28,
            34,
            40,
            40,
            45,
            50,
            50,
        ];
    }
}

const config = new Config();