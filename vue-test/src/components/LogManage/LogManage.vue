<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading"
      >
        Reload
      </a-button>
      <span style="margin-left: 8px">
        <a-tooltip placement="top" >
            <template slot="title">
            <span>有列表内容未展开时优先展开</span>
            </template>
            <a-button
                @click="showAll"
            >
                展开/关闭全部
            </a-button>
        </a-tooltip>
        <template v-if="hasSelected">
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </span>
    </div>
    <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" >
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p>
    </a-table>
  </div>
</template>

<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    description: `Edward King ${i} London, Park Lane no. ${i}`,
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    showAll(){
        (function(){
            var a = document.querySelectorAll('.ant-table-row-collapsed')
            if(a.length == 0){
                a = document.querySelectorAll('.ant-table-row-expanded')
            }
            return a
        })()
        .forEach((element)=>{
            element.click();
        })
    }
      
  },
  
}
</script>