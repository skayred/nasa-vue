<script setup lang="ts">
import { ref, watch, computed, reactive } from "vue";
import { Alert, DatePicker, Form, Table, Spin, Select } from "ant-design-vue";
import { useQuery } from "@vue/apollo-composable";
import { format, subDays, formatDistance, parse } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { ASTEROIDS, JOB_STATUS } from "./gql";
import { ProximityEvent } from "../types";

type RangeValue = [Dayjs, Dayjs];

const from = ref(format(subDays(new Date(), 5), "yyyy-MM-dd"));
const to = ref(format(subDays(new Date(), 1), "yyyy-MM-dd"));
const range = ref<RangeValue>([dayjs(from.value), dayjs(to.value)]);
const amount = ref(5);
const jobPollEnabled = ref(false);

watch(range, (newRange: RangeValue) => {
  from.value = format(newRange[0].toDate(), "yyyy-MM-dd");
  to.value = format(newRange[1].toDate(), "yyyy-MM-dd");
});

const disabledDate = (current: any) => {
  // Can not select days before today and today
  return current && current >= dayjs().endOf("day");
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Happened at",
    dataIndex: "happenedAt",
    key: "happenedAt",
  },
  {
    title: "Distance",
    dataIndex: "missDistance",
    key: "missDistance",
  },
];

const jobVariables = reactive({ jobID: "placeholder" });

const { result: isJobComplete } = useQuery(JOB_STATUS, jobVariables, () => ({
  enabled: jobPollEnabled.value,
  pollInterval: 1000,
}));

const { result, loading, error, refetch } = useQuery(ASTEROIDS, {
  from,
  to,
  amount,
});

const options = Array(5)
  .fill(0)
  .map((_: any, i: number) => ({ value: i, label: i }));

watch(isJobComplete, (value: any) => {
  if (!!value && value.isJobComplete) {
    jobPollEnabled.value = false;
    refetch();
  }
});

watch(result, (value: any) => {
  if (!loading.value && !error.value) {
    jobVariables.jobID = value.closestAsteroids.jobId;
    jobPollEnabled.value = !!value.closestAsteroids.jobId;
  }
});

const asteroids = computed(() => {
  return !loading.value && !error.value
    ? result.value.closestAsteroids.events.map((prox: ProximityEvent) => {
        return {
          id: prox.id,
          name: prox.asteroid ? prox.asteroid.name : "NONAME00",
          happenedAt: formatDistance(
            parse(prox.happenedAt || "", "yyyy-MM-dd", new Date()),
            new Date(),
            { addSuffix: true }
          ),
          missDistance: prox.missDistance,
        };
      })
    : [];
});
</script>

<template>
  <Alert
    v-if="error"
    message="Error happened"
    :description="error.message"
    type="error"
  />
  <Form
    name="basic"
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 6 }"
    :initialValues="{ remember: true }"
    autoComplete="off"
  >
    <Form.Item label="Date range">
      <DatePicker.RangePicker
        :disabledDate="disabledDate"
        v-model:value="range"
      />
    </Form.Item>
    <Form.Item label="Amount of asteroids to show">
      <Select v-model:value="amount" :options="options" />
    </Form.Item>
  </Form>
  <Spin :spinning="loading || !!jobVariables.jobID">
    <Table rowKey="id" :columns="columns" :dataSource="asteroids" />
  </Spin>
</template>
