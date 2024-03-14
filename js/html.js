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
        for (let c = 0; c < config.colonne; c++) {
            let col = '<div class="col" id="c' + c + '"><span>';
            for (let r = 0; r < config.righe; r++) {
                col += `<div class="item" id='rc${r}${c}'>${this.items_to_emoji(items.griglia[r][c].index)}</div>`;
            }
            col += '</span></div>';
            txt += col;
        }
        get1('#display').innerHTML = txt;
        for (let r = 0; r < config.righe; r++) {
            for (let c = 0; c < config.colonne; c++) {
                this.items[r][c] = get1(`#rc${r}${c}`);
            }
        }
    }
    /**
     * 
     * @param {Int} index 
     */
    items_to_emoji(index) {
        return config.emoji[index];
    }
}

const html = new HTML();