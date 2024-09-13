<template>
  <a style="--primary-color: #4a90e2" class="custom-button" href="#">
      Add to cart
  </a>
</template>

<script>
export default {
  // No functionality changes are needed for now.
}
</script>

<style scoped>
/* Main button styling */
.custom-button {
line-height: 1;
text-decoration: none;
display: inline-flex;
align-items: center;
gap: 0.75rem;
background-color: var(--primary-color); /* New variable for button color */
color: #fff;
border-radius: 50px; /* Rounded button for a cleaner look */
font-weight: 600;
padding: 0.75rem 1.5rem;
padding-left: 20px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added slight box shadow */
transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
}

/* Icon wrapper inside the button */
.icon-container {
flex-shrink: 0;
width: 30px;
height: 30px;
position: relative;
background-color: #fff;
border-radius: 50%;
display: grid;
place-items: center;
overflow: hidden;
transition: transform 0.3s ease; /* Smooth icon scaling on hover */
}

/* Hover effects for the button */
.custom-button:hover {
background-color: #002f5f; /* Changed hover background to a darker shade */
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Slight increase in shadow on hover */
transform: translateY(-3px); /* Lift effect on hover */
}

/* Icon hover effects */
.custom-button:hover .icon-container {
transform: scale(1.1); /* Slightly enlarge the icon on hover */
}

/* Smooth icon translation on hover */
.icon-copy {
position: absolute;
transform: translate(-150%, 150%);
}

.custom-button:hover .icon-main {
transition: transform 0.3s ease-in-out;
transform: translate(150%, -150%);
}

.custom-button:hover .icon-copy {
transition: transform 0.3s ease-in-out 0.1s;
transform: translate(0);
}
</style>
