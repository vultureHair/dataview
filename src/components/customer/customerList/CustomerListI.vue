<template>
    <ul>
        <li class="li-con">
            <div class="switchDayCount">
                <span>{{ $t("style.list.switchTime") }}</span>
                <select id="dayCount" class="" @change="changeOption()">
                    <option value="1">{{ $t("style.list.switchInfo1") }}</option>
                    <option value="5">{{ $t("style.list.switchInfo") }}</option>
                    <option value="2">{{ $t("style.list.switchInfo2") }}</option>
                    <option value="3">{{ $t("style.list.switchInfo3") }}</option>
                    <option value="4">{{ $t("style.list.switchInfo4") }}</option>
                </select>
            </div>
        </li>
        <li
            v-for="(customer, index) in customerList"
            :key="customerKeys[index]"
            class="cateListCustomer"
            @click="loadcustomerInfo(customer.customer)"
        >
            <p :title="customer.customer">
                <span class="customerID"> top{{ index + 1 }}: </span>
                <span class="customerName">
                    ({{ customer.orderTotal }}) &nbsp;&nbsp;{{ customer.Name }}
                </span>
            </p>
        </li>
    </ul>
</template>

<script>
import shortId from "shortid";

export default {
    name: "CustomerListInfo",
    data() {
        return {
            customerList: [],
            customerKeys: [],
            day: "90"
        };
    },
    created() {
        this.getData();
    },
    methods: {
        loadcustomerInfo(params) {
            this.$router.push({
                path: "/customerInfo",
                query: { customer: params }
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "CustomerList/getCustomerList?day=" + this.day)
                .then(response => {
                    this.customerList = [];
                    this.customerKeys = [];

                    this.customerList = response.data.data;
                    this.customerKeys = this.customerList.map(() => shortId.generate());
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeOption() {
            var mySelect = document.getElementById("dayCount");
            var option = mySelect.options[mySelect.selectedIndex].value;

            if (option == 1) {
                this.day = 90;
            } else if (option == 2) {
                this.day = 180;
            } else if (option == 3) {
                this.day = 365;
            } else if (option == 4) {
                this.day = 1095;
            } else if (option == 5) {
                this.day = 30;
            } else {
                this.day = 90;
            }

            this.getData();
        }
    }
};
</script>

<style>
p {
    margin: 0;
}

.cateListCustomer {
    list-style: none;
    padding-left: 20px;
    padding-bottom: 10px;
    display: inline-block;
    width: 33%;
    overflow: hidden;
}

.cateListCustomer:hover {
    text-decoration: underline;
    font-weight: 700;
}

.li-con {
    list-style: none;
    padding-bottom: 10px;
    text-align: left;
}

.switchDayCount {
    height: 30px;
    padding-left: 10px;
    display: inline;
    padding-right: 10px;
    list-style: none;
}

.customNumber {
    vertical-align: top;
}

.customerName {
    width: 60%;
    display: inline-block;
    vertical-align: text-top;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.customerID {
    width: 20%;
    max-width: 60px;
    display: inline-block;
    vertical-align: text-top;
}
</style>
