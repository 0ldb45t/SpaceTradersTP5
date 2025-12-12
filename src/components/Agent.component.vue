<template>
    <div v-if="system?.symbol !== undefined && agent?.symbol !== undefined"
        class="p-5 d-flex flex-row align-items-start align-content-center justify-content-center gap-5">
        <div class="d-flex flex-column gap-2">
            <div class="p-5 d-flex flex-column align-items-center align-content-center borderGreen">
                <h1>Bienvenue <strong>{{ agent?.symbol }}</strong></h1>
                <p>Nombre de vaisseaux: <strong>{{ agent?.shipCount }}</strong></p>
                <p>Crédits: <strong>{{ agent?.credits }}</strong></p>
                <h3 class="text-center">Vous êtes dans le système: </h3>
                <p>{
                    <br />Nom: <strong>{{ system?.name }}</strong>,
                    <br />Symbole: <strong>{{ system?.symbol }}</strong>,
                    <br />Type: <strong>{{ system?.type }}</strong>
                    <br />
                    }
                </p>
                <p>Coordonnées du système:<br />[x: {{ system?.x }},y:{{ system?.y }}]</p>
                <p v-if="agentStore.agentWayPoint">Coordonnées de l'astre :<br />[x: {{ agentStore.agentWayPoint.x
}},y:{{
                        agentStore.agentWayPoint.y }}]</p>
                <div v-if="system?.factions.length > 0">
                    <p v-for="faction in system?.faction">
                        Ce système est controllé par {{ faction.symbol }}
                    </p>
                </div>
                <p v-else>Ce systeme n'est controllé par aucune faction.</p>
            </div>
        </div>
        <div class="p-5 d-flex flex-column align-items-center align-content-center borderGreen">
            <div v-if="agentStore.agentWayPoint?.traits">
                <h2 class="text-start">Liste des points d'intérêts sur {{ agentStore.agentWayPoint.symbol }}</h2>
                <h3 class="text-end">Controllé par {{ agentStore.agentWayPoint.faction.symbol }}</h3>
                <div v-for="trait, i in agentStore.agentWayPoint.traits">
                    <div class="d-flex flex-row justify-content-between">
                        <p class="text-end textMid">{ Symbole: {{ trait.name }} }</p>
                    </div>
                    <p class="text-start textMid"> Description: {{ trait.description }} </p>
                    <hr v-if="i < agentStore.agentWayPoint.traits.length - 1" class="borderGreen ms-5 me-5" />
                </div>
            </div>
        </div>
        <div class="d-flex flex-column gap-3">
            <div class="borderGreen p-5 d-flex flex-column">
                <h2 class="text-center">Actions de {{ agent.symbol }}</h2>
                <div class="d-flex flex-column justify-content-center align-content-stretch align-items-stretch gap-2">
                    <router-link :to="{ name: 'CurrentShipLocationPage' }"
                        style="text-decoration: none; color: inherit;">
                        <button class="p-1 d-inline buttonDetails p-2">
                            <h3 class="text-center">Accéder à la navigation de votre vaisseau principal</h3>
                        </button>
                    </router-link>
                    <router-link :to="{ name: 'Contrats' }" style="text-decoration: none; color: inherit;">
                        <button class="p-1 d-inline buttonDetails w-100">
                            <h3 class="text-center">Contrats</h3>
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="borderGreen p-5 d-flex flex-column">
                <div class="d-flex flex-column justify-content-center align-content-stretch align-items-stretch gap-2">
                    <button class="p-1 d-inline buttonDetails p-2"
                        @click="async () => await systemStore.setDisplayWayPoints(agentStore.agentToken)">
                        <h2 class="text-center">Afficher tous les astres de <strong>{{ system?.name }}</strong></h2>
                    </button>
                    <div v-if="systemStore.displayWayPoints">
                        <div v-for="astre in astres">
                            <div :class="{ vousEtesIci: astre.symbol === agentStore.agentWayPoint.symbol }"
                                class="d-flex flex-row justify-content-between itemList">
                                <p>{{ astre.symbol }}</p>
                                <p>Coordonnées : [x: {{ astre.x }},y:{{ astre.y }}]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAdminAgentStore } from '@/store';
import { useSystemStore } from '@/store/systemStore';

const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
agentStore.getAgentData();
const agent = computed(() => agentStore.agent);
const system = computed(() => agentStore.agentSystem);
const astres = computed(() => systemStore.astresAgent);
</script>
<style scoped>
.vousEtesIci {
    border: 2px solid #3cff00;
    background-color: rgb(135, 255, 135);
    color: #0f3f00;
}

.itemList:hover {
    border: 2px solid #3cff00;
    background-color: rgb(0, 233, 0);
    color: #000000;
}
</style>