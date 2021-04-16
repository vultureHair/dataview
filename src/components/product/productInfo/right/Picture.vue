<template>
    <div>
        <div style="height:280px;padding:20px 20px 0 20px">
            <img v-if="path" :src="path" alt="暂无图片" width="100%" height="100%" />
        </div>
        <h4 v-if="PName">{{ PName }}</h4>
    </div>
</template>

<script>
export default {
    name: "Picture",
    data() {
        return {
            path: "https://resource.2valor.com/oservice/",
            PName: "",
            barCode: ""
        };
    },
    watch: {},
    created() {
        this.getImageUrl();
    },
    methods: {
        getImageUrl() {
            // 1. 从route中获取barCode
            // 2.若不存在，则从缓存中获取
            // 3.若仍不存在，则加载空表

            this.barCode = this.$route.query.barCode;

            if (!this.barCode) {
                let sessionBarcode = sessionStorage.getItem("barCode");

                if (sessionBarcode != null || sessionBarcode != undefined) {
                    this.barCode = sessionBarcode;
                }
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductDetail/GetProductDetailPicture?barCode=" +
                        this.barCode
                )
                .then(response => {
                    this.path = this.path + response.data.data[0].Path;
                    this.PName = response.data.data[0].PName;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
