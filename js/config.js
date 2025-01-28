class Config {
    constructor() {
        this.version = '1.2.0';
        this.righe = 7;
        this.colonne = 6;
        this.i_wild = 0; // indice del wild
        this.i_scatter = 0; // indice dello scatter
        this.n_scatter_minimi = 3;
        this.default_wallet = 5000;
        this.moltiplicatore_acquista_bonus = 125;
        this.k_molticatore_scatter = 0.5;
        this.emoji = [
            '<img src="./img/abdul.gif"></img>', // 0 - wild e scatter
            '<img src="./img/kebab.png"></img>', // 1
            '<img src="./img/pane.png"></img>', // 3
            '<img src="./img/carne.png"></img>', // 4
            '<img src="./img/patatine.jpg"></img>', // 7
            '<img src="./img/salsa bianca.png"></img>', // 5
            '<img src="./img/salsa piccante.png"></img>', // 6
            '<img src="./img/cipolla.png"></img>', // 8
            '<img src="./img/cavolo-rosso.png"></img>', // 8
            '<img src="./img/verza.png"></img>', // 9
            '<img src="./img/pomodori.png"></img>', // 10
            '<img src="./img/insalata.png"></img>', // 11
        ];
        this.nomi_emoji = [
            'Panda',
            'Sakura',
            'Lanterna',
            'Ventaglio',
            'Sushi',
            'Bamboo',
            'A',
            'K',
            'Q',
            'J',
            '10',
            '9',
        ]
        this.n_emoji = this.emoji.length;
        this.max_random_number = 10000;
        this.rarita = [
            1.7, // 0
            8, // 1
            8.5, // 2
            9, // 3
            9.5, // 4
            10, // 5
            10.5, // 6
            11, // 7
            11.5, // 8
            12, // 9
            12, // 10
            12, // 11
        ];
        this.moltiplicatori = [
            [2.5], 
            [0.25, 0.5, 0.75, 1.25, 2.5], 
            [0.25, 0.5, 0.9, 1.5], 
            [0.25, 0.45, 0.8, 1.25], 
            [0.25, 0.4, 0.7, 1.1], 
            [0.25, 0.35, 0.6, 1], 
            [0.15, 0.25, 0.4, 0.65], 
            [0.15, 0.25, 0.35, 0.6], 
            [0.15, 0.25, 0.35, 0.55], 
            [0.1, 0.2, 0.3, 0.5], 
            [0.1, 0.2, 0.3, 0.5], 
            [0.1, 0.2, 0.3, 0.5]
        ];
        /* moltiplicatori del gabbone 
        this.moltiplicatori = [
            [5.0], // 0
            [0.5, 1.0, 1.5, 2.5, 5.0], // 1
            [0.5, 1.0, 1.8, 3.0], // 2
            [0.5, 0.9, 1.6, 2.5], // 3
            [0.5, 0.8, 1.4, 2.2], // 4
            [0.5, 0.7, 1.2, 2.0], // 5
            [0.3, 0.5, 0.8, 1.3], // 6
            [0.3, 0.5, 0.7, 1.2], // 7
            [0.3, 0.5, 0.7, 1.1], // 8
            [0.2, 0.4, 0.6, 1.0], // 9
            [0.2, 0.4, 0.6, 1.0], // 10
            [0.2, 0.4, 0.6, 1.0], // 11
        ] */
    }
}

const config = new Config();

// for (let i = 0; i < config.moltiplicatori.length; i++) {
//     const simbolo = config.moltiplicatori[i];
//     for (let s = 0; s < simbolo.length; s++) {
//         simbolo[s] = parseFloat((simbolo[s] * 0.5).toFixed(2));
//     }
// }

/**

3 Capricciose
Olive
Salamino
Prosciutto e Funghi

 */