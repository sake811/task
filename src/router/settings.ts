import {createRouter, createWebHistory} from 'vue-router'
import App from '../App.vue'
const routes = [{
    path: '/',
    redirect: "/getVillage"
},
{
    path: "/getVillage", 
    component: App,
}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router