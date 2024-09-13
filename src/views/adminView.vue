<template>
  <div class="admin-dashboard py-5">
    
    <!-- Products Management -->
    <h2 class="section-title mb-4">Product Management</h2>
    <table class="product-table table table-striped table-hover table-responsive">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in $store.state.products" v-bind:key="product.productID">
          <td>
            <img :src="product.productImg" class="product-img" :alt="product.productName" loading="lazy">
          </td>
          <td>{{ product.productName }}</td>
          <td>R{{ product.productPrice }}</td>
          <td>{{ product.productDesc }}</td>
          <td>
            <button @click="deleteProduct(product.productID)" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" :data-bs-target="'#updateProduct' + product.productID">
              Update
            </button>

            <!-- Modal for product update -->
            <div class="modal fade" :id="'updateProduct' + product.productID" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Update Product {{ product.productID }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                    <!-- Product Update Form -->
                    <div class="mb-3">
                      <label class="form-label">Product Name</label>
                      <input type="text" class="form-control" v-model="productName">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Product Description</label>
                      <input type="text" class="form-control" v-model="productDesc">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Product Price</label>
                      <input type="number" class="form-control" v-model="productPrice">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Product Image</label>
                      <input type="text" class="form-control" v-model="productImg">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct(product.productID)">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- User Management -->
    <h2 class="section-title mt-5">Manage Users</h2>
    <div class="user-grid">
      <div v-for="user in $store.state.users" v-bind:key="user.userID" class="user-card">
        <img :src="user.userImg" class="user-avatar" :alt="user.username">
        <div class="user-info">
          <h5>{{ user.username }}</h5>
          <p>{{ user.userEmail }}</p>
          <p>{{ user.userRole }}</p>
          <div class="user-actions">
            <button class="btn btn-primary btn-sm" @click="openUserModal(user.userID)">Update</button>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.userID)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Form -->
    <div class="add-user mt-5">
      <h3>Add a User</h3>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Username" v-model="username">
        <input type="email" class="form-control" placeholder="Email" v-model="userEmail">
        <input type="text" class="form-control" placeholder="Role" v-model="userRole">
        <input type="password" class="form-control" placeholder="Password" v-model="userPass">
        <input type="text" class="form-control" placeholder="Image URL" v-model="userImg">
      </div>
      <button class="btn btn-success mt-3" @click="addNewUser()">Add User</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Data properties
      userID: null,
      username: '',
      userEmail: '',
      userPass: '',
      userRole: '',
      userImg: '',
      productID: null,
      productName: '',
      productDesc: '',
      productPrice: '',
      productImg: ''
    };
  },
  methods: {
    deleteProduct(productID) {
      this.$store.dispatch('deleteProduct', productID);
    },
    updateProduct(productID) {
      const updatedProduct = {
        productID: productID,
        productName: this.productName,
        productDesc: this.productDesc,
        productPrice: this.productPrice,
        productImg: this.productImg
      };
      this.$store.dispatch('updateProducts', updatedProduct);
    },
    deleteUser(userID) {
      this.$store.dispatch('deleteUser', userID);
    },
    addNewUser() {
      const newUser = {
        username: this.username,
        userEmail: this.userEmail,
        userPass: this.userPass,
        userRole: this.userRole,
        userImg: this.userImg
      };
      this.$store.dispatch('addNewUser', newUser);
    }
  }
};
</script>

<style scoped>
/* General Styling */
.admin-dashboard {
  padding: 2rem;
  background-color: #f5f5f5;
}
.section-title {
  font-size: 1.75rem;
  color: #333;
  text-align: center;
}

/* Product Table Styling */
.product-table {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.product-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.table th, .table td {
  vertical-align: middle;
}

/* User Management */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.user-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.user-info {
  margin-top: 1rem;
}
.user-actions button {
  margin-right: 0.5rem;
}

/* Add User Form */
.add-user {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.input-group input {
  margin-bottom: 0.75rem;
}
</style>
