<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';

const nav = [
    { url: 'https://lab.neetproject.com', label: 'lab', target: '_blank' },
    { url: 'https://lab.neetproject.com/1', label: 'lab', target: '_blank' },
    { url: 'https://lab.neetproject.com/2', label: 'lab', target: '_blank' },
    { url: 'https://lab.neetproject.com/3', label: 'lab', target: '_blank' },
    { url: 'https://lab.neetproject.com/4', label: 'lab', target: '_blank' },
];
</script>

<template>
    <nav class="nav">
        <ul>
            <li v-for="link in nav" :key="link.url">
                <a :href="link.url" :target="link.target">{{ link.label }}</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
.nav {
    padding-left: var(--padding-left-side, 5vw);
    ul {
        margin: 4px 0 0;
        padding: 0;
    }
    li {
        list-style: none;
        padding-left: 8px;
        border-left: 3px solid var(--home-color);
        transition: border-color 300ms ease;
        text-shadow: var(--home-text-shadow);

        a {
            display: block;
            text-decoration: none;
            color: var(--home-color);
            transition: color 300ms ease;
        }

        &:hover {
            border-left-color: var(--home-color-active);
            a {
                color: var(--home-color-active);
            }
        }
    }
}
</style>
