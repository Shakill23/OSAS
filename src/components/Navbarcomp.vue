<template>
  <nav class="navbar navbar-expand-lg" id="navbar">
    <div class="container-fluid">
      <a class="navbar-brand text-black" href="#">
        <img src="https://shakill23.github.io/allImages/images/sdLogo.png" alt="OSAS-Logo" width="35" height="35" class="d-inline-block align-text-center">
        <span class="brand-name">OSAS</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/products">Products</router-link>
          <router-link class="nav-link" to="/admin">Admin</router-link>
          <router-link class="nav-link" to="/profile" v-if="$cookies.get('jwt')">Profile</router-link>
          <router-link class="nav-link" to="/login" v-if="!$cookies.get('jwt')">Login</router-link>
          <router-link class="nav-link" to="/contact">Contact</router-link>
          <router-link class="nav-link cart-icon" id="cartXYZ" to="/cart" v-if="$cookies.get('jwt')">
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
            <span>{{$store.state.cartState.length}}</span>
          </router-link>
          <button v-if="$cookies.get('jwt')" @click="logOut()" class="btn logout-btn">
            <i class="fa-solid fa-sm">Logout</i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logoutUser');
    }
  }
};
</script>

<style scoped>
#navbar {
  position: fixed;
  width: 100%;
  background: rgba(255, 255, 255, 0.8); /* Subtle opacity for the background */
  backdrop-filter: blur(10px); /* Adds a frosted glass effect */
  z-index: 999;
  top: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adds a shadow for depth */
  transition: background 0.3s ease; /* Smooth background transition */
}

.brand-name {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
  margin-left: 8px;
}

.navbar-toggler {
  border: none;
  outline: none;
}

.navbar-toggler-icon {
  background-color: #333;
  border-radius: 50%;
}

nav {
  padding: 15px 30px;
}

nav a {
  font-weight: bold;
  color: #000000;
  padding: 10px;
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth hover effects */
}

nav a:hover {
  color: #00bfff;
  transform: translateY(-2px); /* Slight lift on hover */
}

nav a.router-link-exact-active {
  color: #00bfff;
}

.cart-icon {
  position: relative;
}

.cart-icon i {
  color: #0497c9;
  transition: transform 0.3s ease;
}

.cart-icon:hover i {
  transform: scale(1.1);
}

.cart-icon span {
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  padding: 4px 7px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.cart-icon:hover span {
  transform: scale(1.1); /* Enlarge cart counter on hover */
}

.btn.logout-btn {
  background-color: #333;
  border: none;
  padding: 6px 10px;
  border-radius: 50%;
  color: white;
  margin-left: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn.logout-btn:hover {
  background-color: #444;
  transform: scale(1.05);
}

@media (max-width: 995px) {
  #navbar {
    background: rgba(255, 255, 255, 1);
  }

  nav {
    padding: 10px 20px;
  }

  .brand-name {
    font-size: 1rem;
  }
}
</style>
