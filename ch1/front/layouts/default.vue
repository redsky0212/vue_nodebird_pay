<template>
    <v-app>
        <div>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">Nodebird</nuxt-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{display:'flex', alignItems:'center'}"></v-text-field>
                    <v-btn nuxt to="/profile" :style="{display:'flex', alignItems:'center'}"><div>프로필</div></v-btn>
                    <v-btn nuxt to="/signup" :style="{display:'flex', alignItems:'center'}"><div>회원가입</div></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </div>
        <nuxt />
    </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>