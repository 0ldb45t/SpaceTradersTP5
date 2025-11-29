<template>

    <h1> {{ agent.symbol }}</h1>
    <p>Nombre de vaisseaux: {{ agent.shipCount }}</p>
    <p>Crédits: {{ agent.credits }}</p>
    <ul v-for="ship in agent.ships">
        <li>{{ ship.symbol }}</li>
        <li>{{ ship.registration.name }}</li>
    </ul>
    <RouterLink :to="{ name: 'CurrentLocationPage', params: { nomAgent: agent.symbol } }"
        style="text-decoration: none; color: inherit;">
        <h1>
            Accéder à la position de l'agent
        </h1>
    </RouterLink>
</template>
<script setup>
import { Agent } from '@/stores/agent';
import { defineProps } from 'vue';
const props = defineProps(
    {
        agent: { type: Agent, required: true }
    }
)
</script>