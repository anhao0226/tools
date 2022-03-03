<template>
  <div class="container">
    <ul class="setting-wrap">
      <li>
        <span>同步</span>
        <el-icon><tools-refresh-right /></el-icon>
      </li>
      <li>
        <span>邮箱</span>
        <span>{{ email }} </span>
      </li>
    </ul>

    <div :class="['login_wrap', loginPageState ? 'login_wrap_open' : '']">
      <div class="login_content">
        <div class="op" @click="openLoginPage(false)">
          <el-icon :size="20"><tools-arrow-down /></el-icon>
        </div>
        <login @success="handleLogin"></login>
      </div>
    </div>

    <div class="bottom">
      <el-button v-if="!loginState" style="width: 100%" @click="openLoginPage(true)"
        >登录</el-button
      >
      <el-button type="danger" v-else style="width: 100%" @click="openLoginPage(true)"
        >切换</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Login from "./Login.vue";

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const email = ref<string>("2919099739@qq.com");
    const loginPageState = ref<boolean>(false);
    const loginState = ref<boolean>(true);

    onMounted(() => {
      /* eslint-disable no-undef */
      chrome.storage.local.get({ userinfo: {} }, (items) => {
        email.value = items.userinfo.email || "";
        loginState.value = true;
      });
    });

    const openLoginPage = (state: boolean) => {
      loginPageState.value = state;
    };

    const handleLogin = (userinfo: any) => {
      loginPageState.value = false;
      email.value = userinfo.email;
      console.log(userinfo);
      loginState.value = true;
      /* eslint-disable no-undef */
      chrome.storage.local.set({ userinfo }, () => {
        console.log("save success !!!");
      });
    };

    return {
      email,
      loginState,
      loginPageState,
      handleLogin,
      openLoginPage,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  position: relative;
  height: 500px;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: calc(100% - 8px);
  padding: 4px 4px;
  z-index: 1000;
}

.setting-wrap li {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.setting-wrap li span:first-child {
  color: #303133;
  font-size: 0.92rem;
}

.setting-wrap li span:last-child {
  color: #606266;
  font-size: 0.92rem;
}

.login_wrap {
  height: 0px;
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: absolute;
  bottom: 0;
  background-color: #fff;
  z-index: 1001;
}

.login_content {
  position: relative;
  padding: 10px 0;
}

.login_content .op {
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background-color: #f2f6fc;
}

.login_wrap_open {
  height: 270px;
  /* height: 400px; */
}
</style>