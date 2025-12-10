<template>

        <div v-if="agent?.symbol !== '' && systemStore.readytoMap" class="p-3 align-self-end borderGreen">
            <h4>Position de {{ agent.symbol }} : [ x: {{ shipPosition.x }}, y: {{ shipPosition.y }} ]</h4>
            <h4 class="p-0 m-0 text-end">Symbole du systeme: <strong>{{ shipPosition?.systemSymbol }}</strong></h4>
            <h4 class="mt-1">
                Reserve de fuel de {{ ships[0].symbol }} : {{ ships[0].fuel.current }}/{{ ships[0].fuel.capacity }}
            </h4>
            <h4 class="p-0 m-0 text-end">
                Statut du vaisseau:
                <button class="buttonDetails" @click="() => navStore.dockUndockShip(ships[0], agentStore.agentToken)">
                    {{ ships[0].nav.status }}
                </button>
            </h4>
            <hr class="borderGreen ms-5 me-5" />
            <div v-for="trait, i in shipPosition.traits">
                <div class="d-flex flex-row justify-content-between">
                    <button class="buttonDetails" v-if="trait.name ==='Marketplace'"
                    @click="() => navStore.refuelShip(ships[0], agentStore.agentToken)"
                    >
                        Faire le plein
                    </button>
                <p class="text-end textMid">{ Symbole: {{ trait.name }} }</p>
                </div>
                <p class="text-start textMid"> Description: {{ trait.description }} </p>
                <hr v-if="i < shipPosition.traits.length - 1" class="borderGreen ms-5 me-5" />
            </div>
        </div>

</template>
<script setup>

import { computed } from 'vue';
import { useAdminAgentStore, useSystemStore } from '@/store';
import { useNavigationStore } from '@/store/navigationStore';
const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const navStore = useNavigationStore();

const agent = agentStore.agent;
const shipPosition = computed(() => systemStore.position);
const ships = computed(() => systemStore.ships);

</script>