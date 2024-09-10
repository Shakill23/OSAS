<template>
    <div v-if="product" id="cardBody">
        <div id="isoParent" class="container">
            <!-- Product Image -->
            <div id="isolatedDivOne" class="d-flex justify-content-center">
                <img :src="product.productURL" :alt="product.productName" class="img img-fluid" id="imgProd"/>
            </div>

            <!-- Product Details -->
            <div id="isolatedDivTwo" class="my-5 py-5">
                <h1 class="fw-bold">{{ product.productName }}</h1>
                <div class="container fw-normal">{{ product.productDesc }}</div>

                <!-- Rating Section -->
                <div id="stars" class="my-3">
                    <div class="rating">
                        <input value="5" name="rate" id="star5" type="radio">
                        <label title="5 stars" for="star5"></label>
                        <input value="4" name="rate" id="star4" type="radio">
                        <label title="4 stars" for="star4"></label>
                        <input value="3" name="rate" id="star3" type="radio" checked="">
                        <label title="3 stars" for="star3"></label>
                        <input value="2" name="rate" id="star2" type="radio">
                        <label title="2 stars" for="star2"></label>
                        <input value="1" name="rate" id="star1" type="radio">
                        <label title="1 star" for="star1"></label>
                    </div>
                </div>

                <!-- Product Price -->
                <h3 class="text-center mx-2 px-1 text-decoration-underline">Price: R{{ product.amount }}</h3>
                <hr class="my-3 mx-3"/>

                <!-- Add to Cart Button -->
                <addToCartBtn @click="addToCart(product.productID)"/>
            </div>
        </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center mt-5">
        <p>Loading product details...</p>
    </div>
</template>

<script>
import addToCartBtn from '../components/addToCartBtn.vue';

export default {
    components: {
        addToCartBtn
    },
    data() {
        return {
            product: null, // Store the product data here
            productID: this.$route.params.productID, // Get product ID from the route
        };
    },
    methods: {
        fetchProduct() {
            // Fetch product data from the store based on the productID
            this.$store.dispatch('fetchProduct', this.productID)
                .then(product => {
                    this.product = product;
                })
                .catch(err => {
                    console.error('Error fetching product:', err);
                });
        },
        addToCart(productID) {
            const userID = this.$cookies.get('userId'); // Fetch user ID from cookies

            if (!userID) {
                // If user is not logged in, show an alert
                swal('Login required', 'Please log in to add products to the cart', 'warning');
                return;
            }

            // Dispatch the addToCart action with productID and userID
            this.$store.dispatch('addToCart', { productID, userID })
                .then(() => {
                    swal('Success', 'Product added to cart!', 'success');
                })
                .catch(err => {
                    swal('Error', 'Failed to add product to cart', 'error');
                    console.error('Error adding to cart:', err);
                });
        }
    },
    mounted() {
        // Fetch the product when the component is mounted
        this.fetchProduct();
    }
};
</script>

<style scoped>

#cardBody{
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
    padding: 30px;
}

#isoParent{
    display: flex;
    justify-content: center;
    flex-direction: row;
}

#imgProd{
    height: 500px;
}

#stars{
    display: flex;
    justify-content: center;
}

.rating:not(:checked) > input {
    position: absolute;
    appearance: none;
}

.rating:not(:checked) > label {
  float: right;
  cursor: pointer;
  font-size: 30px;
}

.rating:not(:checked) > label:before {
  content: '★';
  color: #ffa723;
}

.rating, label {
  color: #ffa723;
}
  
  
  
  
@media (max-width: 790px) {
    #isoParent{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
}
@media (max-width: 550px) {
    #imgProd{
        height: 300px;
        padding-top: 50px;
    }
}
@media (max-width: 325px) {
    #imgProd{
        height: 200px;
        padding-top: 50px;
    }
}
    
</style>