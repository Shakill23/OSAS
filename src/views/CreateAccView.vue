<template>
  <div id="landing">
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-white mb-3">Sign up now with KingStore</h1>
          <p class="col-lg-10 fs-4 text-white">Get access to top quality surfboards!</p>
        </div>
        <div class="col-md-10 mx-auto col-lg-5" id="bgForm">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingName" placeholder="Your name" v-model="username" data-inp>
            <label for="floatingName">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="userEmail" data-inp>
            <label for="floatingEmail">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="userPass" data-inp>
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingRole" placeholder="Role" v-model="userRole" disabled data-inp>
            <label for="floatingRole">Identity code</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingImgInput" placeholder="image" v-model="userImg" data-inp>
            <label for="floatingImgInput">Image</label>
          </div>
          <div class="d-flex gap-1 mt-2">
            <button class="w-100 btn btn-lg" type="submit" id="btn" v-if="isFormIncomplete()" disabled>Fill in your details</button>
            <button @click="signUser" class="w-100 btn btn-lg btn-primary" id="btn" v-else>Sign up <i class="fa-regular fa-user fa-bounce fa-lg" style="color: #000000;"></i></button>
          </div>
          <hr class="my-4">
          <small><router-link to="/login" class="text-white">I have an account</router-link></small>
          <div id="eerTxt"></div>
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
      userEmail: '',
      userPass: '',
      userRole: 'user',
      userImg: ''
    };
  },
  methods: {
    signUser() {
      this.$store.dispatch('SignUser', this.$data);
      router.push('/login');
    },
    isFormIncomplete() {
      return (
        !this.username ||
        !this.userEmail ||
        !this.userPass ||
        this.userPass.length < 5 ||
        !this.userImg
      );
    }
  }
};
</script>

<style scoped>
#landing {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('https://shakill23.github.io/allImages/images/land7.jpg');
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

#bgForm {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

#bgForm:hover {
  transform: scale(1.05);
}

[data-inp] {
  background-color: rgba(255, 255, 255, 0.1);
  color: whitesmoke;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

[data-inp]:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffffff;
}

#btn {
  background-color: #00aaff;
  font-weight: 600;
  color: #fff;
  text-shadow: -2px 5px 6px rgba(0, 18, 217, 0.8);
  border: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

#btn:hover {
  background-color: #0077cc;
  transform: scale(1.1);
}

#btn[disabled] {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}

</style>
