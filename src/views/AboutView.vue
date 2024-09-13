<template>
  <div class="about-section">
    <div class="hero-text-container">
      <h1 class="hero-title">About</h1>
      <div class="intro-card" data-aos="fade-up" data-aos-duration="2000">
        <p class="intro-description">
          Welcome to OSAS, your ultimate destination for top-quality appliances at unbeatable prices. We offer a diverse range of products designed to make your home more comfortable, efficient, and stylish. From the latest in kitchen technology to essential home gadgets, our curated selection ensures you find the perfect appliance for every need. <br />
          Our commitment to exceptional customer service and competitive pricing means you can shop with confidence, knowing you’re getting the best value and support. Discover the future of home convenience with OSAS, where quality meets innovation.
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Main section styling */
.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("https://shakill23.github.io/allImages/images/land8.jpg") center/cover no-repeat;
  min-height: 100vh;
  padding: 20px;
  margin-top: 80px; 
  color: #fff;
}


/* Hero text container and styling */
.hero-text-container {
  text-align: center;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #0099ff, #cc0000);
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientText 3s infinite;
}

/* Intro card styling */
.intro-card {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.intro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

/* Button group and CTA button styling */
.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.cta-button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.explore-button {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}

.contact-button {
  background: linear-gradient(to right, #6a11cb, #2575fc);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Features section styling */
.features-container {
  width: 100%;
  padding: 40px 20px;
  background: #1a1a1a;
}

.features-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.feature-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Feature cards styling */
.feature-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 1rem;
}

/* Keyframes for text animation */
@keyframes gradientText {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .intro-description {
    font-size: 1rem;
  }

  .cta-button {
    font-size: 14px;
  }

  .features-title {
    font-size: 1.75rem;
  }

  .feature-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .intro-description {
    font-size: 0.9rem;
  }

  .cta-button {
    font-size: 12px;
  }

  .features-title {
    font-size: 1.5rem;
  }

  .feature-title {
    font-size: 1.2rem;
  }
}
</style>
