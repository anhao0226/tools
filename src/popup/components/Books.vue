<template>
  <el-scrollbar height="500px">
    <div class="container">
      <ul class="book-wrap">
        <li
          v-for="(activity, index) in bookmarks"
          :key="index"
          @click="toNewPage(index)"
        >
          <div class="content">
            <!--  -->
            <div class="item icon">
              <img :src="activity.icon" alt="" />
            </div>
            <!--  -->
            <div class="item books">
              <div>
                <span class="title">
                  {{ activity.title }}
                </span>
                <span class="details">
                  {{ activity.domain }}
                  <span>-</span>
                  <span>{{ activity.timestamp }}</span>
                </span>
              </div>
            </div>
            <!--  -->
            <div class="item op">
              <span @click.stop="removeBook(index)">
                <el-icon><tools-close /></el-icon>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, toRef } from "vue";
import { removeBookmarks } from "@/utils/http";

export default defineComponent({
  props: ["list"],
  setup(props, _) {
    const bookmarks = toRef(props, "list");

    const toNewPage = (index: number) => {
      /* eslint-disable no-undef */
      chrome.tabs.create({ url: bookmarks.value[index].url });
    };

    const removeBook = (index: number) => {
      console.log(bookmarks.value[index]);
      removeBookmarks({
        data: {
          uid: bookmarks.value[index].uuid,
        },
        success(res) {
          if (res.success) {
            /* eslint-disable no-undef */
            chrome.notifications.create(
              "",
              {
                iconUrl: "./../icon.png",
                message: "删除书签成功",
                type: "basic",
                title: "提示",
              },
              (res) => {
                console.log(res);
              }
            );
            bookmarks.value.splice(index, 1);
          }
        },
      });
    };

    return {
      bookmarks,
      toNewPage,
      removeBook,
    };
  },
});
</script>

<style lang="css" scoped>
.book-wrap li {
  position: relative;
  height: 60px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.book-wrap li:hover {
  background-color: #ebeef5;
}

.book-wrap li:hover .books {
  width: 200px;
}

.book-wrap li:hover .op {
  width: 60px;
}

.item {
  display: inline-block;
  vertical-align: middle;
  height: 60px;
}

.content {
  width: 100%;
}

.content .icon {
  width: 40px;
  height: inherit;
  text-align: center;
  /* background-color: blueviolet; */
}

.content .icon img {
  width: 20px;
  margin: auto;
}

.content .books {
  width: 260px;
  font-size: 1rem;
}

.content .books div {
  width: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.content .books .title {
  white-space: nowrap;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  /* background-color: chocolate; */
  color: #303133;
  padding: 12px 0 6px 0;
}

.content .books .details {
  color: #909399;
  font-size: 0.72rem;
}

.content .op {
  width: 0;
  height: 60px;
  /* background-color: cornflowerblue; */
  line-height: 60px;
  text-align: center;
}

.content .op span {
  display: inline-block;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 24px;
  border-radius: 15px;
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.content .op span:hover {
  background-color: #dcdfe6;
}
</style>
