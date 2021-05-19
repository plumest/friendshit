<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">Friendshit</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/books">Books</b-nav-item>
        <b-nav-item href="#" disabled>(Coming soon!)</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/login" class="nav-item" v-if="!currentUser">
          <i class="ion ion-log-in"></i>  Login
        </b-nav-item>
        <b-nav-item to="/register" class="nav-item" v-if="!currentUser">
          <b-icon icon="person-badge" aria-hidden="true"></b-icon> Signup
        </b-nav-item>
        <b-nav-item-dropdown right v-if="currentUser">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em><b-icon icon="person-circle" aria-hidden="true"/> {{ currentUser.name }}</em>
          </template>
          <b-dropdown-item href="#" @click.prevent="logOut"><i class="ion ion-log-out"></i> Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>
