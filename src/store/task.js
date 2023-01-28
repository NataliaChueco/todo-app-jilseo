// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

export const useTaskStore = defineStore("tasks", {
	state: () => ({
		tasks: null,
	}),
	actions: {
		async fetchTasks() {
			const { data: tasks } = await supabase
				.from("tasks")
				.select("*")
				.order("id", { ascending: false });
			return tasks;
		},

		//GET TASK
		async getTask(id) {
			const { data: task } = await supabase
				.from("tasks")
				.select("*")
				.eq("id", id);
			return task;
		},

		//POST
		async addTask(title, descrp, column_id, assign_to) {
			const userStore = useUserStore();
			let user = await userStore.fetchUser();

			const { data: error } = await supabase.from("tasks").insert({
				title: title,
				user_id: user.id,
				is_complete: false,
				column_id: column_id,
				descrp: descrp,
				assign_to: assign_to,
			});

			console.log(error);
		},

		//POST
		async updateTask(currentTask) {
			const userStore = useUserStore();
			let user = await userStore.fetchUser();
			console.log(currentTask);
			const { data: error } = await supabase
				.from("tasks")
				.update({
					title: currentTask.title,
					user_id: user.id,
					is_complete: false,
					column_id: currentTask.column_id,
					descrp: currentTask.descrp,
					assign_to: currentTask.assign_to,
				})
				.eq("id", currentTask.id);

			console.log(error);
		},

		//DELETE
		async deleteTask(id) {
			await supabase.from("tasks").delete().eq("id", id);
		},
	},
});
