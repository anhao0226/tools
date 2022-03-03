<template>
  <el-scrollbar height="500px">
    <div class="container">
      <ul class="list-wrap">
        <li v-for="(activity, index) in list" :key="index">
          <div class="text">
            <span>
              {{ activity.content }}
            </span>
            <div class="details">
              <p>{{ activity.result }}</p>
              <p>{{ activity.timestamp }}</p>
            </div>
          </div>
          <div class="content" @click="removeItem(index)">
            <svg
              class="icon"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774=""
            >
              <path
                fill="#FFFFFF"
                d="M352 480h320a32 32 0 110 64H352a32 32 0 010-64z"
              ></path>
              <path
                fill="#FFFFFF"
                d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
              ></path>
            </svg>
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
  setup() {
    const removeItem = (index: number) => {
      // TODO
    };
    return {
      removeItem,
    };
  },
});
</script>

<style lang="css" scoped>
.list-wrap li {
  border-bottom: 1px solid #eee;
}
.text span {
  color: #303133;
}
.text .details {
  color: #606266;
}
.text .details p:last-child {
  font-size: 0.8rem;
  padding: 4px 0;
  color: #909399;
}


.list-wrap,
.book-wrap li {
    width: 300px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.text,
.content {
    display: inline-block;
    height: 60px;
    vertical-align: top;
}

.text {
    display: inline-flex;
    flex-direction: row;
    width: calc(100% - 20px);
    justify-content: space-between;
    align-items: center;
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    padding: 0 10px;
    /* background-color: brown; */
}

.text span {
    font-size: 1.3rem;
    font-weight: 600;
}

.text div p:first-child {
    font-size: 1rem;
}

.content {
    width: 0;
    background-color: #f56c6c;
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-align: center;
    line-height: 70px;
}

.content .icon {
    display: inline-block;
}

.list-wrap li:hover .text {
    width: calc(80% - 20px);
    background-color: #f2f6fc;
}

.list-wrap li:hover .content {
    width: 20%;
}

.setting-wrap li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    width: calc(100% - 20px);
    padding: 0 10px;
}
</style>