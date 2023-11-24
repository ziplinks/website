<script setup lang="ts">
import {ref, reactive, computed, onMounted} from "vue";
import {ElMessage, type FormInstance, type FormRules, ElMessageBox} from "element-plus";
import {getToken} from "@/utils/cache/cookies";
import {createFooter, getFooterInfo, updateFooterDataApi} from "@/api/home";

const loading = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
let formRules: FormRules = reactive({
  cardList: [
    {required: true, trigger: 'blur', message: '请添加友情链接并完整填写'}
  ]
})
let formData = reactive({
  _id: "",
  tel: "",
  email: "",
  cardList:[]
})
const token = computed(()=>{
  return getToken()
})

onMounted(()=>{
  getFooterInfo().then(res=>{
    if (res.code === 200 && res.data) {
      let data = res.data
      formData._id = data._id;
      formData.tel = data.tel;
      formData.email = data.email;
      formData.cardList = data.cardList
    }
  })
})

//清空
const clearAll = () => {
  ElMessageBox.confirm(
    '确定要清空全部内容？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      formData.tel = ""
      formData.email = ""
      formData.cardList = []
      ElMessage({
        type: 'success',
        message: '清空成功',
      })
    })
}
//保存
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      let tag =  formData.cardList.some(v=>{
        return !v.name || !v.path
      })
      if(tag){
        ElMessage.error('友情链接列表请完整填写')
        return;
      }
      if (!formData._id) {
        delete formData._id
        createFooter(formData)
          .then(() => {
            ElMessage.success("新增成功")
          })
      } else {
        updateFooterDataApi(formData)
          .then(() => {
            ElMessage.success("修改成功")
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const addRow = ()=> {
  const row = {
    path: "",
    name:""
  }
  formData.cardList.push(row)
}
const handleDelete = (row,index)=> {
  formData.cardList.splice(index,1)
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <div class="title-txt">联系我们</div>
        <el-form-item prop="mainTitle" label="客服电话">
          <el-input v-model="formData.tel" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="mainTitle" label="客服邮箱">
          <el-input v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <div class="title-txt">友情链接</div>
        <el-form-item  prop="cardList" label="链接列表">
          <div class="table-wrapper">
            <el-table :data="formData.cardList">
              <el-table-column prop="desc" label="网站名称" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.name" placeholder="请输入网站名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="path" label="跳转地址" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.path" placeholder="请输入跳转地址"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" align="center">
                <template #default="scope">
                  <el-button type="danger" text bg size="small" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRow">增加一行</el-button>
        </el-form-item>
      </el-form>
      <div class="btns-box">
        <el-button @click="clearAll">清空</el-button>
        <el-button type="primary" @click="handleCreate">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.title-txt {
  background-color: #409eff;
  color: #fff;
  width: 100px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
  position: relative;

  &::after {
    display: inline-block;
    content: " ";
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-left-color: #409eff;
    position: absolute;
    top: 0;
    left: 100px;
  }
}
.table-wrapper {
  margin-bottom: 20px;
  width: 100%;
}
.btns-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>
