<template>
    <div class="dashboard-container">
       <div class="dashboard-header">
            <h3> Current Dashboard</h3>
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
                        <p> Show as:</p>
                        <a href=""> <i class="fa-solid fa-table-columns filter-active"></i> Board</a>
                        <a href=""> <i class="fa-solid fa-list-ul"></i> List</a>
                    </span>
                </div>

                <div class="filters__quick">
                    <span>
                        <p>QUICK FILTERS: </p>
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
                <button type="button" class="btn btn-secondary btn-sm">
                    <i class="fa-regular fa-square-plus"></i>
                    <p> ADD COLUMN </p>
                </button>
            </div>
       </div>
       <hr>
       <div class="dashboard-columns">
            <div class="columns__column">
                <div class="column__name">
                    <span>
                        <i class="fa-solid fa-pencil"></i>
                        <div contenteditable="true">NAME COLUMN</div>
                    </span>
                </div>
                <div class="column__container">
                    <div class="add-task">
                        <span>
                            <i class="fa-solid fa-plus"></i>
                            <p> Add new task </p>
                        </span>
                    </div>
                </div>
            </div>
       </div>
    </div>
   
</template>

<script setup>
 import '../styles/dashboard.css';


</script>

<style>
</style>