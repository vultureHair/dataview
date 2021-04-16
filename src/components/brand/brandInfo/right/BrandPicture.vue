<template>
    <div>
        <div style="height:120px;padding:20px">
            <img v-if="url" :src="url" alt="暂无图片" width="100%" />
        </div>
        <h4 v-if="brand">{{ brand }}</h4>
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
    name: "BrandPicture",
    props: {
        day: {
            type: String,
            default: "90"
        }
    },
    data() {
        return {
            url: "",
            BrandId: "",
            brand: "",
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
            this.BrandId = this.$route.query.BrandId;
            if (!this.BrandId) {
                let sessionBrandId = sessionStorage.getItem("BrandId");

                if (sessionBrandId != null || sessionBrandId != undefined) {
                    this.BrandId = sessionBrandId;
                }
            }
            this.url =
                "https://resource.2valor.com/images/menu/brandlogo/300/brand_" +
                this.BrandId +
                ".png";

            this.axios
                .get(
                    this.GLOBAL.urlHead + "BrandDetail/GetBrandSalesTotal?BrandId=" +
                        this.BrandId +
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
