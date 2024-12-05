import { Controller } from "@hotwired/stimulus"
import { Chart } from "chart.js";
// import Chart from "@stimulus-components/chartjs";

// Connects to data-controller="chart-co2-impact"
export default class extends Controller {

  static values = {
    beginning: Number,
    year: Number,
    six: Number,
    three: Number,
    month: Number,
    week: Number,
    yesterday: Number,
  }
  connect() {
    const worldPopulationGrowth = {
      "Depuis le debut": this.beginningValue,
      "1 an": this.yearValue,
      "6-mois": this.sixValue,
      "3-mois": this.threeValue,
      "1-mois": this.monthValue,
      "1-semaine": this.weekValue,
      "1-jour": this.yesterdayValue,
    };

    const lineLabels = Object.keys(worldPopulationGrowth);
    const lineData = Object.values(worldPopulationGrowth);

    const line = new Chart(this.element, {
      type: 'line',
      data: {
        labels: lineLabels,
        datasets: [{
          label: 'Écart de co2 par rapport au Traditionnel',
          data: lineData,
          fill: false,
          borderColor: '#1FCC79',
          tension: 0.1
        }]
      }
    });
  }
}
