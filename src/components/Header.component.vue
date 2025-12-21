<template>
  <div class="entete mt-5 d-flex flex-row align-items-center justify-content-between">
    <router-link :to="{ name: 'RegisterAgentPage' }" style="text-decoration: none; color: inherit;">
     <h1 class="p-1 d-inline ms-2">TRADERS IN SPACE</h1>
    </router-link>
   <div class="d-flex flex-column align-content-stretch align-items-stretch">
      <div class="d-flex flex-row justify-content-center align-items-stretch gap-1 w-100">
        <router-link :to="{ name: 'CurrentAgentLocationPage' }" style="text-decoration: none; color: inherit;">
         <button class="p-3 buttonDetails">
            <p class="textButton mb-0">AGENT</p>
          </button>
        </router-link>
        <router-link :to="{ name: 'CurrentShipLocationPage' }" style="text-decoration: none; color: inherit;">
         <button class="p-3 buttonDetails">
            <p class="textButton mb-0">VAISSEAUX</p>
          </button>
        </router-link>
        <router-link :to="{ name: 'Contrats' }" style="text-decoration: none; color: inherit;">
         <button class="p-3 buttonDetails">
            <p class="textButton mb-0">CONTRATS</p>
          </button>
        </router-link>
      </div>

    </div>
    <div class="me-3">
      <p class="mb-0 text-end">Agent {{ agent.symbol }}</p>
      <p class="mb-0 text-end">Crédits: {{ agent.credits }}</p>
      <p class="mb-0 text-end">Id: {{ agent.accountId }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAdminAgentStore } from '@/store';
const store = useAdminAgentStore();
let agent = computed(() => store.agent);

</script>
<style scoped>
h1 {
  font-size: 90;
  margin: 0;
}
.textButton {
  font-size: 1.5em;
}
.entete {
  background-color: rgba(0, 255, 0, 0.897);
  color: black;
}

.petit {
  font-size: 0.2em !important;
  line-height: 0%;
}
</style>
