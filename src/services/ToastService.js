// src/services/ToastService.js
import { useToast } from "vue-toastification"

let toast

export function initToast() {
  toast = useToast()
}

export function showSuccess(msg) {
  toast.success(msg)
}

export function showError(msg) {
  toast.error(msg)
}

export function showInfo(msg) {
  toast.info(msg)
}
