<template>
    <div>
        <h4 v-if="customer">{{ customer }}</h4>
        <div class="totalData">
            <h3>{{ $t("category.info.nearLeft") }}{{ day }}{{ $t("category.info.dayRight") }}：</h3>
            <h4>{{ $t("customer.info.orderQuantity") }}：{{ salesVolume }}</h4>
            <h4>{{ $t("customer.info.orderAccount") }}：{{ salesPrice }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomerPicture",
    props: {
        day: {
            type: String,
            default: "90"
        }
    },
    data() {
        return {
            customer: "",
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
            this.customer = this.$route.query.customer;
            if (!this.customer) {
                let sessioncustomer = sessionStorage.getItem("customer");

                if (sessioncustomer != null || sessioncustomer != undefined) {
                    this.customer = sessioncustomer;
                }
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead + "CustomerInfo/GetCustomerSalesTotal?customer=" +
                        this.customer +
                        "&day=" +
                        this.day
                )
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
