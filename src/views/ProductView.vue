<template> 
    <div id="containerOne" class="container-responsive">
      <CardComp />
    </div>
  </template>
  
  <script>
  import CardComp from '../components/CardComp.vue';
  
  export default {
    components: {
      CardComp
    }
  }
  </script>
  
  <style scoped>
  /* Container styling */
  #containerOne {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
  }
  
  /* Smooth transition for hover effects */
  #containerOne > div {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  

  
  /* Responsive Design */
  @media screen and (max-width: 768px) {
    #containerOne {
      flex-direction: column;
      padding: 15px;
    }
  }
  
  @media screen and (max-width: 480px) {
    #containerOne {
      padding: 10px;
    }
  }
  
  @media screen and (max-width: 320px) {
    #containerOne {
      padding: 5px;
    }
  }
  
  </style>
  