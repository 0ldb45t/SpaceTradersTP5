<template>

    <h1> {{agent.symbol}}</h1>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps(
    {
        agent: { type: Object, required: true }
    }
)
</script>