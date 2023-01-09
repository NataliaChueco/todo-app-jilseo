
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
                <h2> Welcome! </h2>
                <p>Ready for some tasks? Create your account and get ready to start! </p>
                <form @submit.prevent="onSubmit" class="auth-form">
                    <label for="email" class="auth-form__label">Email*</label>
                    <input v-model="email" type="email" id="email" class="auth-form__input" required/>
                    <br />
                    <label for="password" class="auth-form__label">Password*</label>
                    <input v-model="password" type="password" id="password" class="auth-form__input" required/>
                    <br />
                    <label for="repeatPassword" class="auth-form__label">Repeat Password*</label>
                    <input v-model="repeatPassword" type="password" id="repeatPassword" class="auth-form__input" required />
                    <br />
                    <div class="flexContainer">
                        <button type="submit" class="auth-form__button">Register</button>
                    </div>
                </form>

                <div class="signSwitch">
                    <p> Already registered?</p>
                    <a href='' @click="utils.navigateTo('signin', router)">Login</a>
                </div>
            </div>
            
    
        </div>
    </div>
   
  </template>
  
<script setup>
    import '../styles/auth.css';
    import { ref } from 'vue';
    import {useUserStore} from '../store/user';
    import { useRouter } from 'vue-router';
    import * as utils from '../shared/utils.js';
 
    const router = useRouter();

    let email = ref('');
    let password = ref('');
    let repeatPassword = ref('');

    const strPasswordMatch = "The passwords should match."
    const strUserExist = "This email already has an account associated."
    const emailPattern = "This is not a valid email."
    const onSubmit = async () => {
      try {

        // Validate that the password and repeatPassword fields match
        if (password.value !== repeatPassword.value) {
            
            throw new Error(strPasswordMatch);
        }
        const store = useUserStore()
        const signupResponse = await store.signUp(email.value, password.value);

        if(signupResponse){
            throw new Error (signupResponse.message)
        }
       
        utils.navigateTo("dashboard", router);
    

      } catch (error) {
        utils.showToast(error.message, "danger");
        console.error(error)
      }
    }
    
  
</script>


<style scoped>
</style>