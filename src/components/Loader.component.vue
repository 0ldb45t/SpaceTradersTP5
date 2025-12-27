<template>
    <p>{{ text }}</p>
</template>
<script setup>
import { ref } from 'vue';

const source = "******";
const text = ref("");

let i = 0;
function type() {
    
        i++;
        setTimeout(type, 55);
        text.value += "*";
        if(i === 30)
        text.value += "\n"
    
}
type();
</script>