import { createRouter, createWebHistory } from 'vue-router';

import TeamMembers from './components/teams/TeamMembers.vue';
import TestItem from './components/test/TestItem.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';
import UsersList from './pages/UsersList.vue';
import TeamsList from './pages/TeamsList.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // domain/teams => TeamsList
    {
      name: 'teams',
      path: '/teams',
      // component: TeamsList,
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers , props: true }, // domain/teams => TeamsList
      ]
    }, // domain/teams => TeamsList
    // { path: '/teams', component: TeamsList, alias: '/' }, // domain/teams => TeamsList
    {
      path: '/users',
      // component: UsersList,
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log('beforeEnter to /users');
        console.log(to, from);
        next();
      }
    }, // domain/users => UsersList
    // { path: '/teams/:teamId', component: TeamMembers , props: true }, // domain/teams => TeamsList
    { path: '/teams/new', component: TestItem }, // domain/new => TeamsList
    { path: '/:notFound(.*)', component: NotFound },
  ],
  // linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  }
});

router.beforeEach(function(to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    // Logic to verify authentication
    next();
  } else {
    next();
  }
  // next(false); // With true or without params you confirm the navigation
  // next('/team-members') // With string you can pass the path to the route that do you want
  // if (to.name === 'team-members') { // This validation is to avoid infinite loop for reload the same page
    // next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } }) // Or you can pass the route in the way of the route
  // }
});

router.afterEach(function(to, from) {
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
