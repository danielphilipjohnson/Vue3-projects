<template>
  <div
    class="flex items-center justify-center w-full bg-indigo-100 lg:py-32 lg:h-screen"
  >
    <div
      class="container flex flex-col bg-white lg:flex-row lg:mx-16 lg:rounded-xl 2xl:h-3/4"
    >
      <div
        class="flex flex-wrap h-screen px-8 py-16 lg:p-32 lg:w-1/2 lg:h-full"
      >
        <div>
          <h2 class="mb-4 text-4xl font-extrabold text-left text-black">
            Log in.
          </h2>
          <p class="text-black lg:mb-8">
            How do to get started with the chat app?
          </p>
        </div>

        <form class="flex flex-col w-full max-w-lg">
          <div
            class="flex items-center mb-4 transition-all duration-500 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 hover:border-black"
            tabindex="0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 m-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              class="w-full h-full py-4 text-black focus:outline-none"
              type="text"
              placeholder="Your login or email"
            />
          </div>
          <div
            class="flex items-center mb-4 transition-all duration-500 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 hover:border-black"
            tabindex="0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 m-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>

            <input
              class="w-full h-full py-4 focus:outline-none"
              type="password"
              placeholder="Password"
            />
          </div>

          <div class="flex items-center justify-between">
            <p class="text-gray-500">Register</p>
            <button
              class="px-6 py-4 transition duration-500 bg-indigo-400 rounded-lg max-w-max hover:bg-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div class="relative overflow-hidden lg:w-1/2 group">
        <img
          class="object-cover w-full h-full transition-transform transform group-hover:scale-110 group-hover:skew-y-1 lg:rounded-br-xl lg:rounded-tr-xl"
          src="../assets/login-bg.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
