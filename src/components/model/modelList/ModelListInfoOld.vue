<template>
    <ul>
        <li class="li-con">
            <div class="switchDayCount">
                <span>切换时间：</span>
                <select id="dayCount" class="" @change="changeOption()">
                    <option value="1">最近3月(默认)</option>
                    <option value="5">最近1月</option>
                    <option value="2">最近6月</option>
                    <option value="3">最近一年</option>
                    <option value="4">最近三年</option>
                </select>
            </div>
        </li>
        <li
            v-for="(model, index) in modelList"
            :key="modelKeys[index]"
            class="cateList"
            @click="loadModelInfo(model.model)"
        >
            top{{ index + 1 }} :{{ model.model }}--{{ model.total }}
        </li>
    </ul>
</template>

<script>
import shortId from "shortid";

export default {
    name: "ModelListInfo",
    data() {
        return {
            modelList: [],
            modelKeys: [],
            day: "30"
        };
    },
    created() {
        this.getData();
    },
    methods: {
        loadModelInfo(params) {
            this.$router.push({
                path: "/modelInfo",
                query: { model: params }
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "ModelList/getModelList?dayCount=" + this.day)
                .then(response => {
                    this.modelList = response.data.data;
                    this.modelKeys = this.modelList.map(() => shortId.generate());
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
.cateList {
    list-style: none;
    padding-left: 20px;
    padding-bottom: 10px;
    display: inline-block;
    width: 50%;
    overflow: hidden;
}

.cateList:hover {
    text-decoration: underline;
    font-weight: 700;
}

.title {
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
