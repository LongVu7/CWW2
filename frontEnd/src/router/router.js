import { createRouter, createWebHistory } from 'vue-router';
import Words from '../views/Words.vue';
import New from '../views/New.vue';
import Show from '../views/Show.vue';
import Edit from '../views/Edit.vue';
import Test from '../views/Test.vue';
import About from '../views/About.vue';

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { 
        path: '/',
        redirect: '/words'
    },
    {
        path: '/words',
        name: 'wordList',
        component: Words
    },
    {
        path: '/words/new',
        name: 'NewWord',
        component: New
    },  
    {
        path: '/words/:id',
        name: 'showWord',
        component: Show
    },
    {
        path: '/words/:id/edit',
        name: 'editWord',
        component: Edit
    },
    {
        path: '/test',
        name: 'testWord',
        component: Test
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
  ]
});