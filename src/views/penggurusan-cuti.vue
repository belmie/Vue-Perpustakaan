<template>
  <div>
    <h2>Cuti</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div class="p-4">
    <input v-model="text" placeholder="Edit sesuatu..." class="border p-2 rounded" />
    <button @click="saveChanges" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
      Save
    </button>
  </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { showSuccess, showError } from "@/services/ToastService"

const text = ref("")

function saveChanges() {
  if (text.value.trim() === "") {
    showError("Input kosong ❌")
  } else {
    showSuccess("Perubahan berjaya disimpan ✅")
  }
}
</script>
<style lang="scss">
</style>
