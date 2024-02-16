<template>
  <div>
    <TheNavbar />
    <TheHeader />
    <TheContent />
    <BaseToastMessage />
    <BasePopup />
    <BaseLoading />
  </div>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheContent from "./components/layout/TheContent.vue";
import BasePopup from "./components/base/BasePopup.vue";
import BaseToastMessage from "./components/base/BaseToastMessage.vue";
import BaseLoading from "./components/base/BaseLoading.vue";

export default {
  name: "App",

  components: {
    TheNavbar,
    TheHeader,
    TheContent,
    BasePopup,
    BaseToastMessage,
    BaseLoading
  },

};
</script>

<style>
@import url("./styles/main.css");
</style>