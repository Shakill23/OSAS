<template>
  <div class="container contact-section" id="contact">
    <h3 id="text">Contact us</h3>
    <div class="row mt-5">
      <div class="col-md-4 py-3 py-md-0">
        <div class="card contact-card">
          <i class="bi bi-telephone"> Phone</i>
          <h6>072 495 1007</h6>
        </div>
      </div>
      <div class="col-md-4 py-3 py-md-0">
        <div class="card contact-card">
          <i class="bi bi-envelope"> Email</i>
          <h6>OSAS@gmail.com</h6>
        </div>
      </div>
      <div class="col-md-4 py-3 py-md-0">
        <div class="card contact-card">
          <i class="bi bi-geo-alt"> Address</i>
          <h6>21st OSAS Road</h6>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <form action="https://formspree.io/f/mwkggroj" method="POST" class="form" id="myForm">
        <div class="row justify-content-center">
          <div class="col-md-5 mb-3">
            <input type="text" class="form-control" name="name" placeholder="First name" required>
          </div>
          <div class="col-md-5 mb-3">
            <input type="text" class="form-control" name="lastname" placeholder="Last name" required>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10 mb-3">
            <input type="email" class="form-control" name="email" placeholder="Your Email" required>
          </div>
          <div class="col-md-10 mb-3">
            <textarea class="form-control" rows="5" name="message" placeholder="Enter Message Here" required></textarea>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn1 subButton">Submit</button>
          <button type="button" id="clearButton" class="btn1" @click.prevent="clearForm()">Clear</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearForm() {
      document.getElementById("myForm").reset();
    }
  }
}
</script>

<style scoped>
/* Adjust for Navbar */
.contact-section {
  padding-top: 100px; /* Adjust this based on the height of your navbar */
}

#text {
  background: linear-gradient(to right, #121fcf 0%, #cf1512 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  text-align: center;
}

#contact {
  margin-top: 50px;
}

#contact .contact-card {
  height: 100px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

#contact .contact-card:hover {
  transform: scale(1.05);
}

#contact .contact-card i {
  font-size: 20px;
  color: #162052;
  font-weight: bold;
  margin-top: 10px;
}

#contact .contact-card h6 {
  margin-top: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: black;
}

.btn1 {
  background: linear-gradient(to bottom, #8439e6, #c75555);
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  padding: 14px 28px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.btn1:hover {
  background-color: orange;
  color: #162052;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Responsiveness */
@media (max-width: 576px) {
  .contact-section {
    padding-top: 80px;
  }
  
  #text {
    font-size: 30px;
  }

  #contact .contact-card {
    height: auto;
    text-align: center;
    margin-bottom: 15px;
  }

  .btn1 {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 320px) {
  #text {
    font-size: 25px;
  }

  .btn1 {
    padding: 10px 20px;
  }
}
</style>
