<script setup lang="ts">
import {onMounted, onUnmounted, ref,defineProps, toRefs, watch} from "vue";

defineOptions({
  // 命名当前组件
  name: "Dynamics",
});
let timer = ref(null)
let wrapper = ref(null)
let marquee = ref(null)
interface CardInfo {
  desc: string
  path: string
  imgUrl: string
}
const props = defineProps({
  cardList: {
    type: Array as () => Array<CardInfo>,
    required: true,
  },
})
const {cardList} = toRefs(props)

watch(cardList, () => {
  init()
})
const init = () => {
  if (cardList.value.length > 4 && !timer.value) {
    timer.value = setInterval(() => {
      move();
    }, 15);
  }
}
const move = () => {
  let curLeft = wrapper?.value.scrollLeft;
  //父盒子总宽度除以2
  let scrollWidth = marquee?.value.scrollWidth / 2 + 20;
  wrapper.value.scrollLeft = curLeft + 1;
  if (curLeft > scrollWidth) {
    wrapper.value.scrollLeft = 0;
  }
}

const mouseover = () => {
  clearInterval(timer.value);
  timer.value = null;
}
const mouseout = () => {
  init();
}
const toPath = () => {

}
onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
})
</script>

<template>
  <div>
    <slot name="title"></slot>
    <div class="dynamics-warp-box" ref="wrapper">
      <div
        class="marquee-box"
        ref="marquee"
        @mouseover="mouseover"
        @mouseout="mouseout"
      >
        <!-- 滚动内容 -->
        <div class="img-box" v-for="(item, index) in cardList" :key="index">
          <div class="img-content" :class="{'cur-p': item.path}" @click="toPath(item)">
            <img class="img" :src="item.imgUrl"/>
          </div>
          <div class="title">{{ item.desc }}</div>
        </div>
        <!-- 滚动内容（复制） -->
        <div class="img-box" v-for="(item, index) in cardList" v-if="cardList.length > 4" :key="index + 100">
          <div class="img-content" :class="{'cur-p': item.path}" @click="toPath(item)">
            <img class="img" :src="item.imgUrl"/>
          </div>
          <div class="title">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.dynamics-warp-box {
  max-width: 1200px;
  margin: 60px auto;
  height: 210px;
  overflow: hidden;
  position: relative;

  .marquee-box {
    display: flex;

    .img-box {
      margin-right: 40px;

      .img-content {
        width: 270px;
        height: 146px;
        background: #d3d6e4;
        position: relative;
        border-radius: 6px 6px 0px 0px;

        &.cur-p {
          cursor: pointer;
        }

        .img {
          width: 264px;
          height: 140px;
          margin: 3px;
          border-radius: 6px 6px 0px 0px;
        }
      }

      .title {
        width: 270px;
        height: 50px;
        background: #ffffff;
        border-radius: 0px 0px 6px 6px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        margin-top: -2px;
      }
    }
  }
}
</style>
