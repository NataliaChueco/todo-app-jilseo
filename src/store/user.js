// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      let data;
      
      if (error){
        return data = {
          status: error.status,
          message: error.message
        }
      };
      if (user) this.user = user;
      return;
      
    },

    async signIn(email, password){
      const {user, error} = await supabase.auth.signIn({
        email:email,
        password:password
      });
      let data;
      if (error){
        return data = {
          status: error.status,
          message: error.message
        }
      };
      if (user) this.user = user;
      return;
    },
    async logOut(){
      await supabase.auth.signOut();
    },
  
    
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
