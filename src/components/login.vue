<template>
<div style="position: absolute;z-index: 999;width:100%;height:100%;">
  <img class="bg" src="@/assets/images/bg.jpg" style="width: 100%; height:100%;position:absolute;z-index:-1;left:0;top:0">
  <img class="logo" src="../assets/images/logo.svg">
  <div class="loginContent">
    <div class="user">
      <span>用户登录 / User login</span>
    </div>
    <form class="input">
      <div class="userName">
        <i class="icon-yonghu"></i>
        <input type="text" id="userName" v-model="username" placeholder="请输入用户名" name="username">
      </div>
      <div class="password">
        <i class="icon-mima"></i>
        <input type="password" id="password" v-model="password" name="password" @keyup.enter="login" placeholder="请输入密码">
      </div>
      <div class="errortip">
          <p>{{errormessage}}</p>
      </div>
    </form>
    <div class="login">
        <span class="save" @click="login()">登陆</span>
    </div>

  </div>
</div>
</template>

<script>
  export default {
    data(){
      return{
        username:"",
        password:"",
        errormessage: ""
      }
    },
    methods:{
      login(){
        let _this = this
        console.log(this.username)
        this.postRequest('/login', {
          username: this.username,
          password: this.password
        }).then(resp=> {
          // _this.loading = false;
          if (resp && resp.data.status == 'success' ) {
            var data = resp.data;
            _this.$store.commit('login',data.msg);
            var path = _this.$route.query.redirect;
            _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
          }else{
            this.errormessage = resp.data.msg
          }
        });
      }
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.errortip{
  font-size:10px;
  color:#f00
}
</style>

