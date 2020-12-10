<template>
  <div class="con">
    <div class="left">s</div>
    <div class="center">
      <CustomerGrade class="center-one"></CustomerGrade>
      <CustomerDescription class="center-two"></CustomerDescription>
      <CustomerAllCustomer></CustomerAllCustomer>
    </div>
  </div>
</template>

<script>
import CustomerGrade from "@/components/customer/customerLayout/CustomerGrade";
import CustomerDescription from "@/components/customer/customerLayout/CustomerDescription";
import CustomerAllCustomer from "@/components/customer/customerLayout/CustomerAllCustomer";

export default {
  name: "CustomerLayout",
  components: {
    CustomerGrade,
    CustomerDescription,
    CustomerAllCustomer
  }
};
</script>

<style scoped>
.con {
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto;
}
.left {
  border-right: 1px solid #000;
}

.center-one {
  border-bottom: 1px solid #000;
}

.center-two {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
