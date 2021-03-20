<template>
    <ul>
        <li class="li-con">
            <div class="switchDayCount">
                <span>切换时间：</span>
                <select id="dayCount" class="" @change="changeOption()">
                    <option value="5">最近一月</option>
                    <option value="1">最近三月</option>
                    <option value="2">最近六月</option>
                    <option value="3">最近一年</option>
                    <option value="4">最近三年</option>
                </select>
            </div>
        </li>
        <li
            v-for="(style, index) in styleList"
            :key="styleKeys[index]"
            class="cateListStyle"
            title=""
            @click="loadStyleInfo(style.Styletype)"
        >
            <div>
                top{{ index + 1 }} :{{ style.Styletype }} &nbsp;&nbsp;&nbsp;&nbsp;销量:{{
                    style.total
                }}
            </div>
        </li>
    </ul>
</template>

<script>
import shortId from "shortid";

export default {
    name: "StyleListInfo",
    data() {
        return {
            styleList: [],
            styleKeys: [],
            day: "30"
        };
    },
    created() {
        this.getData();
    },
    methods: {
        loadStyleInfo(params) {
            this.$router.push({
                path: "/styleInfo",
                query: { style: params }
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "StyletypeList/getStyleList?dayCount=" + this.day)
                .then(response => {
                    this.styleList = response.data.data;
                    this.styleKeys = this.styleList.map(() => shortId.generate());
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
.cateListStyle {
    list-style: none;
    padding-left: 20px;
    padding-bottom: 10px;
    display: inline-block;
    width: 50%;
    overflow: hidden;
}

.cateListStyle:hover {
    text-decoration: underline;
    font-weight: 700;
}

.titleStyle {
    font-weight: 700;
    list-style: none;
    font-size: 18px;
    padding-bottom: 10px;
}

.li-con {
    list-style: none;
    padding-bottom: 10px;
    text-align: left;
}

.customNumber {
    vertical-align: top;
}
</style>
