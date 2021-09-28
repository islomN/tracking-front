<template>

	<div class="d-flex justify-content-between align-items-center">
		<nav aria-label="Page navigation example">
			<ul class="pagination mb-0">
				<li class="page-item" v-if="page > 1">
					<a class="page-link" href="#" aria-label="Previous" @click="setPage(page-1)">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>

				<li class="page-item" v-if="page < countPages">
					<a class="page-link" href="#" aria-label="Next" @click="setPage(page+1)">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
    export default {
        name: "Pagination",

		props:{
			limit: {
				type: Number,
				default: 10
			},
			page: {
				type: Number
			},
			countItems:{
				type: Number
			},
			setPage: {
				type: Function,
				default: ()=>{
				}
			}
		},
		data(){
			return {
				pages:[],
				countPages: 0,
				paginationElem: 5,
				startPageElem:1,
                finishPageElem: 1
			}
		},
		mounted(){
			this.calculate();
		},
		methods:{
			calculate(){
                this.pages = [];
				let paginationElem = this.paginationElem-1;
				this.countPages = Math.ceil(this.countItems / (this.limit ));
				let maxElem = this.page + paginationElem;
				let startElem = this.page;

				if(maxElem > this.countPages){
					maxElem = this.countPages;
					startElem = this.countPages - paginationElem;
				}

				if(startElem < 1){
					startElem =1;
				}

				for(let i=startElem; i<=maxElem; i++){
					this.pages.push(i);
				}

				this.startPageElem = (this.page - 1) * this.limit +1;

				this.finishPageElem = this.startPageElem - 1 + this.limit;

				if(this.finishPageElem > this.countItems){
					this.finishPageElem = this.countItems;
				}
			},

		}
    }
</script>

<style scoped>

</style>