<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';

import { simpleInit } from '@/utils/gl';
import { getNoiseImg } from '@/utils/gl/getNoise';

// https://www.shadertoy.com/view/XslGRr
import cloudFrag from './backgroundRender/sunset.frag?raw';

const $canvas = ref<HTMLCanvasElement>();

async function init() {
    const { inject, injectTexture } = simpleInit($canvas.value!, {
        main: cloudFrag,
        autoPlay: true,
        fps: 10,
    });

    const noiseImage = await getNoiseImg();

    // inject();
    injectTexture('uNoise', 0, noiseImage, {});
}

onMounted(init);
</script>

<template>
    <div class="background fill">
        <canvas ref="$canvas" class="canvas"></canvas>
        <div class="mask"></div>
    </div>
</template>

<style scoped>
.background {
    position: absolute;

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.749) 0%, rgba(0, 0, 0, 0) 45%) 100% no-repeat;
    }

    .canvas {
        display: block;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
}
</style>
