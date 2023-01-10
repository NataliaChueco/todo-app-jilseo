
<template>
  <Navbar></Navbar>
  <div class="main-content">
    <Sidebar></Sidebar>   
    <Dashboard></Dashboard>  
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Dashboard from '../components/Dashboard.vue';
import '../styles/home.css';

</script>
