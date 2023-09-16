class cookie {
    constructor(name) {
        this.name = name;
    }

    get() {
        for (let cookie of document.cookie.split(";")) {
            cookie = cookie.trim().split("=");

            if (cookie[0] == this.name) return cookie[1];
        }
    }

    set(payload) {
        document.cookie = this.name + "=" + payload + "; SameSite=Strict;";
    }
}

export { cookie };
