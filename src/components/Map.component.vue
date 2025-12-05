<template>
    <div class="map p-4">
        <div class="d-flex justify-content-center flex-column align-items-center w-100">
            <div v-for="(row, x) in absoluteCoordinate" :key="x" class="row flex-shrink-0">
                <MapCellComponent v-for="(y, i) in row" :cell="y" :key="i" />
            </div>
        </div>
    </div>
</template>
<script setup>
import MapCellComponent from './MapCell.component.vue';
import { computed, ref } from 'vue';
import { useSystemStore } from '@/store';

const store = useSystemStore();

const astres = store.astres;
const position = store.position;
let astresXY = [];
let xMin = ref(0);
let xMax = ref(0);
let yMin = ref(0);
let yMax = ref(0);


const divideByt10AndRounded = (n) => Math.floor(n / 10);
const positionX = divideByt10AndRounded(position.x);
const positionY = divideByt10AndRounded(position.y);

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
    if (astresXY[`${dividedX}, ${dividedY}`] !== undefined)
        astresXY[`${dividedX}, ${dividedY}`].push(astres[i]);
    else {
        astresXY[`${dividedX}, ${dividedY}`] = [];
        astresXY[`${dividedX}, ${dividedY}`].push(astres[i]);
    }
    const item = astresXY[`${dividedX}, ${dividedY}`][astresXY[`${dividedX}, ${dividedY}`].length - 1];
    item.class = 'rond ';
    if (dividedX === positionX && dividedY === positionY) {
        item.class = 'jaune';
        item.vousEtesIci = `Vous êtes ici!`
        continue;
    }
    switch (astres[i].type) {
        case 'MOON': item.class += 'bg-info';
            break;
        case 'ORBITAL_STATION': item.class += 'bg-success';
            break;
        case 'ASTEROID': item.class += 'bg-dark';
            break;
        case 'FUEL_STATION': item.class += 'bg-warning';
            break;
        case 'PLANET': item.class += 'bg-primary';
            break;
        case 'JUMP_GATE': item.class += 'bg-danger';
            break;
        case 'GAS_GIANT': item.class += 'bg-danger';
            break;
        default: item.class += 'bg-secondary';
            break;
    }
}
astresXY[`${0}, ${0}`] = [];
astresXY[`${0}, ${0}`].push({ class: "mainStar", symbol: position.system, type: "MAIN_STAR" });

for (let x = positionX - 1; x <= positionX + 1; x++) {
    for (let y = positionY - 1; y <= positionY + 1; y++) {
        if (!(x === positionX && y === positionY)) {
            astresXY[`${x}, ${y}`] = [];
            astresXY[`${x}, ${y}`].push(
                {
                    class: "position",
                    vousEtesIci: "Vous êtes ici!"
                });
        }
    }
}
const absoluteCoordinate = computed(() => {
    let returned = [];
    for (let y = yMin.value; y <= yMax.value; y++) {
        const row = [];
        for (let x = xMin.value; x <= xMax.value; x++) {
            row.push(astresXY[`${x}, ${y}`] ?? undefined);
        }
        returned.push(row);
    }
    return returned;
});

</script>
<style scoped>
.row {
    height: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 0;
}
.map {
    cursor: none
}
.map:hover {
    border: 2px solid green;
    padding: 5px;
}
</style>
