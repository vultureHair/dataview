<template>
    <div class="container">
        <!-- <div class="title">用户登录</div> -->
        <div class="form">
            <input
                id="name"
                type="text"
                autocomplete="off"
                placeholder="username:"
                class="input-one"
            />
            <input
                id="password"
                type="password"
                autocomplete="off"
                placeholder="password:"
                class="input-one"
                @keyup.enter="login"
            />
            <p class="error-text">您输入的账号或密码有误，请重新输入</p>
            <button class="btn-login" @click="login">{{ $t("login.login") }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    methods: {
        login() {
            let name = document.getElementById("name").value;
            let password = document.getElementById("password").value;

            if (name == "valor" && password == "valor") {
                console.log(name);
                console.log(password);
                sessionStorage.setItem("token", "true");
                window.location.reload();
                window.location.href = "http://data.ivalor.com/#/total";
            } else {
                let node = document.getElementsByClassName("error-text");
                console.log(node);
                node[0].style.display = "block";
            }
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
.container {
    width: 400px;
    /* height: 550px; */
    margin: 0 auto;
    border-radius: 10px;
    background-color: white;
}

.title {
    height: 150px;
    width: 100%;
    font-size: 30px;
    font-weight: 800;
    border-bottom: 1px solid gainsboro;
    color: gray;
    letter-spacing: 10px;
    line-height: 150px;
}

.form {
    padding-top: 200px;
    padding-bottom: 300px;
}

.input-one {
    display: inline-block;
    width: 320px;
    height: 40px;
    padding-left: 20px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    /* margin: 20px 30px; */
    outline: none;
    margin-bottom: 30px;
}

.input-one::-webkit-input-placeholder {
    color: gainsboro;
}

.btn-login {
    display: inline-block;
    width: 340px;
    height: 50px;
    background-color: rgba(39, 165, 153, 1);
    color: white;
    font-size: 16px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    margin: 50px auto 30px auto;
    outline: none;
    font-weight: 600;
}
.btn-login:hover {
    opacity: 0.8;
}

.error-text {
    color: red;
    display: none;
}
</style>
