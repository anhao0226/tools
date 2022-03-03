<template>
  <div class="container">
    <el-tabs type="card" class="demo-tabs">
      <!--  -->
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="vertical-align: middle"><tools-switch /></el-icon>
            <span style="padding-left: 3px">翻译</span>
          </span>
        </template>
        <translate></translate>
      </el-tab-pane>
      <!--  -->
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="vertical-align: middle"
              ><tools-collection-tag
            /></el-icon>
            <span style="padding-left: 3px">书签</span>
          </span>
        </template>
        <books :list="bookmarks"></books>
      </el-tab-pane>
      <!--  -->
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="vertical-align: middle"
              ><tools-operation
            /></el-icon>
            <span style="padding-left: 3px">设置</span>
          </span>
        </template>
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="单词列表">
        <words :list="activities"></words>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import Axios from "axios";
import Books from "./Books.vue";
import Words from "./Default.vue";
import Setting from "./Setting.vue";
import Translate from "./Translate.vue";

export default defineComponent({
  components: {
    Books,
    Words,
    Setting,
    Translate,
  },
  setup() {
    const bookmarks = ref<any[]>([]);
    const activities = ref<any[]>([]);
    const history = ref<any[]>([]);

    const formatDate = (value: string | Date | number) => {
      const o = new Date(value);
      const year = o.getFullYear();
      const month = o.getMonth() + 1;
      const day = o.getDate();
      return `${year}-${month}-${day}`;
    };

    const fetchBooksList = () => {
      // console.log(chrome.storage)
      /* eslint-disable no-undef */
      chrome.storage.local.get({ userinfo: {} }, (items) => {
        const { userinfo } = items;
        Axios({
          url: "http://123.57.239.39/api/user/collect",
          params: {
            user: userinfo.uid,
          },
        }).then((result) => {
          result.data.data.forEach((element: any) => {
            switch (element.type) {
              case 1:
                {
                  const info = element.text.split(",");
                  bookmarks.value.push({
                    url: info[0],
                    domain: info[0].split("/")[2],
                    icon: info[1],
                    title: element.content,
                    timestamp: formatDate(parseInt(element.timestamp)),
                    uuid: element.uuid,
                  });
                }
                break;
              case 0:
                activities.value.push({
                  ...element,
                  result: element.text,
                  timestamp: formatDate(parseInt(element.timestamp)),
                  uuid: element.uuid,
                });
                break;
              default:
            }
          });

          console.log(history);
        });
      });
    };

    onMounted(() => {
      fetchBooksList();
    });

    return {
      bookmarks,
      activities,
      history,
    };
  },
});
</script>

<style>
#app {
  padding: 10px;
}
</style>
