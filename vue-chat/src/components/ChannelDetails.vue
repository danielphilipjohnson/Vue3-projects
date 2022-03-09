<template>
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

      <div class="flex items-center mb-4">
        <p class="mr-4 text-lg">Media</p>
        <span class="text-xs">143 Pictures</span>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img
          class="w-full col-span-1 rounded-md"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <img
          class="w-full col-span-1 rounded-md"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <img
          class="w-full col-span-1 rounded-md"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <img
          class="w-full col-span-1 rounded-md"
          src="https://via.placeholder.com/150"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
