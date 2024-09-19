<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';

import { simpleInit } from '@/utils/gl';
import { getNoiseImg } from '@/utils/gl/getNoise';

// https://www.shadertoy.com/view/XslGRr
import cloudFrag from './backgroundRender/sunset.frag?raw';

const $canvas = ref<HTMLCanvasElement>();
const needFallback = ref(false);

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

async function setContext(){
    try{
        await init();
    }catch(e){
        needFallback.value = true;
    }
}

onMounted(setContext);
</script>

<template>
    <div class="background fill" :class="{fallback: needFallback}">
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

    &.fallback {
        background: linear-gradient(0deg, rgb(255, 244, 208), rgb(84, 203, 177));
        mix-blend-mode: exclusion;
        .canvas {
            background: 
                repeating-radial-gradient(#000 0 .0001%, #fff 0 .0002%) 50% 0 / 2500px 2500px, 
                repeating-conic-gradient(#000 0 .0001%, #fff 0 .0002%) 60% 60% / 2500px 2500px;
            background-blend-mode: difference;
            opacity: 0.06;
        }
    }
}
</style>
