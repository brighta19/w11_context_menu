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

    window.onmousedown = e => {
        if ( e.path.find(a => a.id=="context_menu") === undefined )
            context_menu.classList.add("hide");
    };

    window.oncontextmenu = e => {
        e.preventDefault();
        if ( e.path.find(a => a.id=="context_menu") !== undefined )
            return;

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
