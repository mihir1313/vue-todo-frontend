import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import UserDashboard from '../pages/UserDashboard.vue';


const routes = [

    {
        path: '/user',
        name: 'UserDashboard',
        component: UserDashboard,
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user')); 
            const token = user ? user.token : null; 

            if (token) {
                next(); 
            } else {
                next('/');
            }
        }
    },
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
