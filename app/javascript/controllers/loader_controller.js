import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="loader"
export default class extends Controller {
  static targets = [ "loader" ]
  connect() {
    console.log("hello");
    console.log(this.loaderTarget);
  }
  
  toggleDnone() {
    this.loaderTarget.classList.remove('d-none');
  }
}
