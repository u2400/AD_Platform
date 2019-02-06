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
    <a-sub-menu 
      key="sub1" 
    >
      <span slot="title"><a-icon type="mail" /><span>日志管理</span></span>
      <a-menu-item-group key="g1">
        <template slot="title"><a-icon type="qq" /><span>Item 1</span></template>
        <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="g2" title="Item 2">
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-menu-item key="12">Option 12</a-menu-item>
    </a-sub-menu>
  </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0}" />
      <slot name="header"></slot>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div id="Container" :style="{ padding: '24px', background: '#fff'}">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
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

window.onload = function(){
  document.getElementById("Container").style.minHeight = `${Number(window.screen.availHeight) - 230}px`;
  console.log(window.screen.availHeight);
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
.sider {
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
}
.sider.fixSiderBar {
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
}
</style>


