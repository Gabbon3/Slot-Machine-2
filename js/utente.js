class Utente {
    constructor() {
        this.wallet = config.default_wallet;
    }

    reset() {
        this.wallet = config.default_wallet;
        this.html_wallet();
    }

    html_wallet() {
        $('#wallet').html(this.wallet.toFixed(2) + '€');
    }

    spin(puntata) {
        if (puntata > this.wallet) {
            alert('Non hai abbastanza credito');
            return false;
        }
        if (!slot._scatter && !animazione.is_shuffle) {
            this.wallet -= puntata;
            this.html_wallet();
            return true;
        } else {
            this.html_wallet();
            return true;
        }
    }
}

const utente = new Utente();