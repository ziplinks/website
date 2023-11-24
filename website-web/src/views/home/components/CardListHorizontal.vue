<script setup lang="ts">
import {ref, defineProps, toRefs, watch, nextTick} from "vue";

const cardLeft = ref(null);
const cardRight = ref(null);

interface CardInfo {
  titleFirst: string
  titleFirstHighlight: string
  titleSecond: string
  titleSecondHighlight: string
  color?: string
  imgUrl: string
  desc: string
}

const props = defineProps({
  cardList: {
    type: Array as () => Array<CardInfo>,
    required: true,
  },
})
const {cardList} = toRefs(props)
watch(cardList, () => {
  nextTick(() => {
    /** 其实这里有个问题是需要注意的，
     * 动态新建的DOM,使用cardLeft.value取值却是一个 Proxy 对象，
     * 但是如果是静态DOM,使用cardLeft.value取值是一个 DOM 元素对象*/
    cardLeft.value?.forEach(v => {
      v.addEventListener('mouseover', handleClick);
    })
    cardRight.value?.forEach(v => {
      v.addEventListener('mouseover', handleClick);
    })
  })
})
//移除animation.css设置的默认动画，不然会引发和自定义的动画冲突
const handleClick = () => {
  cardLeft.value?.forEach(v => {
    v.classList.remove('animate__animated');
  })
  cardRight.value?.forEach(v => {
    v.classList.remove('animate__animated');
  })
}
</script>

<template>
  <div class="unique-spot-light">
    <slot name="title"></slot>
    <div class="content">
      <template v-for="(item,index) in cardList" :key="index">
        <div class="spot-light-card"
             :class="{'animate__animated animate__fadeInLeft': index % 3 === 0,'animate__animated animate__fadeInRight': index % 3 === 2}"
             :ref="index % 3 === 0 ? 'cardLeft' : index % 3 === 2 ? 'cardRight' : ''">
          <div class="spot-light-card__top">
            <img alt="" class="top-img" :src="item.imgUrl"/>
          </div>
          <div class="spot-light-card__bottom">
            <div class="card-title">
              <span style="">{{ item.titleFirst }}</span
              ><span class="ml4" :style="{color: item.color}">{{ item.titleFirstHighlight }}</span
            ><span style=""><br/></span><span style="">{{ item.titleSecond }}</span
            ><span class="ml4" :style="{color: item.color}">{{ item.titleSecondHighlight }}</span>
            </div>
            <div class="card-content" v-html="item.desc"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes spot_light_card_hover {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.unique-spot-light {
  max-width: 1200px;
  margin: 60px auto 0;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;

    .spot-light-card {
      display: flex;
      flex-direction: column;
      width: 384px;
      height: 560px;
      border-radius: 16px;
      overflow: hidden;
      background: #fafafc;

      .ml4 {
        margin-left: 4px;
      }

      .spot-light-card__top {
        height: 330px;

        .top-img {
          width: 100%;
        }
      }

      .spot-light-card__bottom {
        flex: 1;
        padding: 32px 24px 34px;

        .card-title {
          font-size: 26px;
          font-weight: 900;
          line-height: 40px;
          color: #1a1a1a;
        }

        .card-content {
          margin-top: 16px;
          font-size: 18px;
          font-weight: 400;
          line-height: 34px;
        }
      }

      &:hover {
        animation: spot_light_card_hover .3s ease 1 forwards;
      }
    }
  }
}
</style>
