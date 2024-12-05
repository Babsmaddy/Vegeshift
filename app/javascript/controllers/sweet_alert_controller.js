import { Controller } from "@hotwired/stimulus"
import Swal from 'sweetalert2'

// Connects to data-controller="sweet-alert"
export default class extends Controller {

  static values = {message: String, redirectUrl: String}
  connect(){
    this.timeout= 3000
    this.showAlert()
    setTimeout(() => {
      window.location.href = this.redirectUrlValue
    }, this.timeout);
  }



  showAlert() {
    // const message = event.detail?.message || this.messageTarget?.textContent || "Action effectuée avec succès !";

    // Afficher l'alerte
    Swal.fire ({
      title: "✅ Bravo !",
      text: this.messageValue,
      icon: "success",
      timer: this.timeout,
      showConfirmButton: false,
    });
  }
}
