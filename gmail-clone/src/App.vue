<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
   <div id="app">      
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
  </div>

  
</template>

<style>

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


</style>
