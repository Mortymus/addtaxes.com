// Calculational functions

// Informational objects with initial values

const province = {
    name: "Alberta",
    gst: 11,
    pst: 13,
    hst: 9,
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
}


const amount = {
    amount: 15,
    operation: "add",
    addGst: function(provinceObject) {
        return calculateAdd(this, provinceObject.gst);
    },
    addPst: function(provinceObject) {
        return calculateAdd(this, provinceObject.pst);
    },
    addHst: function(provinceObject) {
        return calculateAdd(this, provinceObject.hst);
    },
    addTotal: function() {
        if (this.amount > 0) {
            return this.amount + this.addGst(province) 
            + this.addPst(province) + this.addHst(province);
        } else {
            return 0;
        };
    },
    deductGST: function(provinceObject) {
        return calculateDeduct(this, provinceObject.gst);
    },
    deductPST: function(provinceObject) {
        return calculateDeduct(this, provinceObject.pst);
    },
    deductHST: function(provinceObject) {
        return calculateDeduct(this, provinceObject.hst);
    },
    deductTotal: function() {
        if (this.amount > 0) {
            return this.amount - this.gst() - this.pst() - this.hst();
        } else {
            return 0;
        };
    },
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

/*
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
*/

// Showing amount based on object input

function showAmount(amountObject, provinceObject) {
    let amountText = document.getElementById("amount-text");
    let amountInput = document.getElementById("amount-amount");
    if (amountObject.amount > 0) {
        let totalAmount = document.getElementById("total-amount");
        let operator = "";
        const taxes = [];
        const texts = [document.getElementById("gst-text"), 
            document.getElementById("pst-text"), document.getElementById("hst-text")];
        const amounts = [document.getElementById("gst-amount"), 
            document.getElementById("pst-amount"), document.getElementById("hst-amount")];
        const rates = [provinceObject.gst, provinceObject.pst, provinceObject.hst];
        const strings = ["% GST:", "% PST:", "% HST:"];
        amountText.innerText = "Amount:";
        amountInput.innerText = amountObject.amount + "$";
        if (amountObject.operation === "add") {
            operator = "+ ";
            taxes.push(amountObject.addGst(province), amountObject.addPst(province), amountObject.addHst(province));
            totalAmount.innerText = amountObject.addTotal() + "$";
        } else {
            taxes.push(amountObject.deductGst(province), 
            amountObject.deductPst(province), amountObject.deductHst(province));
            if (amountObject.operation === "deduct") {
                operator = "- ";
                totalAmount.innerText = amountObject.deductTotal();
            }   else if (amountObject.operation === "calculate") {
                operator= "incl. ";
                totalAmount.innerText = amountObject.amount;
            }
        }
        for (let i = 0; i < taxes.length; i++) {
            if (taxes[i] > 0) {
                texts[i].innerText = operator + rates[i] + strings[i];
                amounts[i].innerText = taxes[i].toFixed(2) + "$";
            } else {
                texts[i].innerText = "";
                amounts[i].innerText = "";
            };
        };
        if (taxes.length > 0) {
            document.getElementById("total-text").innerText = "Total:";
        } else {
            document.getElementById("total-text").innerText == "";
        };
    } else {
        amountText.innerText = "";
        amountInput.innerText = "";
    }
}