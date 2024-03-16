class HTML {
    constructor() {
        this.items = items._init_griglia();
    }
    /**
     * inizializza l'html della pagina
     */
    init() {
        let txt = '';
        items.set_griglia();
        // ----
        for (let c = 0; c < config.colonne; c++) {
            let col = '<div class="col" id="c' + c + '"><span>';
            const numero_righe = items.griglia[c].length;
            for (let r = 0; r < numero_righe; r++) {
                const current_item = items.griglia[c][r].index;
                col += `<div class="item motif ${this.item_bc(current_item)}" id='rc${c}${r}'>${this.items_to_emoji(current_item)}</div>`;
            }
            col += '</span></div>';
            txt += col;
        }
        get1('#display').innerHTML = txt;
    }
    /**
     * 
     * @param {Int} index 
     */
    items_to_emoji(index) {
        return config.emoji[index];
    }
    /**
     * 
     * @param {Int} index 
     */
    item_bc(index) {
        let classe = 'base';
        if (index == 4 || index == 5) {
            classe = 'green'
        } else if (index == 2 || index == 3) {
            classe = 'blue'
        } else if (index == 1) {
            classe = 'purple'
        } else if (index == 0) {
            classe = 'gold'
        }
        return classe;
    }
    /**
     * 
     */
    spin() {
        const puntata = parseInt($('#puntata').val());
        const vincita = slot.spin(puntata);
        console.log(vincita);
    }
}

const html = new HTML();