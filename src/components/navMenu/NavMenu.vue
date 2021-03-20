<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/total">Boss</el-menu-item>
        <el-submenu index="2">
            <template slot="title">{{ $t("navMenu.proItem") }}</template>
            <el-menu-item index="/productList">{{ $t("navMenu.proList") }}</el-menu-item>
            <el-menu-item index="/productInfo">{{ $t("navMenu.proInfo") }}</el-menu-item>
            <el-menu-item index="/productTendency">{{ $t("navMenu.proTendency") }}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">{{ $t("navMenu.categoryItem") }}</template>
            <el-menu-item index="/categoryList">{{ $t("navMenu.categoryList") }}</el-menu-item>
            <el-menu-item index="/categoryInfo">{{ $t("navMenu.categoryInfo") }}</el-menu-item>
            <el-menu-item index="/categoryLayout">{{
                $t("navMenu.categoryTendency")
            }}</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">{{ $t("navMenu.brandItem") }}</template>
            <el-menu-item index="/brandList">{{ $t("navMenu.brandList") }}</el-menu-item>
            <el-menu-item index="/brandInfo">{{ $t("navMenu.brandInfo") }}</el-menu-item>
            <el-menu-item index="/brandLayout">{{ $t("navMenu.brandTendency") }}</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">{{ $t("navMenu.styleItem") }}</template>
            <el-menu-item index="/styleList">{{ $t("navMenu.styleList") }}</el-menu-item>
            <el-menu-item index="/styleInfo">{{ $t("navMenu.styleInfo") }}</el-menu-item>
            <el-menu-item index="/styleLayout">{{ $t("navMenu.styleTendency") }}</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title">{{ $t("navMenu.modelItem") }}</template>
            <el-menu-item index="/modelList">{{ $t("navMenu.modelList") }}</el-menu-item>
            <el-menu-item index="/modelInfo">{{ $t("navMenu.modelInfo") }}</el-menu-item>
            <el-menu-item index="/modelLayout">{{ $t("navMenu.modelTendency") }}</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
            <template slot="title">{{ $t("navMenu.customerItem") }}</template>
            <el-menu-item index="/customerList">{{ $t("navMenu.customerList") }}</el-menu-item>
            <el-menu-item index="/customerInfo">{{ $t("navMenu.customerInfo") }}</el-menu-item>
            <el-menu-item index="/customerLayout">{{
                $t("navMenu.customerTendency")
            }}</el-menu-item>
        </el-submenu>
        <el-menu-item>{{ $t("navMenu.webSiteLog") }}</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "NavMenu"
};
</script>

<style scoped>
a {
    color: rgb(255, 255, 255);
    border-bottom-color: transparent;
    background-color: rgb(84, 92, 100);
}
</style>
