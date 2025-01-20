<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span v-for="n in 8" :key="n"></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <card
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
            header-classes="bg-white pb-5"
            shadow
            type="secondary"
          >
            <div class="text-center text-muted mb-4">
              <small>创建新账号</small>
            </div>
            <form role="form" @submit.prevent="handleSubmit">
              <div class="row">
                <!-- 第一列：基本信息输入框 -->
                <div class="col-lg-4">
                  <base-input
                    v-model="formData.username"
                    addon-left-icon="ni ni-hat-3"
                    placeholder="用户名"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.fullname"
                    addon-left-icon="ni ni-single-02"
                    placeholder="姓名"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.studentId"
                    addon-left-icon="ni ni-badge"
                    placeholder="学号"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.classCode"
                    addon-left-icon="ni ni-building"
                    placeholder="班级"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.qq"
                    addon-left-icon="ni ni-chat-round"
                    placeholder="QQ号"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.phone"
                    addon-left-icon="ni ni-mobile-button"
                    placeholder="手机号码"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.password"
                    addon-left-icon="ni ni-lock-circle-open"
                    placeholder="密码"
                    type="password"
                  >
                  </base-input>

                  <base-input
                    v-model="formData.confirmPassword"
                    addon-left-icon="ni ni-lock-circle-open"
                    placeholder="确认密码"
                    type="password"
                  >
                  </base-input>

                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><i class="ni ni-calendar-grid-58"></i
                        ></span>
                      </div>
                      <flat-picker
                        v-model="formData.birthDate"
                        :config="datePickerConfig"
                        class="form-control"
                        placeholder="出生日期"
                      >
                      </flat-picker>
                    </div>
                  </div>

                  <base-input
                    v-model="formData.inviteCode"
                    addon-left-icon="ni ni-atom"
                    placeholder="邀请码"
                  >
                  </base-input>
                </div>

                <!-- 第二列：性别和职业 -->
                <div class="col-lg-4">
                  <div class="form-group">
                    <label class="form-control-label">性别</label>
                    <div class="row">
                      <div class="col-6">
                        <div class="custom-control custom-radio mb-2">
                          <input
                            id="male"
                            v-model="formData.gender"
                            class="custom-control-input"
                            type="radio"
                            value="male"
                          />
                          <label class="custom-control-label" for="male"
                            >男</label
                          >
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="custom-control custom-radio mb-2">
                          <input
                            id="female"
                            v-model="formData.gender"
                            class="custom-control-input"
                            type="radio"
                            value="female"
                          />
                          <label class="custom-control-label" for="female"
                            >女</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">职业</label>
                    <div
                      v-for="career in careers"
                      :key="career.value"
                      class="custom-control custom-radio mb-2"
                    >
                      <input
                        :id="career.value"
                        v-model="formData.career"
                        :value="career.value"
                        class="custom-control-input"
                        type="radio"
                      />
                      <label :for="career.value" class="custom-control-label">{{
                        career.label
                      }}</label>
                    </div>
                  </div>
                </div>

                <!-- 第三列：教育程度和兴趣爱好 -->
                <div class="col-lg-4">
                  <div class="form-group">
                    <label class="form-control-label">教育程度</label>
                    <div class="row">
                      <div
                        v-for="level in educationLevels"
                        :key="level.value"
                        class="col-6 mb-2"
                      >
                        <div class="custom-control custom-radio">
                          <input
                            :id="level.value"
                            v-model="formData.educationLevel"
                            :value="level.value"
                            class="custom-control-input"
                            type="radio"
                          />
                          <label
                            :for="level.value"
                            class="custom-control-label"
                            >{{ level.label }}</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">兴趣爱好（可多选）</label>
                    <div class="row">
                      <div
                        v-for="hobby in hobbies"
                        :key="hobby.value"
                        class="col-4 mb-2"
                      >
                        <div class="custom-control custom-checkbox">
                          <input
                            :id="hobby.value"
                            v-model="formData.hobbies"
                            :value="hobby.value"
                            class="custom-control-input"
                            type="checkbox"
                          />
                          <label
                            :for="hobby.value"
                            class="custom-control-label"
                            >{{ hobby.label }}</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <base-button
                  :disabled="isSubmitting"
                  :loading="isSubmitting"
                  class="my-4"
                  type="primary"
                  @click="handleSubmit"
                >
                  {{ isSubmitting ? "注册中..." : "注册账号" }}
                </base-button>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import api from "@/services/api";
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {
    flatPicker,
  },
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        username: "",
        fullname: "",
        studentId: "",
        classCode: "",
        qq: "",
        phone: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        gender: "",
        educationLevel: "",
        career: "",
        hobbies: [],
        inviteCode: "",
      },
      isSubmitting: false,
      datePickerConfig: {
        allowInput: true,
        dateFormat: "Y-m-d",
      },
      educationLevels: [
        { value: "0", label: "小学及以下" },
        { value: "1", label: "初高中" },
        { value: "2", label: "本科" },
        { value: "3", label: "硕博研究生" },
      ],
      careers: [
        {
          value: "专业人士（如教师/医生/律师等）",
          label: "专业人士（如教师/医生/律师等）",
        },
        {
          value: "服务业人员（餐饮服务员/司机/售货员等）",
          label: "服务业人员（餐饮服务员/司机/售货员等）",
        },
        {
          value: "自由职业者（如作家/艺术家/摄影师/导游等）",
          label: "自由职业者（如作家/艺术家/摄影师/导游等）",
        },
        {
          value: "工人（如工厂工人/建筑工人/城市环卫工人等）",
          label: "工人（如工厂工人/建筑工人/城市环卫工人等）",
        },
        { value: "公司职员", label: "公司职员" },
        { value: "商人/雇主", label: "商人/雇主" },
        { value: "小商贩/个体户", label: "小商贩/个体户" },
        {
          value: "事业单位/公务员/政府工作人员",
          label: "事业单位/公务员/政府工作人员",
        },
        { value: "学生", label: "学生" },
        { value: "家庭主妇", label: "家庭主妇" },
        { value: "农民/牧民/渔夫", label: "农民/牧民/渔夫" },
        { value: "无业/失业", label: "无业/失业" },
        { value: "其他", label: "其他" },
      ],
      hobbies: [
        { value: "看动漫", label: "看动漫" },
        { value: "艺术", label: "艺术" },
        { value: "烹饪", label: "烹饪" },
        { value: "跳舞", label: "跳舞" },
        { value: "追剧", label: "追剧" },
        { value: "玩游戏", label: "玩游戏" },
        { value: "书法", label: "书法" },
        { value: "下棋", label: "下棋" },
        { value: "收藏物品", label: "收藏物品" },
        { value: "编程", label: "编程" },
        { value: "唱歌", label: "唱歌" },
        { value: "写作", label: "写作" },
        { value: "DIY", label: "DIY" },
        { value: "绘画", label: "绘画" },
        { value: "跑步", label: "跑步" },
        { value: "时尚", label: "时尚" },
        { value: "学外语", label: "学外语" },
        { value: "武术", label: "武术" },
        { value: "听音乐", label: "听音乐" },
        { value: "按摩", label: "按摩" },
        { value: "冥想", label: "冥想" },
        { value: "表演", label: "表演" },
        { value: "摄影", label: "摄影" },
        { value: "乐器演奏", label: "乐器演奏" },
        { value: "养宠物", label: "养宠物" },
        { value: "演讲", label: "演讲" },
        { value: "猜谜", label: "猜谜" },
        { value: "阅读", label: "阅读" },
        { value: "登山", label: "登山" },
        { value: "购物", label: "购物" },
        { value: "球类运动", label: "球类运动" },
        { value: "游泳", label: "游泳" },
        { value: "旅行", label: "旅行" },
        { value: "钓鱼", label: "钓鱼" },
        { value: "健身", label: "健身" },
      ],
    };
  },
  validations: {
    formData: {
      username: { required, minLength: minLength(3) },
      fullname: { required },
      password: { required, minLength: minLength(6) },
      confirmPassword: {
        required,
        sameAsPassword(value) {
          return value === this.formData.password;
        },
      },
      studentId: {},
      classCode: {},
      qq: {
        required,
        numeric(value) {
          return /^\d+$/.test(value);
        },
      },
      phone: { required },
      birthDate: { required },
      gender: { required },
      educationLevel: { required },
      career: { required },
      hobbies: {
        required,
        minLength: minLength(1),
      },
    },
  },
  methods: {
    ...mapActions("modal", ["showMessage", "showError"]),
    validateForm() {
      this.$v.$touch();
      const errors = [];

      if (!this.formData.username) {
        errors.push("用户名不能为空");
      } else if (this.formData.username.length < 3) {
        errors.push("用户名至少需要3个字符");
      }

      if (!this.formData.fullname) {
        errors.push("姓名不能为空");
      }

      if (!this.formData.password) {
        errors.push("密码不能为空");
      } else if (this.formData.password.length < 6) {
        errors.push("密码至少需要6个字符");
      }

      if (!this.formData.confirmPassword) {
        errors.push("请确认密码");
      } else if (this.formData.confirmPassword !== this.formData.password) {
        errors.push("两次输入的密码不一致");
      }

      if (!this.formData.studentId) {
        errors.push("学号不能为空");
      }

      if (!this.formData.classCode) {
        errors.push("班级不能为空");
      }

      if (!this.formData.qq) {
        errors.push("QQ号不能为空");
      } else if (!/^\d+$/.test(this.formData.qq)) {
        errors.push("QQ号必须是数字");
      }

      if (!this.formData.phone) {
        errors.push("手机号码不能为空");
      }

      if (!this.formData.birthDate) {
        errors.push("请选择出生日期");
      }

      if (!this.formData.gender) {
        errors.push("请选择性别");
      }

      if (!this.formData.educationLevel) {
        errors.push("请选择教育程度");
      }

      if (!this.formData.career) {
        errors.push("请选择职业");
      }

      if (!this.formData.hobbies || this.formData.hobbies.length === 0) {
        errors.push("请至少选择一个兴趣爱好");
      }

      return errors;
    },
    async handleSubmit() {
      const errors = this.validateForm();
      if (errors.length > 0) {
        this.showError({
          title: "提示",
          message: errors[0],
        });
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await api.auth.register({
          username: this.formData.username,
          fullname: this.formData.fullname,
          password: this.formData.password,
          studentId: this.formData.studentId,
          classCode: this.formData.classCode,
          qq: this.formData.qq,
          phone: this.formData.phone,
          birthDate: this.formData.birthDate,
          gender: this.formData.gender,
          educationLevel: this.formData.educationLevel,
          career: this.formData.career,
          hobbies: this.formData.hobbies.join(","),
          inviterCode: this.formData.inviteCode,
        });
        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.showMessage({
            title: "提示",
            message: "注册成功",
            onClose: () => {
              const redirectPath = this.$route.query.redirect || "/login";
              this.$router.replace(redirectPath);
            },
          });
        } else {
          this.showError({
            title: "错误",
            message: "注册失败:" + response.data.msg,
          });
        }
      } catch (error) {
        console.log("注册失败", error);
        this.showError({
          title: "错误",
          message: "注册失败",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
