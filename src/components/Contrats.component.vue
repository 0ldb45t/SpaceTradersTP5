<template>
    <h2 class="text-center">Contrats de {{ agent.symbol }}</h2>
    <div>
        <div class="d-flex flex-wrap flex-row" v-for="(contrat, index) in contrats">
            <div class="conteneur w-25 d-flex flex-column justify-content-center align-item-center p-3 me-auto">
                <h4 class="mb-0 me-1 text-end">{{ contrat.factionSymbol }}</h4>
                <h2 class="text-center">Contrat #{{ index + 1 }}</h2>
                <p class="mb-0 text-center">Id: {{ contrat.id }}</p>
                <p class="text-center">Type de mission: {{ contrat.type }}</p>
                <button class="btn" @click="afficherInfos(contrat.id)">Afficher les détails</button>
            </div>
        </div>
        <br></br>
        <div class="infos w-100 d-flex flex-column justify-content-center align-item-center"
            v-if="contratInfo !== undefined">
            <h2>Termes</h2>
            <div>
                <p>Date d'expiration: {{ contratInfo.terms.deadline }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, computed, watch, ref } from 'vue';
import { useAdminAgentStore, useSystemStore } from '@/store';

const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const contrats = computed(() => systemStore.contrats);
const agent = agentStore.agent;
const token = agentStore.agentToken;

let contratInfo = ref(undefined);

onBeforeMount(() => {
    if (agentStore.agentToken !== undefined) {
        systemStore.getSystemData(agentStore.agentToken)
    }
});
watch(
    () => agentStore.agentToken,
    (value) => systemStore.getSystemData(value)
);

async function afficherInfos(contratId) {
    await systemStore.getContratInfos(token, contratId);
    contratInfo.value = systemStore.contratInfo;
    console.log(contratInfo.value);
}
</script>
<style scoped>
    .conteneur{
        border: 2px solid #3cff00;
        background-color: black;
        color: #3cff00
    }
    button {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
    }
</style>