<template>
    <div class="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1>Pour commencer, créer votre agent:</h1>
        <h4>Quel nom voulez-vous lui attribuer? </h4>
        <input class="text-center" v-model="symbol" />
        <button @click="postAgentRequest">Créer votre agent</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAdminAgentStore } from '@/store';
const store = useAdminAgentStore();
const fetchUrl = store.FETCH_URL;
const TOKEN = store.TOKEN;
const MAIL = store.MAIL;
const symbol = ref("");

const postAgentRequest = () => (
    fetch(`${fetchUrl}register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Bearer ' + TOKEN },
            body: `{"faction":"COSMIC", "symbol":"${symbol.value}", "email":"${MAIL}"}`
        }
    )
        .then(response => {
            return response.json()
        })
        .then(jsonItem => {
            if (jsonItem.error !== undefined) {
                store.setSubscriptionFeedBack(jsonItem.error.data.zodIssues ? jsonItem.error.data.zodIssues[0].message : jsonItem.error.message);
            }
            else {
                const newToken = jsonItem.data.token;
                const newAgent = jsonItem.data.agent;
                localStorage.setItem("newAgentToken", JSON.stringify(newToken));
                localStorage.setItem("agent", JSON.stringify(newAgent));
                store.setAgent(newAgent);
                store.setLocalStorageToken(newToken);
                store.setSubscriptionFeedBack("Sauvegarde réussie!");
            }
            console.log(jsonItem)
        })
        .catch(error => { console.log(error) })
);
</script>
<style scoped>
input,
button {
    background-color: black;
    color: #3cff00;
    border: 1px solid #3cff00;
    ;
}
</style>