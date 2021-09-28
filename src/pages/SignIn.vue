<template>
    <div>
        <b-form @submit.prevent="signIn"
                class="col-md-4 offset-md-4">
            <b-form-input v-model="auth.username"
                          placeholder="Enter username"
                          class="mb-2">
            </b-form-input>
            <b-form-input
                v-model="auth.password"
                type="password"
                placeholder="Enter password"
                class="mb-2">
            </b-form-input>
            <b-button
                type="submit"
                variant="primary">
                Submit
            </b-button>
        </b-form>
    </div>
</template>

<script>
import TokenService from "@/services/TokenService";

export default {
    name: "SignIn",
    data(){
        return {
            auth: {
                username: null,
                password: null,
            }
        }
    },
    created() {

    },
    methods:{
        signIn(){
            TokenService.getToken();
            this.$router.push({name: "dashboard"})
            /*this.$api
                .post("", this.auth)
                .then(res => {
                    TokenService.saveToken(res.data.accessToken);
                    this.$router.push({name: "dashboard"})
                }, () => {
                    alert("Invalid entry data")
                })
                .catch(()=>{
                    alert("Please, try again")
                })*/
        }
    }
}
</script>

<style scoped>

</style>