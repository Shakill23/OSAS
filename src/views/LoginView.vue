<template>
  <div class="form-wrapper">
    <div class="container form-container">
      <div class="row form-row">
        <div class="col-md-9 mx-auto col-lg-6 form-box">
          <div class="input-group mb-3">
            <label for="userEmail">Email address</label>
            <input type="email" class="form-control" id="userEmail" placeholder="Email" v-model="userEmail" />
            
          </div>
          <div class="input-group mb-3">
            <label for="userPass">Password</label>
            <input type="password" class="form-control" id="userPass" placeholder="Password" v-model="userPass" />
            
          </div>
          <div class="input-group mb-3" v-if="userEmail === 'JD1@gmail.com'">
            <input type="text" class="form-control" id="adminRole" placeholder="Admin Code" v-model="userRole" />
            <label for="adminRole">Specify Role for Admin Access</label>
          </div>
          <div class="button-wrapper">
            <button class="btn-primary" type="submit" @click="loginUser">Login</button>
          </div>
          <hr class="divider mt-4" />
          <small class="signup-text">
            Don't have an account? <router-link to="/signup" class="signup-link">Sign Up Here</router-link>
          </small>
          <div id="errorTxt"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        userID: null,
        username: '',
        userEmail: '',
        userPass: '',
        userRole: 'user',
        userImg: ''
      }
    },
    methods: {
      loginUser() {
        this.$store.dispatch('loginUser', this.$data)
      }
    }
}
</script>

<style scoped>
/* Main form wrapper styling */
.form-wrapper {
  background-image: url("https://shakill23.github.io/allImages/images/maldives.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px; /* Ensures content is not hidden under the navbar */
}

/* Container for form elements */
.form-container {
  padding: 2.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.7s ease-in-out;
  width: 100%;
  max-width: 600px;
}

/* Form row */
.form-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Box holding form inputs */
.form-box {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-box:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* General input styling */
.input-group {
  position: relative;
  width: 100%;
}

.input-group input {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
  width: 100%;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.input-group label {
  margin-left: 0.5rem;
}

/* Button Styling */
.button-wrapper {
  margin-top: 1.5rem;
  text-align: center;
}

.btn-primary {
  padding: 0.75rem 2rem;
  background-color: #007bff;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s ease;
  width: 100%;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  transform: translateY(-3px);
}

/* Divider Styling */
.divider {
  border-top: 1px solid #ccc;
  margin-top: 1.5rem;
}

/* Signup link */
.signup-link {
  color: #17a2b8;
}

.signup-text {
  color: #ddd;
}

/* Keyframes for animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styling */
@media (max-width: 1024px) {
  .form-box {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }
  .btn-primary {
    padding: 0.75rem;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .form-wrapper {
    padding-top: 50px; /* Adjust for navbar height */
  }
  .form-box {
    padding: 1rem;
  }
  .input-group input {
    padding: 0.5rem;
  }
  .btn-primary {
    padding: 0.75rem;
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .form-wrapper {
    padding-top: 30px;
  }
  .form-container {
    padding: 1rem;
  }
  .form-box {
    padding: 0.75rem;
  }
  .btn-primary {
    padding: 0.5rem;
    font-size: 12px;
  }
  .input-group input {
    padding: 0.5rem;
  }
}
</style>
