<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';

const currentOffset = ref(0);
const showPercent = ref(0);
</script>

<template>
    <ParallaxContainer v-model:current-offset="currentOffset" v-model:showPercent="showPercent">
        <h1>NEET PROJECT</h1>
        <!-- <Float style="background:#fff;width: 100px;height:100px;" :damp="0.5"></Float> -->
    </ParallaxContainer>
</template>

<style scoped>
h1 {
    font-family: fot-klee, helvetica, themify, 'Microsoft YaHei', sans-serif;
}
</style>
