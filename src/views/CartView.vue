<template>
    <div class="cart-container" v-if="$cookies.get('jwt')">

        <!-- Search Bar -->
        <div class="search-wrapper">
            <input type="search" class="search-input" placeholder="Search products..." v-model="search" @change="searchByName()">
        </div>

        <!-- Action Buttons -->
        <div class="action-btn-group">
            <button @click="sortBy()" class="btn-sort"><i class="fa-solid fa-sort"></i> Sort</button>
            <router-link to="/products" class="btn-shop"><i class="fa-solid fa-shopping-bag"></i> Continue Shopping</router-link>

            <button type="button" class="btn-profile" data-bs-toggle="modal" data-bs-target="#profileModal">
                <i class="fa-regular fa-user"></i> Profile
            </button>

            <!-- Profile Modal -->
            <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="profileModalLabel"><i class="fa-regular fa-user"></i> Your Profile</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <UserProfile />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cart Items -->
        <div v-for="cart in searchByName() || sortBy()" :key="cart.prodID" class="cart-item">
            <div class="cart-item-image">
                <img :src="cart.prodUrl" class="cart-img"/>
            </div>

            <div class="cart-item-details">
                <div class="product-name">Name: {{ cart.prodName }}</div>
                <div class="product-price">Price: R{{ cart.productPrice }}</div>
                <div class="product-actions">
                    <button @click="deleteFromCart(cart.prodID)" class="btn-decrease-qty">Decrease Quantity</button>
                </div>
                <div class="product-quantity">Quantity: {{ cart.quantity }}</div>
                <div class="product-total">Total Price: R{{ cart.total_price }}</div>
            </div>
        </div>
    </div>

    <!-- Fallback for Unauthorized Access -->
    <div v-else class="error-403">
        <h1 class="display-1">403 Forbidden</h1>
    </div>
</template>

<script>
import UserProfile from './UserProfile.vue'
export default {
    data() {
        return {
            search: ''
        }
    },
    components: {
        UserProfile
    },
    methods: {
        getCart() {
            this.$store.dispatch('userCart')
        },
        deleteFromCart(productID) {
            this.$store.dispatch('removeFromCart', productID)
        },
        searchByName() {
            let storageArr = this.$store.state.cartState;
            let inputX = this.search;
            return storageArr.filter(cart => cart.prodName.toLowerCase().includes(inputX.toLowerCase()));
        },
        sortBy() {
            let inCart = this.$store.state.cartState;
            if (inCart) {
                inCart.sort((a, b) => a.productPrice - b.productPrice);
            }
        }
    },
    mounted() {
        this.getCart();
    }
}
</script>

<style scoped>
.cart-container {
    margin-top: 40px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.search-input {
    width: 60%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ced4da;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #007bff;
}

.action-btn-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
}

.btn-sort, .btn-shop, .btn-profile {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn-sort:hover, .btn-shop:hover, .btn-profile:hover {
    background-color: #0056b3;
}

.modal-content {
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.cart-item:hover {
    transform: scale(1.02);
}

.cart-item-image {
    flex-basis: 30%;
    display: flex;
    justify-content: center;
}

.cart-img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 10px;
}

.cart-item-details {
    flex-basis: 70%;
    padding-left: 20px;
}

.product-name, .product-price, .product-quantity, .product-total {
    font-size: 16px;
    margin-bottom: 10px;
}

.product-actions {
    display: flex;
    gap: 10px;
}

.btn-decrease-qty {
    background-color: #343a40;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn-decrease-qty:hover {
    background-color: #1d2124;
}

.error-403 {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: Arial, sans-serif;
}
</style>
