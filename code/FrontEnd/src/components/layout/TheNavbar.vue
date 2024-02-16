<template lang="">
    <!-- Thanh navbar bên trái -->
    <div class="navbar">
        <div class="logo-site">
            <div class="logo-icon m-cursor-pointer"></div>
            <div class="logo-sprite m-cursor-pointer"></div>
        </div>
        <div class="navbar-content">
            <router-link v-for="(item, index) in menus" :key="index" :to="item.url" class="nav-item ">
                <div :class="item.icon" class="nav-item-icon"></div>
                <div class="nav-item-text">{{ item.text }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "the-navbar",

  data() {
    return {
      menus: [
        {
          text: "Chi tiết nhập khẩu",
          icon: "icon-dashboard",
          url: "/",
        }
      ],
    };
  },
};
</script>

<style scope>
@import url("../../styles/common/navbar.css");
</style>