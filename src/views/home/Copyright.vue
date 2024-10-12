<script setup lang="ts">
import Float from '@/components/Parallax/Float.vue';

function translateX(v: number, p: number){
    return `opacity: ${1 - 3 * p}`;
}
</script>

<template>
    <Float class="copyright" :fn="translateX">© 2024 <span>NEETPROJECT</span> @<span><a href="https://github.com/chanteP" target="_blank">chanteP</a></span> | All rights reserved.</Float>
</template>

<style scoped>
.copyright {
    position: absolute;
    bottom: 2px;
    right: 2px;

    font-size: 12px;
    font-size: 10px;
    color: var(--home-color);

    span {
        font-family: fot-klee;
        font-weight: 700;
    }
    a{
        text-decoration: none !important;
        color: inherit !important;
    }
}
</style>
