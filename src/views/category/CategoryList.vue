<template>
    <div class="con">
        <CategoryList></CategoryList>
    </div>
</template>

<script>
import CategoryList from "@/components/category/categoryList/CategoryList";

export default {
    name: "CategoryInfo",
    components: {
        CategoryList
    }
};
</script>

<style scoped>
.con {
    text-align: left;
    height: 700px;
}
</style>
