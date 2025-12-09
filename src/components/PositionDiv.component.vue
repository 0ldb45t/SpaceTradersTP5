<template>
    <div class="data text-center flex-column w-100 mb-2" v-if="cell.length > 0">
        <strong>
            <div v-if="!mapStore.canHover" class="w-100 d-flex flex-column align-items-center mt-2">
                <div v-if="mapStore.newWayPointData.traits !== undefined"
                    class="w-100 d-flex flex-column align-items-center mt-2">
                    <div v-for="trait, i in mapStore.newWayPointData.traits" class="w-75 align-items-center">
                        <p class="text-end textMid">{ Symbole: {{ trait.name }} }</p>
                        <p class="text-start textMid"> Description: {{ trait.description }} </p>
                    </div>
                </div>
            </div>
            <h4>
                Vous visez :
            </h4>
            <div v-for="(item, i) in cell">
                <div v-if="!mapStore.canHover">
                    <button class="buttonDetails mt-2" @click="() => getWayPointData(i)">Obtenir des informations
                        précises
                        sur {{ item.symbol }}
                    </button>
                </div>
                <p v-if="i === 0" :class="{ vousEtesIci: item.vousEtesIci }">{{ item.vousEtesIci }}</p>
                <p>
                    {{ item.symbol }} : {{ item.type }} :
                </p>
                <p>
                    [x:{{ item.x }}, y:{{ item.y }}]
                </p>
            </div>
        </strong>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAdminAgentStore, useMapStore, useSystemStore } from '@/store';

const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const mapStore = useMapStore();

const cell = computed(() => mapStore.cell);
const getWayPointData = async (i) => {
    const cell = mapStore.cell[i];
    console.log(systemStore.position);
    try {
        let response = await fetch(agentStore.fetchUrl +
            `systems/${systemStore.position.systemSymbol}/waypoints/${cell.symbol}`,
            agentStore.fetchOptions);
        if (response.ok) {
            const json = await response.json();
            mapStore.setNewWayPoint(json.data);
            console.log(mapStore.newWayPointData);
        }
    } catch (error) { console.log(error) }
};

</script>
<style scoped>
.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
}

.vousEtesIci {
    color: red;
}
</style>