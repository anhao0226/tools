<template>
  <el-scrollbar height="500px">
    <div class="container">
      <ul class="book-wrap">
        <li
          v-for="(activity, index) in list"
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
              <span @click="removeBook(index)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-042ca774=""
                >
                  <path
                    fill="#909399"
                    d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["list"],
  setup(props, _) {
    const toNewPage = (index: number) => {
      /* eslint-disable no-undef */
      chrome.tabs.create({ url: props.list[index].url });
    };

    const removeBook = (index: number) => {
      alert(JSON.stringify(props.list[index]));
    };

    return {
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
