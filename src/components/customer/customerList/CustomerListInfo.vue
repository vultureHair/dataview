<template>
  <ul>
    <li class="titleCustomer">
      按历史累积下单量排名（只取下单量在100及以上的客户）
    </li>
    <li
      v-for="(customer, index) in customerList"
      :key="customerKeys[index]"
      class="cateListCustomer"
      @click="loadcustomerInfo(customer.customer)"
    >
      top{{ index + 1 }} :{{ customer.customer }}--{{ customer.orderTotal }}
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
      customerKeys: []
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
        .get("/v1/CustomerList/getCustomerList")
        .then(response => {
          this.customerList = response.data.data;
          this.customerKeys = this.customerList.map(() => shortId.generate());
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
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

.titleCustomer {
  font-weight: 700;
  list-style: none;
  font-size: 18px;
  padding-bottom: 10px;
}
</style>
