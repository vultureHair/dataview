<template>
    <div>
        <h4 v-if="model">{{ model }}</h4>
        <div class="totalData">
            <h3>{{ $t("category.info.nearLeft") }}{{ day }}{{ $t("category.info.dayRight") }}：</h3>
            <h4>{{ $t("category.info.salesTotalQuantity") }}：{{ salesVolume }}</h4>
            <h4>{{ $t("category.info.salesTotalaccount") }}：{{ salesPrice | globalMoney }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModelPicture",
    props: {
        day: {
            type: String,
            default: "90"
        }
    },
    data() {
        return {
            model: "",
            salesVolume: "",
            salesPrice: ""
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
            this.model = this.$route.query.model;
            if (!this.model) {
                let sessionmodel = sessionStorage.getItem("model");

                if (sessionmodel != null || sessionmodel != undefined) {
                    this.model = sessionmodel;
                }
            }

            this.axios
                .get(this.GLOBAL.urlHead + "ModelDetail/GetModelSalesTotal?model=" + this.model + "&day=" + this.day)
                .then(response => {
                    this.salesVolume = response.data.data[0].total;
                    this.salesPrice = response.data.data[0].totalSales;
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
