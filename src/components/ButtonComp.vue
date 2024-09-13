<template>
  <button id="custom-btn" class="btn mx-3 mt-3">{{ styledBtn }}</button>
</template>

<script>
export default {
props: {
  styledBtn: String
}
}
</script>

<style scoped>
/* Updated button styling */
#custom-btn {
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 12px; /* Increased border-radius for smoother look */
  font-weight: 600; /* Slightly reduced font-weight for balance */
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out; /* Smooth transition for hover effects */
  background: linear-gradient(135deg, #4a90e2, #76c7c0); /* Clean professional color scheme */
  padding: 0.75rem 1.5rem; /* Added padding for better button size */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
  letter-spacing: 1px; /* Increased letter spacing for a modern look */
  color: #fff; /* Ensures button text is clearly visible */
}

/* Hover effects */
#custom-btn:hover {
  transform: scale(1.05); /* Subtle zoom effect on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow for hover */
  border-color: #76c7c0; /* Accent border color on hover */
  background: linear-gradient(135deg, #76c7c0, #4a90e2); /* Inverted gradient on hover */
}

/* Active state effect */
#custom-btn:active {
  transform: scale(0.98); /* Slight shrink effect when pressed */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Increased shadow for active state */
}
</style>
