import { createWebHistory, createRouter } from "vue-router";
import RegisterAgentPage from "@/components/RegisterAgentPage.component.vue";
import ShowCurrentLocationPageComponent from "@/components/ShowCurrentLocationPage.component.vue";



const routes = [
    {
        path: "/",
        name: "RegisterAgentPage",
        component: RegisterAgentPage,
    },
    {
        path: "/currentLocation/:nomAgent",
        name: "CurrentLocationPage",
        component: ShowCurrentLocationPageComponent,
        params: {
            nomAgent: String,
        }
    }
];
export const router = createRouter({
    history: createWebHistory(import.meta.env.baseUrl),
    routes,
});
