
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
                    <a href='' @click="navigateToSignIn">Login</a>
                </div>
            </div>
            
    
        </div>
    </div>
   
  </template>
  
<script setup>
    import '../styles/auth.css';
    import { ref, computed } from 'vue';
    import {useUserStore} from '../store/user';
    import { useRouter } from 'vue-router';
 
    const router = useRouter();

   /*  const formData = computed(() => ({
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value
    }));

     */

    let email = ref('');
    let password = ref('');
    let repeatPassword = ref('');

    const strPasswordMatch = "The passwords should match."
    const strUserExist = "This email already has an account associated"

    const onSubmit = async () => {
      try {
        //Check if there is any user already registered with email
        const isAlreadyRegistered = await checkUserExists(email.value);
        
        if(isAlreadyRegistered){
            throw new Error(strUserExist);
        }
        // Validate that the password and repeatPassword fields match
        if (password.value !== repeatPassword.value) {
            
            throw new Error(strPasswordMatch);
        }
        const store = useUserStore()
        const signupResponse = await store.signUp(email.value, password.value);

        if(signupResponse){
            throw new Error (signupResponse.message)
        }
       
        navigateToDashboard();

      } catch (error) {
        showToast(error.message, "danger");
        console.error(error)
      }

      
    }
    
    async function checkUserExists(email) {
        try {
            // Make a GET request passing the email as a query parameter
            let response =
                fetch(`/users?email=${email}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
            // Check the response to see if it contains any users with the same email
            if (response.data.length > 0) {
            // If there is a user with the same email, return true
            return true;
            } else {
            // If there is no user with the same email, return false
            return false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    function navigateToSignIn() {
      router.push({  path: "/signin" });
    }

    function navigateToDashboard(){
        router.push({  path: "/dashboard" });
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