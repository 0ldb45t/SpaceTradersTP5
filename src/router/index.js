import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/HomePage.component.vue";



const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.baseUrl),
    routes,
});



export default router;