<script setup lang="ts">
import {defineProps, toRefs} from "vue";
interface CardInfo {
  titleFirst: string
  titleSecond: string
  imgUrl: string
}
const props = defineProps({
  cardList: {
    type: Array as () => Array<CardInfo>,
    required: true,
  },
})
const {cardList} = toRefs(props)
// const emits = defineEmits([
//   'scrollListen',
// ]);

// watch(cardList, () => {
//   emits("scrollListen")
// })
</script>

<template>
  <section class="left-right-box" v-for="(item,index) in cardList" :key="index">
    <div class="text-box" :class="{'image-in-front': index % 2 === 1}" ref="animatedElement">
      <div class="title">{{item.titleFirst}}</div>
      <ul style="padding: 0px;">
        <li class="desc" style="list-style-type: none;"><strong></strong>{{item.titleSecond}}</li>
      </ul>
    </div>
    <div class="img-box">
      <div class="media">
        <div class="video-wrap" style="width: 100%; height: auto;">
        </div>
        <img
          :src="item.imgUrl"
          loading="lazy"
          style="border-radius: 16px; box-shadow: 0px 0px; width: 100%; height: auto;"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.left-right-box{
  max-width: 1200px;
  padding: 60px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  ul>li {
    list-style: disc;
  }
  .text-box {
    width: 480px;
    opacity: 0;
    &.opacity-1{
      opacity: 1;
    }
    &.image-in-front {
      order: 10;
    }
    .title {
      line-height: 48px;
      padding-bottom: 24px;
      font-weight: 700;
      font-size: 32px;
    }
    .desc {
      line-height: 32px;
      font-weight: 350;
      font-size: 18px;
      margin-bottom: 24px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .img-box {
    width: 480px;
    height: 480px;
  }
}
</style>
