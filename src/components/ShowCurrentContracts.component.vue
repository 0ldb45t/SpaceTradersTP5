<template>
    <div class="w-100 d-flex flex-column align-items-stretch align-content-stretch gap-2 container">
        <h2 class="text-center">Contrats de {{ agent.symbol }}</h2>
        <div class="d-flex flex-wrap flex-row" v-for="(contrat, index) in contrats">
            <div class="conteneur w-25 d-flex flex-column justify-content-center align-item-center p-3 me-auto">
                <h4 class="mb-0 me-1 text-end">{{ contrat.factionSymbol }}</h4>
                <h2 class="text-center">Contrat #{{ index + 1 }}</h2>
                <p class="mb-0 text-center">Id: {{ contrat.id }}</p>
                <p class="text-center">Type de mission: {{ contrat.type }}</p>
                <button class="btn buttonDetails" @click="afficherInfos(contrat.id)">Afficher les détails</button>
            </div>
        </div>
        <br></br>
        <div class="infos w-100 d-flex flex-column justify-content-center align-item-center text-center rounded"
            v-if="contratInfo !== undefined">
            <h2>Statut</h2>
            <div v-if="contratInfo.accepted">
                <p class="mb-0">
                    Contrat accepté.
                </p>
                <p v-if="contratInfo.fulfilled" class="mb-0">
                    Conditions remplies, vous pouvez encaisser votre récompense.
                </p>
                <p v-else class="mb-0">
                    Vous n'avez pas encore rempli les conditions du contrat.
                </p>
            </div>
            <div v-else>
                <p class="mb-0">
                    Vous n'avez pas encore accepté ce contrat.
                </p>
                <p class="mb-0">
                    Date limite pour accepter le contrat: {{ new Date(contratInfo.deadlineToAccept) }}
                </p>
                <p class="mb-0">
                    Paiement à l'acceptation du contrat: {{ contratInfo.terms.payment.onAccepted }}
                    crédits
                </p>
            </div>
            <p>Paiement total: {{ contratInfo.terms.payment.onFulfilled }} crédits</p>

            <h2>Détails de la livraison</h2>
            <p class="mb-0">Date limite: {{ new Date(contratInfo.terms.deadline) }}</p>
            <p class="mb-0">Nombre de matériaux: {{ contratInfo.terms.deliver.length }}</p>
            <div v-for="materiau in contratInfo.terms.deliver">
                <div class="materiau rounded">
                    <p class="mb-0">Matériau à livrer: {{ materiau.tradeSymbol }}</p>
                    <p class="mb-0">Destination: {{ materiau.destinationSymbol }}</p>
                    <p class="mb-0">Nombre requis: {{ materiau.unitsRequired }}</p>
                    <p class="mb-0" v-if="contratInfo.accepted == true">Nombre livré: {{ materiau.unitsFulfilled }}
                    </p>
                </div>
            </div>
            <p>Date d'expiration de ce contrat: {{ new Date(contratInfo.expiration) }}</p>
            <button class="btn buttonAccepter" v-if="!contratInfo.accepted"
                @click="accepterContrat(contratInfo.id)">Accepter ce contrat</button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAdminAgentStore, useContratStore } from '@/store';

const agentStore = useAdminAgentStore();
const contratStore = useContratStore();


const agent = computed(()=>agentStore.agent);
const contrats = computed(() => contratStore.contrats);

const contratInfo = ref();

async function afficherInfos(contratId) {
    await contratStore.getContratInfos(agentStore.agentToken, contratId);
    contratInfo.value = contratStore.contratInfo;
}
async function accepterContrat(contratId) {
    await contratStore.acceptContrat(agentStore.agentToken, contratId);
    contratInfo.value = contratStore.contratInfo;
}
onMounted(async ()=> {
    if (agent.accountId !== undefined)
        contratStore.getListContrats(agentStore.agentToken)
    else 
    {
        await agentStore.getAgent();
        contratStore.getListContrats(agentStore.agentToken)
    }
})
</script>
<style scoped>
.conteneur {
    border: 2px solid #3cff00;
    background-color: black;
    color: #3cff00
}

.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
}

.buttonAccepter {
    border: 2px solid #00606e;
    background-color: black;
    color: #3BD7ED;
}

.infos {
    border: 2px solid #3BD7ED;
    background-color: #00606e;
    color: #3BD7ED;
}

.materiau {
    border: 2px solid #00606e;
    background-color: #3BD7ED;
    color: #00606e;
}
</style>