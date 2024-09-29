<template>
  <footer class="bg-gray-800 text-white">
    <div class="mx-auto max-w-7xl px-2 py-2 text-center">
        <p>&copy; {{ currentYear }} TheCodeWork.</p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
