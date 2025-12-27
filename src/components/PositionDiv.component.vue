<template>
    <div class="data text-center flex-column w-100 mb-2" v-if="cell.length > 0">
        <strong>
            <h4>
                Vous visez :
            </h4>
            <div v-for="(item, i) in cell">
                <p v-if="i === 0" :class="{ vousEtesIci: item.vousEtesIci }">{{ item.vousEtesIci }}</p>
                <p>
                    {{ item.symbol }} : {{ item.type }} :
                </p>
                <p>
                    [x:{{ item.x }}, y:{{ item.y }}]
                </p>
                <div v-if="!mapStore.canHover && mapStore.newWayPointData.symbol !== item.symbol">
                    <button class="buttonDetails mb-2" @click="() => getWayPointData(i)">
                        Obtenir des informations précises sur {{ item.symbol }}
                    </button>
                    <hr class="borderGreen ms-5 me-5" />
                </div>

            </div>
        </strong>
        <div v-if="!mapStore.canHover" class="w-100 d-flex flex-column align-items-center mt-2">
            <div v-if="mapStore.newWayPointData.traits !== undefined"
                class="w-100 d-flex flex-column align-items-center mt-2">
                <h3>Traits de {{ mapStore.newWayPointData.symbol }}</h3>
                <div v-for="trait, i in mapStore.newWayPointData.traits" class="w-75 align-items-center">
                    <p class="text-end textMid">{ Symbole: {{ trait.name }} }</p>
                    <p class="text-start textMid"> Description: {{ trait.description }} </p>
                    <button
                        v-if="navStore.getDistanceFromWaypoints(systemStore.position, mapStore.newWayPointData) < systemStore.ships[0].fuel.current"
                        @click="navStore.navigateToWaypoint(systemStore.ships[0], mapStore.newWayPointData, agentStore.agentToken)"
                        class="buttonDetails mb-2">
                        Accéder à {{ mapStore.newWayPointData.symbol }} <br />Coût:
                        {{ navStore.getDistanceFromWaypoints(systemStore.position, mapStore.newWayPointData) }} Fuel
                    </button>
                    <hr v-if="i < mapStore.newWayPointData.traits.length - 1" class="borderGreen ms-5 me-5" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAdminAgentStore, useMapStore } from '@/store';
import { useSystemStore } from '@/store/systemStore';
import { useNavigationStore } from '@/store/navigationStore';
const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const mapStore = useMapStore();
const navStore = useNavigationStore();

const cell = computed(() => mapStore.cell);
const getWayPointData = async (i) => {
    const cell = mapStore.cell[i];
    try {
        let response = await fetch(agentStore.FETCH_URL +
            `systems/${systemStore.position.systemSymbol}/waypoints/${cell.symbol}`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + agentStore.localStorageToken },
            });
        if (response.ok) {
            const json = await response.json();
            mapStore.setNewWayPoint(json.data);
        }
    } catch (error) { console.log(error) }
};

</script>
<style scoped>
.vousEtesIci {
    color: red;
}
</style>