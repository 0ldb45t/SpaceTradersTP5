<template>
    <div class="text-light">
        <h1>Créer votre agent:</h1>
        <label>Quel est le nom de votre agent? </label>
        <input v-model="symbol" />
        <p>{{ symbol }}</p>
        <button @click="postAgentRequest">Créer votre agent.</button>
    </div>
</template>
<script setup>
import { fetchUrl } from '@/store/fetchUrl';
import { TOKEN, MAIL } from '@/store/env';
import { ref } from 'vue';
const symbol = ref("");
const props = defineProps(
    {
        feedBack: { type: Object, required: true }
    }
);
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
                feedBack = "Sauvegarde réussie!";
                return response.json()
            }
            else feedBack = response.error.message;
        })
        .then(jsonItem => {
            localStorage.setItem("agent", JSON.stringify(jsonItem.data.agent))
            console.log(jsonItem)
        })
        .catch(error => console.log(error))
);
</script>
<style scoped></style>