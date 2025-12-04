<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <h1>Pour commencer, créer votre agent:</h1>
        <h4>Quel est le nom de votre agent? </h4>
        <input class="text-center" v-model="symbol" />
        <p>{{ symbol }}</p>
        <button @click="postAgentRequest">Créer votre agent</button>
        <p>{{ feedBack }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import useSpatialStore from '@/store';
const store = useSpatialStore();
const fetchUrl = store.fetchUrl;
const TOKEN = store.TOKEN;
const MAIL = store.MAIL;
const symbol = ref("");

const feedBack = store.subscriptionFeedBack;
const postAgentRequest = () => (
    fetch(`${fetchUrl}register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Bearer ' + TOKEN },
            body: `{"faction":"COSMIC", "symbol":"${symbol.value}", "email":"${MAIL}"}`
        }
    )
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else store.setSubscriptionFeedBack(response.error.message);
        })
        .then(jsonItem => {
            localStorage.setItem("agent", JSON.stringify(jsonItem.data.agent))
            store.setSubscriptionFeedBack("Sauvegarde réussie!");
            console.log(jsonItem)
        })
        .catch(error => { store.setSubscriptionFeedBack(error); })
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