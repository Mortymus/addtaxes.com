// Calculational functions

// Adding tax
function addTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0 && amountObject.total == 0 || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        console.log("amountObject.amount" + amountObject.amount);
        amountObject.gst = amountObject.amount * (provinceObject.gst / 100);
        amountObject.pst = amountObject.amount * (provinceObject.pst / 100);
        amountObject.hst = amountObject.amount * (provinceObject.hst / 100);
        amountObject.total = amountObject.amount + amountObject.gst 
            + amountObject.pst + amountObject.hst; 
        console.log(amountObject);
        console.log(provinceObject);
        showAmount(amountObject, provinceObject, "+ ");
    }
};


// Deducting tax
function deductTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0 && amountObject.total == 0 || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        let totalTax = provinceObject.gst + provinceObject.pst + provinceObject.hst; 
        console.log(totalTax);
        let deduction = input - (input / (1 + 
            (totalTax / 100)));
        console.log(deduction);
        console.log("amountObject.amount" + amountObject.amount);
        amountObject.gst = deduction * (provinceObject.gst / totalTax);
        amountObject.pst = deduction * (provinceObject.pst / totalTax);
        amountObject.hst = deduction * (provinceObject.hst / totalTax);
        amountObject.total = input - amountObject.gst
            - amountObject.pst - amountObject.hst;
        console.log(amountObject);        
        console.log(provinceObject);
        showAmount(amountObject, provinceObject, "- ")
    }
};


// Calculating tax
function calculateTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0 && amountObject.total == 0 || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        let totalTax = provinceObject.gst + provinceObject.pst + provinceObject.hst; 
        console.log(totalTax);
        let deduction = input - (input / (1 + 
            (totalTax / 100)));
        console.log(deduction);
        console.log("amountObject.amount" + amountObject.amount);
        amountObject.gst = deduction * (provinceObject.gst / totalTax);
        amountObject.pst = deduction * (provinceObject.pst / totalTax);
        amountObject.hst = deduction * (provinceObject.hst / totalTax);
        amountObject.total = input;
        console.log(amountObject);        
        console.log(provinceObject);
        showAmount(amountObject, provinceObject, "incl. ");
    }
};


// Adding tips
function addTip(amountObject, provinceObject, rate) {
    hideMenu("drop-down-tip")
    if (document.getElementById("amount").value !== "" || amountObject.amount === 0) {
        let input = validateInput(document.getElementById("amount").value);
        if (input !== amountObject.amount) {
            amountObject.amount = input;
            amountObject.gst = 0;
            amountObject.pst = 0;
            amountObject.hst = 0;
            amountObject.total = 0;
            clearAmount();
        }
    }
    if (amountObject.amount > 0) {
        amountObject.tipRate = rate; 
        if (amountObject.total === 0) {
            amountObject.tip = amountObject.amount * (amountObject.tipRate / 100);
            amountObject.tipTotal = amountObject.amount + amountObject.tip;
        } else if (amountObject.total > 0) {
            amountObject.tip = amountObject.total * (amountObject.tipRate / 100);
            amountObject.tipTotal = amountObject.total + amountObject.tip;
        }
        showAmount(amountObject, provinceObject);
    }
}

/*
function addTip(amountObject, provinceObject, rate) {
    if (amountObject.tip === 0) {
        let input = validateInput(document.getElementById("amount").value);
    }
    console.log("input: " + input, input)
    if (input > 0 || amountObject.tip > 0) {
        amountObject.tipRate = rate;
        if (input === amountObject.amount) {
            amountObject.tip = amountObject.total * (rate/100);
            amountObject.tipTotal = amountObject.total + amountObject.tip;
        } else if (input !== amountObject.amount) {
            clearInput(amountObject);
            amountObject.amount = input;
            amountObject.tip = amountObject.amount * (amountObject.tipRate/100);
            amountObject.tipTotal = amountObject.amount + amountObject.tip;
        }
        showAmount(amountObject, provinceObject);
}
}
*/

function resetTip(amountObject) {
    amountObject.tipRate = 0;
    amountObject.tip = 0;
    amountObject.tipTotal = 0;
}

// Validation of input
function validateInput(input) {
    let error = "";
    if (input === "") {
        error += "You have to enter an amount.\n";
    };
    if (isNaN(input)) {
        error += "You have to enter an amount using only numbers.\n";
    };
    if (input !== "" && input <= 0) {
        error += "The entered amount must be larger than zero.\n";
    };
    if (input.length > 14) {
        error += "A maximum of 14 characters is allowed to enter amount.\n";
    };
    if (error !== "") {
        clearInput(amount);
        document.getElementById("error-msg").innerText = error;
        showMenu("error");
        return 0;
    } else {
        return parseFloat(input);
    };
};