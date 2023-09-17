import { cookie } from "./cookie.js";

document.addEventListener("DOMContentLoaded", () => {
    const map = document.querySelector(".map");

    document.querySelector(".person_open").addEventListener("click", () => {
        location.href = "person";
    });

    document.querySelector(".map_open").addEventListener("click", () => {
        if (!map.classList.contains("open")) map.classList.add("open");
        else map.classList.remove("open");
    });
});

const maps_loader = async where => {
    while (where.lastChild) where.lastChild.remove();
    
    const maps = await fetch("api/v1.0/map/all");

    const route_item = (route) => {
        const container = document.createElement("div");
        const name = document.createElement("p");
        const level = document.createElement("span");
        const tilt = document.createElement("p");
        const length = document.createElement("p");
        const peoples = document.createElement("p");
        const select = document.createElement("input");

        level.classList.add("level" + route.level);
        level.classList.add("level");
        level.innerText = route.level;

        length.innerText = route.length;
        length.classList.add("length");

        tilt.innerText = route.tilt;
        tilt.classList.add("tilt");

        name.innerText = route.name;
        name.classList.add("name");

        peoples.innerText = route.peoples;
        peoples.classList.add("peoples");

        container.classList.add("route");

        select.type = "button";
        select.value = "Select";
        select.addEventListener("click", async () => {
            if (!confirm("Select route " + route.name + "?")) return;
            
            const select_url = "api/v1.0/user/select?" + new URLSearchParams({
                apikey: new cookie("apikey").get(),
                select: route.id
            }).toString();

            const payload = await fetch(select_url);
            const response = await payload.json();

            if (response.status == "good") route_load(where, route.id);
            else console.log("Backend error: " + response.content);
        });

        container.appendChild(name);
        container.appendChild(tilt);
        container.appendChild(length);
        container.appendChild(level);
        container.appendChild(peoples);
        container.appendChild(select);

        return container;
    };

    const routes = document.querySelector(".routes");

    const maps_list = await maps.json()
    maps_list.content.forEach(route => {
        routes.appendChild(route_item(route)); 
    });

};

const route_load = async (where, id) => {
    while (where.lastChild) where.lastChild.remove();

    const route_url = "api/v1.0/map/get/" + id;
    const route_payload = await fetch(route_url);
    const route_response = await route_payload.json();

    if (route_response.status == "fail") return;

    const route = route_response.content;

    const container = document.createElement("div");
    const name = document.createElement("p");
    const level = document.createElement("span");
    const tilt = document.createElement("p");
    const length = document.createElement("p");
    const peoples = document.createElement("p");
    const stop = document.createElement("input");

    level.classList.add("level" + route.level);
    level.classList.add("level");
    level.innerText = route.level;
    
    length.innerText = route.length;
    length.classList.add("length");
    
    tilt.innerText = route.tilt;
    tilt.classList.add("tilt");
    
    name.innerText = "Currently in " + route.name;
    name.classList.add("name");

    peoples.classList.add("peoples");
    peoples.innerText = route.peoples;

    container.classList.add("route");

    stop.type = "button";
    stop.value = "Stop";

    stop.addEventListener("click", async () => {
        if (!confirm("Stop route?")) return;
            
        const select_url = "api/v1.0/user/select?" + new URLSearchParams({
            apikey: new cookie("apikey").get(),
            select: null
        }).toString();

        const payload = await fetch(select_url);
        const response = await payload.json();

        if (response.status == "good") maps_loader(where);
        else console.log("Backend error: " + response.content);

    });

    container.appendChild(name);
    container.appendChild(length);
    container.appendChild(tilt);
    container.appendChild(level);
    container.appendChild(peoples);
    container.appendChild(stop);

    where.appendChild(container);
};

document.addEventListener("DOMContentLoaded", async () => {
    const user_url = "api/v1.0/user/get?" + new URLSearchParams({
        apikey: new cookie("apikey").get()
    }).toString();
    const user_response = await fetch(user_url);
    const user_container = await user_response.json();

    if (user_container.status == "fail") location.href = "/";

    const user = user_container.content;

    if (user.current == null) {
        await maps_loader(document.querySelector(".routes"));
        return;
    }

    await route_load(document.querySelector(".routes"), user.current);
});
