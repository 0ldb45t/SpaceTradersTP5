<template>
   <div class=" loader">
        <p class="w-100 text-center align-self-center">{{ text }}</p>
        <p class="w-100 text-center align-self-center" v-if="i > 5">{{ text }}</p>
        <p class="w-100 text-center align-self-center" v-if="i > 10">{{ text }}</p>

    </div>
</template>
<script setup>
import { ref } from 'vue';

const text = ref("");

let i = 0;
function type() {
    i++;
    setTimeout(type, 200);
    text.value += "*";
    if (i % 5 === 0)
        text.value = "";
}
type();
</script>
<style scoped>
.loader {
    height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
}
</style>