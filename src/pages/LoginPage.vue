<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-25 w-16" src="@/assets/login.png" alt="Your Company" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Login to TheCodeWork
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
      <div v-if="loginError" class="text-red-500 text-lg font-bold mb-4 text-center">
        {{ loginError }}
      </div>
      <form class="space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
            <span v-if="errors.password"  class="text-red-500 text-sm">{{
              errors.password[0]
            }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      loginError: null,
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const user = {
            token: response.data.token,
            userId: response.data.user_id,
            username: response.data.name,
          };
          localStorage.setItem("user", JSON.stringify(user));
          this.errors = {};
          this.loginError = null;
          this.$router.push({ name: "UserDashboard" }).catch((err) => {
            console.error("Navigation error:", err);
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.loginError = error.response.data.message;
              this.email = "";
              this.password = "";
            } else if (error.response.data.errors) {
              this.errors = error.response.data.errors;
            }
          } else {
            console.error("Error during login:", error);
          }
        });
    },
  },
};
</script>