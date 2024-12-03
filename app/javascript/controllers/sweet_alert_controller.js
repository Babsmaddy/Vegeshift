import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"


// Connects to data-controller="sweet-alert"
export default class extends Controller {

  static targets = ['message']

  showAlert(event) {
    // const message = event.detail?.message || this.messageTarget?.textContent || "Action effectuée avec succès !";

    // Afficher l'alerte
    Swal.fire ({
      title: "✅ Succès !",
      text: message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
