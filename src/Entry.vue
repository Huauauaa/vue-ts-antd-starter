<template>
  <config-provider :locale="locale" :autoInsertSpaceInButton="false">
    <app />
  </config-provider>
</template>

<script>
import Vue from 'vue';
import { ConfigProvider, Button, DatePicker, Input } from 'ant-design-vue';
import App from './App.vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Input);

export default {
  components: {
    App,
    ConfigProvider,
  },
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style lang="less" scope></style>
