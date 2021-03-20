<template>
    <ul>
        <li
            v-for="(Category, index) in categoryList"
            :key="categoryKeys[index]"
            class="cateListCategory"
            @click="loadCategoryInfo(Category.CategoryNameId)"
        >
            {{ Category.CategoryName }}
        </li>
    </ul>
</template>

<script>
import shortId from "shortid";
// import $ from "jquery";

export default {
    name: "CategoryList",
    data() {
        return {
            categoryList: [],
            categoryKeys: []
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        this.categoryKeys = this.categoryList.map(() => shortId.generate());
    },
    methods: {
        loadCategoryInfo(params) {
            this.$router.push({
                path: "/categoryInfo",
                query: { categoryNameId: params }
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "ProductDetail/getallcategory")
                .then(response => {
                    this.categoryList = response.data.data;
                    this.categoryKeys = this.categoryList.map(() => shortId.generate());
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style>
.cateListCategory {
    list-style: decimal;
    padding-left: 20px;
    padding-bottom: 10px;
    float: left;
    width: 33%;
}

.cateListCategory:hover {
    text-decoration: underline;
    font-weight: 700;
}
</style>
