import { cookie } from "./cookie.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".dashboard_open").addEventListener("click", () => {
        location.href = "dashboard"; 
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const user_url = "api/v1.0/user/get?" + new URLSearchParams({
        apikey: new cookie("apikey").get()
    }).toString();
    const user_response = await fetch(user_url);
    const user_container = await user_response.json();

    if (user_container.status == "fail") location.href = "/";

    const user = user_container.content;

    const points = document.querySelector(".points");

    points.innerText = user.points;

    const level1 = document.querySelector(".level1");
    const level2 = document.querySelector(".level2");
    const level3 = document.querySelector(".level3");

    if (user.points > 3) level1.style.opacity = "1";
    if (user.points > 9) level2.style.opacity = "1";
    if (user.points > 15) level3.style.opacity = "1";
});
