<template>
  <div class="con">
    <BrandListInfo></BrandListInfo>
  </div>
</template>

<script>
import BrandListInfo from "@/components/brand/BrandListInfo";

export default {
  name: "BrandList",
  components: {
    BrandListInfo
  }
};
</script>

<style scoped>
.con {
  text-align: left;
}
</style>
