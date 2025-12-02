<template>
    <div class="data" v-if="hover && cell.symbol">
        <strong>
            <p v-if="cell.vousEtesIci">{{ cell.vousEtesIci + "," }}</p>
            <p>{{ cell.type }}</p>
        </strong>
        <p>{{ cell.symbol }}</p>
    </div>
    <div :class="cell.class" class="square flex-shrink-0" @mouseover="showData" @mouseleave="showData"></div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({ cell: { type: Object, required: false } });
let cell = props.cell;
let hover = ref(false);
if (props.cell === undefined)
    cell = new Object({ class: 'noir' });
const showData = () => {
    if (hover.value) hover.value = false
    else hover.value = true;
}
</script>
<style scoped>
.square {
    width: 7px;
    flex-grow: 0;
    padding: 0;
}

.rouge {
    background-color: red;
    border-radius: 50%;
}

.noir {
    background-color: black;
}

.jaune {
    background: radial-gradient(closest-side, #a63f3f, #ffd900, #ffee00);
    box-shadow: 25px 25px 25px red;
    z-index: 5;
}
.rond{
        border-radius: 50%;
}

.data {
    position: fixed;
    background: linear-gradient(#4d4d4d, #414141);
    margin-left: 20px;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    width: 250px;
    z-index: 10;
}
</style>