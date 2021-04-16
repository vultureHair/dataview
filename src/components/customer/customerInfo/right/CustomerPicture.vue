<template>
    <div>
        <h4 v-if="customer">{{ customer }}</h4>
        <div class="totalData">
            <h4>{{ $t("customer.info.Name") }}：{{ Name }}</h4>
            <h4>{{ $t("customer.info.Email") }}：{{ Email }}</h4>
            <h4>{{ $t("customer.info.Customer_Price_Group") }}：{{ Customer_Price_Group }}</h4>
            <h4>{{ $t("customer.info.Description") }}: {{ Description }}</h4>
            <h4>{{ $t("customer.info.Creation_Date") }}: {{ Creation_Date }}</h4>
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
            salesPrice: "",
            Name: "",
            Email: "",
            Customer_Price_Group: "",
            Description: "",
            Creation_Date: ""
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
        async getUrl() {
            this.customer = this.$route.query.customer;
            if (!this.customer) {
                let sessioncustomer = sessionStorage.getItem("customer");

                if (sessioncustomer != null || sessioncustomer != undefined) {
                    this.customer = sessioncustomer;
                }
            }

            await this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "CustomerInfo/GetCustomerSalesTotal?customer=" +
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

            await this.axios
                .get(this.GLOBAL.urlHead + "CustomerInfo/GetCustomerInfo?customer=" + this.customer)
                .then(response => {
                    this.Name = response.data.data[0].Name;
                    this.Email = response.data.data[0].Email;
                    this.Customer_Price_Group = response.data.data[0].Customer_Price_Group;
                    this.Description = response.data.data[0].Description;
                    this.Creation_Date = response.data.data[0].Creation_Date;
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
    margin-top: 20px;
}
</style>
