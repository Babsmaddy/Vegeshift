import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorites"
export default class extends Controller {
  static values = { post: String, delete: String}
  connect() {

  }

  fire(event) {
    if (event.target.classList.contains("fa-regular")){

      event.target.classList.remove("fa-regular")
      event.target.classList.add("fa-solid")
      fetch(this.postValue,
        {
          method: "POST",
        }
      );
    } else if(event.target.classList.contains("fa-solid")){

      event.target.classList.remove("fa-solid")
      event.target.classList.add("fa-regular")
      fetch(this.deleteValue,
        {
          method: "DELETE",
        }
      );
    }
  }

}
