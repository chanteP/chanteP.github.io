<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';
</script>

<template>
    <ParallaxContainer class="copyright-wrapper">
        <div class="copyright">
            <div>© <span>NEETPROJECT</span></div>
            <div>
                @<span><a href="https://github.com/chanteP" target="_blank">chanteP</a></span>
            </div>
            <div>2024</div>
        </div>
    </ParallaxContainer>
</template>

<style scoped lang="scss">
.copyright-wrapper {
    height: 100vh;
}
.copyright {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-family: fot-klee;
    letter-spacing: 0.2em;

    font-size: 12px;
    a {
        color: inherit !important;
    }
}
</style>
