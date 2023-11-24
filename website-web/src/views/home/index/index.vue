<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import Dynamics from "@/views/home/components/Dynamics.vue";
import CardListHorizontal from "@/views/home/components/CardListHorizontal.vue";
import CardListVertical from "@/views/home/components/CardListVertical.vue";
import HomeFooter from "@/views/home/components/HomeFooter.vue";
import {getBannerDataApi, getCardHorizontalList, getCardVerticalList, getCardScrollList, getFooterList} from "@/api/home";
import {type GetTableRequestData, type GetCardRequestData, type GetFooterRequestData} from "@/api/home/types/home"
import {NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized} from "vue-router";

defineOptions({
  // 命名当前组件
  name: "Home",
});
//动态绑定的ref实例
const container = ref(null)
const cardList = ref(null)
let backBtnShow = ref<boolean>(false)
let bannerInfo = ref<GetTableRequestData>({})
let cardHorizontalInfo = ref<GetCardRequestData>({cardList:[]})
let cardVerticalInfo = ref<GetCardRequestData>({cardList:[]})
let cardScrollInfo = ref<GetCardRequestData>({cardList:[]})
let footerInfo = ref<GetFooterRequestData>({cardList:[]})

onMounted(() => {
  // 进入页面时修改全局的 CSS 变量
  changeVarData()
  getBannerList();
  getCardHorizontalInfo();
  getCardVerticalInfo();
  getCardScrollInfo();
  getFooterInfo();
  container.value.addEventListener('scroll', animateOnScroll);
})
//banner信息
const getBannerList = () => {
  getBannerDataApi().then(res=>{
    if (res.code === 200){
      bannerInfo.value = res.data[0]
    }
  })
}
//水平card信息
const getCardVerticalInfo = () => {
  getCardVerticalList().then(res=>{
    if (res.code === 200){
      cardVerticalInfo.value = res.data
    }
  })
}
//垂直card信息
const getCardHorizontalInfo = () => {
  getCardHorizontalList().then(res=>{
    if (res.code === 200){
      cardHorizontalInfo.value = res.data
    }
  })
}
//滚动card信息
const getCardScrollInfo = () => {
  getCardScrollList().then(res=>{
    if (res.code === 200){
      cardScrollInfo.value = res.data
    }
  })
}
//页脚信息
const getFooterInfo = () => {
  getFooterList().then(res=>{
    if (res.code === 200){
      footerInfo.value = res.data
    }
  })
}
const animateOnScroll = () => {
  cardVerticalInfo.value.cardList.forEach((v,index)=>{
    let offset = cardList.value.$refs.animatedElement[index].offsetTop ?? 0;
    // 获取当前滚动位置
    const scrollPosition = container.value.scrollTop + 600;
    // 检查是否滚动到元素所在的位置
    if (scrollPosition > offset) {
      cardList.value.$refs.animatedElement[index].classList.add('animate__animated', 'animate__fadeInUp', 'opacity-1');
    }
  })
  // 滚动超过banner高度显示回到顶部按钮
  if(container.value.scrollTop > 50){
    resetVarData()
    if (container.value.scrollTop > 509) {
      backBtnShow.value = true
    }else{
      backBtnShow.value = false
    }
  } else {
    changeVarData()
  }
}
const resetVarData = () => {
  document.documentElement.style.setProperty('--v3-header-bg-color', '#FFF');
  document.documentElement.style.setProperty('--el-box-shadow-lighter', '0px 0px 6px rgba(0, 0, 0, 0.12)');
}
const changeVarData = () => {
  document.documentElement.style.setProperty('--v3-appmain-padding-top', 0);
  document.documentElement.style.setProperty('--v3-header-bg-color', 'transparent');
  document.documentElement.style.setProperty('--el-box-shadow-lighter', 'none');
}
const scrollToTOP = () => {
  // 0为滚动到顶部 为了实现平滑效果使用定时器
  const scrollInterval = setInterval(() => {
    container.value.scrollTop -= container.value.scrollTop / 15
    if (container.value.scrollTop == 0) {
      clearInterval(scrollInterval);
    }
  }, 15)
}
onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext)=>{
  document.documentElement.style.setProperty('--v3-appmain-padding-top', '50px');
  resetVarData()
  next()
})
</script>

<template>
  <div class="app-container-home" ref="container">
    <div class="banner-box">
      <picture>
        <img class="banner" :src="bannerInfo?.banner"/>
      </picture>
      <div class="banner-txt">
        <div class="banner-txt-top animate__animated animate__fadeInUp">
          {{ bannerInfo?.mainTitle }}
        </div>
        <div
          class="banner-txt-bottom animate__animated animate__fadeInUp animate__delay-1s"
        >
          {{ bannerInfo?.subTitle }}
        </div>
      </div>
    </div>
    <!--  水平方向的card  -->
    <card-list-horizontal :card-list="cardHorizontalInfo.cardList">
      <template #title>
        <div class="header">
          <h2 class="title">{{cardHorizontalInfo.mainTitle}}</h2>
          <div class="sub-title">{{cardHorizontalInfo.subTitle}}</div>
        </div>
      </template>
    </card-list-horizontal>
    <!--  垂直方向的card  -->
    <card-list-vertical ref="cardList" :card-list="cardVerticalInfo.cardList" />
    <!-- 动态(title使用插槽插入)  -->
    <dynamics :card-list="cardScrollInfo.cardList">
      <template #title>
        <div class="content-title-box"><span class="text"> {{ cardScrollInfo?.mainTitle }}</span></div>
      </template>
    </dynamics>
    <!--  footer部分  -->
    <home-footer :footer-info="footerInfo" />
    <!--  回到顶部按钮  -->
    <div class="show-scroll-button" v-show="backBtnShow" @click="scrollToTOP">
      <SvgIcon class="svg" name="top"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container-home {
  overflow: auto;
  height: calc(100%);
  position: relative;
  .header {
    margin-bottom: 60px;
    text-align: center;

    .title {
      font-size: 36px;
      font-weight: 900;
      text-align: center;
      color: #121127;
      word-break: keep-all;
    }

    .sub-title {
      margin-top: 16px;
      font-size: 20px;
      font-weight: 400;
      line-height: 32px;
      color: #000;
      word-break: keep-all;
    }
  }
  .show-scroll-button {
    position: fixed;
    bottom: 250px;
    right: 20px;
    cursor: pointer;
    height: 35px;
    width: 35px;
    border-radius: 35px;
    background: rgba(0, 0, 0, .05);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.5s ease;

    .svg {
      font-size: 19px;
      color: #333;
    }

    &:hover {
      width: 85px;
      background: rgba(213, 6, 6, 1);
      color: #FFF;
      border-radius: 35px 0 0 35px;

      .svg {
        color: #FFFFFF;
      }

      &:after {
        content: "回顶部";
        font-size: 12px;
        margin-left: 3px;
      }
    }
  }

  .banner-box {
    position: relative;
    width: 100%;
    overflow: hidden;

    picture {
      img {
        animation: banner_frames 18s ease 1 forwards;
      }
    }

    .banner {
      max-height: 500px;
      width: 100%;
    }

    .banner-txt {
      text-align: center;
      position: absolute;
      top: 55%;
      z-index: 9;
      transform: translateY(-50%);
      width: 100%;

      .banner-txt-top {
        font-size: 55px;
        width: 100%;
        font-weight: bold;
        text-align: center;
        left: 0;
        color: #fff;
      }

      .banner-txt-bottom {
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        margin-top: 35px;
      }
    }
  }

  .content-title-box {
    max-width: 1200px;
    margin: 45px auto 0;
    line-height: 90px;
    border-bottom: 1px solid #d6dbe3;
    position: relative;
    font-weight: 700;
    font-size: 32px;
    text-align: center;

    .text {
      position: relative;
      z-index: 1;
      height: 100%;
      display: inline-block;

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background-color: rgba(213, 6, 6, 1);
        transition: width 0.5s ease;
      }

      &:hover:before {
        width: 100%;
      }
    }
  }
}

@keyframes banner_frames {
  to {
    transform: scale(1);
  }
  from {
    transform: scale(1.24);
  }
}


</style>
