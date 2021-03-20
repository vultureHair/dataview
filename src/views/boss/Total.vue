<template>
    <div class="con">
        <div class="center">
            <SalesDay></SalesDay>
            <div class="salesLayout">
                <SalesWeek></SalesWeek>
                <SalesMonth></SalesMonth>
                <SalesQuarter></SalesQuarter>
                <SalesYear></SalesYear>
            </div>
            <div class="TopLayout">
                <TopModel></TopModel>
                <TopStyle></TopStyle>
            </div>
            <div class="TopLayout">
                <PieBrand></PieBrand>
                <PieCustomerGrade></PieCustomerGrade>
            </div>
            <div class="brand">
                <TreeLayout></TreeLayout>
            </div>
            <div class="product">
                <TotalEveryProduct></TotalEveryProduct>
            </div>
        </div>
    </div>
</template>

<script>
import SalesDay from "@/components/boss/SalesDay";
import SalesWeek from "@/components/boss/SalesWeek";
import SalesMonth from "@/components/boss/SalesMonth";
import SalesQuarter from "@/components/boss/SalesQuarter";
import SalesYear from "@/components/boss/SalesYear";
import TopModel from "@/components/boss/TopModel";
import TopStyle from "@/components/boss/TopStyle";
import PieBrand from "@/components/boss/PieBrand";
import PieCustomerGrade from "@/components/boss/PieCustomerGrade";
import TreeLayout from "@/components/boss/TreeLayout";
import TotalEveryProduct from "@/components/product/productTendency/TotalEveryProduct";

export default {
    name: "BrandInfo",
    components: {
        SalesDay,
        SalesWeek,
        SalesMonth,
        SalesQuarter,
        SalesYear,
        TopModel,
        TopStyle,
        PieBrand,
        PieCustomerGrade,
        TreeLayout,
        TotalEveryProduct
    }
};
</script>

<style scoped>
.salesLayout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 300px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    border-top: 1px solid #000;
    padding: 10px;
    border-bottom: 2px solid #000;
}
.TopLayout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    border-bottom: 2px solid #000;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
}
.brand {
    border-bottom: 2px solid #000;
    padding: 10px;
    position: relative;
}
.product {
    padding: 10px;
}
</style>
