<script setup lang="ts">
import {defineProps, toRefs} from "vue";
import {GetFooterRequestData} from "@/api/home/types/home";

const props = defineProps({
  footerInfo: {
    type: Object as () => GetFooterRequestData,
    required: true,
  },
})
const {footerInfo} = toRefs(props)
</script>

<template>
  <footer class="home-footer">
    <div class="footer-content">
      <img class="logo" src="@/assets/layouts/logo-text-2.png">
      <div class="contact-line"></div>
      <div class="contact">
        <div class="contact-item us">联系我们</div>
        <div class="contact-item mb8">
          <span>客服电话：</span>
          <span>{{footerInfo?.tel}}</span>
        </div>
        <div class="contact-item mb8">
          <span>客服邮箱：</span>
          <span>{{footerInfo?.email}}</span>
        </div>
        <div class="contact-item">为获得最佳的浏览效果，建议分辨率为 1920*1080，浏览器推荐使用 Chrome(谷歌)</div>
      </div>
      <div class="fLink">
        <div class="flink-item link">友情链接</div>
        <div class="link-box">
          <a class="item-link" v-for="(item,index) in footerInfo.cardList" :href="item.path" target="_blank" :key="index">{{item.name}}</a>
        </div>

      </div>
    </div>
    <div class="footer-record">
      上海XX数据科技有限公司©2020 Vite<a href="http://beian.miit.gov.cn/" style="color: inherit;text-decoration: none;" target="_blank"> 沪ICP备12345678号</a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.home-footer {
  background-color: #262629;
  padding: 0;
  .footer-content {
    display: flex;
    margin: 0 auto;
    padding: 40px 0;
    max-width: 1200px;
    width: auto;
    .logo {
      width: 155px;
      height: 70px;
      align-self: center;
    }
    .contact-line {
      width: 1px;
      height: 60px;
      border-right: 1px dashed #4f4f55;
      margin: 5px 40px 0;
      align-self: center;
    }
    .contact {
      width: 500px;
      color: #95959e;
      font-size: 12px;
      margin-bottom: 0;
      .us {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 12px;
        margin-top: 8px;
        color: #fff;
      }
      .mb8 {
        margin-bottom: 8px;
      }
    }
    .fLink {
      width: auto;
      margin-left: 0;
      flex: 1;
      .link {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 12px;
        margin-top: 8px;
        color: #fff;
      }
      .link-box {
        display: flex;
        flex-wrap: wrap;
        .item-link {
          display: block;
          margin-right: 50px;
          font-size: 12px;
          text-decoration: none;
          margin-bottom: 8px;
          color: #95959e;
        }
      }
    }
  }
  .footer-record {
    color: #6a6a72;
    font-size: 12px;
    border-top: 1px solid #4f4f55;
    line-height: 40px;
    text-align: center;
  }
}
</style>
