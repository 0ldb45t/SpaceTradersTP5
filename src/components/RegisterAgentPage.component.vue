<template>
    <CreateAgent v-if="store.agentToken === null" :feedback="feedBack" />
    <p v-if='feedBack !== ""' class="align-self-center">{{ feedBack }}</p>
    <AgentComponent v-if="store.agentToken !== null" />
</template>
<script setup>
import { computed, watch } from 'vue';
import { useAdminAgentStore } from '@/store';
import CreateAgent from './CreateAgent.component.vue';
import AgentComponent from './Agent.component.vue';
const store = useAdminAgentStore();
const feedBack = computed(() => store.subscriptionFeedBack);
watch(
    () => store.agentToken,
    () => store.agent.value = store.agent
);
</script>
<style scoped></style>
