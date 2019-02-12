<template>
  <div>
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :span="11">
        <a-input v-model="filter_input"></a-input>
      </a-col>
      <a-col :span="6">
        <a-button
            type='primary'
            @click="() => handleSearch(this.filter_input)"
            icon="search"
            style="width: 90px; margin-right: 8px"
        >Search
        </a-button>
        <a-button
            @click="() => handleReset()"
            style="width: 90px"
        >Reset
        </a-button>
      </a-col>
    </a-row>
    <div style="margin-bottom: 16px">
      <span style="margin-left: 8px">
        <a-tooltip placement="top" >
            <template slot="title">
            <span>有列表内容未展开时优先展开</span>
            </template>
            <a-button
                @click="showAll"
            >
                展开/收起全部
            </a-button>
        </a-tooltip>
        <template v-if="hasSelected">
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </span>
    </div>
    <a-table 
        size="middle" 
        :scroll="{ y: 450 }" 
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
        :columns="columns" 
        :dataSource="data" 
        :pagination="{ pageSize: 500 }" 
    >
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0" :style="{'white-space': 'pre-line'}">{{record.body}}</p>
    </a-table>
  </div>
</template>

<script>
const columns = [{
    title: 'time',
    dataIndex: 'time',
    width: 200,
} ,{
    title: 'Host',
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

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    "_id" : `ObjectId("5c540823294a3231e02ca4a2")`,
    "time" : "2018-12-21 10:53:52",
    "unixdate" : 1545360832000,
    "src_ip" : "222.18.127.49",
    "body" : "GET /index.php HTTP/1.1\nHost: 47.106.182.92:30001\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\nAccept-Language: zh-CN\nAccept-Encoding: gzip, deflate\nConnection: close\nCookie: PHPSESSID=unfs48427tro0rts8b02r81kv7\nUpgrade-Insecure-Requests: 1\n\n",
    "method" : "GET",
    "header" : {
        "Host" : "47.106.182.92:30001",
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0",
        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language" : "zh-CN",
        "Accept-Encoding" : "gzip, deflate",
        "Connection" : "close",
        "Cookie" : "PHPSESSID=unfs48427tro0rts8b02r81kv7",
        "Upgrade-Insecure-Requests" : "1"
    },
    "file" : {

    },
    "PostObj" : null,
    "Post" : null,
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      filter_input: '',
      unfilted_data,
      filter: '',
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
       computed: {
        data: function () {
          let local_data = [];
          let filter = this.filter;
          let unfilted_data = this.unfilted_data;

          if(this.filter == ''){
            local_data = unfilted_data;
          }
          else{
            if(!this.xss_filter(filter)){
              this.filter = "null";
              return [];
            }
            try{
              var rule = filter.replace(/([a-zA-Z0-9_\.]{3,20}):\/?([^/\s]*)\/?/ig,"/$2/.test(data.$1)");
              unfilted_data.forEach(function(data){
                let a;
                console.log(rule);
                eval(`if(${rule}){
                  a = true;
                }
                else{
                  a = false;
                }`);
                if(a){
                  local_data.push(data);
                }
              });
            }
            catch(e){
              this.$message.error('搜索失败,请确认语法是否正确');
              this.filter = "null";
              console.error(e);
              return [];
            }
          }
          return local_data;
        }
      },
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    handleSearch (filter_input) {
      this.filter = filter_input;
    },
    handleReset () {
      this.filter = "";
    },
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

