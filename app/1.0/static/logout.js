import { cookie } from "./cookie.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".logout").addEventListener("click", () => {
        new cookie("apikey").set("");
        location.href = "/";
    });
});
