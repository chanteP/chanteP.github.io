<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';

const nav = [
    {
        url: 'https://lab.neetproject.com',
        label: 'lab',
        desc: 'web pages for browser experiments.',
        target: '_blank',
    },
];
</script>

<template>
    <nav class="nav">
        <ul>
            <li v-for="link in nav" :key="link.url">
                <a :href="link.url" :target="link.target">
                    {{ link.label }}
                    <span class="desc">{{ link.desc }}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
.nav {
    padding-left: var(--padding-left-side, 5vw);
    user-select: none;

    ul {
        margin: 12px 0 0;
        padding: 0;
    }
    li {
        list-style: none;
        line-height: 1.6;
        padding-left: 8px;
        border-left: 3px solid var(--home-color);
        transition:
            border-color 300ms ease,
            background 300ms ease;
        text-shadow: var(--home-text-shadow);
        white-space: nowrap;
        overflow: hidden;

        a {
            display: block;
            text-decoration: none;
            color: var(--home-color);
            font-family: fot-klee;
            transition:
                color 300ms ease,
                transform 300ms ease;
        }

        .desc {
            opacity: 0;
            font-size: 12px;
            transition:
                opacity 300ms ease;

            &:before,
            &:after {
                content: '-';
                padding: 0 1em;
            }
        }

        &:hover {
            // border-left-color: var(--home-color-active);
            border-left-width: 5px;
            background: rgba(0, 0, 0, 0.03);
            a {
                // color: var(--home-color-active);
                transform: translate(4px, 0);
            }

            .desc {
                opacity: 1;
            }
        }
    }
}
</style>
