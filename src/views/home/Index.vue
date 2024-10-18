<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';

import BackgroundView from './backgroundRender/sunset/Background.vue';
// import BackgroundView from './backgroundRender/firework/Background.vue';

import NavList from './Nav.vue';
import TitleLine from './Title.vue';
import Copyright from './Copyright.vue';

const currentOffset = ref(0);
const showPercent = ref(0);

const backgroundFallback = ref(false);
</script>

<template>
    <ParallaxContainer class="home fill" v-model:current-offset="currentOffset" v-model:showPercent="showPercent">
        <ClientOnly>
            <BackgroundView
                class="background-effect"
                :class="{ fallback: backgroundFallback }"
                @error="backgroundFallback = true"
            ></BackgroundView>
        </ClientOnly>
        <div class="content">
            <TitleLine class="title" />

            <NavList />
        </div>
        <Copyright />
        <!-- <Float style="background:#fff;width: 100px;height:100px;" :damp="0.5"></Float> -->
    </ParallaxContainer>
</template>
<style>
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
</style>

<style scoped lang="scss">
.content {
    position: relative;
    top: 45vh;
}
.background-effect {
    position: absolute;

    opacity: 0;
    animation: show 500ms ease 300ms;
    animation-fill-mode: forwards;

    &.fallback {
        background: linear-gradient(0deg, rgb(255, 244, 208), rgb(84, 203, 177));
        z-index: -1;
        // mix-blend-mode: exclusion;
    }
}
</style>
