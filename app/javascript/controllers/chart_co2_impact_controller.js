import { Controller } from "@hotwired/stimulus"
import { Chart } from "chart.js";
// import Chart from "@stimulus-components/chartjs";

// Connects to data-controller="chart-co2-impact"
export default class extends Controller {
  static targets = ["beginning", "yesterday", "week", "month", "year", "three", "six"];
  connect() {
    const worldPopulationGrowth = {
      "Depuis le debut": this.beginningTarget.innerText,
      "1 an": this.yearTarget.innerText,
      "6-mois": this.sixTarget.innerText,
      "3-mois": this.threeTarget.innerText,
      "1-mois": this.monthTarget.innerText,
      "1-semaine": this.weekTarget.innerText,
      "1-jour": this.yesterdayTarget.innerText,
    };

    const lineLabels = Object.keys(worldPopulationGrowth);
    const lineData = Object.values(worldPopulationGrowth);

    const line = new Chart(this.element, {
      type: 'line',
      data: {
        labels: lineLabels,
        datasets: [{
          label: 'Word Population Growth',
          data: lineData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
