<template>
    <div>
        <h4>{{ $t("product.info.Barcode") }}：{{ barCode }}</h4>
        <h4>{{ $t("product.list.AddDate") }}：{{ AddDate }}</h4>
        <h4>{{ $t("product.info.CumulativeSalesNumber") }}：{{ salesVolume }}</h4>
        <h4>{{ $t("product.info.CumulativeSalesMoney") }}：{{ salesPrice | globalMoney }}</h4>
        <h4>{{ $t("product.info.CumulativeProfit") }}：{{ profit | globalMoney }}</h4>
        <h4>{{ $t("product.info.CumulativeCustomer") }}：{{ CumulativeCustomer }}</h4>
        <h4>{{ $t("product.info.CumulativeOrder") }}：{{ CumulativeOrder }}</h4>
    </div>
</template>

<script>
export default {
    name: "Info",
    data() {
        return {
            barCode: "",
            salesVolume: "",
            salesPrice: "",
            profit: "",
            CumulativeCustomer: "",
            CumulativeOrder: "",
            AddDate: ""
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.barCode = this.$route.query.barCode;

            if (!this.barCode) {
                let sessionBarcode = sessionStorage.getItem("barCode");

                if (sessionBarcode != null || sessionBarcode != undefined) {
                    this.barCode = sessionBarcode;
                }
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductDetail/GetProductDetailAmount?barCode=" +
                        this.barCode
                )
                .then(response => {
                    this.salesVolume = response.data.data[0].salesVolume;
                    this.salesPrice = response.data.data[0].salesPrice;
                    this.profit = response.data.data[0].profit;
                    this.CumulativeCustomer = response.data.data[0].CumulativeCustomer;
                    this.CumulativeOrder = response.data.data[0].CumulativeOrder;
                    this.AddDate = response.data.data[0].AddDate;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
h4 {
    text-align: left;
    padding-left: 20px;
    font-weight: normal;
}
</style>
