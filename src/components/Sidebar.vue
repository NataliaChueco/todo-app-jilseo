<template>
    <div class="sidebar-container">
        <div class="navbar-menu__top">
            <div class="newboard-btn">
                <button type="button" class="btn btn-secondary btn-sm"> NEW BOARD</button>
            </div>
            <div class="navbar-menu">
                    <span class="menu__opt current">
                        <i class="fa-regular fa-newspaper"></i>
                        <a href=""> Current Dahsboard </a>
                    </span>
                    <span class="menu__opt backlog">
                        <i class="fa-solid fa-layer-group"></i>
                        <a href=""> Backlog </a>
                    </span>
                    <span class="menu__opt releases">
                        <i class="fa-solid fa-star"></i>
                        <a href=""> Releases </a>
                    </span>
                    <span class="menu__opt reports">
                        <i class="fa-solid fa-chart-line"></i>
                        <a href=""> Reports </a>
                    </span>
                    <span class="menu__opt invited">
                        <i class="fa-solid fa-user-group"></i>
                        <a href=""> People invited </a>
                    </span>
                    <span class="menu__opt calendar">
                        <i class="fa-solid fa-calendar-days"></i>
                        <a href=""> Calendar </a>
                    </span>
            </div>
            <hr>
            <div class="navbar-menu-help">
                    <span class="menu__opt help">
                        <i class="fa-solid fa-circle-info"></i>
                        <a href=""> Help center </a>
                    </span>
                    <span class="menu__opt feedback">
                        <i class="fa-regular fa-comments"></i>
                        <a href=""> Provide Feedback </a>
                    </span>
            </div>
        </div>
       <div class="navbar-menu__bottom">
            <div class="navbar-reducer">
                <i class="fa-solid fa-angles-left"></i>
            </div>
       </div>
       
    </div>
   
</template>

<script setup>
 import '../styles/sidebar.css';

 function search(){
    console.log("Searching haha nope");
 }
</script>

<style>
</style>