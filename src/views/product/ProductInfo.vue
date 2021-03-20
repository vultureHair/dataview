<template>
    <div class="con">
        <div class="left">
            <HistoryView class="HistoryView"></HistoryView>
            <!-- <SearchBtn class="SearchBtn"></SearchBtn> -->
        </div>
        <div class="center">
            <ProductEchartsLine class="center-one"></ProductEchartsLine>
            <ProductSecond class="center-two"></ProductSecond>
            <div class="center-three">
                <ProductThird class="center-three-left"></ProductThird>
                <ProductForth></ProductForth>
            </div>
            <ProductGrid class="ProductGrid"></ProductGrid>
            <SalesGrid class="right-three"></SalesGrid>
        </div>
        <div class="right">
            <Picture class="right-one"></Picture>
            <Info class="right-two"></Info>
        </div>
    </div>
</template>

<script>
import ProductEchartsLine from "@/components/product/productInfo/center/ProductInfo";
import ProductSecond from "@/components/product/productInfo/center/ProductSecond";
import ProductThird from "@/components/product/productInfo/center/ProductThird";
import ProductForth from "@/components/product/productInfo/center/ProductForth";
import Picture from "@/components/product/productInfo/right/Picture";
import SalesGrid from "@/components/product/productInfo/right/SalesGrid";
import Info from "@/components/product/productInfo/right/Info";
import HistoryView from "@/components/publicCom/HistoryView";
import ProductGrid from "@/components/product/productInfo/center/ProductGrid";
// import SearchBtn from "@/components/product/productInfo/left/SearchBtn";

export default {
    name: "ProductInfo",
    components: {
        ProductEchartsLine,
        ProductSecond,
        Picture,
        SalesGrid,
        Info,
        ProductThird,
        ProductForth,
        HistoryView,
        ProductGrid
        // SearchBtn
    },
    methods: {
        transDay(data) {
            this.day = data;
        }
    }
};
</script>

<style scoped>
.con {
    display: grid;
    grid-template-columns: 300px auto 300px;
    grid-template-rows: auto;
}
.left {
    border-right: 1px solid #000;
}
.right {
    border-left: 1px solid #000;
}

.center-one {
    border-bottom: 1px solid #000;
    margin-top: 10px;
}
.center-two {
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    padding-top: 10px;
}

.right-one {
    height: 360px;
}

.right-two {
    border-bottom: 1px solid #000;
    height: 151px;
}

.center-three {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #000;
}

.center-three-left {
    border-right: 1px solid #000;
}

.right-three {
    border-top: 1px solid #000;
    height: 500px;
}

.ProductGrid {
    position: relative;
}

.SearchBtn {
    position: relative;
}

.HistoryView {
    height: 514px;
    border-bottom: 1px solid #000;
}
</style>
