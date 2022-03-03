<template>
  <div class="wrapper">
    <div class="container">
      <el-form
        label-position="top"
        style="width: 100%"
        :rules="rules"
        :model="ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input class="input" v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="input" v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-button
          :loading="loading"
          style="width: 100%"
          type="primary"
          @click="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Axios from "axios";

export default defineComponent({
  emits: ["success"],
  setup(_, { emit }) {
    const rules = ref({
      email: {
        required: true,
        message: "Please input Activity name",
        trigger: "blur",
      },
      password: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 6,
          max: 12,
          message: "Length should be 6 to 12",
          trigger: "blur",
        },
      ],
    });

    const ruleForm = ref({
      email: "",
      password: "",
    });

    const loading = ref<boolean>(false);

    const handleLogin = () => {
      loading.value = true;
      const eventQuene: ((data: any) => void)[] = [
        (data) => {
          loading.value = false;
          emit("success", data);
        },
      ];
      Axios({
        url: "http://123.57.239.39/api/user/login",
        method: "post",
        data: `email=${ruleForm.value.email}&password=${ruleForm.value.password}`,
      }).then((res) => {
        if (res.data.success) {
          eventQuene.forEach((fn) => {
            setTimeout(() => {
              fn(res.data.data);
            }, 1000);
          });
        }
      });
    };

    return {
      rules,
      loading,
      ruleForm,
      handleLogin,
    };
  },
});
</script>

<style lang="css" scoped>
.wrapper {
  width: 100%;
  padding-top: 20px;
}
</style>
