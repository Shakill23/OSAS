<template>
  <div class="p-5 mt-5">
    <div class="mt-3" id="boxXD">
      <h1>Add a product</h1>
      
      <div class="input-group flex-nowrap mb-2">
        <span class="input-group-text" id="addon-wrapping" v-if="productName.length === 0">
          <i class="fa-solid fa-tags fa-xl" style="color: #ff0000;"></i>
        </span>
        <span class="input-group-text" id="addon-wrapping" v-else>
          <i class="fa-solid fa-tags fa-xl" style="color: #11ff00;"></i>
        </span>
        <input type="text" class="form-control" placeholder="Product Name" v-model="productName" />
      </div>

      <div class="input-group flex-nowrap mb-2">
        <span class="input-group-text" id="addon-wrapping" v-if="productDesc.length === 0">
          <i class="fa-solid fa-pencil fa-xl" style="color: #ff0000;"></i>
        </span>
        <span class="input-group-text" id="addon-wrapping" v-else>
          <i class="fa-solid fa-pencil fa-xl" style="color: #11ff00;"></i>
        </span>
        <input type="text" class="form-control" placeholder="Product Description" v-model="productDesc" />
      </div>

      <div class="input-group flex-nowrap mb-2">
        <span class="input-group-text" id="addon-wrapping" v-if="!isAmountValid">
          <i class="fa-solid fa-dollar-sign fa-xl" style="color: #ff0000;"></i>
        </span>
        <span class="input-group-text" id="addon-wrapping" v-else>
          <i class="fa-solid fa-dollar-sign fa-xl" style="color: #11ff00;"></i>
        </span>
        <input type="text" class="form-control" placeholder="Amount" v-model="amount" @input="validateAmount" />
      </div>

      <div class="input-group flex-nowrap mb-2">
        <span class="input-group-text" id="addon-wrapping" v-if="productURL.length === 0">
          <i class="fa-solid fa-image fa-xl" style="color: #ff0000;"></i>
        </span>
        <span class="input-group-text" id="addon-wrapping" v-else>
          <i class="fa-regular fa-image fa-xl" style="color: #11ff00;"></i>
        </span>
        <input type="text" class="form-control" placeholder="Product Image URL" v-model="productURL" />
      </div>

      <div class="input-group flex-nowrap mb-2">
        <span class="input-group-text" id="addon-wrapping" v-if="category.length === 0">
          <i class="fa-solid fa-list fa-xl" style="color: #ff0000;"></i>
        </span>
        <span class="input-group-text" id="addon-wrapping" v-else>
          <i class="fa-solid fa-list fa-xl" style="color: #11ff00;"></i>
        </span>
        <input type="text" class="form-control" placeholder="Category" v-model="category" />
      </div>

      <button
        class="btn btn-outline-dark"
        v-if="isFormInvalid"
        disabled
      >
        Fill in all input fields
      </button>

      <button
        @click="addProduct"
        class="btn btn-outline-primary"
        v-else
      >
        Add product to Database 
        <i class="fa-solid fa-database fa-bounce fa-xl" style="color: blue;"></i>
      </button>

      <div id="errOnInput" v-if="errorMessage" class="text-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: '',
      productDesc: '',
      amount: '',
      productURL: '',
      category: '',
      errorMessage: '',  // Added error message for feedback
    };
  },
  computed: {
    // Check if amount is a valid number
    isAmountValid() {
      return !isNaN(this.amount) && this.amount > 0;
    },
    // Form validation check
    isFormInvalid() {
      return (
        this.productName.length === 0 ||
        this.productDesc.length === 0 ||
        this.productURL.length === 0 ||
        this.category.length === 0 ||
        !this.isAmountValid
      );
    },
  },
  methods: {
    validateAmount() {
      if (isNaN(this.amount)) {
        this.errorMessage = "Please enter a valid number for the amount.";
      } else {
        this.errorMessage = '';
      }
    },
    async addProduct() {
      try {
        const productData = {
          productName: this.productName,
          productDesc: this.productDesc,
          amount: parseFloat(this.amount), // Ensure amount is stored as a number
          productURL: this.productURL,
          category: this.category,
        };

        await this.$store.dispatch('addProduct', productData);
        this.resetForm();  // Reset form after successful submission
        this.errorMessage = '';  // Clear error message
      } catch (error) {
        this.errorMessage = 'An error occurred while adding the product.';
      }
    },
    resetForm() {
      this.productName = '';
      this.productDesc = '';
      this.amount = '';
      this.productURL = '';
      this.category = '';
    },
  },
};
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

  #userImg{
    object-fit: contain;
    scale: 60%;
    height: 150px;
    border-radius: 50%;
    border: 1px solid black;
  }



  @media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px){

}
    
</style>