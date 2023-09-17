import { cookie } from "./cookie.js";

const maps_loader = async where => {
    const maps = await fetch("api/v1.0/map/all");

    const route_item = (name, tilt, length, level, id) => {
        const container = document.createElement("div");
        const name_p = document.createElement("p");
        const level_span = document.createElement("span");
        const tilt_p = document.createElement("p");
        const length_p = document.createElement("p");
        const select = document.createElement("input");

        level_span.classList.add("level" + level);
        level_span.classList.add("level");
        level_span.innerText = level;

        length_p.innerText = length;
        length_p.classList.add("length");

        tilt_p.innerText = tilt;
        tilt_p.classList.add("tilt");

        name_p.innerText = name;
        name_p.classList.add("name");

        container.classList.add("route");

        select.type = "button";
        select.value = "Select";
        select.addEventListener("click", async () => {
            if (!confirm("Select route " + name + "?")) return;
            
            const select_url = "api/v1.0/user/select?" + new URLSearchParams({
                apikey: new cookie("apikey").get(),
                select: id
            }).toString();

            const payload = await fetch(select_url);
            const response = await payload.json();

            if (response.status == "good") console.log("Yeah UwU!");
            else console.log(response.content);
        });

        container.appendChild(name_p);
        container.appendChild(tilt_p);
        container.appendChild(length_p);
        container.appendChild(level_span);
        container.appendChild(select);

        return container;
    };

    const routes = document.querySelector(".routes");

    const maps_list = await maps.json()
    maps_list.content.forEach(route => {
        routes.appendChild(route_item(
            route.name, 
            route.tilt, 
            route.length, 
            route.level,
            route.id
        )); 
    });

};

const route_load = async (where, id) => {
};

document.addEventListener("DOMContentLoaded", async () => {
    const user_url = "api/v1.0/user/get?" + new URLSearchParams({
        apikey: new cookie("apikey").get()
    }).toString();
    const user_response = await fetch(user_url);
    const user_container = await user_response.json();

    if (user_container.status == "fail") location.href = "/";

    const user = user_container.content;

    if (user.current == "null") {
        await maps_loader(document.querySelector(".routes"));
        return;
    }

    await route_load(document.querySelector(".routes"), user.current);
});
