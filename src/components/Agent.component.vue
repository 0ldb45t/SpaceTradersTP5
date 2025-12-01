<template>
    <div class="card bg-gradient bg-light rounded-5 p-5">
        <h1> {{ agent?.symbol }}</h1>
        <p>Nombre de vaisseaux: {{ agent?.shipCount }}</p>
        <p>Crédits: {{ agent?.credits }}</p>
        <ul v-for="ship in agent?.ships">
            <li>{{ ship?.symbol }}</li>
            <li>{{ ship?.registration.name }}</li>
        </ul>
        <RouterLink v-if="agent.symbol !== undefined"
            :to="{ name: 'CurrentLocationPage', params: { nomAgent: agent?.symbol } }"
            style="text-decoration: none; color: inherit;">
            <h1 class="border-1 border-info rounded-5">
                Accéder à la position de l'agent
            </h1>
        </RouterLink>
    </div>
</template>
<script setup>
import { agent } from '@/stores/agent';

</script>