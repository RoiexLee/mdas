<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center justify-content-center my-md">
        <div class="text-center text-muted mb-4">
          <h3 style="margin-top: -50px">感谢您对本项目研究的参与和支持!</h3>
        </div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <img :src="logo" alt="logo" width="70%" />
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <p>HFUT LMC 2024</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "AppFooterCustom",
  data: () => ({
    logo: require("@/assets/img/logo.png"),
  }),
};
</script>
<style></style>
