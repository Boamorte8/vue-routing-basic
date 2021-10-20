<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
    };
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query);
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter Team members Cmp');
    // this.loadTeamMembers(to.params.teamId); // This can be an alternative to watcher ways
    console.log(to, from);
    next();
  },
  methods: {
    loadTeamMembers(teamId) {
      // console.log(route);
      // console.log(this.teams);
      // const teamId = route.params.teamId;
      const selectedTeam = this.teams.find(team => team.id == teamId);
      this.members = [];
      if (selectedTeam) {
        selectedTeam.members.forEach(member => {
          const selectedMember = this.users.find(user => user.id == member);
          this.members.push(selectedMember);
        });
        this.teamName = selectedTeam.name;
      }
    }
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    }
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>