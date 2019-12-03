<template>
  <v-list>
    <ul>
      <li v-for="v in list" :key="v.nickname">
        <span>{{v.nickname}}</span>
        <v-icon @click="onRemoveFllow" :nickname="v.nickname" style="cursor:pointer">mdi-minus-circle-outline</v-icon>
      </li>
    </ul>
  </v-list>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: false,
    },
    type: {
      type: String,
      required: true,
    }
  },
  methods: {
    onRemoveFllow(e){
      if( confirm('삭제 하시겠습니까?') ){
        const nickname = e.currentTarget.getAttribute('nickname');
        this.$store.dispatch('users/removeFollow', {
          nickname: nickname,
          type: this.$props.type,
        });
      }
    }
  }
}
</script>

<style>

</style>