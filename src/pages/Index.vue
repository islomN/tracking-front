<template>
    <div class="col-md-10 offset-1">
        <b-tabs content-class="mt-3">
            <b-tab title="By request" active>
                <by-request-report></by-request-report>
            </b-tab>
            <b-tab title="By country">
                <by-country-report></by-country-report>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import ByRequestReport from "@/components/ByRequestReport";
import ByCountryReport from "@/components/ByCountryReport";
export default {
    name: "Index",
    components:{
        "by-request-report": ByRequestReport,
        "by-country-report": ByCountryReport
    }
}
</script>

<style scoped>

</style>