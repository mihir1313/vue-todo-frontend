<template>
  <MainLayout>
    <ProcessLoader :isLoading="isLoading" />
    <div class="flex p-6">
      <div class="w-1/3 pr-4">
        <h2 class="text-2xl font-bold">Welcome to the User Dashboard!</h2>
      </div>

      <div class="w-2/3 pl-4">
        <button
          @click="toggleModal"
          class="float-right mt-4 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add ToDo
        </button>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Completed</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="item in todoList"
            :key="item.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.title }}
            </th>
            <td class="px-6 py-4">
              {{ item.description }}
            </td>
            <td class="px-6 py-4">
              {{ item.completed == 1 ? "Yes" : "No" }}
            </td>

            <td class="px-6 py-4">
              <a
                @click.prevent="openEditModal(item.id)"
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</a
              >
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline mx-3"
                @click.prevent="showConfirmationToast(item.id)"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr v-if="todoList.length === 0">
            <td
              colspan="4"
              class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
            >
              No records found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="toggleModal"
    ></div>

    <!-- modal -->
    <div
      v-if="isModalOpen"
      id="crud-modal"
      tabindex="-1"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">New ToDo</h3>
            <button
              @click="toggleModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="saveTodo" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label
                >
                <input
                  type="text"
                  v-model="itemData.title"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write title..."
                  required
                />
                <span v-if="errors.title" class="text-red-500">{{
                  errors.title[0]
                }}</span>
              </div>

              <div class="col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Description</label
                >
                <textarea
                  v-model="itemData.description"
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write description..."
                  required></textarea>
                <span v-if="errors.description" class="text-red-500">{{
                  errors.description[0]
                }}</span>
              </div>

              <div class="col-span-2 sm:col-span-1">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Completed</label
                >
                <select
                  v-model="itemData.completed"
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4"
                >
                  <option disabled value="">Select category</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <span v-if="errors.completed" class="text-red-500">{{
                  errors.completed[0]
                }}</span>
              </div>
              <div class="col-span-2 sm:col-span-1 flex items-end justify-end">
                <button
                  type="submit"
                  class="text-white mb-4 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/MainLayout.vue";
import ProcessLoader from "../components/ProcessLoader.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    timeout: 3000,
  });
};

const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    timeout: 3000,
    style: {
      backgroundColor: "red",
      color: "white",
    },
  });
};

export default {
  name: "UserDashboard",
  components: {
    MainLayout,
    ProcessLoader,
  },
  data() {
    return {
      isLoading: false,
      itemData: {
        id: null,
        title: "",
        description: "",
        completed: "",
      },
      isModalOpen: false,
      isEditMode: false,
      todoList: [],
      errors: {},
    };
  },
  methods: {
    // For Modal
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;

      if (!this.isModalOpen) {
        this.closeModal();
      } else {
        this.itemData = { id: null, title: "", description: "", completed: "" };
        this.isEditMode = false;
      }
    },
    // Getting Todo List
    async fetchTodos() {
      this.isLoading = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
          showErrorToast("User is not logged in or token is missing.");
        }

        const token = user.token;
        const userId = user.userId;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/todos?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.todoList = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
        showErrorToast(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    // Confirm to delete
    showConfirmationToast(itemId) {
      const confirmation = confirm("Are you sure you want to delete this todo?");

      if (confirmation) {
        this.deleteTodo(itemId);
      }
    },
    // Edit
    openEditModal(itemId) {
      const token = JSON.parse(localStorage.getItem("user")).token;
      axios
        .get(`http://127.0.0.1:8000/api/todos/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;

          this.itemData = {
            id: data.id,
            title: data.title,
            description: data.description,
            completed: data.completed,
          };

          this.isEditMode = true;
          this.isModalOpen = true;
        })
        .catch((error) => {
          console.error("There was a problem with the axios request:", error);
          showErrorToast(error.message);
        });
    },
    saveTodo() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).token;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      // update if isEditMode true
      if (this.isEditMode) {
        // Update existing todo
        axios
          .put(`http://127.0.0.1:8000/api/todos/${this.itemData.id}`, this.itemData, {
            headers,
          })
          .then((response) => {
            this.fetchTodos();
            this.closeModal();
            this.isLoading = false;
            showSuccessToast(response.data.message);
          })
          .catch((error) => {
            console.log("this", error);
            if (error.response && error.response.status === 422) {
              this.errors = error.response.data.errors;
              showErrorToast(error.response.message);
            }
          });
      } else {
        // Insert new todo
        axios
          .post("http://127.0.0.1:8000/api/todos", this.itemData, { headers })
          .then((response) => {
            this.closeModal();
            this.fetchTodos();
            this.isLoading = false;
            showSuccessToast(response.data.message);
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      }
    },
    // Delete todo
    deleteTodo(itemId) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).token;
      axios
        .delete(`http://127.0.0.1:8000/api/todos/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.message);
          this.fetchTodos();
          this.isLoading = false;
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error("There was a problem with the axios request:", error);
          showErrorToast(error.response.message);
        });
    },

    // Close Model / null the input fields,editMode false, remove the validation errors
    closeModal() {
      this.isModalOpen = false;
      this.itemData = { id: null, title: "", description: "", completed: "" };
      this.isEditMode = false;
      this.errors = {};
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>
