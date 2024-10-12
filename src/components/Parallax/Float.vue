<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { floatKey, type FloatOffsetData } from './useParallax';

const props = defineProps<{
    damp?: number;
    value?: number;
    tag?: string;
    fn?: (currentOffset: number, showPercent: number) => string;
}>();

const { currentOffset, showPercent } = inject<FloatOffsetData>(floatKey)!;

const translateValue = computed(() => {
    const offset = (props.value ?? currentOffset.value) * (props.damp ?? 1);
    const fn =
        props.fn ?? ((currentOffset: number, showPercent: number) => `transform: translateY(${currentOffset}px)`);
    return fn(offset, showPercent.value);
});
</script>

<template>
    <div :style="translateValue"><slot></slot></div>
</template>

<style scoped>
div{
    transform-origin: center center;
}
</style>
