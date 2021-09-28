<template>
    <div>
        <b-table striped hover :items="items"></b-table>
        <pagination
            v-if="items.length > 0"
            :page="filter.page"
            :limit="filter.count"
            :count-items="filter.countItems"
            :key="filter.countItems"
            :set-page="setPage"
        ></pagination>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
    name: "ByCountryReport",
    components:{
        "pagination": Pagination,
    },
    data(){
        return {
            items: [],
            filter:{
                count: 20,
                countItems: 0,
                page: 1
            },
        }
    },
    created() {
        this.getReport();
    },
    methods:{
        getReport() {
            this.$api.get("report/by-country", {params: {page: this.filter.page}})
            .then(res => {

                this.items = res.data.items;
                this.filter.countItems = res.data.count;
            })
        },
        setPage(page){
            this.filter.page = page;
            this.getReport();
        },
    }
}
</script>

<style scoped>

</style>