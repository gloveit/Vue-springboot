<template>
  <Layout style="background: none;">
      <Content class="content">
        <Header></Header>
          <Gas></Gas>
      </Content>
  </Layout>
</template>

<script>
  import Header from "./Header.vue"
  import Gas  from "./Gas.vue"
  import '../assets/common.css'
  export default {
    components: {
      Header,
      Gas
    }
  }
</script>

<style>
.content{
  width:100%;
    height:calc(100% - 80px);
    padding:10px 40px 10px 40px;
    color:#fff;
    left:0;
    top:70px;
    background: transparent
}
</style>
