<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';

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
    <div class="background">
        <canvas ref="$canvas" class="canvas"></canvas>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    width: 100vw;
    height: 100vh;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.749) 0%, rgba(0, 0, 0, 0) 25.6889%) 100% no-repeat;
    }

    .canvas {
        width: 100%;
        height: 100%;
        z-index: -1;
    }
}
</style>
