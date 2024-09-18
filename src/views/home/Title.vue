<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';
</script>

<template>
    <div class="title">
        <h1>NEET<br />PROJECT</h1>
    </div>
</template>

<style scoped lang="scss">
.title {
    display: flex;
    border-bottom: 1px solid var(--dash-color);
    padding-bottom: 4px;

    &:before,
    &:after {
        content: '';
        display: block;

        background-image: repeating-linear-gradient(
            129deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0) 1px,
            var(--dash-color) 2px,
            var(--dash-color) 2px,
            rgba(255, 255, 255, 0) 2px,
            rgba(255, 255, 255, 0) 4px
        );
    }
    &:before {
        width: var(--padding-left-side, 5vw);
    }
    &:after {
        flex: 1;
    }
}

h1 {
    margin: 0;
    padding: 8px 12px 0;
    font-family: Helvetica, 'Microsoft YaHei', sans-serif;
    font-size: 80px;
    line-height: 0.8;
    vertical-align: middle;
    color: var(--home-color);
    background: repeat;
    text-shadow: var(--home-text-shadow);
}
</style>
