<script setup lang="ts">
import { NConfigProvider, NMessageProvider, lightTheme } from 'naive-ui';

import { useParallax } from './components/Parallax/useParallax';

import Home from './views/home/Index.vue'
import Travel from './views/travel/Index.vue'

useParallax();

</script>

<template>
    <NConfigProvider class="naive-container" :theme="lightTheme">
        <NMessageProvider>
            <Home />
            <Travel />
        </NMessageProvider>
    </NConfigProvider>
</template>

<style scoped>
.naive-container {
    min-height: 100vh;
}
</style>
