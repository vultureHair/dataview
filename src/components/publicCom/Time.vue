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
  methods: {
    currentTime() {
      setInterval(this.getDate, 500);
    },
    getDate() {
      let date = new Date(+new Date() + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");

      this.localTime = date;
    }
  },
  mounted() {
    this.currentTime();
  },
  beforeDestroy: function() {
    if (this.getDate) {
      // console.log("销毁定时器");
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
};
</script>
