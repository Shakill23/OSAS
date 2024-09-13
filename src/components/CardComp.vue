<template>
    <div id="product-container" class="container-box">
      <!-- Search and Filter Section -->
      <div class="header-section w-100 mt-4 pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <input
          type="search"
          class="search-bar form-control mb-3 mb-md-0"
          placeholder="Search by categories or product names"
          aria-label="Search"
          v-model="search"
          @change="searchByName"
        />
  
        <!-- Filter Dropdowns -->
        <div class="filter-group d-flex gap-3">
          <div class="dropdown">
            <button
              class="filter-btn btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-filter"></i> Price
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="sortBy('lowToHigh')">Low</a>
              </li>
              <li>
                <a class="dropdown-item" @click="sortBy('highToLow')">High</a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="filter-btn btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-sort"></i> Name
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="sortByNameAsc">Ascend</a>
              </li>
              <li>
                <a class="dropdown-item" @click="sortByNameDesc">Descend</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Product Cards Section -->
      <div class="products-grid mt-3">
        <div
          class="product-card shadow-sm"
          v-for="product in searchByName() || sortBy() || HightToLow()"
          :key="product.productID"
        >
          <img
            :src="product.productImg"
            :alt="product.productName"
            class="product-img"
            loading="lazy"
          />
          <div class="product-info">
            <h5 class="product-name">{{ product.productName }}</h5>
            <p class="product-price">R {{ product.productPrice }}</p>
            <p class="product-category">Category: {{ product.category }}</p>
  
            <!-- Conditional Button Rendering -->
            <router-link
              v-if="$cookies.get('jwt')"
              :to="{ name: 'product', params: { productId: product.productID }}"
              class="view-details-btn btn btn-primary"
            >
              View Details <i class="fas fa-eye"></i>
            </router-link>
            <router-link v-else to="/login" class="login-notice">
              Log in to see details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
      };
    },
    methods: {
      fetchProducts() {
        this.$store.dispatch("fetchProducts");
      },
      searchByName() {
        let products = this.$store.state.products;
        return products.filter((prod) =>
          prod.productName.toLowerCase().includes(this.search.toLowerCase()) ||
          prod.category.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      sortBy(type) {
        let products = this.$store.state.products;
        if (type === "lowToHigh") {
          products.sort((a, b) => a.productPrice - b.productPrice);
        } else {
          products.sort((a, b) => b.productPrice - a.productPrice);
        }
      },
      sortByNameAsc() {
        return this.$store.state.products.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
      },
      sortByNameDesc() {
        return this.$store.state.products.sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  /* General Layout */
  #product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px; /* Prevent content from being hidden under navbar */
    min-height: 100vh;
  }
  
  /* Header Section */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
    padding-bottom: 1rem;
  }
  
  .search-bar {
    width: 60%;
    transition: 0.3s ease;
  }
  
  /* Filter Group */
  .filter-group {
    display: flex;
    gap: 1rem;
  }
  
  .filter-btn {
    background-color: #f5f5f5;
    color: #333;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .filter-btn:hover {
    background-color: #007bff;
    color: #fff;
  }
  
  /* Product Grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 100%;
  }
  
  /* Product Cards */
  .product-card {
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .product-img {
    height: 250px;
    object-fit: cover;
    width: 100%;
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-name {
    font-size: 1.2rem;
    color: #222;
  }
  
  .product-price {
    font-size: 1rem;
    color: #777;
  }
  
  .view-details-btn {
    margin-top: 1rem;
    background-color: #007bff;
    color: #fff;
  }
  
  .login-notice {
    margin-top: 1rem;
    color: #f00;
    font-weight: bold;
  }
  
  /* Animations */
  .product-card:hover .product-img {
    transform: scale(1.05);
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  
    .search-bar {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .products-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  
  @media (max-width: 320px) {
    .product-card {
      font-size: 0.9rem;
      padding: 0.5rem;
    }
  }
  </style>
  