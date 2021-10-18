import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import TestItem from './components/test/TestItem.vue';
import NotFound from './components/nav/NotFound.vue';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // domain/teams => TeamsList
    {
      path: '/teams',
      component: TeamsList,
      children: [
        { path: ':teamId', component: TeamMembers , props: true }, // domain/teams => TeamsList
      ]
    }, // domain/teams => TeamsList
    // { path: '/teams', component: TeamsList, alias: '/' }, // domain/teams => TeamsList
    { path: '/users', component: UsersList }, // domain/users => UsersList
    // { path: '/teams/:teamId', component: TeamMembers , props: true }, // domain/teams => TeamsList
    { path: '/teams/new', component: TestItem }, // domain/new => TeamsList
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
