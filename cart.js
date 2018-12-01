$(document).ready(() => init())

function validateEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validateName(name) {
    if (name) return true
    else return false
}

function validateCard(card) {
    let regex = /^.{12,16}$/
    return regex.test(Number(card))
}
let getUrlParam = function getUrlParam(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function validateInput(name, email, card) {
    if ((validateName(name)) && (validateEmail(email)) && (validateCard(card))) {
        window.location.href = "./receipt.html";
    }
}

function init() {
    let total = getUrlParam("total")
    let totalID = $("#totalInput")
    totalID.val(total)
    console.log('cart loaded')
}