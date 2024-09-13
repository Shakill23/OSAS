<template>
  <div id="landing">
    <!-- Animated background shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>

    <div class="container pt-5">
      <h1 class="display-2 fw-bold pt-5 text-animation hover-effect">OSAS</h1>
      <p class="slogan hover-effect">Your One-Stop Appliance Shop</p>
    </div>
  </div>
</template>

<script>
import ButtonCompVue from './ButtonComp.vue';

export default {
  props: {
    msg: String
  },
  components: {
    ButtonCompVue,
  }
}
</script>

<style scoped>
#landing {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1e1e1e; /* Solid background color */
  position: relative;
  overflow: hidden;
}

.text-animation {
  background: linear-gradient(90deg, #ff4b2b, #ff416c, #42e695, #3bb2b8);
  background-size: 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFill 5s infinite;
  text-align: center;
}

.slogan {
  color: white;
  font-size: 1.2rem;
  text-align: center;
}

/* Hover Effects */
.hover-effect:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

/* Background shapes */
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: rotate 10s infinite linear;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: rgba(255, 75, 43, 0.8);
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: rgba(66, 230, 149, 0.8);
  bottom: 20%;
  right: 20%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background: rgba(59, 178, 184, 0.8);
  top: 50%;
  right: 10%;
  animation-delay: 4s;
}

/* Cool gradient fill looping animation */
@keyframes gradientFill {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Shape rotation animation */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .slogan {
    font-size: 1rem;
  }

  .shape-1, .shape-2, .shape-3 {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 2rem;
  }

  .slogan {
    font-size: 0.9rem;
  }

  .shape-1, .shape-2, .shape-3 {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 320px) {
  h1 {
    font-size: 1.5rem;
  }

  .slogan {
    font-size: 0.8rem;
  }

  .shape-1, .shape-2, .shape-3 {
    width: 80px;
    height: 80px;
  }
}
</style>
