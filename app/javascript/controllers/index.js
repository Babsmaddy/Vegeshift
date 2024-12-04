// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
// import { Chart } from "chart.js";
// import * as Chartjs from "chart.js";
import { Application } from '@hotwired/stimulus'
import Chart from '@stimulus-components/chartjs'

eagerLoadControllersFrom("controllers", application)

let application = Application.start()
application.register('chart', Chart)


// const controllers = Object.values(Chartjs).filter(
//   (chart) => chart.id !== undefined
// );
// Chart.register(...controllers);
