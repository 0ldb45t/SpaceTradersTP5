<template>
  <div class="entete mt-5 d-flex flex-row align-items-center justify-content-between">
    <router-link :to="{ name: 'RegisterAgentPage' }" style="text-decoration: none; color: inherit;">
      <h1 class="p-1 d-inline">TRADERS IN SPACE</h1>
    </router-link>
    <div class="mb-0 w-25">
      <p class="mb-0 w-25">Jeton (facile à copier mais moche)</p><span class="petit p-0 m-0">{{ store.agentToken
      }}</span>
    </div>
    <div class="d-flex flex-column">
      <p class="bg-danger p-1 mt-3 text-light z-1" v-if="statusData.serverResets !== undefined">
        Prochaine réinitalisation: {{ new Date(statusData.serverResets.next) }}
      </p>
      <div class="d-flex flex-row justify-content-center align-items-stretch">
        <router-link :to="{ name: 'CurrentAgentLocationPage' }" style="text-decoration: none; color: inherit;">
          <button class="p-1 d-inline buttonDetails">Agent</button>
        </router-link>
        <router-link :to="{ name: 'CurrentShipLocationPage' }" style="text-decoration: none; color: inherit;">
          <button class="p-1 d-inline buttonDetails">Vaisseaux</button>
        </router-link>
        <router-link :to="{ name: 'Contrats' }" style="text-decoration: none; color: inherit;">
          <button class="p-1 d-inline buttonDetails">Contrats</button>
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
import { ref } from 'vue';
import { useAdminAgentStore } from '@/store';
const store = useAdminAgentStore();
let agent = store.agent;
const statusData = ref({});
const TOKEN = store.TOKEN;
const fetchUrl = store.FETCH_URL;
const optionsMain = {
  method: 'GET',
  headers: { Authorization: 'Bearer ' + TOKEN }
};

const getCurrentAccount = async () => {
  fetch(fetchUrl, optionsMain)
    .then(response => response.json())
    .then(json => statusData.value = json);
};

getCurrentAccount();
</script>
<style scoped>
h1 {
  font-size: 90;
  margin: 0;
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
