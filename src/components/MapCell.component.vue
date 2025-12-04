<template>
    <div :class="cell[0].class" class="square flex-shrink-0" @mouseover="doWeDisplayData"></div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
const emit = defineEmits(['displayData'])
const props = defineProps({ cell: { type: Object, required: false } });
let cell = props.cell;

if (props.cell === undefined)
    cell = [new Object({ class: 'noir' })];

const doWeDisplayData = (e) => {

    if (cell[0].symbol !== undefined)
        emit('displayData', cell)
};
</script>
<style scoped>
.square {
    width: 5px;
    flex-grow: 0;
    padding: 0;
}


.rouge {
    background-color: red;
    border-radius: 50%;
}

.noir {
    background-color: rgb(0, 0, 0);
}

.jaune {
    background: radial-gradient(closest-side, #004103, #2bff00, #7bff69);
}

.rond {
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

.square:hover {
    background-color: #3cff00;
}

.position {
    background-color: rgba(0, 255, 0, 0.7);
}

.mainStar {
    background-color: white;
}
</style>