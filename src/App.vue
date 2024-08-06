<script setup lang="ts">
import { NConfigProvider, NMessageProvider, lightTheme } from 'naive-ui';

import Home from './views/home/Index.vue'


</script>

<template>
    <NConfigProvider class="naive-container" :theme="lightTheme">
        <NMessageProvider>
            <Home class="h100" />
            <Home class="h100" />
            <Home class="h100" />
            <Home class="h100" />
        </NMessageProvider>
    </NConfigProvider>
</template>

<style scoped>
.naive-container {
    min-height: 100vh;
}
.h100{
    height: 100vh;
}
</style>
