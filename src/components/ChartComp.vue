<template>
  <canvas id="myChart"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js";

let myChart; // Declare globally for access in both lifecycle hooks

onMounted(() => {
  const ctx = document.getElementById("myChart").getContext("2d");
  
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Label 1", "Label 2"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: ["blue", "red"],
          data: [4, 3],
        },
        {
          label: "Dataset 2",
          backgroundColor: ["green", "yellow"],
          data: [2, 1],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Set to false for better control of responsiveness
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Custom Chart Title",
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Start y-axis from zero
        },
      },
    },
  });

  // Update the chart after rendering
  myChart.data.datasets[0].data[0] = 5;
  myChart.update();
});

// Destroy chart to avoid memory leaks
onBeforeUnmount(() => {
  if (myChart) {
    myChart.destroy();
  }
});
</script>
<style lang="">
    
</style>