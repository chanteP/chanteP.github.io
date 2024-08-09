<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';

const currentOffset = ref(0);
const showPercent = ref(0);

</script>

<template>
    <ParallaxContainer v-model:current-offset="currentOffset" v-model:showPercent="showPercent">
        <div>{{ currentOffset }}</div>
        <div>{{ showPercent }}</div>
    </ParallaxContainer>
</template>

<style scoped></style>
