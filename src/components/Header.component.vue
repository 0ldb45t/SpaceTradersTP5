<template>
  <div class="entete mt-5 d-flex flex-row align-items-center justify-content-between">
    <router-link :to="{ name: 'RegisterAgentPage' }" style="text-decoration: none; color: inherit;">
      <h1 class="p-1 d-inline">TRADERS IN SPACE</h1>
    </router-link>

    <p class="bg-danger p-1 mt-3 text-light" v-if="statusData.serverResets !== undefined">
      Prochaine réinitalisation: {{ new Date(statusData.serverResets.next) }}
    </p>
    <div class="me-3">
      <p class="mb-0 text-end">Agent {{ agent.symbol }}</p>
      <p class="mb-0 text-end">Crédits: {{ agent.credits }}</p>
      <p class="mb-0 text-end">Id: {{ agent.accountId }}</p>
      <!-- <p class="mb-0">Jeton: {{ agentToken }}</p> -->
      <!--J'ai mis la ligne du dessus en commentaire parce que c'est LAID-->
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
const fetchUrl = store.fetchUrl;
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
</style>
