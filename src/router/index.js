import { createWebHistory, createRouter } from "vue-router";
import RegisterAgentPage from "@/components/RegisterAgentPage.component.vue";



const routes = [
    {
        path: "/",
        name: "RegisterAgentPage",
        component: RegisterAgentPage,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.baseUrl),
    routes,
});



export default router;