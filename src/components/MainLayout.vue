<template>
  <div class="flex flex-col min-h-screen">
    <MainHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from './MainHeader.vue';  
import MainFooter from './MainFooter.vue';

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>
