// Calculational functions

// Informational objects with initial values

const province = {
    name: "Alberta",
    gst: 2,
    pst: 3,
    hst: 15,
};

const amount = {
    amount: 15,
    gst: 0,
    pst: 0,
    hst: 0,
    total: 0,
    operation: "add",
};

function showProvince() {
    document.getElementById("province").innerHTML = province.name;
    let gst = document.getElementById("gst");
    let pst = document.getElementById("pst");
    let hst = document.getElementById("hst");
    const rates = [province.gst, province.pst, province.hst];
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


function showAmount() {
    let amountText = document.getElementById("amount-text");
    let amountAmount = document.getElementById("amount-amount");
    let gstText = document.getElementById("gst-text");
    let gstAmount = document.getElementById("gst-amount");
    let pstText = document.getElementById("pst-text");
    let pstAmount = document.getElementById("pst-amount");
    let hstText = document.getElementById("hst-text");
    let hstAmount = document.getElementById("hst-amount");
    let totalText = document.getElementById("total-text");
    let totalAmount = document.getElementById("total-amount");
    const texts = [amountText, gstText, pstText, hstText, totalText];
    const amounts = [amountAmount, gstAmount, pstAmount, hstAmount, totalAmount];
    const rates = [province.gst + "% GST:", province.pst + "% PST", province.hst + "% HST", "Total:"];
    if (amount.amount === 0) {
        for (let i = 0; i < texts.length; i++) {
            texts[i].innerText = "";
            amounts[i].innerText = "";
        };
    } else {
        let operator = "";
        if (amount.operation === "add") {
            console.log("adding");
            operator = "+ ";
            amount.gst = amount.amount * (province.gst/100);
            console.log("amount.gst: " + amount.gst);
            amount.pst = amount.amount * (province.pst/100);
            amount.hst = amount.amount * (province.hst/100);
            amount.total = amount.amount + amount.gst + amount.pst + amount.hst;
        } else {
            amount.gst = amount.amount / (1 + province.gst/100);
            amount.pst = amount.amount / (1 + province.pst/100);
            amount.hst = amount.amount / (1 + province.hst/100);
            if (amount.operation === "deduct") {   
                operator = "- ";
                amount.total = amount.amount - amount.gst - amount.pst - amount.hst;
            } else if (amountText.operation === "calculate") {
                operator = "incl. "
                amount.total = amount.amount;
            }
        };
        const calculations = [amount.gst.toFixed(2), amount.pst.toFixed(2), 
            amount.hst.toFixed(2), amount.total.toFixed(2)];
        amountText.innerText = "Amount:";
        amountAmount.innerText = amount.amount +"$";
        for (let i = 0; i < calculations.length; i++) {
            if (calculations[i] != 0) {
                texts[i+1].innerText = rates[i];
                amounts[i+1].innerText =  calculations[i] + "$";
            } else {
                texts[i+1].innerText = "";
                amounts[i+1].innerText =  "";
            };
        };
    };
};