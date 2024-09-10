import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import swal from 'sweetalert';

axios.defaults.withCredentials = true;

export default createStore({
  state: {
    products: [],
    product: null, // Single product
    users: [],
    user: null, // Logged-in user
    loggedUser: null, // Current logged user
    cartState: [], // Cart items
    isLoading: false // For loading spinner
  },
  getters: {
    totalCartAmount: (state) => {
      return state.cartState.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalCartQuantity: (state) => {
      return state.cartState.reduce((total, item) => total + item.quantity, 0);
    }
  },
  mutations: {
    // Product mutations
    accessProductsData(state, payload) {
      state.products = payload;
    },
    accessSingleProduct(state, payload) {
      state.product = payload;
    },
    // User mutations
    accessUsers(state, payload) {
      if (Array.isArray(payload)) {
        state.users = payload;
      } else {
        console.error('Error: users data is not an array', payload);
        state.users = [];
      }
    },
    accessUser(state, payload) {
      state.user = payload;
    },
    accessUserIsLogged(state, payload) {
      state.loggedUser = payload;
    },
    // Cart mutations
    addProdToCart(state, payload) {
      state.cartState.push(payload);
    },
    updateCart(state, payload) {
      state.cartState = payload;
    },
    clearCart(state) {
      state.cartState = [];
    },
    // Loader mutation
    setLoading(state, status) {
      state.isLoading = status;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('setLoading', true);
        const res = await axios.get('https://osas-2.onrender.com/products');
        commit('accessProductsData', res.data);
      } catch (error) {
        swal(`Server down or route does not exist`, "Try again", "error");
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchProduct({ commit }, id) {
      try {
        commit('setLoading', true);
        const res = await axios.get(`https://osas-2.onrender.com/products/${id}`);
        commit('accessSingleProduct', res.data);
      } catch (error) {
        swal(`${error.response?.data?.msg || 'Product fetch failed'}`, "Try again", "error");
      } finally {
        commit('setLoading', false);
      }
    },
    async deleteProduct({ dispatch }, productID) {
      try {
        await axios.delete(`https://osas-2.onrender.com/products/${productID}`);
        swal(`Deleted product!`, "You have deleted a product", "success");
        dispatch('fetchProducts'); // Refresh products after delete
      } catch (error) {
        swal(`Product was not found`, "Try again", "error");
      }
    },
    async SignUser({ commit }, userpayload) {
      try {
        commit('setLoading', true);
        await axios.post(`https://osas-2.onrender.com/users/register`, userpayload);
        swal(`Welcome to W-store ${userpayload.username}!`, "You have successfully created an account", "success");
        router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          swal(`Duplicate email or invalid data`, "Please try again", "error");
        } else {
          swal(`Registration failed`, `Error: ${error.message}`, "error");
        }
      } finally {
        commit('setLoading', false);
      }
    },
    async loginUser({ commit }, userInfo) {
      try {
        commit('setLoading', true);
        const res = await axios.post(`https://osas-2.onrender.com/login`, userInfo);
        const u = res.data.isLogged;

        // Set cookies and local storage
        $cookies.set('jwt', res.data.token);
        $cookies.set('refreshToken', res.data.refreshToken);
        $cookies.set('role', res.data.role);
        $cookies.set('userId', u.userID);
        localStorage.setItem('activeUser', JSON.stringify(u));

        swal(`Welcome back ${u.username}`, "You have logged in successfully", "success");
        router.push('/profile');
        commit('accessUserIsLogged', u); // Set the logged user in state
      } catch (error) {
        swal('Login failed', "Incorrect email or password", "error");
      } finally {
        commit('setLoading', false);
      }
    },
    async logoutUser({ commit }) {
      try {
        commit('setLoading', true);
        await axios.delete(`https://osas-2.onrender.com/logout`);
        $cookies.remove('jwt');
        $cookies.remove('refreshToken');
        $cookies.remove('role');
        $cookies.remove('userId');
        localStorage.removeItem('activeUser');
        commit('clearCart'); // Clear cart on logout
        swal(`You have been logged out!`, "Goodbye! Come shop soon", "success");
        router.push('/');
      } catch (error) {
        swal(`Oops!`, "Please try again", "error");
      } finally {
        commit('setLoading', false);
      }
    },
    async getUsers({ commit }) {
      try {
        const res = await axios.get(`https://osas-2.onrender.com/users`);
        console.log('Fetched users:', res.data);
        commit('accessUsers', res.data);
      } catch (error) {
        swal(`Invalid credentials`, "Please try again", "warning");
      }
    },
    async getUser({ commit }, id) {
      try {
        const res = await axios.get(`https://osas-2.onrender.com/users/${id}`);
        commit('accessUser', res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async adminAuth({ commit }) {
      try {
        const res = await axios.get(`https://osas-2.onrender.com/users`);
        commit('accessUserIsLogged', res.data.isLogged); // Ensure response is correctly handled
      } catch (error) {
        console.error('Admin auth error:', error);
      }
    }
  },
  modules: {}
});
