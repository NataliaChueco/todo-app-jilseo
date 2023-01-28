// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

export const useColumnStore = defineStore("columns", {
	state: () => ({
		columns: null,
	}),
	actions: {
		//GET
		async fetchColumns() {
			const { data: columns } = await supabase
				.from("columns")
				.select(
					`
					*,
					tasks(*)
				`
				)
				.order("id", { ascending: true });
			console.log(columns);
			return columns;
		},

		//POST
		async addColumn(name) {
			const userStore = useUserStore();
			let user = await userStore.fetchUser();
			const { data: error } = await supabase.from("columns").insert({
				name: name,
				user_id: user.id,
			});
			console.log(error);
		},

		//PUT
		async saveColumnName(name, id) {
			await supabase.from("columns").update({ name: name }).eq("id", id);
		},

		//DELETE
		async deleteColumn(id) {
			await supabase.from("columns").delete().eq("id", id);
		},
	},
});
