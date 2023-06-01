<script setup lang="ts">
import "ant-design-vue/dist/antd.css";

import { Layout } from "ant-design-vue";
import TopMenu from "./components/TopMenu.vue";
</script>

<template>
  <Layout className="layout">
    <TopMenu />
    <Layout className="main-content">
      <router-view></router-view>
    </Layout>
  </Layout>
</template>

<style>
.layout {
  min-height: calc(100vh - 64px);
  overflow-y: scroll;
}

.main-content {
  padding: 1rem;
  width: 960px;
  margin: 0 auto;
  background-color: white;
}
</style>
