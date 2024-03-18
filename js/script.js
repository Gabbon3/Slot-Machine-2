function get1(target) {
    return document.querySelector(target);
}

function geta(target) {
    return document.querySelectorAll(target);
}

const dom = {
    show(target) {
        get1(target).style.display = 'block';
    },
    hide(target) {
        get1(target).style.display = 'none';
    }
}