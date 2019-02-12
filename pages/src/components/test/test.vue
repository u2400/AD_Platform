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
  <br>
  <a-table :dataSource="data" :columns="columns"> 
  </a-table>
</div>
</template>

<script>
const unfilted_data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Joe Black',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Jim Green',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}]

export default {
  data () {
    return {
      searchText: '',
      searchInput: null,
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }],
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
      }
    }
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
  methods: {
    handleSearch (filter_input) {
      this.filter = filter_input;
    },
    handleReset () {
      this.filter = "";
    },
  },
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
