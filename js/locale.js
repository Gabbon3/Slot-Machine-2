class Local {
    constructor() {}

    init() {
        const wallet = this.get('GiapanSlot-wallet');
        if (!wallet) {
            this.set('GiapanSlot-wallet', utente.wallet);
        } else {
            utente.wallet = parseFloat(wallet);
        } 
    }

    get(item) {
        localStorage.getItem(item);
    }

    set(item, value) {
        localStorage.setItem(item, value);
    }
}

const local = new Local();