// Informational objects with initial values

// Province object
const province = {
    name: "Ontario",
    gst: 0,
    pst: 0,
    hst: 13,
};


// Amount object
const amount = {
    amount: 0,
    gst: 0,
    pst: 0,
    hst: 0,
    total: 0,
    tip: 0,
    tipTotal: 0,
};


// Function for altering province object 
function chooseProvince(amountObject, provinceObject, name, gst, pst, hst) {
    provinceObject.name = name;
    provinceObject.gst = gst;
    provinceObject.pst = pst;
    provinceObject.hst = hst;
    clearInput(amountObject);
    hideMenu("drop-down-provinces")
    showProvince(provinceObject);
}