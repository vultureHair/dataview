<template>
    <div class="con">
        <ComAttribute></ComAttribute>
    </div>
</template>

<script>
import ComAttribute from "@/components/attribute/ComAttribute.vue";

export default {
    name: "Attribute",
    components: {
        ComAttribute
    }
};
</script>

<style scoped>
.con {
    text-align: left;
    height: 700px;
}
</style>
