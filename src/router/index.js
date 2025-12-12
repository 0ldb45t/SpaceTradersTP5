import { createWebHistory, createRouter } from "vue-router";
import RegisterAgentPage from "@/components/RegisterAgentPage.component.vue";
import ShowCurrentLocationPageComponent from "@/components/ShowCurrentLocationPage.component.vue";
import ContratsComponent from "@/components/SchowCurrentContracts.component.vue";
import AgentComponent from "@/components/Agent.component.vue";



const routes = [
    {
        path: "/",
        name: "RegisterAgentPage",
        component: RegisterAgentPage,
    },
    {
        path: "/currentShipLocation",
        name: "CurrentShipLocationPage",
        component: ShowCurrentLocationPageComponent,
    },
    {
        path: "/currentAgentLocation",
        name: "CurrentAgentLocationPage",
        component: AgentComponent,
    },
    {
        path: "/contrats",
        name: "Contrats",
        component: ContratsComponent
    }
];
export const router = createRouter({
    history: createWebHistory(import.meta.env.baseUrl),
    routes,
});
