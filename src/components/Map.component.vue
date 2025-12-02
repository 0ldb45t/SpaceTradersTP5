<template>

    <div class=" d-flex justify-content-center flex-column align-items-center w-100 mb-5">
        <div v-for="(row, x) in absoluteCoordinate" :key="x" class="row flex-shrink-0">
            <MapCellComponent v-for="(y, i) in row" :cell="y" :key="i">

            </MapCellComponent>
        </div>
    </div>


</template>
<script setup>
import MapCellComponent from './MapCell.component.vue';
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


const divideByt10AndRounded = (n) => Math.round(n / 10);

for (let i = 0; i < astres.length; i++) {
    const dividedX = divideByt10AndRounded(astres[i].x);
    const dividedY = divideByt10AndRounded(astres[i].y);

    if (dividedX < xMin.value)
        xMin.value = dividedX;
    if (dividedX > xMax.value)
        xMax.value = dividedX;
    if (dividedY < yMin.value)
        yMin.value = dividedY;
    if (dividedY > yMax.value)
        yMax.value = dividedY;

    astresXY[`${dividedX}, ${dividedY}`] = astres[i];
    const item = astresXY[`${dividedX}, ${dividedY}`];

    if (dividedX === divideByt10AndRounded(props.position.x) && dividedY === divideByt10AndRounded(props.position.y)) {
        item.class = 'jaune';
        item.vousEtesIci = `Vous êtes ici! x: ${dividedX}, Y: ${dividedY}`

    }
    else if (astres[i].type === 'MOON') {
        item.class = 'bg-info';
    }
    else if (astres[i].type === 'ORBITAL_STATION') {
        item.class = 'bg-success';
    }
    else if (astres[i].type === 'ASTEROID') {
        item.class = 'bg-dark';
    }
    else if (astres[i].type === 'FUEL_STATION') {
        item.class = 'bg-warning';
    }
    else if (astres[i].type === 'PLANET') {
        item.class = 'bg-primary';
    }
    else if (astres[i].type === 'JUMP_GATE') {
        item.class = 'bg-danger';
    }
    else {
        item.class = 'bg-secondary';
    }
    item.class += ' rond';

}
const toAbsolute = () => {
    let i = 0;
    let j = 0;
    let returned = [];
    for (let x = yMin.value; x <= yMax.value; x++) {
        returned[i] = [];
        for (let y = xMin.value; y <= xMax.value; y++) {
            returned[i][j++] = astresXY[`${x}, ${y}`] ?? undefined;
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
</style>
