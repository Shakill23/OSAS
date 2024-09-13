<template>
  <div v-if="!loaded" class="loader">
    <div class="ring-loader">
      <div class="ring"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000); // Simulate loading for 2 seconds
  },
};
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* Darker transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.ring-loader {
  position: relative;
  width: 100px;
  height: 100px;
}

.ring {
  width: 100px;
  height: 100px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #00bfff; /* Light blue color */
  animation: spin 1.5s infinite linear;
  box-shadow: 0 0 20px #00bfff, 0 0 40px rgba(0, 191, 255, 0.5); /* Glowing shadow */
}

.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #00bfff;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 191, 255, 0.3);
  animation: dotPulse 2s infinite ease-in-out;
}

.dot:nth-child(2) {
  transform: rotate(90deg) translate(45px);
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  transform: rotate(180deg) translate(45px);
  animation-delay: 0.4s;
}

.dot:nth-child(4) {
  transform: rotate(270deg) translate(45px);
  animation-delay: 0.6s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
    background-color: #ffffff;
  }
}
</style>
