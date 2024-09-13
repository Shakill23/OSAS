<template lang="">
    <div id="cardWrapper">
        <div v-for="product of $store.state.product" v-bind:key="product.productID" class="product-container">
            <div id="productCard" class="card-shadow">
                <div id="imageSection" class="d-flex justify-content-center align-items-center">
                     <img :src="product.productImg" :alt="product.productName" class="img-fluid" id="productImage"/>
                </div>
                <div id="detailsSection" class="my-4 py-3">
                    <h1 class="fw-bold text-primary">{{ product.productName }}</h1>
                    <p class="container text-muted">{{ product.productDesc }}</p>
                    <div id="ratingSection">
                        <div class="rating">
                            <input value="5" name="rate" id="star5" type="radio">
                            <label for="star5" class="star-label"></label>
                            <input value="4" name="rate" id="star4" type="radio">
                            <label for="star4" class="star-label"></label>
                            <input value="3" name="rate" id="star3" type="radio" checked="">
                            <label for="star3" class="star-label"></label>
                            <input value="2" name="rate" id="star2" type="radio">
                            <label for="star2" class="star-label"></label>
                            <input value="1" name="rate" id="star1" type="radio">
                            <label for="star1" class="star-label"></label>
                        </div>
                    </div>
                    <h3 class="text-center text-info mt-3">Price: R{{ product.productPrice }}</h3>
                    <hr class="my-3 mx-3"/>
                    
                    <addToCartBtn @click="addToCart(product.productID)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddToCartBtn from '../components/AddToCartBtn.vue';

export default {
    components : {
        AddToCartBtn
    },
    methods : {
        fetchProduct(productID){
            this.$store.dispatch('fetchProduct', productID)
        },
        addToCart(productID, userID){
            this.$store.dispatch('addToCart', productID, userID)
        }
    }
}
</script>

<style scoped>
/* Container for the card */
#cardWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 40px;
    background-color: #f8f9fa; /* Light grey background */
}

/* Product container styling */
.product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

/* Card with box shadow */
#productCard {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background-color: white;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Animation on hover */
#productCard:hover {
    transform: translateY(-5px);
}

/* Image section */
#imageSection {
    margin-bottom: 20px;
}

/* Product image styling */
#productImage {
    max-height: 350px;
    object-fit: cover;
    border-radius: 8px;
}

/* Rating section */
#ratingSection {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

/* Star ratings */
.star-label {
    font-size: 30px;
    color: #ffc107; /* Golden stars */
    cursor: pointer;
}

/* Details section */
#detailsSection {
    text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
    #productCard {
        padding: 15px;
    }
}

@media (max-width: 576px) {
    #productImage {
        max-height: 250px;
    }
}
</style>
