document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector("input[name='login']");
    const email = document.querySelector("input[name='email']");
    const password = document.querySelector("input[name='password']");
    const repeat = document.querySelector("input[name='repeat']");
    const result = document.querySelector("p.result");
    const submit = document.querySelector("input[name='submit']");

    submit.addEventListener("click", async () => {
        if (password.value != repeat.value) {
            result.innerText = "Password not match!";
            return;
        }

        if (password.value.length < 8) {
            result.innerText = "Password is too short!";
            return;
        }

        const api_login = "api/v1.0/register";
        const params = new URLSearchParams({
            login: login.value,
            email: email.value,
            password: password.value,
        }).toString();

        const server_response = await fetch(api_login + "?" + params);
        const response = await server_response.json();

        if (response.status === "fail") {
            result.innerText = response.content;
            return ;
        }

        result.innerText = "Success, return to login page!";
        location.href = "/";
    });
});
