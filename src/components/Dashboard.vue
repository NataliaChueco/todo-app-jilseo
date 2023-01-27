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
						<!-- Button trigger modal -->
						<button
							type="button"
							class="btn btn-primary add-task"
							data-toggle="modal"
							data-target="#exampleModalCenter"
						>
							<span>
								<i class="fa-solid fa-plus"></i>
								Add new task
							</span>
						</button>

						<div class="cards-tasks">
							<div class="card-container">
								<div class="card-title">
									<h4>TASK TITLE HERE</h4>
								</div>
								<div class="card-descrp">
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Alias necessitatibus eos explicabo rem ipsum, odit incidunt
										obcaecati, at vitae natus quasi est tempora ipsam similique
										facere magni minima. Pariatur, eos.
									</p>
								</div>
								<div class="card-assign">
									<p>User name here</p>
								</div>
								<div class="card-deadline">
									<span> None </span>
									<div
										v-if="priority === 'very low'"
										class="very-low-priority-icon"
									>
										<i class="fa-solid fa-angles-down"></i>
									</div>
									<div v-if="priority === 'low'" class="low-priority-icon">
										<i class="fa-solid fa-angle-down"></i>
									</div>
									<div
										v-if="priority === 'medium'"
										class="medium-priority-icon"
									>
										<i class="fa-solid fa-angle-down"></i>
									</div>
									<div v-if="priority === 'high'" class="high-priority-icon">
										<i class="fa-solid fa-angle-down"></i>
									</div>
								</div>
							</div>
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

		<!-- Modal -->
		<div
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
						<div class="task-title">
							<div class="title-name">
								<i class="fa-solid fa-book-bookmark"></i>
								<div
									contenteditable
									class="modal-title-edit"
									id="exampleModalLongTitle"
								>
									Add task name here...
								</div>
							</div>
							<div class="task-column">
								<p>currently on column: COLUMN</p>
							</div>
						</div>

						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="body-columns">
						<div class="modal-body">
							<div class="task-descrp">
								<div class="descrp-name">
									<i class="fa-solid fa-bars-staggered"></i>
									<div class="modal-title" id="exampleModalLongTitle">
										Description
									</div>
								</div>
								<div class="block-edit" contenteditable>
									Add a more extensive description here...
								</div>
							</div>
							<div class="task-comments">
								<div class="comments-name">
									<i class="fa-regular fa-comments"></i>
									<div class="modal-title" id="exampleModalLongTitle">
										Comments
									</div>
								</div>
								<div class="block-edit" contenteditable>
									Write here your comment...
								</div>
							</div>
						</div>
						<div class="modal-body__right">
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
						<button type="button" class="btn btn-primary save-btn">
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import "../styles/dashboard.css";
	import { ref, onMounted } from "vue";
	import { useColumnStore } from "../store/column";

	const columns = ref([]);
	const loading = ref(true);
	let maxColumns = 5;
	const store = useColumnStore();
	const columnName = ref("");
	const showModal = ref(false);
	let priority = ref("very low");

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
			store.addColumn("New column").then(function () {
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
