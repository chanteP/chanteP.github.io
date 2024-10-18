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

const decoratorList = ref<Ball[]>([]);

function createBall(n: number, options: Partial<Ball> = {}) {
    const mergedOptions = {
        x: options.x ?? 110,
        y: options.y ?? 110,
        size: options.size ?? 200,
        hue: options.hue ?? 180,
        duration: options.duration ?? 27000,
        delay: options.delay ?? 7000,
    };

    let i = 0;
    while (i++ < n) {
        decoratorList.value.push({
            x: Math.random() * mergedOptions.x - 5,
            y: Math.random() * mergedOptions.y,
            size: Math.random() * mergedOptions.size + 50,
            hue: Math.random() * mergedOptions.hue,
            duration: Math.random() * mergedOptions.duration + 7000,
            delay: Math.random() * mergedOptions.delay - 2 * mergedOptions.delay,
        });
    }
}

onMounted(() => {
    createBall((document.documentElement.clientWidth / 500) * 10);
});
</script>

<template>
    <ParallaxContainer class="copyright-wrapper">
        <Float class="background-decorator fill" :fn="(v, p) => `opacity: ${(p + 1) / 2};`">
            <div
                class="ball"
                v-for="ball in decoratorList"
                :style="{
                    width: `${ball.size}px`,
                    height: `${ball.size}px`,
                    left: `${ball.x}%`,
                    top: `${ball.y}%`,
                    animationDelay: `${ball.delay}ms`,
                    animationDuration: `${ball.duration}ms`,
                    filter: `hue-rotate(${ball.hue}deg)`,
                }"
            ></div>
        </Float>
        <Float class="copyright" :fn="(v, p) => `transform: translateY(${v * 0.2}px);`">
            <div>© <span>NEETPROJECT</span> 2024</div>
            <div>
                @<span><a href="https://github.com/chanteP" target="_blank">chanteP</a></span>
            </div>
        </Float>
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
        opacity: 0.1;
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
        opacity: 0.1;
    }
    20% {
        transform: scale(1.5) translate(23%, 0);
        opacity: 1;
    }
    50% {
        transform: scale(1.3) translate(0, 0);
        opacity: 1;
    }
    70% {
        transform: scale(1.5) translate(-17%, 0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.1;
    }
}
</style>
