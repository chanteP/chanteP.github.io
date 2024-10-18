<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';
import { useMap } from './renderMap';
// import * as echarts from 'echarts';

const $wrapper = ref<HTMLElement>();

const $canvas = ref<HTMLCanvasElement>();

useMap($canvas);
</script>

<template>
    <canvas ref="$canvas" class="map-wrapper"></canvas>
</template>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
