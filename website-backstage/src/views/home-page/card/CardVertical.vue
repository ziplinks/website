<script setup lang="ts">
import {ref, reactive, computed, onMounted} from "vue";
import {ElMessage, type FormInstance, type FormRules, ElMessageBox} from "element-plus";
import {getToken} from "@/utils/cache/cookies";
import {createVerticalCard, getCardVerticalList, updateCardVerticalDataApi} from "@/api/home";

const loading = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
let formRules: FormRules = reactive({
  cardList: [
    {required: true, trigger: 'blur', message: '请添加card并完整填写'}
  ]
})
let formData = reactive({
  _id: "",
  cardList:[]
})
const uploadUrl = ref(import.meta.env.VITE_BASE_API+'/upload/card')
const token = computed(()=>{
  return getToken()
})

onMounted(()=>{
  getCardVerticalList().then(res=>{
    if (res.code === 200 && res.data) {
      let data = res.data
      formData._id = data._id;
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
        return !v.imgUrl || !v.titleFirst || !v.titleSecond
      })
      if(tag){
        ElMessage.error('card列表请完整填写')
        return;
      }
      console.log(formData)
      if (!formData._id) {
        delete formData._id
        createVerticalCard(formData)
          .then(() => {
            ElMessage.success("新增成功")
          })
      } else {
        updateCardVerticalDataApi(formData)
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
  //最多新建6条数据
  if (formData.cardList.length === 6){
    ElMessage.error('最多新建6条数据')
    return;
  }
  const row = {
    imgUrl: "",
    titleFirst: "",
    titleSecond: "",
  }
  formData.cardList.push(row)
}
const handleDelete = (row,index)=> {
  formData.cardList.splice(index,1)
}
const beforeUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是 JPG、PNG 格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不大于2MB!')
    return false
  }
  return true
}

const handleUploadSuccess= (index) => {
  return function (res,file) { // 返回闭包函数
    // 在闭包函数内部使用捕获的索引值和事件对象
    if (res?.code === 200) {
      // 使用 index 进行操作
      console.log('上传成功，索引为：', index,res);
      formData.cardList[index].imgUrl = res.data.url
    }
  };
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item  prop="cardList" label="card列表">
          <div class="table-wrapper">
            <el-table :data="formData.cardList">
              <el-table-column prop="imgUrl" label="图片" align="center">
                <template #default="scope">
                  <el-upload class="avatar-uploader"
                             :action="uploadUrl"
                             :show-file-list="false"
                             :auto-upload="true"
                             :before-upload="beforeUpload"
                             :limit="1"
                             :on-success="handleUploadSuccess(scope.$index)"
                             :headers="{'Authorization': token ? `Bearer ${token}` : undefined}"
                  >
                    <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" class="avatar">
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    <!--                        {{scope.$index}}-->
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="titleFirst" label="第一行标题" align="center">
                <template #default="scope">
                  <el-input maxlength="20" v-model="scope.row.titleFirst"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="titleSecond" label="第二行标题" align="center">
                <template #default="scope">
                  <el-input maxlength="60" v-model="scope.row.titleSecond"></el-input>
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
