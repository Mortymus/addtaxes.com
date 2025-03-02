// Calculational functions

// Adding tax
function addTax(amountObject, provinceObject) {
    let input = validateInput();
    if (input > 0 || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        amountObject.gst = amountObject.amount * (provinceObject.gst / 100);
        amountObject.pst = amountObject.amount * (provinceObject.pst / 100);
        amountObject.hst = amountObject.amount * (provinceObject.hst / 100);
        amountObject.total = amountObject.amount + amountObject.gst 
            + amountObject.pst + amountObject.hst; 
        showAmount(amountObject, provinceObject, "+ ");
    }
};


// Deducting tax
function deductTax(amountObject, provinceObject) {
    let input = validateInput();
    if (input > 0 || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        let totalTax = provinceObject.gst + provinceObject.pst + provinceObject.hst;     
        let deduction = input - (input / (1 + 
            (totalTax / 100)));
        amountObject.gst = deduction * (provinceObject.gst / totalTax);
        amountObject.pst = deduction * (provinceObject.pst / totalTax);
        amountObject.hst = deduction * (provinceObject.hst / totalTax);
        amountObject.total = input - amountObject.gst
            - amountObject.pst - amountObject.hst;
        showAmount(amountObject, provinceObject, "- ")
    }
};


// Calculating tax
function calculateTax(amountObject, provinceObject) {
    let input = validateInput();
    if (input > 0 /*&& amountObject.total == 0*/ || input != amountObject.amount) {
        resetTip(amountObject);
        amountObject.amount = input;
        let totalTax = provinceObject.gst + provinceObject.pst + provinceObject.hst; 
        let deduction = input - (input / (1 + 
            (totalTax / 100)));
        amountObject.gst = deduction * (provinceObject.gst / totalTax);
        amountObject.pst = deduction * (provinceObject.pst / totalTax);
        amountObject.hst = deduction * (provinceObject.hst / totalTax);
        amountObject.total = input;
        showAmount(amountObject, provinceObject, "incl. ");
    }
};


// Adding tips
function addTip(amountObject, provinceObject, rate) {
    hideMenu("drop-down-tip")
    if (document.getElementById("amount").value !== "" || amountObject.amount === 0) {
        let input = validateInput();
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
        let operator = "+ ";
        amountObject.tipRate = rate; 
        if (amountObject.total === 0) {
            amountObject.tip = amountObject.amount * (amountObject.tipRate / 100);
            amountObject.tipTotal = amountObject.amount + amountObject.tip;
        } else if (amountObject.total > 0) {
            amountObject.tip = amountObject.total * (amountObject.tipRate / 100);
            amountObject.tipTotal = amountObject.total + amountObject.tip;
        }
        if (amountObject.amount > amountObject.total) {
            operator = "- ";
        }
        if (amountObject.amount == amountObject.total) {
            operator = "incl. ";
        }
        
        showAmount(amountObject, provinceObject, operator);
    }
}


function resetTip(amountObject) {
    amountObject.tipRate = 0;
    amountObject.tip = 0;
    amountObject.tipTotal = 0;
}


// Validation of input
function validateInput() {
    let input = document.getElementById("amount").value.replace(",", ".");
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
        error += "A maximum of 14 digits is allowed to enter amount.\n";
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