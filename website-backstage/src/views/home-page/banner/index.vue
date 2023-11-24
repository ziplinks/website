<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue"
import {
  deleteBannerDataApi,
  updateBannerDataApi,
  getBannerDataApi,
  createBannerDataApi
} from "@/api/home"
import { type GetTableData } from "@/api/home/types/home"
import { type FormInstance, type FormRules, type UploadInstance, ElMessage, ElMessageBox} from "element-plus"
import { CirclePlus, RefreshRight, Plus } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { getToken } from "@/utils/cache/cookies"

defineOptions({
  // 命名当前组件
  name: "Banner"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  mainTitle: "",
  subTitle: "",
  banner:""
})
const formRules: FormRules = reactive({
  mainTitle: [{ required: true, trigger: "blur", message: "请输入主标题" }],
  subTitle: [{ required: true, trigger: "blur", message: "请输入子标题" }],
  banner: [{ required: true, trigger: "blur", message: "请输上传banner" }]
})

const upload = ref<UploadInstance>()
const uploadUrl = ref(import.meta.env.VITE_BASE_API+'/upload/banner')
const token = computed(()=>{
  return getToken()
})
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

const handleUploadSuccess=(res, file) => {
  if(res.code === 200){
    formData.banner = res.data.url
    console.log(URL.createObjectURL(file.raw))
  }

}
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createBannerDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateBannerDataApi({
          _id: currentUpdateId.value,
          mainTitle: formData.mainTitle,
          subTitle: formData.subTitle,
          banner: formData.banner
        })
          .then(() => {
            ElMessage.success("修改成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.mainTitle = ""
  formData.subTitle = ""
  formData.banner = ""
}
//#endregion

//#region 删
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteBannerDataApi(row._id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetTableData) => {
  currentUpdateId.value = row._id
  formData.mainTitle = row.mainTitle
  formData.subTitle = row.subTitle
  formData.banner = row.banner
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<GetTableData[]>([])
const getTableData = () => {
  loading.value = true
  getBannerDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增banner</el-button>
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="mainTitle" label="主标题" align="center" />
          <el-table-column prop="subTitle" label="子标题" align="center" />
          <el-table-column prop="banner" label="图片" align="center">
            <template #default="scope">
              <img :src="scope.row.banner" class="preview-img" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增' : '修改'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="mainTitle" label="主标题">
          <el-input v-model="formData.mainTitle" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="subTitle" label="子标题">
          <el-input v-model="formData.subTitle" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="banner" label="图片">
          <el-upload ref="upload"
                     class="avatar-uploader"
                     :action="uploadUrl"
                     :show-file-list="false"
                     :auto-upload="true"
                     :before-upload="beforeUpload"
                     :limit="1"
                     :on-success="handleUploadSuccess"
                     :headers="{'Authorization': token ? `Bearer ${token}` : undefined}"
          >
            <img v-if="formData.banner" :src="formData.banner" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
//.avatar-uploader .el-upload {
//  border: 1px dashed #d9d9d9;
//  border-radius: 6px;
//  cursor: pointer;
//  position: relative;
//  overflow: hidden;
//}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.preview-img {
  max-height: 150px;
  max-width: 150px;
}
</style>

