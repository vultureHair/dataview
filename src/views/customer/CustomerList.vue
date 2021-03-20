<template>
    <div class="con">
        <CustomerListInfo></CustomerListInfo>
    </div>
</template>

<script>
import CustomerListInfo from "@/components/customer/customerList/CustomerListInfo";

export default {
    name: "CustomerList",
    components: {
        CustomerListInfo
    }
};
</script>

<style scoped>
.con {
    text-align: left;
}
</style>
