import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorites"
export default class extends Controller {
  static values = { url: String}
  connect() {

  }

  fire(event) {
    if (event.target.classList.contains("fa-regular")){

      event.target.classList.remove("fa-regular")
      event.target.classList.add("fa-solid")
      fetch(this.urlValue,
        {
          method: "POST",
        }
      );
    } else if(event.target.classList.contains("fa-solid")){
   
      event.target.classList.remove("fa-solid")
      event.target.classList.add("fa-regular")
      fetch(this.urlValue,
        {
          method: "DELETE",
        }
      );
    }
  }

}
