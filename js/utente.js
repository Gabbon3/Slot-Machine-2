class Utente {
    constructor() {
        this.wallet = config.default_wallet;
    }

    reset() {
        this.wallet = config.default_wallet;
        this.html_wallet();
    }

    html_wallet() {
        local.set('GiapanSlot-wallet', this.wallet);
        $('#wallet').html(html.better_value(this.wallet) + '£');
    }

    spin(puntata) {
        const pagamento_valido = this.valida_pagamento(puntata);
        if (!pagamento_valido && !slot._scatter) {
            alert('You don\'t have enough credit');
            return false;
        }
        if (!slot._scatter && !animazione.is_shuffle) {
            this.wallet -= puntata;
        }
        this.html_wallet();
        return true;
    }

    compra_funzione_bonus() {
        const pagamento_valido = this.valida_pagamento(slot.prezzo_funzione_bonus);
        if (pagamento_valido) {
            this.wallet -= slot.prezzo_funzione_bonus;
            this.html_wallet();
            items.n_scatter = 3
            slot.scatter();
        } else {
            alert("Warning. You do not have enough credit to buy the bonus feature");
        }
    }
    /**
     * restituisce true se il pagamento puo essere effettuato
     * quindi senza mandare il credito in negativo
     * @param {Float} prezzo 
     * @returns 
     */
    valida_pagamento(prezzo) {
        return prezzo <= this.wallet;
    }
}

const utente = new Utente();