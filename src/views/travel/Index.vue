<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';
import WorldMap from './WorldMap.vue';


</script>

<template>
    <ParallaxContainer name="travel" class="travel-wrapper">
        <Float class="map-float" :damp="0">
            <WorldMap />
        </Float>
    </ParallaxContainer>
</template>

<style scoped>
.travel-wrapper{
    height: 100vh;
}
.map-float{
    width: 100%;
    height: 100%;
}
</style>
