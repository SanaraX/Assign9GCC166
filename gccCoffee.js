let grandTotal = 0;
$(document).ready(() => init())

// CALLED WHEN THE DOCUMENT IS LOADED
function init() {
    console.log("Init called!");
    console.log(document.body)
    // Ensures all variables are declared here before they are used
    'use strict';
    // Sets document id properties
    $("#taxOutputID").prop('readonly', true);
    $("#totalOutputID").prop('readonly', true);
    $("#grandTotalOutputID").prop('readonly', true);
    // Disables receipt button
    receiptButtonID.disabled = true;
    // Declares variables
    let todayDate = new Date();
    $("#DateID").html("Today is: " + todayDate.toDateString())
    createCoffeeJSON();
}
function createCoffeeJSON() {
    // Creates div and select objects
    var orderDiv = $("<div>");
    var orderSelectDiv = $('<select/>')
    var orderLabel = $('<label>').text('Coffee Type : ')
    orderSelectDiv.appendTo(orderLabel)
    orderDiv.attr('id', 'order')
    orderSelectDiv.attr('id', 'orderInput')
    // Creates XHR Object
    var xhr = new XMLHttpRequest();
    // OPEN - Type, URL/File, Async
    xhr.open('GET', 'coffee.json', true);
    xhr.onload = function () {
        if (this.status == 200) {
            let res = JSON.parse(this.responseText)
            for (var [key, val] of Object.entries(res[0])) {
                $('<option/>', { value: val, text: key }).appendTo(orderSelectDiv)
            }
            orderLabel.appendTo(orderDiv)
            orderDiv.on('change', latteSelectChange)
            $("#cofimg_1").after(orderDiv)
        }
    }
    // Sends request
    xhr.send();
}

// CALLED TO CREATE THE LATTE FLAVOR DIV
let latteSelectChange = function () {
    let orderSelect = $("#orderInput");
    // Creates elements and set attributes
    let latteFlavorDiv = $("<div>");
    let latteSelectDiv = $("<select>");
    let latteLabel = $('<label>').text('Latte Type : ')
    latteSelectDiv.appendTo(latteLabel)
    latteFlavorDiv.attr("id", "latteFlavor");
    latteSelectDiv.attr("id", "latteInput")
    if (orderSelect.val() == "latte") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'coffee.json', true)
        xhr.onload = function () {
            if (this.status == 200) {
                let res = JSON.parse(this.responseText)
                for (var [key, val] of Object.entries(res[1])) {
                    $('<option/>', { value: val, text: key }).appendTo(latteSelectDiv)
                }
                //Create and append the options
                latteLabel.appendTo(latteFlavorDiv);
                $("#orderInput").after(latteFlavorDiv);
                console.log(latteFlavorDiv)
            }
        }
        xhr.send();
    } if (orderSelect.val() != "latte" && ($("#latteFlavor")) !== null) $("#latteFlavor").remove();
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