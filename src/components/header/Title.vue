<template>
    <div class="con">
        <img src="../../assets/images/buslogo.png" width="200px" height="50px" />
        <h2>{{ $t("header.title") }}</h2>
        <language></language>
        <Time></Time>
    </div>
</template>

<script>
import Time from "../publicCom/Time";
import language from "../publicCom/SwitchLanguage";

export default {
    name: "Title",
    components: {
        Time,
        language
    }
};
</script>

<style scoped>
.con {
    display: grid;
    grid-template-columns: 200px auto 140px 200px;
    align-items: center;
}
</style>
