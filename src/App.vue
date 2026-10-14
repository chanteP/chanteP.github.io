<script setup lang="ts">
import { NMessageProvider, NConfigProvider, lightTheme } from 'naive-ui';

import { useParallax } from './components/Parallax/useParallax';

useParallax();
</script>

<template>
    <NConfigProvider class="naive-container" :theme="lightTheme">
        <NMessageProvider>
            <RouterView />
        </NMessageProvider>
    </NConfigProvider>
</template>

<style>
@import url('./assets/fonts/font.css');
</style>

<style scoped>
.naive-container {
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
}
</style>
