<template>
  <div @contextmenu="handleContextmenu($event)">
    <div class="logmanage_contextmenu">
      <p>123</p>
    </div>
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :span="3">
        <div style="margin-right: 8px">
          <span>
            <a-tooltip placement="top" >
                <template slot="title">
                <span>
                  有列表内容未展开时优先展开
                  <!-- 
                    示例查询语句
                    method:POST

                    header['Host']:47.106.182.92
                  -->
                </span>
                </template>
                <a-button
                    @click="showAll"
                >
                    展开/收起全部
                </a-button>
            </a-tooltip>
          </span>
        </div>
      </a-col>
      <a-col :span="8">
        <a-input v-model="filter_input"></a-input>
      </a-col>
      <a-col :span="8">
        <a-button
            type='primary'
            @click="() => handleSearch(this.filter_input)"
            icon="search"
            style="width: 90px; margin-right: 8px"
        >Search
        </a-button>
        <a-button
            @click="() => handleReset()"
            style="width: 90px; margin-right: 8px"
        >Reset
        </a-button>
        <template>
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </a-col>
    </a-row>
    <p></p>
    <a-table 
        size="middle" 
        :scroll="{ y: 450 }" 
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
        :columns="columns" 
        :dataSource="data" 
        :pagination="{ pageSize: 50 }" 
    >
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0" :style="{'white-space': 'pre-line'}">{{record.body}}</p>
    </a-table>
  </div>
</template>

<script>
import "./LogManage.css";

const columns = [{
    title: 'time',
    dataIndex: 'time',
    width: 200,
} ,{
    title: 'header.Host',
    dataIndex: 'header.Host',
    width: 200,
}, {
    title: 'src_ip',
    dataIndex: 'src_ip',
    width: 200,
}, {
    title: "method",
    dataIndex: "method",
    width: 200,
}];

export default {
  data() {
    return {
      window,
      document,
      columns,
      location: window.location,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      filter_input: '',
      filter: '',
      data: [],
      first_select: true,
      data_worker: new Worker("./LogManageWorker.js"), //新建一个worker用于存储和筛选日志
      xss_filter: function (str) {
        let str1 = str.replace(/(?:\\\\|\\\=)/g,"");
        if(/\=/.test(str1)){
          this.$message.error('搜索失败,搜索条件中所有的等号必须都被转义');
          return false;
        }
        let str2 = str.replace(/(\\\/|\\\\|\\\(|\\\))/g,"");
        str2 = str2.replace(/\/.*?\//g,"");
        if(/[^\(\)\&\|]\s*?\(.*?\)/.test(str2)){
          this.$message.error('搜索失败,搜索条件中不得包含函数调用');
          return false;
        }
        let str3 = str1.replace(/(?!\\)\(.*?(?!\\)\)/g,"");
        if(/(?!\\)\(/.test(str3)){
          this.$message.error("搜索失败,搜索条件中存在未闭合的'('");
          return false;
        }
        if(/(?!\\)\)/.test(str3)){
          this.$message.error("搜索失败,搜索条件中存在未闭合的')'");
          return false;
        }
        return true;
      },
      get_data: function (rule, worker) {
        return new Promise((resolve, reject)=>{
          worker.postMessage(["FilterData", [rule]]);
          worker.onmessage = function(mes){
            console.log(mes);
            resolve(mes.data);
          }
          worker.onerror = function(e) {
            console.error(e);
          }
        })
      },
      update_data: async function (filter_input) {
        let filter = filter_input;
        let get_data = this.get_data;
        let data_worker = this.data_worker;
        let local_data;
        this.location.hash
        if(filter == ''){
          local_data = await get_data("", data_worker);
        }
        else{
          if(!this.xss_filter(filter)){
            this.filter = "null";
            local_data = [];
          }
          else{
            try{
              var rule = filter.replace(/([a-zA-Z0-9_\-\[\]\'\"]{3,20}):\/?([^/\s]*)\/?/ig,"/$2/.test(data.$1)");
              local_data = await get_data(rule, data_worker);
            }
            catch(e){
              this.$message.error('搜索失败,请确认语法是否正确');
              this.filter = "null";
              console.error(e);
              local_data = [];
            }
          }
        }
        this.data = local_data;
      }
    }
  },
  mounted: function() {
    this.start();
  },
  methods: {
    handleContextmenu ($event) {
      console.log($event);
      window.addEventListener('click', function(){
        document.querySelector(".logmanage_contextmenu").style = `top: -9999px; left: -9999px;`
      })
      document.querySelector(".logmanage_contextmenu").style = `top:${$event.pageY+2}px; left: ${$event.pageX+2}px;`
      $event.stopPropagation();
      $event.preventDefault();
      return false;
    },
    handleSearch (filter_input) {
      this.update_data(filter_input);
    },
    handleReset () {
      this.filter = "";
    },
    async start () {
      await this.data_worker.postMessage(["SetWorkspace", /\#\/logmanage\/(.*)/.exec(window.location.hash)[1]]);
      await this.update_data("");
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    showAll() {
      (function() {
          var a = document.querySelectorAll('.ant-table-row-collapsed')
          if(a.length == 0) {
              a = document.querySelectorAll('.ant-table-row-expanded')
          }
          return a
      })()
      .forEach((element) => { 
          element.click();
      })
    }
  },
}
</script>