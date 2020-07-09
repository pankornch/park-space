const axios = require('axios');

class Token {
    constructor() {
        this.token = document.cookie
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        document.cookie = `auth-token=Bearer ${token}`
    }

    verifyToken() {
        return new Promise((resolve, reject) => {

            const slp = this.token.split('=');

            axios.post(`http://localhost:5000/auth/login`, {},
                {
                    headers: { 'auth-token': `${slp[1]}` }
                })
                .then(res => {

                    // if (res.data !== 'Success') {
                    //     document.cookie = "auth-token=;"
                    // }

                    resolve(res.data)
                });
        })
    }
}

const t = new Token;
export { t as Token };