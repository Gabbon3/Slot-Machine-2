class HTML {
    constructor() {
        this.items = items._init_griglia();
    }
    /**
     * inizializza l'html della pagina
     */
    init(griglia) {
        let txt = '';
        if (!griglia) {
            items.set_griglia();
            griglia = items.griglia_indici;
        }
        // ----
        for (let c = 0; c < config.colonne; c++) {
            let col = '<div class="col" id="c' + c + '"><span>';
            const numero_righe = griglia[c].length;
            for (let r = 0; r < numero_righe; r++) {
                const current_item = griglia[c][r];
                col += `<div class="item motif ${this.item_bc(current_item)}" id='cr${c}${r}'>${this.items_to_emoji(current_item)}</div>`;
            }
            col += '</span></div>';
            txt += col;
        }
        get1('#display').innerHTML = txt;
        // ---
        let prev_r = 0;
        get1('#informazioni tbody').innerHTML = '';
        for (let i = 0; i < config.n_emoji; i++) {
            const r = config.rarita[i] * 100;
            const html = `
                <tr>
                    <th scope="row">${config.nomi_emoji[i]}</th>
                    <td id="r_${i}">${(r - prev_r).toFixed(2)}%</td>
                    <td id="m_${i}">${html_moltiplicatori(config.moltiplicatori[i])}</td>
                </tr>
            `;
            get1('#informazioni tbody').innerHTML += html;
            prev_r = r;
        }

        function html_moltiplicatori(moltiplicatori_simbolo) {
            let text = '';
            const min = config.colonne - moltiplicatori_simbolo.length + 1;
            for (let i = 0; i < moltiplicatori_simbolo.length; i++) {
                text += (min + i) + 'x: ' + moltiplicatori_simbolo[i] + '<br>';
            }
            return text;
        }
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
        if (slot.simboli_espansione.includes(index) || index == 0) {
            classe = 'gold'
        } else if (index == 4 || index == 5) {
            classe = 'green'
        } else if (index == 2 || index == 3) {
            classe = 'blue'
        } else if (index == 1) {
            classe = 'purple'
        }
        return classe;
    }
    mostra_calcoli(txt) {
        get1('#calcoli_demo').innerHTML += txt + '<br><br>';
    }
    scatter() {
        $('#puntata').prop('disabled', slot._scatter);
        $('#html_giri_bonus').text(slot.giri_bonus);
        // se scatter attivo
        if (slot._scatter) {

        } else {

        }
    }
    /**
     * 
     */
    spin(puntata) {
        get1('#calcoli_demo').innerHTML = '';
        const vincita = slot.spin(puntata);
    }
}

const html = new HTML();