import { cookie } from "./cookie.js"; 

document.addEventListener("DOMContentLoaded", async () => {
    if (new cookie("apikey").get() != "") {
        const api_login = "api/v1.0/user/get";
        const params = new URLSearchParams({
            apikey: new cookie("apikey").get()
        }).toString();

        const server_response = await fetch(api_login + "?" + params);
        const response = await server_response.json();

        if (response.status == "good") {
            location.href = "dashboard";
        }
    }

    const login = document.querySelector("input[name='login']");
    const password = document.querySelector("input[name='password']");
    const submit = document.querySelector("input[name='submit']");
    const result = document.querySelector("p.result");

    submit.addEventListener("click", async () => {
        const api_login = "api/v1.0/login";
        const params = new URLSearchParams({
            login: login.value,
            password: password.value,
        }).toString();

        const server_response = await fetch(api_login + "?" + params);
        const response = await server_response.json();

        if (response.status === "fail") {
            result.innerText = response.content;
            return ;
        }

        result.innerText = "Success";
        
        new cookie("apikey").set(response.content);
        location.href = "dashboard"
    });
});
