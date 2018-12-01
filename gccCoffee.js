let grandTotal = 0;
$(document).ready(() => init())

// CALLED WHEN THE DOCUMENT IS LOADED
function init() {
    console.log("Init called!");
    console.log(document.body)
    // Ensures all variables are declared here before they are used
    'use strict';
    // Sets document id properties
    let taxOutputID = $("#taxOutputID");
    let totalOutputID = $("#totalOutputID");
    let grandTotalOutputID = $("#grandTotalOutputID");
    // Makes tax and total text boxes readonly
    receiptButtonID.disabled = true;
    taxOutputID.readOnly = true;
    totalOutputID.readOnly = true;
    grandTotalOutputID.readOnly = true;
    // Declares variables
    let todayDate = new Date();
    $("#DateID").html("Today is: " + todayDate.toDateString())
    console.log(taxOutputID)
    createCoffeeJSON();
}
function createCoffeeJSON() {
    // Creates div and select objects
    var order2 = $("<div>");
    var select = $('<select/>')
    var label = $('<label>').text('Coffee Type : ')
    select.appendTo(label)
    order2.attr('id', 'order')
    select.attr('id', 'orderInput')
    // Creates XHR Object
    var xhr = new XMLHttpRequest();
    // OPEN - Type, URL/File, Async
    xhr.open('GET', 'coffee.json', true);
    xhr.onload = function () {
        if (this.status == 200) {
            let res = JSON.parse(this.responseText)
            for (var [key, val] of Object.entries(res[0])) {
                $('<option/>', { value: val, text: key }).appendTo(select)
            }
            label.appendTo(order2)
            order2.on('change', latSel)
            $("#cofimg_1").after(order2)
        }
    }
    // Sends request
    xhr.send();
}

// CALLED TO CREATE THE LATTE FLAVOR DIV
let latSel = function () {
    let latteSelect = $("#orderInput");
    console.log($("#orderInput").val())
    if (latteSelect.val() == "latte") {
        let latteFlavorArray = ["Chai", "Mocha", "Macchiato", "Pumpkin"];
        let latteFlavorDiv = document.createElement("div");
        let latteSelectDiv = document.createElement("select");
        latteFlavorDiv.setAttribute("id", "latteFlavor");
        //Create and append the options
        latteFlavorArray.forEach(flavor => {
            let option = document.createElement("option");
            option.value = flavor;
            option.text = flavor;
            latteSelectDiv.appendChild(option);
        });
        latteFlavorDiv.appendChild(latteSelectDiv);
        $(latteFlavorDiv).insertAfter(latteSelect);
    } if (latteSelect.val() != "latte" && ($("#latteFlavor")) !== null) $("#latteFlavor").remove();
}
// CALLED TO PRINT RECEIPT TO THE SCREEN
function printReceipt() {
    if ($("#grandTotalDiv")) $("#grandTotalDiv").remove();
    let receiptID = $("#receiptButtonID");
    let grandTotalDiv = document.createElement("div");
    let grandTotalText = document.createTextNode("=================\n Grand Total: $" + grandTotal.toFixed(2) + "\n=================");
    grandTotalDiv.appendChild(grandTotalText)
    grandTotalDiv.id = "grandTotalDiv";
    console.log(grandTotalDiv)
    console.log($("#receiptButtonID"))
    console.log($("#grandTotalDiv"))
    $(grandTotalDiv).insertAfter($(receiptID))
    receiptButtonID.disabled = true;
}
// CALLED TO CALCULATE THE COFFEE PRICE
function calcCoffee(orderValue, taxCodeValue, coffeeSizeValue, coffeeTempValue) {
    // Ensures all variables are declared here before they are used
    'use strict';
    // Declares variables
    let purchaseAmount = 0;
    let taxRate = 0;
    let calcTax = 0;
    let total = 0;

    let orderName = ['hazelnut', 'regular_decaf', 'regular', 'americano', 'latte']
    let orderCost = [2.25, 2.50, 2.25, 2.75, 4.00]

    // orderName.forEach(element => {
    //     if (orderValue == element) purchaseAmount = element
    // });
    for (var i = 0; i < orderName.length; i++) {
        if (orderValue == orderName[i]) {
            purchaseAmount = orderCost[i]
            break
        }
    }
    console.log(purchaseAmount)
    switch (taxCodeValue) {
        case "glendale":
            taxRate = .087;
            break;
        case "peoria":
            taxRate = .077;
            break;
        case "phoenix":
            taxRate = .09;
            break;
    }
    switch (coffeeSizeValue) {
        case "small":
        case "medium":
        case "large":
            total += .50;
            break;
        case "extraLarge":
            total += 1;
            break;
    }
    switch (coffeeTempValue) {
        case "hot":
            break;
        case "cold":
            total += .20;
            break;
    }
    console.log(total);

    if (!isNaN(purchaseAmount)) {
        calcTax = purchaseAmount * taxRate;
        total += parseFloat(purchaseAmount) + parseFloat(calcTax);
        console.log(total);
        taxOutputID.value = calcTax.toFixed(2);
        totalOutputID.value = total.toFixed(2);
    }
    if (!isNaN(total)) {
        var grandTotalCalc = function (totalInput) {
            grandTotal += totalInput;
            //return grandTotal;
        }
        grandTotalCalc(total);
        grandTotalOutputID.value = grandTotal.toFixed(2);
    }
    receiptButtonID.disabled = false;
}