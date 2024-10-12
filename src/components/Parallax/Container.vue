<script setup lang="ts">
import { Ref, provide, ref, watch } from 'vue';
import { type FloatOffsetData, floatKey, injectParallax } from './useParallax';

const props = withDefaults(
    defineProps<{
        currentOffset?: number;

        watchTop?: number | `${number}%`;
        watchBottom?: number | `${number}%`;
    }>(),
    {
        currentOffset: 0,
    },
);

const emit = defineEmits<{
    (e: 'update:currentOffset', val: number): void;
    (e: 'update:showPercent', val: number): void;
    (e: 'update:current', val: number): void;
    (e: 'update:height', val: number): void;
    (e: 'show'): void;
    (e: 'hide'): void;
}>();

const $el = ref<HTMLElement>();
const { current, currentOffset, showPercent, height } = injectParallax($el, {});

provide<FloatOffsetData>(floatKey, { currentOffset, showPercent });

function through<T>(name: string, refValue: Ref<T>) {
    watch(
        refValue,
        () => {
            // @ts-expect-error
            emit(`update:${name}`, refValue.value);
        },
        {
            immediate: true,
        },
    );
}

let lastInArea = false;

watch(
    () => currentOffset.value,
    () => {
        const offset = currentOffset.value;
        emit('update:currentOffset', offset);

        const inArea = offset >= 0 && offset <= 1;
        if (inArea && !lastInArea) {
            emit('show');
        } else if (!inArea && lastInArea) {
            emit('hide');
        }

        lastInArea = inArea;
    },
);
through('current', current);
through('showPercent', showPercent);
through('height', height);
</script>

<template>
    <div ref="$el" class="parallax-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.parallax-container {
    position: relative;
    min-height: 60vh;
}
</style>
