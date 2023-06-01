<script setup lang="ts">
import { Layout, Menu } from "ant-design-vue";
</script>

<template>
  <Layout.Header>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="home">
        <router-link to="/">Home</router-link>
      </Menu.Item>
      <Menu.Item key="asteroids">
        <router-link to="/asteroids">Asteroids</router-link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
</template>
