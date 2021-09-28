<template>
    <div>
        <b-form class="m-2" @submit.prevent="search">
            <b-form-select
                v-model="filter.os"
                :options="operationSystems"
                class="col-md-3 offset-1"
            >
            </b-form-select>
            <b-button
                type="submit"
                variant="primary"
                class="col-md-2 offset-1"
            >
                Search
            </b-button>
        </b-form>
        <b-table striped :items="items">
            <template #cell(date)="data">
                {{ $moment(data.date).format("YYYY-MM-DD hh:mm:ss")}}
            </template>
        </b-table>
        <pagination
            v-if="items.length > filter.count"
            :page="filter.page"
            :limit="filter.count"
            :count-items="filter.countItems"
            :key="filter.countItems"
            :set-page="setPage"
        ></pagination>
    </div>
</template>

<script>
import Pagination from "../components/Pagination";

export default {
    name: "ByRequestReport",
    components:{
        "pagination": Pagination
    },
    data(){
        return {
            items: [],
            operationSystems: [
                {value: null, text: "All"},
            ],
            filter:{
                os: null,
                count: 1,
                countItems: 0,
                page: 1
            },
        }
    },
    created() {
        this.getOperationSystems();
        this.getReport();
    },
    methods:{
        getOperationSystems(){
            this.$api.get("operation-systems")
            .then(res => {
                this.operationSystems = [{value: null, text: "All"}];
                if(res.data != null){
                    this.operationSystems = this.operationSystems.concat(res.data.map((item) => {
                        console.log(item)
                        return {value: item.id, text: item.name}
                    }))
                }
            })
        },
        getReport(){
            this.$api.get("report/by-request", {params: {os: this.filter.os, page: this.filter.page}})
            .then(res => {
                console.log(res.data)
                this.items = res.data.items;
                this.filter.countItems = res.data.count;
            })
        },
        setPage(page){
            this.filter.page = page;
            this.getReport();
        },
        search(){
            this.filter.page = 1;
            this.getReport();
        }
    }
}
</script>

<style scoped>

</style>