function createMenuOption(option) {
    if (option.type === "line") {
        return `<hr class="separator" />`;
    }
    if (option.type === "item") {
        return `
            <div class="item ${option.disabled ? "disabled" : ""}">
                <div class="icon">${option.icon}</div>
                <div class="text">${option.text}</div>
            </div>
        `;
    }
}

function main() {
    let context_menu_open = false;
    let hovering_over_menu = false;
    let context_menu = document.querySelector("#context_menu");

    const menuOptions = [
        { type: "item", icon: "", text: "Back" },
        { type: "item", icon: "", text: "Forward", disabled: true },
        { type: "item", icon: "", text: "Refresh" },
        { type: "line" },
        { type: "item", icon: "", text: "Save" },
        { type: "item", icon: "", text: "Print" },
    ];

    context_menu.innerHTML = "";
    menuOptions.forEach(option => context_menu.innerHTML += createMenuOption(option));

    context_menu.onmouseover = () => hovering_over_menu = true;
    context_menu.onmouseout = () => hovering_over_menu = false;

    window.onmousedown = e => {
        if (!context_menu_open || hovering_over_menu)
            return;

        context_menu.classList.add("hide");
        context_menu_open = false;
    };

    window.oncontextmenu = e => {
        e.preventDefault();
        if (context_menu_open)
            return;

        context_menu_open = true;
        context_menu.classList.remove("hide");
        context_menu.style.animation = "fadein 0.2s";

        let top;
        if (innerHeight - e.y > context_menu.offsetHeight)
            top = e.y;
        else if (e.y > context_menu.offsetHeight)
            top = e.y- context_menu.offsetHeight;
        else
            top = innerHeight - context_menu.offsetHeight;

        let left = Math.min(innerWidth - context_menu.offsetWidth, e.x);

        context_menu.style.top = top + "px";
        context_menu.style.left = left + "px";
    };
}

main();
