<template>
  <a-table :columns="columns" :dataSource="data">
    <router-link slot="name" slot-scope="text" :to="`/logmanage/${text}`" > {{text}} </router-link>
    <span slot="customTitle"><a-icon type="smile-o" /> 工作区名称</span>
    <span slot="action" slot-scope="text">
      <model :workspace_name="text.name"></model>
      <a-divider type="vertical" />
      <a href="javascript:;">删除工作区</a>
    </span>
  </a-table>
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
  title: '最后上传时间',
  dataIndex: 'time',
  key: 'time',
},{
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [{
  name: 'test1',
  num: 32,
  time: '2017-11-01',
}, {
  name: 'test2',
  num: 42,
  time: '2017-1-11',
}, {
  name: 'test3',
  num: 32,
  time: '2017-12-26',
}];

import Model from "./Modal/Modal.vue";


export default {
  components: {
    "model": Model
  },
  data() {
    return {
      data,
      columns,
    }
  },
}
</script>