<template>
    <footer class="footer">
      <p class="mb-2 text-center footer-text">OSAS &copy; | {{ this.year() }}</p>
    </footer>
  </template>
  
  <script>
  export default {
    methods: {
      year: function () {
        let date = new Date().getFullYear();
        return date;
      }
    },
    mounted() {
      this.year();
    }
  };
  </script>
  
  <style scoped>
  /* Footer styling */
  .footer {
    background-color: #f8f9fa;
    color: #343a40;
    padding: 15px;
    text-align: center;
    width: 100%;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    bottom: 0;
  }
  
  .footer-text {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    line-height: 1.5;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .footer-text {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 576px) {
    .footer-text {
      font-size: 0.8rem;
      padding: 10px;
    }
  }
  </style>
  