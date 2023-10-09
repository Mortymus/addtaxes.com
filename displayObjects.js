// Display province object
function showProvince(provinceObject) {
    document.getElementById("header-province-h3").innerText = province.name;
    const rates = [provinceObject.gst, provinceObject.pst, provinceObject.hst];
    const displays = [document.getElementById("gst"), document.getElementById("pst"), 
        document.getElementById("hst")];
    const texts = ["% GST", "% PST", "% HST"]
    let feedback = "";
    for (let i = 0; i < rates.length; i++) {
        if (rates[i] === 0) {
            displays[i].innerText = "";
        } else {
            if (i === 1) {
                feedback = " + ";
            }
            feedback += rates[i] + texts[i];
            displays[i].innerText = feedback;
        };
    };
};


// Display amount object
function showAmount(amountObject, provinceObject, operator = null) {
    const rateNames = ["% GST:", "$ PST:", "$ HST:"];
    const rates = [provinceObject.gst, provinceObject.pst, provinceObject.hst];
    const rateDisplays = ["gst-text", "pst-text", "hst-text"];
    const taxes = [amountObject.gst, amountObject.pst, amountObject.hst];
    const taxDisplays = ["gst-amount", "pst-amount", "hst-amount"];
    const tips = ["+ " + amountObject.tipRate + "% tip:", amountObject.tip.toFixed(2) + "$", 
        "Total incl. tip:", amountObject.tipTotal.toFixed(2) + "$"];
    const tipDisplays = ["tip-text", "tip-amount", "tip-total-text", "tip-total-amount"];
    document.getElementById("amount-text").innerText = "Amount:";
    document.getElementById("amount-amount").innerText = amountObject.amount.toFixed(2) + "$";
    for (let i = 0; i < rates.length; i++) {
        if (taxes[i] > 0) {
            resetDisplay(rateDisplays[i]);
            resetDisplay(taxDisplays[i]);
            document.getElementById(rateDisplays[i]).innerText = operator + rates[i] + rateNames[i];
            document.getElementById(taxDisplays[i]).innerText = taxes[i].toFixed(2) + "$";
        } else {
            removeDisplay(rateDisplays[i]);
            removeDisplay(taxDisplays[i]);
        }
    }
    if (amountObject.total > 0 && amountObject.tip == 0) {
        console.log("Kjører if");
        resetDisplay("total-text");
        resetDisplay("total-amount");
        switchClasses("td-no-border", "td-border", "total-text");
        switchClasses("td-no-border", "td-border", "total-amount");
        document.getElementById("total-text").innerText = "Total:";
        document.getElementById("total-amount").innerText = amountObject.total.toFixed(2) + "$";
    } else {
        console.log("Kjører ikke if");
        switchClasses("td-border", "td-no-border", "total-text");
        switchClasses("td-border", "td-no-border", "total-amount");
        removeDisplay("total-text");
        removeDisplay("total-amount");
    };
    for (let i = 0; i < tipDisplays.length; i++) {
        if (amountObject.tip > 0) {
            resetDisplay(tipDisplays[i]);
            document.getElementById(tipDisplays[i]).innerText = tips[i];
            switchClasses("td-no-border", "td-border", "tip-total-text");
            switchClasses("td-no-border", "td-border", "tip-total-amount");
        } else {
            removeDisplay(tipDisplays[i])
            switchClasses("td-border", "td-no-border", "tip-total-text");
            switchClasses("td-border", "td-no-border", "tip-total-amount");
        };
    };
    console.log("End of showAmount(): ",amountObject);
}


// Remove display td
function removeDisplay(id) {
    document.getElementById(id).innerText = "";
    document.getElementById(id).style.display = "none";
}


// Reset display td
function resetDisplay(id) {
    document.getElementById(id).style.display = "";
}


// Clearing input, amount object and output
function clearInput(amountObject) {
    document.getElementById("amount").value = "";
    amountObject.amount = 0;
    amountObject.gst = 0;
    amountObject.pst = 0;
    amountObject.hst = 0;
    amountObject.total = 0;
    amountObject.tipRate = 0;
    amountObject.tip = 0;
    amountObject.tipTotal = 0;
    clearAmount();
    console.log(amountObject);
};


// Clearing output
function clearAmount() {
    const displays = ["amount-text", "amount-amount", 
        "gst-text", "gst-amount", "pst-text", "pst-amount", 
        "hst-text", "hst-amount", "total-text", "total-amount",
        "tip-text", "tip-amount", "tip-total-text", "tip-total-amount"];
    for (let i = 0; i < displays.length; i++) {
        removeDisplay(displays[i]);
        document.getElementById(displays[i]).innerText = "";
        document.getElementById(displays[i]).style.display = "";
    }; 
    switchClasses("td-border", "td-no-border", "total-text");
    switchClasses("td-border", "td-no-border", "total-amount");
    switchClasses("td-border", "td-no-border", "tip-total-text");
    switchClasses("td-border", "td-no-border", "tip-total-amount");
};