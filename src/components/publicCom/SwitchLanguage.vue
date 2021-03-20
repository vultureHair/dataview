<template>
    <el-button-group class="conBtn">
        <el-button type="primary" class="languageBtn" @click="switchEnglish">English</el-button>
        <el-button type="primary" class="languageBtn" @click="switchChinese">中文</el-button>
    </el-button-group>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        switchChinese() {
            localStorage.setItem("language", "zh");
            window.location.reload();
        },
        switchEnglish() {
            localStorage.setItem("language", "en");
            window.location.reload();
        }
    }
};
</script>

<style scoped>
.conBtn {
    display: inline-block;
}

.languageBtn {
    height: 20px;
    width: 70px;
    padding: 2px 10px;
    border-color: #000000;
    color: #000000;
    background-color: #fff;
}
</style>
