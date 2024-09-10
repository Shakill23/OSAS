<template>
  <div id="landing">
      <div class="container col-xl-10 col-xxl-8 px-4 py-5">
          <div class="row align-items-center g-lg-5 py-5">
              <div class="col-lg-7 text-center text-lg-start">
                  <h1 class="display-4 fw-bold lh-1 text-white mb-3">Sign up now with W store</h1>
                  <p class="col-lg-10 fs-4 text-white">Get unlimited access to W-store's latest product, sign up and get started with us!</p>
              </div>
              <div class="col-md-10 mx-auto col-lg-5" id="bgForm">
                  <div class="form-floating mb-3">
                      <input type="text" class="form-control" id="floatingName" placeholder="Your name" v-model="username" data-inp>
                      <label for="floatingName">Name</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="emailAdd" data-inp>
                      <label for="floatingEmail">Email address</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="passw" data-inp>
                      <label for="floatingPassword">Password</label>
                      <small v-if="passw.length > 0 && passw.length < 5" class="text-danger">Password must be at least 5 characters long</small>
                  </div>
                  <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingRole" placeholder="Role" v-model="userRole" disabled data-inp>
                      <label for="floatingRole">Identity code</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input type="file" class="form-control" id="floatingImgInput" @change="handleImageUpload" data-inp>
                      <label for="floatingImgInput">Profile image</label>
                  </div>
                  <div class="d-flex gap-1 mt-2">
                      <button class="w-100 btn btn-lg" type="submit" id="btn" v-if="isDisabled" disabled>Fill in your details</button>
                      <button @click="signUser()" class="w-100 btn btn-lg btn-primary" id="btn" v-else>Sign up <i class="fa-regular fa-user fa-bounce fa-lg" style="color: #000000;"></i></button>
                  </div>
                  <hr class="my-4">
                  <small><router-link to="/login" class="text-white">I have an account</router-link></small>
                  <div id="errorText" v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import router from '@/router';
export default {
  data() {
      return {
          username: '',
          emailAdd: '',
          passw: '',
          userRole: 'user',
          profileURL: '',
          errorMessage: '', // To capture and display error messages
      };
  },
  computed: {
      isDisabled() {
          return (
              !this.username ||
              !this.emailAdd ||
              !this.passw ||
              this.passw.length < 5 ||
              !this.profileURL
          );
      },
  },
  methods: {
      handleImageUpload(event) {
          const file = event.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                  this.profileURL = e.target.result;
              };
              reader.readAsDataURL(file);
          }
      },
      async signUser() {
          try {
              await this.$store.dispatch('SignUser', this.$data);
              // Provide feedback or success message
              await swal('Registration Successful', 'You can now log in!', 'success');
              router.push('/login');
          } catch (error) {
              this.errorMessage = 'Failed to create account. Please try again.';
              console.error('Registration error:', error);
          }
      },
  },
};
</script>

<style scoped>

#landing{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('https://cdn-images.imagevenue.com/fe/e9/59/ME17RH4H_o.png');
  min-height: 100vh !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-image: fill 0 linear-gradient(rgba(0, 0, 0, 0.147) 50%, rgba(0, 0, 0, 0.068));
}

#bgForm{
  background-color: #5005f346;
  padding-top: 20px;
  padding-bottom: 20px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

[data-inp]{
  box-shadow: 2px 2px 14px 2px rgba(0, 0, 0, 0.375);
  background-color: rgba(0, 255, 255, 0);
  color: whitesmoke;
}

#btn{
  background-color: rgb(0, 149, 255);
  font-weight: 600;
  color: whitesmoke;
  text-shadow: -2px 5px 6px rgb(0, 18, 217);
}
#btn:hover{
  transform: scale(110%);
}
    
</style>