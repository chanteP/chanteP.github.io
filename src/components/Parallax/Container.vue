<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';

const props = defineProps<{
    top?: number;
}>();

</script>

<template>
    <div class="parallax-container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.parallax-container {
    position: relative;
    min-height: 60vh;
}
</style>
