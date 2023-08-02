// Navigational functions

// Drop-down menus

document.addEventListener("click", hideMenus);

function switchClasses(classRemove, classAdd, id) {
    let element = document.getElementById(id);
    if (element.classList.contains(classRemove)) {
        element.classList.remove(classRemove);
        element.classList.add(classAdd);
    };
};


function showMenu(id) {
    switchClasses("drop-down-hidden", "drop-down-visible", id);
}


function hideMenu(id) {
    switchClasses("drop-down-visible", "drop-down-hidden", id)
}


function dropMenu(id) {
    let menu = document.getElementById(id);
    if (menu.classList.contains("drop-down-hidden")) {
        showMenu(id);
    } else {
        hideMenu(id);
    };
};


function hideMenus(event) {
    let menuProvinces = document.getElementById("container-provinces");
    let menuTip = document.getElementById("container-tip");
    if (!menuProvinces.contains(event.target)) {
        hideMenu("drop-down-provinces");
    }
    if (!menuTip.contains(event.target)) {
        hideMenu("drop-down-tip");
    }
}