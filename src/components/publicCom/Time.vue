<template>
    <div>{{ localTime }}</div>
</template>

<script>
export default {
    name: "TopMenu",
    data() {
        return {
            localTime: ""
        };
    },
    mounted() {
        this.currentTime();
    },
    beforeDestroy: function() {
        if (this.getDate) {
            clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
            this.getDate = null;
        }
    },
    methods: {
        currentTime() {
            setInterval(this.getDate, 1000);
        },
        getDate() {
            let date = new Date(+new Date() + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");

            this.localTime = date;
        }
    }
};
</script>
