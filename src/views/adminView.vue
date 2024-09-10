<template>

  <div class="p-5 mt-5" v-if="$cookies.get('role') === 'admin'">
    <div id="products" class="gap-4">
      <div v-for="product in $store.state.products" v-bind:key="product.productID">
        <div class="card" style="width: 18rem;">
          <img :src="product.productURL" class="card-img-top" :alt="product.productName" loading="lazy" id="productImg">
          <div class="card-body">
            <h5 class="card-title">{{product.productName}}</h5>
            <p class="card-text">R{{product.amount}}</p>
            <p class="card-text" id="textOve">{{product.productDesc}}</p>
            <button @click="deleteProduct(product.productID)" class="btn btn-danger mx-1">
              <i class="fa-solid fa-trash fa-lg" style="color: #ffffff;"></i>
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + product.productID">
              update
            </button>
                  
            <div class="modal fade" :id="'staticBackdrop' + product.productID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Update product {{product.productID}}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <!-- Product Update Form -->
                    <div class="input-group flex-nowrap mb-2">
                      <span class="input-group-text" id="addon-wrapping">Product Name</span>
                      <input type="text" class="form-control" placeholder="Product name" v-model="productName">
                    </div>
                    <!-- Other fields... -->
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct(product.productID)">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Manage Users -->
    <h1 class="mt-5 pt-5">Manage users</h1>
    <div id="container">
      <div class="mx-4" v-for="user in $store.state.users" v-bind:key="user.userID">
        <div class="card" style="width: 18rem;">
          <router-link @click="getUser(user.userID)" :to="{ name: 'admi', params: { userId: user.userID }}" class="card-img-top">
            <img :src="user.profileURL" :alt="user.username" id="userImg">
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ user.username }}</h5>
            <p class="card-text">{{ user.emailAdd }}</p>
            <p class="card-text">{{ user.userRole }}</p>
  
            <div class="d-flex justify-content-evenly">
              <button type="button" class="btn btn-primary mx-1" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + user.userID">
                update
              </button>
                    
              <!-- User Update Modal -->
              <div class="modal fade" :id="'exampleModal'+user.userID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">{{user.userID}}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <!-- User Update Form -->
                      <div class="input-group flex-nowrap mb-2">
                        <span class="input-group-text">Username</span>
                        <input type="text" class="form-control" v-model="username">
                      </div>
                      <!-- Other fields... -->
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" @click="updateUser(user.userID)">Save changes to {{user.username}}</button>
                    </div>
                  </div>
                </div>
              </div>
  
              <button class="btn btn-danger" @click="deleteUser(user.userID)">
                <i class="fa-solid fa-trash fa-lg" style="color: #ffffff;"></i>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  
    <!-- Add User Section -->
    <div class="container mt-3">
      <h1>Add a user!</h1>
      <div id="boxXD">
        <div class="input-group flex-nowrap mb-2">
          <span class="input-group-text" v-if="username.length === 0"><i class="fa-solid fa-user fa-xl" style="color: #ff0000;"></i></span>
          <span class="input-group-text" v-else><i class="fa-solid fa-user fa-xl" style="color: #11ff00;"></i></span>
          <input type="text" class="form-control" v-model="username" required>
        </div>
        <!-- Other input fields... -->
      </div>
      <button class="btn btn-outline-dark" v-if="!isFormValid()" disabled>Fill in all input fields</button>
      <button @click="addNewUser()" class="btn btn-outline-primary" v-else>Add user to Database</button>
      <br>
      <div id="errTxt">{{ errorText }}</div>
    </div>
  
    <addProductComp/>
  </div>
  
  <div id="FourOFour" v-else>
    <h1>This page does not Exist</h1>
    <small>Server responded with a 404</small>
  </div>
  
  </template>
  
  <script>
  import ChartComp from '../components/ChartComp.vue'
  import addProductComp from '../components/addProductComp.vue'
  
  export default {
    data() {
      return {
        // users
        userID: null,
        username: '',
        emailAdd: '',
        passw: '',
        userRole: '',
        profileURL: '',
        // products
        productID: null,
        productName: '',
        productDesc: '',
        amount: '',
        productURL: '',
        category: '',
        // error handling
        errorText: '',
        search: ''
      };
    },
    components: {
      ChartComp,
      addProductComp
    },
    methods: {
      isFormValid() {
        return this.username && this.emailAdd && this.passw.length >= 5 && this.userRole && this.profileURL;
      },
      addNewUser() {
        if (this.isFormValid()) {
          this.$store.dispatch('addNewUser', this.$data);
        } else {
          this.errorText = 'Please fill in all fields correctly!';
        }
      },
      getUsers() {
        this.$store.dispatch('getUsers');
      },
      updateUser(userID) {
        const userObjX = {
          userID,
          username: this.username,
          emailAdd: this.emailAdd,
          passw: this.passw,
          userRole: this.userRole,
          profileURL: this.profileURL
        };
        this.$store.dispatch('updateUser', userObjX);
      },
      updateProduct(productID) {
        const prodObjX = {
          productID,
          productName: this.productName,
          productDesc: this.productDesc,
          amount: this.amount,
          productURL: this.productURL,
          category: this.category
        };
        this.$store.dispatch('updateProducts', prodObjX);
      },
      deleteUser(userID) {
        this.$store.dispatch('deleteUser', userID);
      },
      deleteProduct(productID) {
        this.$store.dispatch('deleteProduct', productID);
      },
      getProducts() {
        this.$store.dispatch('fetchProducts');
      },
      getUser(id) {
        this.$store.dispatch('getUser', id);
      }
    },
    mounted() {
      this.getUsers();
      this.getProducts();
    }
  }
  </script>
<style scoped>

#tableBody{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100vh;
}


#products{
    display: flex;
    overflow-x: scroll;
    align-items: center;
}

#productImg{
    object-fit: contain !important;
    height: 300px;
}

#textOve{
    max-height: 56px;
    overflow: scroll;
}

::-webkit-scrollbar {
    width: 5px !important;
    height: 4px;
  }
  
  /* Track */
::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.368);  */
    -webkit-border-radius: 1px;
    scroll-behavior: smooth;
    border-radius: 5px;
  }
  
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgb(0, 0, 0); 
    /* -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.5);  */
  }
  
  /* triggers when page is inactive */
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(56, 54, 54, 0.632); 
  }

#container{
    display: flex !important;
    align-items: center;
    overflow-x: scroll;
}

#card{
  display: flex !important;
}

#FourOFour{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    flex-direction: column;
}

#userImg{
  object-fit: contain;
  scale: 60%;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid black;
}



  @media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px){

}
    
</style>