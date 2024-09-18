<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';
import BackgroundView from './BackgroundView.vue';
import NavList from './Nav.vue';
import TitleLine from './Title.vue';
import Copyright from './Copyright.vue';

const currentOffset = ref(0);
const showPercent = ref(0);
</script>

<template>
    <ParallaxContainer class="home" v-model:current-offset="currentOffset" v-model:showPercent="showPercent">
        <BackgroundView class="background-effect"></BackgroundView>
        <div class="content">
            <TitleLine class="title" />

            <NavList class="nav" />
        </div>
        <Copyright />
        <!-- <Float style="background:#fff;width: 100px;height:100px;" :damp="0.5"></Float> -->
    </ParallaxContainer>
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

::selection {
    background: rgba(255, 255, 255, 0.8);
}
</style>

<style scoped lang="scss">
.home {
    height: 100vh;

    background: #333;
}
.content {
    position: relative;
    top: 45vh;
}
.background-effect {
    opacity: 0;
    animation: show 500ms ease 300ms;
    animation-fill-mode: forwards;
}
</style>
