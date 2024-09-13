<template>
    <div class="main-container mb-4" id="userBox">
      <!-- Profile Section -->
      <section id="profileSection" class="profile-section mt-5">
        <div v-for="user in userIsLogged()" :key="user" class="profile-card custom-shadow">
          <div class="card-header d-flex justify-content-between align-items-center">
            <p class="status-tag">
              <i class="fa-regular fa-circle-user fa-lg status-icon"></i> Active
            </p>
          </div>
          <div class="card-body text-center">
            <img :src="user.userImg" class="user-avatar mx-auto mb-3" :alt="user.username" />
            <h5 class="card-title">{{ user.username }}</h5>
            <p class="card-text">{{ user.userEmail }}</p>
          </div>
          <div class="user-info px-3">
            <div class="form-group">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" v-model="username" placeholder="Enter username" />
            </div>
            <div class="form-group">
              <label for="profileImg" class="form-label">Profile Image URL</label>
              <input type="text" class="form-control" v-model="userImg" placeholder="Profile Image URL" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" v-model="user.userEmail" readonly />
            </div>
            <div class="action-buttons d-flex justify-content-between mt-3">
              <router-link to="/products" class="btn btn-primary">Visit Shop</router-link>
              <button type="button" class="btn btn-success" @click="updateUser(user.userID)">Save Changes</button>
              <router-link to="/admin" class="btn btn-danger" v-if="$cookies.get('role') === 'admin'">Manage Website</router-link>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Cart Section -->
      <section id="activitySection" class="cart-section mt-5">
        <div class="cart-card custom-shadow">
          <h5 class="card-header text-start">Check Your Cart</h5>
          <div class="cart-body">
            <p v-if="$store.state.cartState.length > 0" class="small text-center">
              
            </p>
            <p v-else class="small text-center">
              <router-link to="/cart">No items in cart</router-link>
            </p>
            <div class="text-center">
              <router-link to="/cart" class="btn btn-secondary">
                <span class="item-count">{{ $store.state.cartState.length }}</span> items in cart
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userID: $cookies.get('userId'),
        username: '',
        userEmail: '',
        userPass: '',
        userRole: '',
        userImg: '',
      };
    },
    methods: {
      userIsLogged() {
        let users = JSON.parse(localStorage.getItem('activeUser')) || [];
        return users;
      },
      getCart() {
        this.$store.dispatch('userCart');
      },
      updateUser(userID) {
        let userObjX = {
          userID: this.userID,
          username: this.username,
          userEmail: this.userEmail,
          userPass: this.userPass,
          userRole: this.userRole,
          userImg: this.userImg,
        };
        this.$store.dispatch('updateUser', userObjX);
      },
    },
    mounted() {
      this.userIsLogged();
      this.getCart();
    },
  };
  </script>
  
  <style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
  margin-top: 80px; 
}

  
  /* Profile section */
  .profile-section {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .profile-card {
    width: 100%;
    max-width: 600px;
    padding: 1rem;
    border-radius: 10px;
    background-color: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  .user-avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  /* Form styling */
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .input-group {
    width: 100%;
  }
  
  .action-buttons .btn {
    flex: 1;
    margin: 0 0.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .action-buttons .btn:hover {
    transform: translateY(-3px);
  }
  
  /* Cart section */
  .cart-section {
    width: 100%;
    max-width: 600px;
  }
  
  .cart-card {
    padding: 1rem;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .cart-body {
    padding: 1rem;
  }
  
  .item-count {
    background-color: #dc3545;
    border-radius: 50%;
    padding: 0.5em;
    font-size: 1.2em;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .profile-card, .cart-card {
      max-width: 100%;
      margin: 0;
    }
  
    .action-buttons {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  
  @media (max-width: 320px) {
    .user-avatar {
      width: 120px;
      height: 120px;
    }
  }
  </style>
  