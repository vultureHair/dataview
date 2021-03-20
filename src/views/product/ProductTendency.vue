<template>
    <div class="gridCon">
        <HistoryView class="left"></HistoryView>
        <div>
            <TotalTendency class="right-one"></TotalTendency>
            <ShipOutQty class="right-one"></ShipOutQty>
            <ProductAddOff></ProductAddOff>
            <TotalEveryProduct class="right-three"></TotalEveryProduct>
        </div>
    </div>
</template>

<script>
import TotalTendency from "@/components/product/productTendency/TotalTendency";
import TotalEveryProduct from "@/components/product/productTendency/TotalEveryProduct";
import ProductAddOff from "@/components/product/productTendency/ProductAddOff";
import ShipOutQty from "@/components/product/productTendency/ShipOutQty";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
    name: "ProductTendency",
    components: {
        TotalTendency,
        TotalEveryProduct,
        ProductAddOff,
        ShipOutQty,
        HistoryView
    }
};
</script>

<style scoped>
.gridCon {
    display: grid;
    grid-template-columns: 300px auto;
    height: auto;
}
.left {
    border-right: 1px solid #000;
}

.right-one {
    border-bottom: 1px solid #000;
}

.right-three {
    border-top: 1px solid #000;
}
</style>
