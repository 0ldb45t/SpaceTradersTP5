<template>

    <div class="map">
        <div class="d-flex justify-content-center flex-column align-items-center w-100 mb-5">
            <div v-for="(row, x) in absoluteCoordinate" :key="x" class="row flex-shrink-0">
                <MapCellComponent v-for="(y, i) in row" :cell="y" :key="i"
                    @displayData="(cell) => $emit('displayData', (cell))" />
            </div>
        </div>
    </div>


</template>
<script setup>
import MapCellComponent from './MapCell.component.vue';
import { ref } from 'vue';
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


const divideByt10AndRounded = (n) => Math.floor(n / 10);

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
        item.vousEtesIci = `Vous êtes ici!`

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
    else if (astres[i].type === 'GAS_GIANT') {
        item.class = 'bg-light';
    }

    else {
        item.class = 'bg-secondary';
    }
    item.class += ' rond';

}
const toAbsolute = () => {
    let returned = [];
    for (let y = yMin.value; y <= yMax.value; y++) {
        const row = [];
        for (let x = xMin.value; x <= xMax.value; x++) {
            row.push(astresXY[`${x}, ${y}`] ?? undefined);
        }
        returned.push(row);
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

.map:hover {
    border: 2px solid green;
    padding: 5px;
}
</style>
