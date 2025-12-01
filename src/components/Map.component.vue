<template>
    <div class="card w-100">
        <h1 v-if="props.position">Position: {{ props?.position.symbol }}</h1>
        <div class=" d-flex justify-content-center flex-column align-items-center w-100">
            <div v-for="(row, x) in absoluteCoordinate" :key="x" class="row flex-shrink-0 w-100">
                <div v-for="(y, i) in row" :class="y" :key="i" class="square flex-shrink-0">

                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

import { defineProps, onMounted, ref } from 'vue';
const props = defineProps(
    {
        astres: { type: Array, required: true },
        position: { type: Object, required: false }
    }
);

const astres = props.astres;
let astresXY = [];
let xMin = ref(0);
let xMax = ref(0);
let yMin = ref(0);
let yMax = ref(0);
let xMinT = ref(0);
let xMaxT = ref(0);
let yMinT = ref(0);
let yMaxT = ref(0);
for (let i = 0; i < astres.length; i++) {
    if (Math.round(astres[i].x / 10) < xMin.value) {
        xMin.value = Math.round(astres[i].x / 10);
        xMinT.value = astres[i].x;

    }
    if (Math.round(astres[i].x / 10) > xMax.value) {
        xMax.value = Math.round(astres[i].x / 10);
        xMaxT.value = astres[i].x;

    }

    if (Math.round(astres[i].y / 10) < yMin.value) {
        yMin.value = Math.round(astres[i].y / 10);
        yMinT.value = astres[i].y;

    }

    if (Math.round(astres[i].y / 10) > yMax.value) {
        yMax.value = Math.round(astres[i].y / 10);
        yMaxT.value = astres[i].y;

    }
    if (Math.round(astres[i].x / 10) === Math.round(props.position.x / 10) &&  Math.round(astres[i].y / 10) === Math.round(props.position.y / 10) )
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'jaune';
    else if (astres[i].type === 'MOON') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-info';
    }
    else if (astres[i].type === 'ORBITAL_STATION') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-success';
    }
    else if (astres[i].type === 'ASTEROID') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-dark';
    }
    else if (astres[i].type === 'FUEL_STATION') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-warning';
    }
    else if (astres[i].type === 'PLANET') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-primary';
    }
    else if (astres[i].type === 'JUMP_GATE') {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-danger';
    }
    else {
        astresXY[`${Math.round(astres[i].x / 10)},${Math.round(astres[i].y / 10)}`] = 'bg-secondary';
    }

}

const toAbsolute = () => {
    let i = 0;
    let j = 0;
    let returned = [];
    for (let x = yMin.value; x <= yMax.value; x++) {
        returned[i] = [];
        for (let y = xMin.value; y <= xMax.value; y++) {
            returned[i][j++] = astresXY[`${x},${y}`] ?? 'noir';
        }
        i++;
        j = 0;
    }
    return returned;
}

const absoluteCoordinate = ref(toAbsolute());
</script>
<style scoped>
.row {
    height: 7px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 0;
}
.square {
    width: 7px;
    flex-grow: 0;
    padding: 0;
}
.rouge {
    background-color: red;
}

.noir {
    background-color: black;
}
.jaune{
    background-color: yellow;
    border-radius: 10%;
}
</style>