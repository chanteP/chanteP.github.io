<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { floatKey, type FloatOffsetData } from './useParallax';

const props = defineProps<{
    damp?: number;
    value?: number;
    fn?: (value: number) => string;
}>();

const currentOffset = inject<FloatOffsetData>(floatKey, ref(0));

const translateValue = computed(() => {
    const offset = (props.value ?? currentOffset.value) * (props.damp ?? 1);
    const fn = props.fn ?? ((value: number) => `transform: translateY(${value}px)`);
    return fn(offset);
});

</script>

<template>
    <div :style="translateValue"><slot></slot></div>
</template>

<style scoped></style>
