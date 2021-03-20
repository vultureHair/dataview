<template>
    <div>
        <div style="height:200px;padding:20px">
            <img v-if="url" :src="url" alt="暂无图片" />
        </div>
        <h4 v-if="categoryName">{{ categoryName }}</h4>
        <div class="totalData">
            <h3>{{ $t("category.info.nearLeft") }}{{ day }}{{ $t("category.info.dayRight") }}：</h3>
            <h4>{{ $t("category.info.salesTotalQuantity") }}：{{ salesVolume }}</h4>
            <h4>{{ $t("category.info.salesTotalaccount") }}：{{ salesPrice }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "Picture",
    props: {
        day: {
            type: String,
            default: "90"
        }
    },
    data() {
        return {
            url: "",
            categoryNameId: "",
            categoryName: "",
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
            this.GetcategoryNameId();
            this.GetcategoryName();
            this.url =
                "https://resource.2valor.com/images/menu/categorylogo/category_" +
                this.categoryNameId +
                ".png";

            this.axios
                .get(
                    this.GLOBAL.urlHead + "CategoryDetail/GetCategorySalesTotal?categoryId=" +
                        this.categoryNameId +
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
