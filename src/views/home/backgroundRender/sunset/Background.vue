<script setup lang="ts">
import { watch, onMounted, ref, onBeforeUnmount } from 'vue';

import { simpleInit } from '@/utils/gl';
import { getNoiseImg } from '@/utils/gl/getNoise';

// https://www.shadertoy.com/view/XslGRr
import cloudFrag from './sunset.frag?raw';
import Float from '@/components/Parallax/Float.vue';

const emit = defineEmits<{
    (e: 'error', err: Error): void;
}>();

const $canvas = ref<HTMLCanvasElement>();
const needFallback = ref(false);
let instance: ReturnType<typeof simpleInit> | undefined = undefined;

async function init() {
    instance = simpleInit($canvas.value!, {
        main: cloudFrag,
        autoPlay: true,
        fps: 10,
    });

    const noiseImage = await getNoiseImg();

    // inject();
    instance.injectTexture('uNoise', 0, noiseImage, {});
}

async function setContext() {
    try {
        await init();
    } catch (e) {
        emit('error', e as Error);
    }
}

function blur(v: number, p: number) {
    return `filter: blur(${p * 60}px) contrast(${p * 100 + 100}%);transform:translateY(${v * 0.2}px);`;
}

onMounted(setContext);
onBeforeUnmount(() => {
    instance?.stop();
});
</script>

<template>
    <Float class="background fill" :fn="blur">
        <canvas ref="$canvas" class="canvas full"></canvas>
        <div class="mask full"></div>
    </Float>
</template>

<style>
/* theme */
:root {
    --home-color: rgba(51, 51, 51, 0.9);
    --home-color-active: rgba(253, 106, 79, 0.9);
    --home-text-shadow: rgba(0, 0, 0, 0.4) 1px 1px 4px;
    /* --home-text-shadow: rgba(0,0,0,.4) 2px 2px 0px; */
    --dash-color: rgba(0, 0, 0, 0.5);
    --padding-left-side: 5vw;
}

body:before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;

    background:
        repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0 / 2500px 2500px,
        repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60% / 2500px 2500px;
    background-blend-mode: difference;
    opacity: 0.06;
}

::selection {
    background: rgba(255, 255, 255, 0.8);
}
</style>

<style scoped>
.background {
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.749) 0%, rgba(0, 0, 0, 0) 45%) 100% no-repeat;
    }

    .canvas {
        display: block;
        z-index: -1;
    }
}
</style>
