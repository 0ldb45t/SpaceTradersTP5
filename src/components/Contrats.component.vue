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
        <div class="infos w-100 d-flex flex-column justify-content-center align-item-center text-center rounded"
            v-if="contratInfo !== undefined">
            <h2>Statut</h2>
            <p v-if="contratInfo.accepted">Contrat accepté.</p>
            <p v-if="contratInfo."></p>
            <p class="mb-0" v-else>Vous n'avez pas encore accepté ce contrat.</p>
            <h2>Détails de la livraison</h2>
            <p class="mb-0">Date limite: {{ new Date(contratInfo.terms.deadline) }}</p>
            <p class="mb-0">Nombre de matériaux: {{ contratInfo.terms.deliver.length }}</p>
            <div v-for="materiau in contratInfo.terms.deliver">  
                <div class="materiau rounded">
                    <p class="mb-0">Matériau à livrer: {{ materiau.tradeSymbol }}</p>
                    <p class="mb-0">Destination: {{ materiau.destinationSymbol }}</p>
                    <p class="mb-0">Nombre requis: {{ materiau.unitsRequired }}</p>
                    <p class="mb-0" v-if="contratInfo.accepted == true">Nombre livré: {{ materiau.unitsFulfilled }}</p>
                </div>
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
    .infos{
        border: 2px solid #3BD7ED;
        background-color: #288594;
        color: #3BD7ED;
    }
    .materiau{
        border: 2px solid #288594;
        background-color: #3BD7ED;
        color: #288594;
    }
</style>