<template>
    <div>
        <h4 v-if="style">{{ style }}</h4>
        <div class="totalData">
            <h3>{{ $t("category.info.nearLeft") }}{{ day }}{{ $t("category.info.dayRight") }}：</h3>
            <h4>{{ $t("category.info.salesTotalQuantity") }}：{{ salesVolume }}</h4>
            <h4>{{ $t("category.info.salesTotalaccount") }}：{{ salesPrice }}</h4>
            <h4>{{ $t("product.info.CumulativeProfit") }}：{{ profit | globalMoney }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "StylePicture",
    props: {
        day: {
            type: String,
            default: "90"
        }
    },
    data() {
        return {
            style: "",
            salesVolume: "",
            salesPrice: "",
            profit: ""
        };
    },
    watch: {
        day() {
            this.getUrl();
        }
    },
    created() {
        this.getUrl();
    },
    methods: {
        getUrl() {
            this.style = this.$route.query.style;
            if (!this.style) {
                let sessionstyle = sessionStorage.getItem("style");

                if (sessionstyle != null || sessionstyle != undefined) {
                    this.style = sessionstyle;
                }
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "StyleInfo/GetStyleSalesTotal?style=" +
                        this.style +
                        "&day=" +
                        this.day
                )
                .then(response => {
                    this.salesVolume = response.data.data[0].total;
                    this.salesPrice = response.data.data[0].totalSales;
                    this.profit = response.data.data[0].profit;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.totalData {
    padding-left: 20px;
}
.totalData h4 {
    text-align: left;
    font-weight: 500;
    padding-left: 20px;
}
h3 {
    text-align: left;
}
</style>
