<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      theme="light"
      width="256px"
    >
      <div class="logo" />
      <!-- @click="handleClick" -->
      <!-- :openKeys.sync="openKeys" -->
      <a-menu
        style="width: 256px; padding: 16px 0px; width: 100%; border: 0px"
        :defaultSelectedKeys="['1']"
        mode="inline"
      >
        <a-menu-item key="1">
          <router-link to="/workspacemanage">工作区管理</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/filemanage">包含文件日志管理</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/workspacemanage">发送请求管理</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0}" />
      <slot name="header"></slot>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <slot name="body"></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name : "main-layout",
  data(){
    return {
      collapsed: false,
    }
  },
}
</script>

<style>

.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.1s;
  background: #fff;
  overflow: hidden;
  box-shadow: 1px 1px 0 0 #e8e8e8;
  width: 256px
}

.logo img {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
}
.logo h1 {
  color: white;
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  margin: 0 0 0 12px;
  font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.ant-layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  position: relative;
  z-index: 10;
}
.ant-layout-sider .fixSiderBar {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  position: fixed;
  top: 0;
  left: 0;
}
.sider.fixSiderBar :global .ant-menu-root {
  overflow-y: auto;
  height: calc(100vh - 64px);
}
.sider.fixSiderBar :global .ant-menu-inline {
  border-right: 0;
}
.sider.fixSiderBar :global .ant-menu-inline .ant-menu-item,
.sider.fixSiderBar :global .ant-menu-inline .ant-menu-submenu-title {
  width: 100%;
}
.sider.light {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  background-color: white;
}
.sider.light .logo {
  background: white;
  box-shadow: 1px 1px 0 0 #e8e8e8;
}
.sider.light .logo h1 {
  color: #1890FF;
}
.sider.light :global(.ant-menu-light) {
  border-right-color: transparent;
}
.icon {
  width: 14px;
  margin-right: 10px;
}
:global .top-nav-menu li.ant-menu-item {
  height: 64px;
  line-height: 64px;
}
:global .drawer .drawer-content {
  background: #001529;
}
:global .ant-menu-inline-collapsed > .ant-menu-item .sider-menu-item-img + span,
:global .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .sider-menu-item-img + span,
:global .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .sider-menu-item-img + span {
  max-width: 0;
  display: inline-block;
  opacity: 0;
}
:global .ant-menu-item .sider-menu-item-img + span,
:global .ant-menu-submenu-title .sider-menu-item-img + span {
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  opacity: 1;
}
:global .ant-drawer-left .ant-drawer-body {
  padding: 0;
}

.ant-layout-header {
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  margin: 0px 0px 1px 0px;
}
</style>


