<template>
  <div class="user-container">
      <div v-for="user in getLoggedUser()" v-bind:key="user.id" class="user-card">
          <div>
              <img :src="user.userImg" :alt="user.username" class="user-image">
          </div>
          <div class="user-details">
              <div class="user-info">
                  <!-- Display the username -->
                  <span class="label-text">Username:</span>
                  {{ user.username }}
              </div>
              <div class="user-info">
                  <!-- Display the user's email -->
                  <span class="label-text">Email:</span>
                  {{ user.userEmail }}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
      getLoggedUser() {
          // Retrieve the logged-in user data from localStorage
          let users = JSON.parse(localStorage.getItem("activeUser")) || [];
          return users;
      }
  },
  mounted() {
      this.getLoggedUser();
  }
}
</script>

<style scoped>
.user-container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.user-card {
  display: flex;
  flex-direction: row;
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.user-image {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  transition: transform 0.3s ease;
}

.user-image:hover {
  transform: scale(1.05);
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-info {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.label-text {
  color: #888;
}
</style>
