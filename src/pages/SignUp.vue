
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
                        <button type="submit" class="auth-form__button">Sign Up</button>
                    </div>
                </form>

                <div class="signSwitch">
                    <p> Already registered?</p>
                    <a href="" v-on:click='routeSignIn'>Sign in</a>
                </div>
            </div>
            
    
        </div>
    </div>
   
  </template>
  
<script setup>
    import '../styles/auth.css';
    import { ref, computed } from 'vue';
    import {useUserStore} from '../store/user';

 

    const formData = computed(() => ({
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value
    }));

    const strPasswordMatch = "The passwords should match."
    const strUserExist = "This email already has an account associated"
    const strPasswordFormat =  "The password should be longer than 6 characters"

    const onSubmit = async () => {
      try {
        // Validate that the password and repeatPassword fields match
        if (formData.value.password !== formData.value.repeatPassword) {
            showToast(strPasswordMatch, "danger");
            throw new Error('The passwords do not match');
        }
        const store = useUserStore()
        store.signUp(formData.value.email,formData.value.password);
       
      } catch (error) {
        console.error(error)
      }
    }
    

    function routeSignIn(){
        router.push("/signin");
    }

    function showToast(message, type) {
        // Create the toast element
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `
            <div class="toast-header">
            <strong class="mr-auto">Error</strong>
            </div>
            <div class="toast-body">
            ${message}
            </div>
        `;
        toast.style.zIndex = 10;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '2%';
        toast.style.display = 'block';
        toast.style.margin = '10px';
        // Add the appropriate class for the toast type
        toast.classList.add(`bg-${type}`);

        // Append the toast to the body and show it
        document.body.appendChild(toast);
        $('.toast').toast({
            delay: 5000
        });
        $('.toast').toast('show');
    }
  
</script>


<style scoped>
</style>