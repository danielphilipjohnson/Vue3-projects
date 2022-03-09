<template>
  <div class="">
    <!--<h1 class="text-3xl font-bold underline">Home</h1>-->
    <UserBlock v-slot="{ user }">
      <div v-if="user" class="relative grid grid-cols-6">
        <!--<UserProfile :user="user" />-->
        <!-- TODO split components into files -->
        <ChatList :uid="user.uid" />
        <div class="relative w-full col-span-4 bg-woodsmoke-500">
          <template v-if="false">
            <div
              class="absolute flex items-center justify-between w-full px-8 py-4 bg-gray-700 shadow-2xl"
            >
              <div class="flex items-center">
                <span class="mr-4"> 🎯 </span>
                <h2 class="text-xl">Channel name</h2>
              </div>

              <div class="flex">
                <img
                  class="w-8 h-8 mr-2 rounded-lg"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
                <img
                  class="w-8 h-8 mr-2 rounded-lg"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
                <img
                  class="w-8 h-8 mr-2 rounded-lg"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
                <span
                  class="flex items-center justify-center w-8 h-8 p-1 mr-2 text-xs text-gray-200 bg-gray-600 rounded-lg"
                >
                  24
                </span>
              </div>
            </div>

            <div class="px-16 py-20">
              <div class="flex mb-6">
                <img
                  class="w-8 h-8 mr-3 rounded-lg"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
                <div>
                  <div class="flex items-center mb-2">
                    <p class="mr-4 text-lg">Maria</p>
                    <time class="text-xs">10:40pm</time>
                  </div>

                  <div
                    class="px-5 py-2 mb-4 bg-gray-400 rounded-b-xl rounded-tr-xl w-max"
                  >
                    Message details
                  </div>
                  <div
                    class="px-5 py-2 mb-4 bg-gray-400 rounded-b-xl rounded-tr-xl w-max"
                  >
                    Message details
                  </div>
                </div>
              </div>

              <div class="flex justify-end mb-6">
                <div class="">
                  <div class="flex items-center justify-end mb-2 mr-2">
                    <time class="mr-4 text-xs">10:40pm</time>
                    <p class="text-lg">Maria</p>
                  </div>

                  <div
                    class="px-5 py-2 mb-4 bg-blue-400 rounded-tl-xl rounded-b-xl w-max"
                  >
                    Message details
                  </div>
                  <div
                    class="px-5 py-2 mb-4 bg-blue-400 rounded-tl-xl rounded-b-xl w-max"
                  >
                    Message details
                  </div>
                </div>
                <img
                  class="w-8 h-8 mr-3 rounded-lg"
                  src="https://via.placeholder.com/50"
                  alt=""
                />
              </div>
            </div>

            <!-- Bottom bar -->
            <div class="absolute bottom-0 w-full px-8 pb-8">
              <div class="flex justify-between w-full bg-gray-800 rounded">
                <div class="flex w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 m-3 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Message in channel"
                    class="w-full p-3 bg-transparent"
                  />
                </div>

                <div class="flex m-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="flex flex-col items-center justify-center w-full h-screen px-32"
            >
              <div class="w-32 h-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h2 class="mb-6 text-6xl font-bold">Welcome to the Chat</h2>
              <p class="max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                distinctio quia perspiciatis perferendis ullam, labore iure
                impedit laudantium dignissimos, placeat illo reprehenderit sunt
                doloremque nostrum deleniti suscipit nobis accusantium?
                Accusantium. Voluptatem neque consectetur unde ipsum aut
                mollitia praesentium maxime velit. Velit sapiente at
                repellendus, nemo dolore id iusto eius dolores nobis
                voluptatibus recusandae commodi maxime quaerat saepe similique
                aut.
              </p>
            </div>
          </template>
        </div>
        <div class="h-screen col-span-1 bg-gray-700">
          <div class="w-full px-6 py-4">
            <div class="flex items-center justify-between w-full pb-8">
              <div class="flex items-center">
                <h2 class="text-xl">Channel Details</h2>
              </div>

              <span class="border border-white rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>

            <div class="flex items-center">
              <p class="mr-4 text-lg">Media</p>
              <span class="text-xs">143 Pictures</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <img
                class="col-span-1 rounded-md"
                src="https://via.placeholder.com/150"
                alt=""
              />
              <img
                class="col-span-1 rounded-md"
                src="https://via.placeholder.com/150"
                alt=""
              />
              <img
                class="col-span-1 rounded-md"
                src="https://via.placeholder.com/150"
                alt=""
              />
              <img
                class="col-span-1 rounded-md"
                src="https://via.placeholder.com/150"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <TheLogin v-else />
    </UserBlock>
  </div>
</template>

<script lang="ts">
import TheLogin from "../components/TheLogin.vue";
import UserBlock from "../components/UserBlock.vue";
import UserProfile from "../components/UserProfile.vue";
import ChatList from "../components/ChatList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TheLogin,
    UserBlock,
    //UserProfile,
    ChatList,
  },
});
</script>
