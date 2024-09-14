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
            <TitleLine />

            <NavList class="nav" />
        </div>
        <Copyright />
        <!-- <Float style="background:#fff;width: 100px;height:100px;" :damp="0.5"></Float> -->
    </ParallaxContainer>
</template>

<style scoped>
.home {
    --home-color: rgba(51, 51, 51, 0.9);
    --home-color-active: rgba(253, 106, 79, 0.9);
    --home-text-shadow: rgba(0,0,0,.4) 1px 1px 4px;
    --dash-color: rgba(0, 0, 0, 0.5);
    --padding-left-side: 5vw;

    height: 100vh;
}
.content {
    position: relative;
    top: 45vh;
}
</style>
