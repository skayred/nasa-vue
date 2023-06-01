<script setup lang="ts">
import { Button, Card } from "ant-design-vue";
import { useRouter, routerKey } from "vue-router";

const router = useRouter();
const redirect = () => {
  router.push("/asteroids");
};
</script>

<template>
  <div>
    <Card title="Welcome to the implementation of the technical assignment!">
      <template #extra>
        <Button type="link" @click="redirect">See the asteroids!</Button>
      </template>
      <p>This is the main page of the application</p>
      <p>
        If you would like to see the list of closest asteroids - press the
        button below
      </p>
      <Button type="primary" @click="redirect">
        See the asteroids right now
      </Button>
    </Card>
  </div>
</template>
