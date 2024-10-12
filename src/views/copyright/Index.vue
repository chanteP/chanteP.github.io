<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';
import ParallaxContainer from '../../components/Parallax/Container.vue';
import Float from '../../components/Parallax/Float.vue';

type Ball = {
    x: number;
    y: number;
    size: number;
    hue: number;
    duration: number;
    delay: number;
};

const ballCount = 10;
const decoratorList = ref<Ball[]>([]);

function createBall(n: number) {
    let i = 0;
    while (i++ < n) {
        decoratorList.value.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 200 + 50,
            hue: Math.random() * 70,
            duration: Math.random() * 25000 + 5000,
            delay: Math.random() * 10000,
        });
    }
}

onMounted(() => {
    createBall(ballCount);
});
</script>

<template>
    <ParallaxContainer class="copyright-wrapper">
        <Float
            class="background-decorator fill"
            :fn="(v, p) => `transform: translateY(${v * 0.95}px);opacity:${p + 1};`"
        >
            <div
                class="ball"
                v-for="ball in decoratorList"
                :style="{
                    width:`${ball.size}px`,
                    height:`${ball.size}px`,
                    left:`${ball.x}%`,
                    top:`${ball.y}%`,
                    animationDelay:`${ball.delay}ms`,
                    animationDuration:`${ball.duration}ms`,
                    filter:`hue-rotate(${ball.hue}deg)`,
                }"
            ></div>
        </Float>
        <div class="copyright">
            <div>© <span>NEETPROJECT</span> 2024</div>
            <div>
                @<span><a href="https://github.com/chanteP" target="_blank">chanteP</a></span>
            </div>
        </div>
    </ParallaxContainer>
</template>

<style scoped lang="scss">
.copyright-wrapper {
    position: relative;
    height: 100vh;
}
.background-decorator {
    position: absolute;
    filter: blur(50px);
    overflow: hidden;
    pointer-events: none;
    z-index: -1;

    .ball {
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        opacity: 0;
        background-color: var(--home-color-active);
        border-radius: 50%;
        transform-origin: center center;
        animation: ball 3000ms ease-in-out 0ms infinite;
    }
}
.copyright {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-family: fot-klee;
    letter-spacing: 0.2em;
    z-index: 2;

    font-size: 12px;
    a {
        color: inherit !important;
    }
}

@keyframes ball {
    0% {
        transform: scale(1);
        opacity: 0;
    }
    50% {
        transform: scale(1.3) translate(20%, 0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
