<template>
  <div>{{ time }}</div>
</template>

<script>
export default {
  name: "Time",
  data() {
    return {
      time: ""
    };
  },
  methods: {
    getTime() {
      this.time = this.$moment(new Date()).format("YYYY.MM.DD HH:mm:ss");
    }
  },
  mounted() {
    let that = this;
    that.getTime();
    setInterval(function() {
      that.getTime();
    }, 1000);
  }
};
</script>
