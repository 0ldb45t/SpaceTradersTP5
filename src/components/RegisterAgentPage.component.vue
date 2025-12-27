<template>
   <CreateAgent v-if="store.localStorageToken === null" :feedback="feedBack" />
    <p v-if='feedBack !== ""' class="align-self-center">{{ feedBack }}</p>
   <AgentComponent v-if="store.agent !== null && systemStore.readyToFetchSystemData" />
</template>
<script setup>
import { computed, watch } from 'vue';
import { useAdminAgentStore } from '@/store';
import { useSystemStore } from '@/store/systemStore';
import CreateAgent from './CreateAgent.component.vue';
import AgentComponent from './Agent.component.vue';
const store = useAdminAgentStore();
const systemStore = useSystemStore();
const feedBack = computed(() => store.subscriptionFeedBack);

</script>
<style scoped></style>
