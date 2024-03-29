class HTML {
    constructor() {
        this.items = items._init_griglia(true);
    }
    /**
     * inizializza l'html della pagina
     */
    init(griglia) {
        $('#info_molt_acquisto_bonus').text(config.moltiplicatore_acquista_bonus);
        $('#prezzo_funzione_bonus').text(slot.prezzo_funzione_bonus.toFixed(2));
        // ---
        let txt = '';
        if (!griglia) {
            items.set_griglia(true);
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
                    <th scope="row">${config.emoji[i]}</th>
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
        } else if ([11, 10, 9].includes(index)) {
            classe = 'molto_comuni'
        } else if ([8, 7, 6].includes(index)) {
            classe = 'comuni'
        } else if (index == 4) {
            classe = 'sushi'
        } else if (index == 5) {
            classe = 'bamboo'
        } else if (index == 2) {
            classe = 'lanterna'
        } else if (index == 3) {
            classe = 'ventaglio'
        } else if (index == 1) {
            classe = 'katana'
        }
        return classe;
    }
    mostra_calcoli(txt) {
        get1('#calcoli_demo').innerHTML += txt + '<br><br>';
    }
    scatter() {
        $('#puntata').prop('disabled', slot._scatter);
        $('#giri_bonus').text(slot.giri_bonus);
        // se scatter attivo
        if (slot._scatter) {
            $('#giri_bonus').show();
        } else {
            $('#giri_bonus').hide();
        }
    }
    /**
     * 
     */
    spin() {
        get1('#calcoli_demo').innerHTML = '';
        const vincita = slot.spin();
    }
    better_value(number) {
        number = Number(number).toFixed(2);
        number = number.split('.');
        number[0] = [...[...number[0]].reverse().join('').match(/.{1,3}/g).join('.')].reverse().join('');
        // if (number.length <= 3) return number;
        return number.join(',');
    }
}

const html = new HTML();