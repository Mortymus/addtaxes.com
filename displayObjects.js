// Display province object
function showProvince(provinceObject) {
    document.getElementById("province").innerText = province.name;
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
function showAmount(amountObject, provinceObject, operator) {
    const rateNames = ["% GST:", "$ PST:", "$ HST:"];
    const rates = [provinceObject.gst, provinceObject.pst, provinceObject.hst];
    const rateDisplays = [document.getElementById("gst-text"),
        document.getElementById("pst-text"), document.getElementById("hst-text")];
    const taxes = [amountObject.gst, amountObject.pst, amountObject.hst];
    const taxDisplays = [document.getElementById("gst-amount"), 
        document.getElementById("pst-amount"), document.getElementById("hst-amount")]; 
    document.getElementById("amount-text").innerText = "Amount:";
    document.getElementById("amount-amount").innerText = amountObject.amount.toFixed(2) + "$";
    for (let i = 0; i < rates.length; i++) {
        if (rates[i] > 0) {
            rateDisplays[i].style.display = "";
            taxDisplays[i].style.display = "";
            rateDisplays[i].innerText = operator + rates[i] + rateNames[i];
            taxDisplays[i].innerText = taxes[i].toFixed(2) + "$";
        } else {
            rateDisplays[i].style.display = "none";
            taxDisplays[i].style.display = "none";
        }
    }
    document.getElementById("total-text").innerText = "Total:";
    document.getElementById("total-amount").innerText = amountObject.total.toFixed(2) + "$";
}


// Clearing input, amount object and output
function clearInput(amountObject) {
    document.getElementById("amount").value = "";
    amountObject.amount = 0;
    amountObject.gst = 0;
    amountObject.pst = 0;
    amountObject.hst = 0;
    amountObject.total = 0;
    clearAmount();
    console.log(amountObject);
};


// Clearing output
function clearAmount() {
    const displays = [ 
        document.getElementById("amount-text"),
        document.getElementById("amount-amount"),
        document.getElementById("gst-text"),
        document.getElementById("gst-amount"),
        document.getElementById("pst-text"),
        document.getElementById("pst-amount"),
        document.getElementById("hst-text"),
        document.getElementById("hst-amount"),
        document.getElementById("total-text"),
        document.getElementById("total-amount"),
    ];
    for (let i = 0; i < displays.length; i++) {
        displays[i].innerText = "";
        displays[i].style.display = "";
    };
};