import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import swal from 'sweetalert';
axios.defaults.withCredentials = true

export default createStore({
  state: {
    products: [],
    product: [],
    users: [],
    user: [],
    loggedUser: [],
    cartState: []
  },
  getters: {},
  mutations: {
    accessProductsData(state, payload) {
      console.log('Mutating products data:', payload);
      state.products = payload;
    },
    accessSingleProduct(state, payload) {
      console.log('Mutating single product data:', payload);
      state.product = payload;
    },
    accessUsers(state, payload) {
      console.log('Mutating users data:', payload);
      state.users = payload;
    },
    accessUser(state, payload) {
      console.log('Mutating user data:', payload);
      state.user = payload;
    },
    accessUserIsLogged(state, payload) {
      console.log('Mutating loggedUser data:', payload);
      state.loggedUser = payload;
    },
    addProd(state, payload) {
      console.log('Mutating cartState data:', payload);
      state.cartState = payload;
    }
  },
  actions: {
    async fetchProducts(context) {
      try {
        console.log('Fetching products...');
        const res = await axios.get('https://osas-2.onrender.com/products');
        console.log('Products fetched:', res.data);
        context.commit('accessProductsData', res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        await swal(`Server down or route does not exist`, "try again", "error");
      }
    },
    async fetchProduct(context, id) {
      try {
        console.log(`Fetching product with id: ${id}`);
        const res = await axios.get(`https://osas-2.onrender.com/products/${id}`);
        console.log('Product fetched:', res.data);
        context.commit('accessSingleProduct', res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        await swal(`${error.response?.data?.msg || 'Product fetch failed'}`, "try again", "error");
      }
    },
    async deleteProduct(context, productID) {
      try {
        console.log(`Deleting product with id: ${productID}`);
        const res = await axios.delete(`https://osas-2.onrender.com/products/${productID}`);
        console.log('Product deleted:', res.data);
        await swal(`Deleted product!`, "You have deleted a product", "success");
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
        await swal(`Product was not found`, "try again", "error");
      }
    },
    async SignUser(context, userpayload) {
      try {
        console.log('Signing up user:', userpayload);
        const res = await axios.post(`https://osas-2.onrender.com/users`, userpayload);
        console.log('User signed up:', res.data);
        await swal(`Welcome to W-store ${userpayload.username}!`, "You have successfully created an account", "success");
        await router.push('/login');
        window.location.reload();
      } catch (error) {
        console.error('Error signing up user:', error);
        await swal(`Invalid information`, "Please try again", "error");
      }
    },
    async loginUser(context, userInfoIsValid) {
      try {
        console.log("Logging in user with info:", userInfoIsValid);
    
        const res = await axios.post(`https://osas-2.onrender.com/login`, userInfoIsValid);
        
        console.log("Login response:", res.data);
    
        // Ensure the response has the necessary data
        if (res.data && res.data.isLogged && res.data.isLogged.userID) {
          const u = res.data.isLogged;
    
          console.log("Logged user:", u);
    
          // Setting cookies
          $cookies.set('jwt', res.data.token);
          $cookies.set('refreshToken', res.data.refreshToken);
          $cookies.set('role', res.data.role);
          $cookies.set('userId', u.userID);
    
          // Storing user data in localStorage
          const user = res.data.isLogged;
          const storage = JSON.stringify(user);
          localStorage.setItem('activeUser', storage);
    
          console.log("Stored user data in localStorage:", storage);
    
          // Successful login
          await swal(`Welcome back ${u.username}`, "You have logged in successfully", "success");
    
          await router.push('/profile');
          window.location.reload();
    
        } else {
          console.error("Login error: Invalid login response structure", res.data);
          throw new Error('Invalid login response');
        }
    
      } catch (error) {
        console.error("Login failed:", error.message || error);
        await swal('Login failed', "Please try again", "error");
      }
    },
    async logoutUser() {
      try {
        console.log('Logging out user...');
        const res = await axios.delete(`https://osas-2.onrender.com/logout`);
        console.log('Logout response:', res.data);
        $cookies.remove('jwt');
        $cookies.remove('refreshToken');
        $cookies.remove('role');
        $cookies.remove('userId');
        localStorage.removeItem('activeUser');
        await swal(`You have ${res.data.msg}`, "Goodbye! come shop soon", "success");
        await router.push('/');
        window.location.reload();
      } catch (error) {
        console.error('Logout error:', error);
        await swal(`Oops!`, "Please try again", "error");
      }
    },
    async getUsers(context) {
      try {
        console.log('Fetching users...');
        const res = await axios.get(`https://osas-2.onrender.com/users`);
        console.log('Users fetched:', res.data);
        context.commit('accessUsers', res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        await swal(`Invalid credentials`, "Please try again", "warning");
      }
    },
    async getUser(context, id) {
      try {
        console.log(`Fetching user with id: ${id}`);
        const res = await axios.get(`https://osas-2.onrender.com/users/${id}`);
        console.log('User fetched:', res.data);
        context.commit('accessUser', res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async adminAuth(context) {
      try {
        console.log('Checking admin authentication...');
        const res = await axios.get(`https://osas-2.onrender.com/users`);
        console.log('Admin authentication response:', res.data);
        context.commit('accessUserIsLogged', res.data);
      } catch (error) {
        console.error('Admin auth error:', error);
      }
    },
    // Continue adding console logs for other actions similarly...
  },
  modules: {}
});
