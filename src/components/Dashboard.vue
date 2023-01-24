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
                <button @click="addColumn('')" type="button" class="btn btn-secondary btn-sm">
                    <i class="fa-regular fa-square-plus"></i>
                    <p> ADD COLUMN </p>
                </button>
            </div>
       </div>
       <hr>
       <div v-if="!loading">
            <div class="dashboard-columns">
                    <div class="columns__column" v-for="(column, index) in columns" :key="index" >
                        <div class="column__name">
                            <span>
                                <i class="fa-solid fa-pencil"></i>
                                <div> COL {{ index + 1 }}:</div>
                                <div contenteditable="true">{{ column.name }} </div>

                            </span>
                            <button @click="deleteColumn(index)" class="btn btn-secondary btn-sm"> 
                                <i class="fa-solid fa-xmark"></i>
                            </button>
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
        <div v-else>
            <div class="loading">Loading...</div>
        </div>
    </div>
   
</template>

<script setup>
    import '../styles/dashboard.css';
    import { ref } from 'vue';
    import {useColumnStore} from '../store/column';
    import { onMounted } from 'vue';

    const columns = ref([])
    const loading = ref(true);
    let maxColumns = 5;
    const store = useColumnStore();
   
    /*
    let columns = ref([{
        id: 1,
        name: "" 
    }]);
    */

    onMounted(async () => {
      try {
        const fetchedColumns = await store.fetchColumns();
        columns.value = fetchedColumns
        loading.value = false
      } catch (error) {
        console.error(error)
      }
    })


    function addColumn(name){
        columns.value = store.addColumn(name);
    }

    /*
    const addColumn = () => {


        
        let currentIndex = columns.value.length;
        

        if(currentIndex < maxColumns){
            const column = {
                id: currentIndex+1,
                name: ""
            }
            columns.value.push(column)
        }

        console.log("ANTES HAY ESTO: ",store.columns);
        store.fetchColumns()
        console.log("HERE", store.columns[0].name);
        console.log("VALUES", store.columns.value)
        // TODO:  emit an event in addColumn method to notify the parent component when a new column is added and pass the column data.
        // this.$emit('columnAdded', column)
        
    }*/

    function deleteColumn(id) {
        columns.value.splice(id, 1);
        console.log("Eliminado:", columns)
    
    }

</script>

<style>
</style>