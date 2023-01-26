<template>
	<div class="dashboard-container">
		<div class="dashboard-header">
			<h3>Current Dashboard</h3>
			<div class="fullscreen-btn">
				<button type="button" class="btn btn-secondary btn-sm">
					<i class="fa-solid fa-expand"></i>
				</button>
			</div>
		</div>
		<div class="dashboard-buttons">
			<div class="buttons__filters">
				<div class="filters__show">
					<span>
						<p>Show as:</p>
						<a href="">
							<i class="fa-solid fa-table-columns filter-active"></i> Board</a
						>
						<a href=""> <i class="fa-solid fa-list-ul"></i> List</a>
					</span>
				</div>

				<div class="filters__quick">
					<span>
						<p>QUICK FILTERS:</p>
						<button type="button" class="btn btn-secondary btn-sm">
							Assigned to me
						</button>
						<button type="button" class="btn btn-secondary btn-sm">
							Recently Updated
						</button>
					</span>
				</div>
			</div>
			<div class="buttons__addColumn">
				<button
					@click="addColumn"
					type="button"
					class="btn btn-secondary btn-sm"
				>
					<i class="fa-regular fa-square-plus"></i>
					<p>ADD COLUMN</p>
				</button>
			</div>
		</div>
		<hr />
		<div v-if="!loading">
			<div class="dashboard-columns">
				<div
					class="columns__column"
					v-for="(column, index) in columns"
					:key="index"
				>
					<div class="column__name">
						<span>
							<i class="fa-solid fa-pencil"></i>
							<div
								contenteditable
								ref="columnName"
								@blur="saveColumnNameToDB(column.id, $event.target.innerText)"
							>
								{{ column.name }}
							</div>
						</span>
						<button
							@click="deleteColumn(column.id)"
							class="btn btn-secondary btn-sm"
						>
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>
					<div class="column__container">
						<div class="add-task" @click="showTaskModal = true">
							<span>
								<i class="fa-solid fa-plus"></i>
								<p>Add new task</p>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="loading">
				<div class="loading-spinner"></div>
			</div>
		</div>

		<div
			v-if="showTaskModal"
			class="modal fade"
			id="exampleModalCenter"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">
							<i class="fa-solid fa-book-bookmark"></i>
							<div class="add-title" contenteditable="true">
								Add title here...
							</div>
						</h5>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
							@click="showTaskModal = false"
						>
							<span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
						</button>
					</div>
					<div class="modal-body">
						<div class="modal-content__left">
							<div class="modal__descrp">
								<i class="fa-solid fa-bars-staggered"></i>
								<div class="descrp">Description</div>
								<div class="add-descrp" contenteditable="true">
									Add a more extensive description here...
								</div>
							</div>
							<div class="modal__comments">
								<i class="fa-regular fa-comment"></i>
								<div class="descrp">Comments</div>
								<div class="add-descrp" contenteditable="true">
									Write here your comment...
								</div>
							</div>
						</div>
						<div class="modal-content__right">
							<button
								type="button"
								class="modal__assign btn btn-secondary btn-sm"
							>
								Assign to
							</button>
							<button
								type="button"
								class="modal__date btn btn-secondary btn-sm"
							>
								Date
							</button>
							<button
								type="button"
								class="modal__priority btn btn-secondary btn-sm"
							>
								Priority
							</button>
							<button
								type="button"
								class="modal__labels btn btn-secondary btn-sm"
							>
								Labels
							</button>
							<button
								type="button"
								class="modal__sprint btn btn-secondary btn-sm"
							>
								Sprint
							</button>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import "../styles/dashboard.css";
	import { ref } from "vue";
	import { useColumnStore } from "../store/column";
	import { onMounted } from "vue";
	import { debounce } from "lodash";

	const columns = ref([]);
	const loading = ref(true);
	let maxColumns = 5;
	const store = useColumnStore();
	const columnName = ref("");

	const showTaskModal = ref(false);

	onMounted(async () => {
		try {
			const fetchedColumns = await store.fetchColumns();
			columns.value = fetchedColumns;
			setTimeout(() => {
				loading.value = false;
			}, 700);
		} catch (error) {
			console.error(error);
		}
	});

	function addColumn() {
		if (columns.value.length < maxColumns) {
			store.addColumn("new column").then(function () {
				store.fetchColumns().then(function (response) {
					columns.value = response;
				});
			});
		}
	}

	function saveColumnNameToDB(columnId, name) {
		store.saveColumnName(name, columnId);
	}

	function deleteColumn(id) {
		store.deleteColumn(id).then(function () {
			store.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});

		console.log(columns);
	}
</script>

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-spinner {
		border: 2px solid #f3f3f3;
		border-top: 2px solid #3498db;
		border-radius: 50%;
		width: 28px;
		height: 28px;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/*TASK MODAL*/
</style>
