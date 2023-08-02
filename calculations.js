// Calculational functions

// Informational objects with initial values

const province = {
    name: "Alberta",
    gst: 10,
    pst: 5,
    hst: 20,
};


const amount = {
    amount: 250,
    gst: 0,
    pst: 0,
    hst: 0,
    total: 0,
};


function calculateAdd(amountObject, tax) {
    if (amountObject.amount > 0) {
        return amountObject.amount * (tax/100);
    } else {
        return 0;
    };
};


function calculateDeduct(amountObject, tax) {
    if (amountObject.amount > 0) {
        return amountObject.amount / (1+tax/100);
    } else {
        return 0;
    }
};


function validateInput(input) {
    let error = "";
    if (isNaN(input)) {
        error += "You have to enter an amount using only numbers.\n";
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


function clearInput(amountObject) {
    document.getElementById("amount").value = "";
    amountObject.amount = 0;
    amountObject.gst = 0;
    amountObject.pst = 0;
    amountObject.hst = 0;
    amountObject.total = 0;
    console.log(amountObject);
};


function addTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0) {
        amountObject.amount = input;
        console.log("amountObject.amount" + amountObject.amount);
        amountObject.gst = amountObject.amount * (provinceObject.gst / 100);
        amountObject.pst = amountObject.amount * (provinceObject.pst / 100);
        amountObject.hst = amountObject.amount * (provinceObject.hst / 100);
        amountObject.total = amountObject.amount + amountObject.gst 
        + amountObject.pst + amountObject.hst; 
        console.log(amountObject);
        console.log(provinceObject);
    }
};


function deductTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0) {
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
    }
};


function calculateTax(amountObject, provinceObject) {
    let input = validateInput(document.getElementById("amount").value);
    if (input > 0) {
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
    }
};

function showProvince(provinceObject) {
    document.getElementById("province").innerHTML = province.name;
    let gst = document.getElementById("gst");
    let pst = document.getElementById("pst");
    let hst = document.getElementById("hst");
    const rates = [provinceObject.gst, provinceObject.pst, provinceObject.hst];
    const displays = [gst, pst, hst];
    const texts = ["% GST", "% PST", "% HST"]
    for (let i = 0; i < rates.length; i++) {
        if (rates[i] === 0) {
            displays[i].innerText = "";
        } else {
            let feedback = "";
            if (i > 0) {
                feedback = " + ";
            }
            feedback += rates[i] + texts[i];
            displays[i].innerText = feedback;
        };
    };
};