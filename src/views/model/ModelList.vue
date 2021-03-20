<template>
    <div class="con">
        <ModelListInfo></ModelListInfo>
    </div>
</template>

<script>
import ModelListInfo from "@/components/model/modelList/ModelListInfo";

export default {
    name: "ModelList",
    components: {
        ModelListInfo
    }
};
</script>

<style scoped>
.con {
    text-align: left;
}
</style>
