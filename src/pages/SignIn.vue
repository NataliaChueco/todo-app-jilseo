
<template>
       <div class="backgroundContainer">
        <div class="window">
            <div class=" outer">
                <div class="left inner">
                    <div class="logoContainer">
                        <img src="../assets/JILSEO_icon.svg" alt="logo" class="logo">
                        <p> Jilseo </p>
                    </div>
                    <div class="textContainer">
                        <h1> You. Your team. Organized. Agile.</h1>
                        <p> An open-source software development tool for agile teams. Customize and organize your tasks. </p>
                    </div>
                </div>
            </div>

            <div class="right">
                <img src="../assets/otter-solid.svg" alt="otter">
                <h2> Welcome back! </h2>
                <p>Ready for some tasks? Get ready! </p>
                <form @submit.prevent="onSubmit" class="auth-form">
                    <label for="email" class="auth-form__label">Email</label>
                    <input v-model="email" type="email" id="email" class="auth-form__input" required/>
                    <br />
                    <label for="password" class="auth-form__label">Password</label>
                    <input v-model="password" type="password" id="password" class="auth-form__input" required/>
                    <br />
                    <div class="flexContainer">
                        <button type="submit" class="auth-form__button">Sign In</button>
                    </div>
                </form>

                <div class="signSwitch">
                    <p> Don't have an account?</p>
                    <a href='' @click="navigateToSignUp">Get started!</a>
                </div>
            </div>
            
    
        </div>
    </div>
   
  </template>
  
<script setup>
    import '../styles/auth.css';
    import { ref, computed } from 'vue';
 
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');

    const formData = computed(() => ({
    email: email.value,
    password: password.value,
    repeatPassword: repeatPassword.value,
    }));


    function navigateToSignUp() {
      router.push({  path: "/auth" });
    }
</script>


<style scoped>
</style>