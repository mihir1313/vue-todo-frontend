<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div class="flex items-center justify-center w-16 h-16 rounded-full">
      <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessLoader',
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

