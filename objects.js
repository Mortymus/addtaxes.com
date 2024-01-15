// Informational objects with initial values

// Declaring new province object
const province = {
    name: "Ontario",
    gst: 0,
    pst: 0,
    hst: 13,
}

// Setting properties according to cookies
if (document.cookie != "") {
    let decodedCookie = decodeURIComponent(document.cookie).split(";");
    province.name = decodedCookie[0].slice(5);
    province.gst = parseFloat(decodedCookie[1].slice(5));
    province.pst = parseFloat(decodedCookie[2].slice(5));
    province.hst = parseFloat(decodedCookie[3].slice(5));
}


// Amount object
const amount = {
    amount: 0,
    gst: 0,
    pst: 0,
    hst: 0,
    total: 0,
    tipRate: 0,
    tip: 0,
    tipTotal: 0,
};


// Function for altering province object 
function chooseProvince(amountObject, provinceObject, name, gst, pst, hst) {
     
    // Declaring properties of province object
    provinceObject.name = name;
    provinceObject.gst = gst;
    provinceObject.pst = pst;
    provinceObject.hst = hst;

    // Setting province cookies
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 180);
    cookieString = "; expires=" + expiryDate.toUTCString() + "; Samesite=None; Secure;";
    document.cookie = "name=" + name + cookieString;
    document.cookie = "gst=" + gst + cookieString;
    document.cookie = "pst=" + pst + cookieString;
    document.cookie = "hst=" + hst + cookieString;
    console.log(document.cookie);

    // Displaying new province object
    clearInput(amountObject);
    hideMenu("drop-down-provinces")
    showProvince(provinceObject);
}