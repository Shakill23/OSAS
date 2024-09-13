<template>
  <div id="app">
    <NavbarComponent />
    <LoaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './components/FooterComp.vue';
import LoaderComponent from './components/LoaderComp.vue';
import NavbarComponent from './components/NavbarComp.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    LoaderComponent
  }
}
</script>

<style scoped>
/* Main application styling */
#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  background-color: #f4f4f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

/* Navbar fixed at the top */
.navbar-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Spacing to prevent content from being hidden under navbar */
#app > router-view {
  padding-top: 60px;
}

/* Button and link hover effects */
button, a {
  transition: all 0.2s ease;
}

button:hover, a:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Hiding scrollbars (optional) */
::-webkit-scrollbar {
  width: 0px;
}
</style>
