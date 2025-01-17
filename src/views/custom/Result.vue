<template>
  <section>
    <!-- 文件状态展示 -->
    <div class="mb-4">
      <h3 class="text-center mb-3">文件状态</h3>
      <div
        :class="allFilesReady ? 'alert-success' : 'alert-warning'"
        class="alert"
      >
        <p>{{ allFilesReady ? "所有文件已就绪！" : "部分文件缺失" }}</p>
        <p v-for="(label, key) in fileLabels" :key="key">
          {{ label }}
          {{ fileStatus[key] ? "已就绪" : "未找到" }}
        </p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="text-center mb-4">
      <base-button
        :disabled="downloading"
        class="mx-2"
        type="primary"
        @click="downloadFiles"
      >
        <i class="ni ni-cloud-download-95 mr-2"></i>
        {{ downloading ? "下载中..." : "下载文件" }}
      </base-button>

      <base-button
        :disabled="uploading || !allFilesReady"
        class="mx-2"
        type="success"
        @click="uploadFiles"
      >
        <i class="ni ni-cloud-upload-96 mr-2"></i>
        {{ uploading ? "上传中..." : "上传文件" }}
      </base-button>

      <base-button
        :disabled="analyzing"
        class="mx-2"
        type="info"
        @click="requestAnalysis"
      >
        <i class="ni ni-chart-bar-32 mr-2"></i>
        {{ analyzing ? "分析中..." : "查看结果" }}
      </base-button>
    </div>

    <!-- 结果展示部分 -->
    <div v-if="resultVisible">
      <!-- 结果卡片 -->
      <div ref="resultCard" class="result-section">
        <!-- 邀请码卡片 -->
        <card class="mb-4" shadow>
          <div class="p-3">
            <h3>邀请码</h3>
            <p v-if="inviteCode" class="mb-0">
              您的邀请码是：<span>{{ inviteCode }}</span
              >，将邀请码发送给您的朋友，在注册时使用
            </p>
            <p v-else class="text-muted">获取邀请码中...</p>
          </div>
        </card>

        <!-- 得分概览卡片 -->
        <card class="mb-4" shadow>
          <div class="p-3">
            <h3>得分概览</h3>
            <div
              v-for="(trait, index) in traits"
              :key="trait.key"
              :class="{ 'mb-0': index === traits.length - 1 }"
            >
              <base-progress
                :height="20"
                :label="trait.label"
                :type="trait.type"
                :value="personalityScores[trait.key]"
              >
              </base-progress>
            </div>
          </div>
        </card>

        <!-- 结果解释卡片 -->
        <card class="mb-4" shadow>
          <div class="p-3">
            <h3>结果解释</h3>
            <p>
              以下是对您的人格特质分析的详细解释，每个维度都反映了您独特的个性特点：
            </p>
            <div
              v-for="(trait, index) in traits"
              :key="'desc-' + trait.key"
              :class="{ 'mb-0': index === traits.length - 1 }"
            >
              <h6 :style="{ color: trait.color }">
                {{ trait.label }}（{{ personalityScores[trait.key] }}%）
              </h6>
              <p>
                {{ trait.description }}
              </p>
            </div>
          </div>
        </card>
      </div>

      <!-- 操作按钮 -->
      <div class="text-center mt-4">
        <base-button
          :disabled="savingImage"
          class="mx-2"
          type="primary"
          @click="saveAsImage"
        >
          <i class="ni ni-camera-compact mr-2"></i>
          {{ savingImage ? "保存中..." : "保存结果图片" }}
        </base-button>

        <router-link to="/">
          <base-button size="md" type="default" @click="handleLogout">
            <i class="ni ni-user-run mr-2"></i>
            退出测试
          </base-button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import api from "@/services/api";
import ossService from "@/services/oss";

export default {
  name: "Result",
  props: {
    signatureFile: {
      type: File,
      required: true,
    },
    videoFile: {
      type: File,
      required: true,
    },
    videoTimesFile: {
      type: File,
      required: true,
    },
    answerFile: {
      type: File,
      required: true,
    },
  },
  data() {
    return {
      resultVisible: false,
      downloading: false,
      uploading: false,
      analyzing: false,
      fileStatus: {
        signature: false,
        video: false,
        videoTimes: false,
        answer: false,
      },
      fileLabels: {
        signature: "签名文件",
        video: "视频文件",
        videoTimes: "时间轴文件",
        answer: "量表文件",
      },
      personalityScores: {
        agreeableness: 0,
        openness: 0,
        extraversion: 0,
        conscientiousness: 0,
        neuroticism: 0,
      },
      traits: [
        {
          key: "openness",
          label: "开放性",
          type: "default",
          color: "#172b4d",
          description:
            "开放性反映了个体对新经验的接受程度。高分表示您富有创造力、好奇心强，愿意尝试新事物；低分则表示您更倾向于传统和熟悉的事物。",
        },
        {
          key: "conscientiousness",
          label: "尽责性",
          type: "success",
          color: "#2dce89",
          description:
            "尽责性反映了个体的自律程度和目标导向性。高分表示您做事认真负责、有条理、善于规划；低分则表示您更随性灵活。",
        },
        {
          key: "extraversion",
          label: "外向性",
          type: "warning",
          color: "#fb6340",
          description:
            "外向性反映了个体在社交互动中的倾向。高分表示您善于社交、充满活力；低分则表示您更喜欢独处和安静的环境。",
        },
        {
          key: "agreeableness",
          label: "宜人性",
          type: "primary",
          color: "#5e72e4",
          description:
            "宜人性反映了个体与他人相处的态度。高分表示您富有同理心、乐于助人；低分则表示您更独立、直率。",
        },
        {
          key: "neuroticism",
          label: "神经质",
          type: "danger",
          color: "#f5365c",
          description:
            "神经质反映了个体的情绪稳定性。高分表示您较容易受环境影响而情绪波动；低分则表示您情绪稳定、抗压能力强。",
        },
      ],
      savingImage: false,
      inviteCode: "",
    };
  },
  computed: {
    allFilesReady() {
      return Object.values(this.fileStatus).every((status) => status);
    },
  },
  methods: {
    ...mapActions("modal", ["showError", "showMessage"]),
    checkFiles() {
      console.log({
        signatureFile: this.signatureFile,
        videoFile: this.videoFile,
        videoTimesFile: this.videoTimesFile,
        answerFile: this.answerFile,
      });
      this.fileStatus = {
        signature: !!this.signatureFile,
        video: !!this.videoFile,
        videoTimes: !!this.videoTimesFile,
        answer: !!this.answerFile,
      };
    },

    async downloadFiles() {
      this.downloading = true;
      try {
        const fileConfigs = [
          { file: this.videoFile, filename: "video.webm" },
          { file: this.videoTimesFile, filename: "videoTimes.csv" },
          { file: this.signatureFile, filename: "signature.png" },
          { file: this.answerFile, filename: "answer.csv" },
        ];

        for (const config of fileConfigs) {
          if (config.file) {
            const url = URL.createObjectURL(config.file);
            const link = document.createElement("a");
            link.href = url;
            link.download = config.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        }
        this.showMessage({
          title: "提示",
          message: "文件下载成功",
        });
      } catch (error) {
        this.showError({
          title: "错误",
          message: "文件下载失败",
        });
      } finally {
        this.downloading = false;
      }
    },

    async uploadFiles() {
      this.uploading = true;
      try {
        if (!this.signatureFile) {
          await this.showError({
            title: "错误",
            message: "签名文件缺失",
          });
          return;
        }
        await ossService.uploadToOSS(
          "signature/part2",
          this.signatureFile,
          "signature",
        );

        if (!this.videoFile) {
          await this.showError({
            title: "错误",
            message: "视频文件缺失",
          });
          return;
        }
        await ossService.multipartUploadToOSS(
          "video/part2",
          this.videoFile,
          "video",
        );

        if (!this.videoTimesFile) {
          await this.showError({
            title: "错误",
            message: "时间轴文件缺失",
          });
          return;
        }
        await ossService.uploadToOSS(
          "videosTimes/part2",
          this.videoTimesFile,
          "videosTimes",
        );

        if (!this.answerFile) {
          await this.showError({
            title: "错误",
            message: "量表文件缺失",
          });
          return;
        }
        await ossService.uploadToOSS("answer/part2", this.answerFile, "answer");

        this.showMessage({
          title: "提示",
          message: "上传成功",
        });
      } catch (error) {
        this.showError({
          title: "错误",
          message: "上传失败，请将本地文件发送给管理员",
        });
      } finally {
        this.uploading = false;
      }
    },
    async requestAnalysis() {
      this.analyzing = true;
      try {
        if (!this.answerFile) {
          await this.showError({
            title: "错误",
            message: "量表文件缺失",
          });
          return;
        }
        const answerFileFormData = new FormData();
        answerFileFormData.append("answer", this.answerFile);
        const response = await api.collection.getScore(answerFileFormData);
        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.personalityScores = {
            agreeableness:
              Math.round(response.data.data.agreeableness * 10000) / 100 || 0,
            openness:
              Math.round(response.data.data.openness * 10000) / 100 || 0,
            extraversion:
              Math.round(response.data.data.extraversion * 10000) / 100 || 0,
            conscientiousness:
              Math.round(response.data.data.conscientiousness * 10000) / 100 ||
              0,
            neuroticism:
              Math.round(response.data.data.neuroticism * 10000) / 100 || 0,
          };
          this.resultVisible = true;
        } else {
          await this.showError({
            title: "错误",
            message: "获取分析结果失败，请重试",
          });
        }
      } catch (error) {
        await this.showError({
          title: "错误",
          message: "获取分析结果失败，请重试",
        });
      } finally {
        this.analyzing = false;
      }
    },
    handleLogout() {
      this.$store.commit("CLEAR_TOKEN");
      this.$router.push("/");
    },
    async saveAsImage() {
      this.savingImage = true;
      try {
        const html2canvas = (await import("html2canvas")).default;

        const element = this.$refs.resultCard;
        const canvas = await html2canvas(element, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const link = document.createElement("a");
        link.download = "result.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showMessage({
          title: "提示",
          message: "结果保存成功",
        });
      } catch (error) {
        this.showError({
          title: "错误",
          message: "结果保存失败",
        });
      } finally {
        this.savingImage = false;
      }
    },
    async getInviteCode() {
      try {
        const response = await api.auth.profile();
        if (
          response.status === 200 &&
          response.data &&
          response.data.code === 1
        ) {
          this.inviteCode = response.data.data.inviteCode;
        } else {
          this.showError({
            title: "错误",
            message: "获取邀请码失败",
          });
        }
      } catch (error) {
        this.showError({
          title: "错误",
          message: "获取邀请码失败",
        });
      }
    },
  },
  created() {
    this.checkFiles();
    this.getInviteCode();
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 700 !important;
}
</style>
