<template>
  <div id="contactUS" class="container">
    <main class="form-signin w-100 m-auto">
      <form action="https://formspree.io/f/mwkggroj" method="POST">
        <img
          class="mb-4"
          src="https://cdn-thumbs.imagevenue.com/ab/92/30/ME17RFMK_t.png"
          alt="Contact Us Logo"
          width="72"
          height="57"
        />

        <h1 class="h3 mb-3 fw-normal">Contact us now!</h1>

        <div class="form-floating">
          <input
            type="text"
            name="firstname"
            class="form-control"
            id="firstname"
            placeholder="First Name"
            required
          />
          <label for="firstname">First Name</label>
        </div>

        <div class="form-floating mt-2">
          <input
            type="text"
            name="lastname"
            class="form-control"
            id="lastname"
            placeholder="Last Name"
            required
          />
          <label for="lastname">Last Name</label>
        </div>

        <div class="form-floating mt-2">
          <input
            type="email"
            name="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            required
          />
          <label for="email">Email address</label>
        </div>

        <div class="form-floating mt-2">
          <textarea
            name="message"
            id="message"
            class="form-control"
            placeholder="Your message"
            style="height: 100px"
            required
          ></textarea>
          <label for="message" class="fw-bold">Your message:</label>
        </div>

        <button class="btn btn-primary w-50 py-2 my-3" type="submit">
          Get in touch
        </button>

        <p class="mt-5 mb-3 text-body-secondary">We will contact you soon</p>
      </form>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
    #contactUS{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
</style>
