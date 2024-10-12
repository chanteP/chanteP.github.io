<script setup lang="ts">
import Float from '@/components/Parallax/Float.vue';
import { watch, onMounted, ref, computed } from 'vue';

function titleFn(value: number, showPercent: number) {
    return `opacity:${1 - showPercent * 2};flex:${Math.cos(showPercent - Math.PI / 2) * 10};`;
}
</script>

<template>
    <div class="title">
        <Float :fn="titleFn">
            <h1>NEET<br />PROJECT</h1>
        </Float>
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
            var(--dash-color) 3px,
            rgba(255, 255, 255, 0) 4px,
            rgba(255, 255, 255, 0) 6px
        );

        opacity: 0.7;
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
    font-size: 68px;
    line-height: 0.8;
    vertical-align: middle;
    color: var(--home-color);
    text-shadow: var(--home-text-shadow);

    @include media(isPC()) {
        font-size: 80px;
    }
}
</style>
