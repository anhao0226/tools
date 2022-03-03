<template>
  <div class="container">
    <div class="wrapper">
      <el-form class="demo-form-inline" label-position="top">
        <el-form-item>
          <template #label>
            <div class="label-wrap">
              <span>内容</span>
              <span>{{ from }}</span>
            </div>
          </template>
          <el-input type="textarea" :rows="6" v-model="text"></el-input>
        </el-form-item>
        <el-form-item label="Result">
          <template #label>
            <div class="label-wrap">
              <span>结果</span>
              <el-select
                size="small"
                style="width: 100px"
                v-model="to"
                placeholder="Select"
                @change="changeLanguage"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
          </template>
          <el-input type="textarea" :rows="6" v-model="result"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";



export default defineComponent({
  setup() {
    const options = [
      {
        value: "zh",
        label: "中文",
      },
      {
        value: "en",
        label: "英语",
      },
      {
        value: "jp",
        label: "日语",
      },
      {
        value: "kor",
        label: "韩语",
      },
    ];

    const text = ref("");
    const result = ref("");
    const to = ref("zh");
    const from = ref("zh");

    /* eslint-disable no-undef */
    const bg = chrome.extension.getBackgroundPage() as any;

    const fetchTranslateResult = (text: string) => {

      chrome.extension.getBackgroundPage()
      /* eslint-disable no-undef */
      bg.getTranslateResult(
        { params: { from: from.value, to: to.value, q: text } },
        (res: any) => {
          console.log(res);
          if (res.trans_result && res.trans_result.length > 0) {
            result.value = res.trans_result[0].dst;
          }
        }
      );
    };

    const changeLanguage = (value: string) => {
      to.value = value;
      fetchTranslateResult(text.value);
    };

    watch(text, async (value) => {
      /* eslint-disable no-undef */
      const language = await bg.getLanguage({ params: { q: value } });
      console.log(language);
      if (language.error_code === 0) {
        from.value = language.data.src;
      }
      switch (from.value) {
        case "en":
          to.value = "zh";
          break;
        case "zh":
          to.value = "en";
          break;
        default:
          to.value = "zh";
      }
      fetchTranslateResult(value);
    });

    return {
      to,
      from,
      text,
      result,
      options,
      changeLanguage,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  /* background-color: brown; */
  width: 100%;
}
.wrapper {
  padding: 20px 10px;
}

.label-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.el-form-item__label {
  padding: 0;
}
</style>
