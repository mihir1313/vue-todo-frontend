<template>
  <nav class="bg-gray-800 text-white">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >TheCodeWork</span
        >
      </a>

      <div
        class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          @click="toggleDropdown"
        >
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" src="@/assets/user.jpg" alt="user photo" />
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
          :style="{ top: '50px', left: 'auto', right: '0', transform: 'none' }"
        >
       
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                @click.prevent="logout"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>

       
      </div>

      <div
        :class="isNavbarOpen ? 'block' : 'hidden'"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isDropdownOpen: false,
      isNavbarOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    logout() {
      const user = JSON.parse(localStorage.getItem("user"));

      // Check if user and token exist
      if (!user || !user.token) {
        console.error("User is not logged in or token is missing.");
        return;
      }

      const token = user.token;

      axios
        .post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Logout successful:", response.data);

          // Remove the token from localStorage
          localStorage.removeItem("user");

          // Navigate to the login 
          this.$router.push({ name: "LoginPage" });
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    },
  },
};
</script>
