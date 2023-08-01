// Navigational functions

// Drop-down menus

function dropMenu(id) {
    let menu = document.getElementById(id);
    if (menu.classList.contains("drop-down-hidden")) {
        menu.classList.remove("drop-down-hidden");
        menu.classList.add("drop-down-visible");
    } else {
        menu.classList.remove("drop-down-visible");
        menu.classList.add("drop-down-hidden");
    };
};