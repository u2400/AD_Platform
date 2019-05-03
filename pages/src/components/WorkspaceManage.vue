<template>
  <art>
    <div style="
          #steps-content {margin:10px}
        ">
      <a-button @click="showModal" style="margin-bottom: 6px;">添加工作区</a-button>
      <a-modal
        title="Basic Modal"
        v-model="visible"
        @ok="handleOk"
      >
        <template>
          <div>
            <a-steps :current="current">
              <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" style="margin:20px">
              <a-input v-show="this.current === 0" v-model="InputWorkspacename" placeholder="Basic usage"/>
               <a-upload-dragger :multiple="true" v-show="this.current === 1" :action="'/api/uploadlog/'+InputWorkspacename" @change="handleChange">
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </a-upload-dragger>
            </div>
            <div class="steps-action">
              <a-button
                v-if="current < steps.length - 1"
                type="primary" @click="next"
              >
                Next
              </a-button>
              <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="handleOk('')"
              >
                Done
              </a-button>
              <a-button
                v-if="current>0"
                style="margin-left: 8px"
                @click="prev"
              >
                Previous
              </a-button>
            </div>
          </div>
        </template>
      </a-modal>
    </div>
    <a-table :columns="columns" :dataSource="data">
      <router-link slot="name" slot-scope="text" :to="`/logmanage/${text}`" > {{text}} </router-link>
      <span slot="customTitle"><a-icon type="smile-o" /> 工作区名称</span>
      <span slot="action" slot-scope="text">
        <model :workspace_name="text.name"></model>
        <a-divider type="vertical" />
        <a href="javascript:;">删除工作区</a>
      </span>
    </a-table>
  </art>
</template>

<script>
const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' },
}, {
  title: '请求数目',
  dataIndex: 'num',
  key: 'num',
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

let data = [];

import Model from "./Modal/Modal.vue";

export default {
  components: {
    "model": Model
  },
  data() {
    return {
      data,
      columns,
      visible: false,
      InputWorkspacename: "",
      current: 0,
      document,
      steps: [{
        title: '填写工作区名称',
      }, {
        title: '上传日志文件',
      }],
    }
  },
  methods: {
    start: function() {
      fetch("/api/getworkspace")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.data = res;
      })
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    next() {
        this.current++
    },
    prev() {
      this.current--
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  }, 
  mounted: function() {
    this.start();
  }
}
</script>