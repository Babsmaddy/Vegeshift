import { Controller } from "@hotwired/stimulus"
import { Chart } from "chart.js";
// import Chart from "@stimulus-components/chartjs";

// Connects to data-controller="chart-co2-impact"
export default class extends Controller {
  connect() {
    console.log("hello");

    const worldPopulation = {
      men: 504,
      women: 496
    };
    const doughnutLabels = Object.keys(worldPopulation);
    const doughnutSata = Object.values(worldPopulation);

    const doughnut = new Chart(this.element, {
      type: 'doughnut',
      data: {
        labels: doughnutLabels,
        datasets: [{
          label: 'Word Population',
          data: doughnutSata,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}
