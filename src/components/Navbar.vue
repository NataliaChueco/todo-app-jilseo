<template>
	<div class="navbarContainer">
		<div class="jilseoBrand">
			<img src="../assets/JILSEO.png" alt="jilseoBrand" />
		</div>
		<div class="rightItems">
			<div class="search-container">
				<form>
					<i class="fa-solid fa-magnifying-glass"></i>
					<input
						class="input-search"
						type="text"
						placeholder="Search..."
						@keyup.enter="search"
					/>
				</form>
			</div>

			<div class="notifications">
				<i class="fa-regular fa-bell"></i>
			</div>

			<div class="userProfile">
				<img src="../assets/profileDefault.jpg" alt="userProfileImg" />
				<p>User Name</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path
						d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
					/>
				</svg>
			</div>
			<div class="logout">
				<button class="logout-btn" @click="onLogout">
					<i class="fa-solid fa-right-from-bracket"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import "../styles/navbar.css";
	import { useUserStore } from "../store/user";
	import { useRouter } from "vue-router";
	import * as utils from "../shared/utils.js";
	const router = useRouter();

	const onLogout = async () => {
		try {
			const store = useUserStore();
			await store.logOut();
			utils.navigateTo("signin", router);
		} catch (error) {
			utils.showToast(error.message, "danger");
			console.error(error);
		}
	};

	function search() {
		console.log("Searching haha nope");
	}
</script>

<style>
	@import "@fortawesome/fontawesome-free/css/all.css";
</style>
