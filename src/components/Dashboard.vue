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
					@drop="onDrop($event, column)"
					@dragenter.prevent
					@dragover.prevent
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
							:data-target="`#createTaskModal${index}`"
						>
							<span>
								<i class="fa-solid fa-plus"></i>
								Add new task
							</span>
						</button>
						<!-- Create task modal -->
						<div
							class="modal fade"
							:id="`createTaskModal${index}`"
							tabindex="-1"
							role="dialog"
							aria-labelledby="createTaskModalTitle"
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
													@blur="
														updateTaskInfo('title', $event.target.innerText)
													"
												>
													Add task name here...
												</div>
											</div>
											<div class="task-column">
												<p>currently on column: {{ column.name }}</p>
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
												<div
													class="block-edit"
													@blur="
														updateTaskInfo('descrp', $event.target.innerText)
													"
													contenteditable
												>
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
										<button
											type="button"
											@click="addTask(column.id)"
											class="btn btn-primary save-btn"
											data-dismiss="modal"
										>
											Save changes
										</button>
									</div>
								</div>
							</div>
						</div>

						<!--Array of current tasks in column -->
						<div class="cards-tasks">
							<div
								v-for="(task, taskIndex) in column.tasks"
								class="card-container"
								data-toggle="modal"
								v-bind:data-target="`#updateTaskModal${index}${taskIndex}`"
								@click="getTask(task.id)"
								draggable="true"
								@dragstart="startDrag($event, task)"
							>
								<div class="card-title">
									<h4>{{ task.title }}</h4>
								</div>
								<div class="card-descrp">
									<p>
										{{ task.descrp }}
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

								<!-- Update task modal -->
								<div
									class="modal fade"
									data-backdrop="static"
									data-keyboard="false"
									:id="`updateTaskModal${index}${taskIndex}`"
									tabindex="-1"
									role="dialog"
									aria-labelledby="updateTaskModalTitle"
									aria-hidden="true"
									@click="$event.stopPropagation()"
								>
									<div
										class="modal-dialog modal-dialog-centered"
										role="document"
									>
										<div class="modal-content">
											<div class="modal-header">
												<div class="task-title">
													<div class="title-name">
														<i class="fa-solid fa-book-bookmark"></i>
														<div
															contenteditable
															class="modal-title-edit"
															id="exampleModalLongTitle"
															@blur="
																updateTaskInfo('title', $event.target.innerText)
															"
														>
															{{ currentTask.title }}
														</div>
													</div>
													<div class="task-column">
														<p>currently on column: {{ column.name }}</p>
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
															<div
																class="modal-title"
																id="exampleModalLongTitle"
															>
																Description
															</div>
														</div>
														<div
															class="block-edit"
															@blur="
																updateTaskInfo(
																	'descrp',
																	$event.target.innerText
																)
															"
															contenteditable
														>
															{{ currentTask.descrp }}
														</div>
													</div>
													<div class="task-comments">
														<div class="comments-name">
															<i class="fa-regular fa-comments"></i>
															<div
																class="modal-title"
																id="exampleModalLongTitle"
															>
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
												<div class="footer-left">
													<button
														type="button"
														class="btn btn-secondary delete-task"
														data-dismiss="modal"
														@click="deleteTask(task.id)"
													>
														<i class="fa-solid fa-trash-can"></i>
													</button>
												</div>
												<div class="footer-right">
													<button
														type="button"
														class="btn btn-secondary"
														data-dismiss="modal"
													>
														Close
													</button>
													<button
														type="button"
														@click="updateTask()"
														class="btn btn-primary save-btn"
														data-dismiss="modal"
													>
														Update changes
													</button>
												</div>
											</div>
										</div>
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
	</div>
</template>

<script setup>
	import "../styles/dashboard.css";
	import { ref, onMounted } from "vue";
	import { useColumnStore } from "../store/column";
	import { useTaskStore } from "../store/task";

	const columns = ref([]);
	const loading = ref(true);
	let maxColumns = 5;
	const columnStore = useColumnStore();
	const taskStore = useTaskStore();

	const columnName = ref("");
	const currentTask = ref("");
	const currentTaskTitle = ref("");
	const currentTaskDescrp = ref("");

	let priority = ref("very low");

	onMounted(async () => {
		try {
			currentTaskDescrp.value = "Add a more extensive description here...";
			currentTaskTitle.value = "Add task name here...";
			const fetchedColumns = await columnStore.fetchColumns();
			columns.value = fetchedColumns;
			setTimeout(() => {
				loading.value = false;
			}, 700);
		} catch (error) {
			console.error(error);
		}
	});

	// COLUMN FUNCTIONS
	function addColumn() {
		if (columns.value.length < maxColumns) {
			columnStore.addColumn("New column").then(function () {
				columnStore.fetchColumns().then(function (response) {
					columns.value = response;
				});
			});
		}
	}

	function saveColumnNameToDB(columnId, name) {
		columnStore.saveColumnName(name, columnId).then(function () {
			columnStore.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});
	}

	function deleteColumn(id) {
		columnStore.deleteColumn(id).then(function () {
			columnStore.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});
	}

	// TASKS FUNCTIONS

	function addTask(column_id, assign_to) {
		taskStore
			.addTask(
				currentTaskTitle.value,
				currentTaskDescrp.value,
				column_id,
				assign_to
			)
			.then(function () {
				columnStore.fetchColumns().then(function (response) {
					columns.value = response;
				});
			});
	}

	function deleteTask(id) {
		taskStore.deleteTask(id).then(function () {
			columnStore.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});
	}

	function getTask(id) {
		taskStore.getTask(id).then(function (response) {
			currentTask.value = response[0];
			return response[0];
		});
	}

	function updateTaskInfo(type, data) {
		if (type === "descrp") {
			currentTaskDescrp.value = data;
			if (currentTask.value !== "") currentTask.value.descrp = data;
		}

		if (type === "title") {
			currentTaskTitle.value = data;
			if (currentTask.value !== "") currentTask.value.title = data;
		}
	}

	function updateTask() {
		taskStore.updateTask(currentTask.value).then(function () {
			columnStore.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});
	}

	function dragAndDropTask(taskId, columId) {
		taskStore.dragAndDropTask(taskId, columId).then(function () {
			columnStore.fetchColumns().then(function (response) {
				columns.value = response;
			});
		});
	}

	const startDrag = (event, task) => {
		console.log(task);
		event.dataTransfer.dropEffect = "move";
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("taskId", task.id);
		event.dataTransfer.setData("columnId", task.colum_id);
	};

	const onDrop = (event, column) => {
		const taskId = event.dataTransfer.getData("taskId");
		dragAndDropTask(taskId, column.id);
	};
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
</style>
