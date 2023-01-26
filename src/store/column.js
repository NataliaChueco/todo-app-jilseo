// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

export const useColumnStore = defineStore("columns", {
	state: () => ({
		columns: null,
	}),
	actions: {
		async fetchColumns() {
			const { data: columns } = await supabase
				.from("columns")
				.select()
				.order("id", { ascending: true });
			return columns;
		},

		async addColumn(name) {
			const userStore = useUserStore();
			let user = await userStore.fetchUser();
			const { data: error } = await supabase.from("columns").insert({
				name: name,
				user_id: user.id,
			});
		},

		async saveColumnName(name, id) {
			await supabase.from("columns").update({ name: name }).eq("id", id);
		},
		async deleteColumn(id) {
			await supabase.from("columns").delete().eq("id", id);
		},
		// Hacer POST
		// Hacer el PUT (edit)
		// Hacer el delete
		// Hacer el PUT (cambiar entre completada y pendiente)
	},
});
