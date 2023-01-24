// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useColumnStore = defineStore("columns", {
  state: () => ({
    columns: null,
  }),
  actions: {
    async fetchColumns() {
      const { data: columns } = await supabase
        .from("columns")
        .select();
      this.columns = columns;
      console.log("columns dentro fetch ",columns);

      return columns;
    },

    async addColumn(name) {
        const {data: { session } } = await supabase.auth.session();
        const { user } = session;
        console.log(user);
        const { data: error } = await supabase
        .from('columns')
        .insert({ name: name });
        console.log(error)
        this.columns = this.fetchColumns();
        console.log("columns dentro insert ", this.columns);
  
        return this.columns;
      },
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
