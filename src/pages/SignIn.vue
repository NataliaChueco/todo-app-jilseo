
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
                <form @submit.prevent="onLogin" class="auth-form">
                    <label for="email" class="auth-form__label">Email</label>
                    <input v-model="email" type="email" id="email" class="auth-form__input" required/>
                    <br />
                    <label for="password" class="auth-form__label">Password</label>
                    <input v-model="password" type="password" id="password" class="auth-form__input" required/>
                    <br />
                    <div class="flexContainer">
                        <button type="submit" class="auth-form__button">Login</button>
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
    import { useRouter } from 'vue-router';
    import {useUserStore} from '../store/user';

    const router = useRouter();

    let email = ref('');
    let password = ref('');

    const strUserNotFound = "The user or password is not correct"


    const onLogin = async () => {
      try {

        const store = useUserStore()
        const signinResponse = await store.signIn(email.value, password.value);

        if(signinResponse){
            throw new Error (signinResponse.message)
        }

        navigateToDashboard();
       
      } catch (error) {
        showToast(error.message, "danger");
        console.error(error)
      }
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
    
    function navigateToSignUp() {
      router.push({  path: "/signup" });
    }
    function navigateToDashboard(){
        router.push({  path: "/dashboard" });
    }
</script>


<style scoped>
</style>