<template>
  <div class="entete mt-5 d-flex flex-row align-items-center justify-content-between">
    <h1 class="p-1 d-inline">TRADERS IN SPACE</h1>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div>
      <p>Test: {{ agent?.symbol }}</p>
=======
=======
>>>>>>> Stashed changes
    <p class="bg-danger" v-if="statusData.serverResets !== undefined">
        Prochaine réinitalisation: {{ new Date(statusData.serverResets.next) }}
      </p>
    <div class="me-3">
      <p class="mb-0">Agent {{ agent.symbol }}</p>
      <p class="mb-0">Crédits: {{ agent.credits }}</p>
      <p class="mb-0">Id: {{ agent.accountId }}</p>
      <!-- <p class="mb-0">Jeton: {{ agentToken }}</p> -->
       <!--J'ai mis la ligne du dessus en commentaire parce que c'est LAID-->
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useAdminAgentStore } from '@/store';
const store = useAdminAgentStore();
let agent = store.agent;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
console.log(agent);
=======
=======
>>>>>>> Stashed changes
const agentToken = store.agentToken;
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
watch(
    () => store.agentToken,
    () => localAgent.value = store.agent
);

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
