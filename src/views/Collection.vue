<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span v-for="n in 8" :key="n"></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <!-- 开发者模式按钮 -->
        <div v-if="isDev" class="col-lg-4 text-center">
          <card
            body-classes="px-lg-5 py-lg-5"
            class="text-center border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <div class="form-group">
              <label class="form-control-label">选择状态</label>
              <select v-model="state" class="form-control">
                <option
                  v-for="(value, key) in STATES"
                  :key="key"
                  :value="value"
                >
                  {{ key }}
                </option>
              </select>
            </div>
          </card>
        </div>
        <!-- 视频部分 -->
        <div v-if="showVideo" class="col-lg-4 text-center">
          <card
            body-classes="px-lg-5 py-lg-5"
            class="text-center border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <video
              ref="video"
              autoplay
              class="video-preview"
              height="auto"
              muted
              playsinline
              width="100%"
              @error="handleVideoError"
              @loadedmetadata="handleVideoLoaded"
            ></video>
          </card>
        </div>

        <!-- 主要内容区域 -->
        <div class="col-lg-8">
          <!-- 签名组件 -->
          <card
            v-if="state === STATES.SIGNATURE"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">{{ SIGNATURE_CONFIG.title }}</h1>
            <div class="content">
              <div
                v-for="(section, sectionIndex) in SIGNATURE_CONFIG.sections"
                :key="`section-${sectionIndex}`"
              >
                <h2 class="h5 mt-4">{{ section.title }}</h2>
                <p
                  v-for="(item, itemIndex) in section.content"
                  :key="`content-${sectionIndex}-${itemIndex}`"
                  :style="item.style"
                >
                  {{ item.text }}
                </p>
              </div>
            </div>
            <Signature
              @finish="
                (value) => updateState(STATES.NOTICE_ANNOUNCEMENT, value)
              "
            >
            </Signature>
          </card>

          <!-- 注意事项公告 -->
          <card
            v-if="state === STATES.NOTICE_ANNOUNCEMENT"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">
              {{ NOTICE_ANNOUNCEMENT_CONFIG.title }}
            </h1>
            <div class="content">
              <p
                v-for="(item, index) in NOTICE_ANNOUNCEMENT_CONFIG.content"
                :key="index"
                :style="item.style"
              >
                {{ item.text }}
              </p>
            </div>
            <div class="text-center mt-3">
              <countdown-button
                :key="state"
                :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                :text="NOTICE_ANNOUNCEMENT_CONFIG.buttonText"
                :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                buttonClass="btn btn-primary"
                @click="() => updateState(STATES.TEST)"
              >
              </countdown-button>
            </div>
          </card>

          <!-- 设备测试组件 -->
          <card
            v-if="state === STATES.TEST"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <Test @finish="() => updateState(STATES.WATCH)"></Test>
          </card>

          <!-- 观看视频组件 -->
          <card
            v-if="state === STATES.WATCH"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">
              {{ WATCH_CONFIG.title }}
            </h1>
            <div class="content">
              <p
                v-for="(item, index) in WATCH_CONFIG.content"
                :key="index"
                :style="item.style"
              >
                {{ item.text }}
              </p>
            </div>
            <Watch @finish="() => updateState(STATES.QUESTION_ANNOUNCEMENT)">
            </Watch>
          </card>

          <!-- 问题公告 -->
          <card
            v-if="state === STATES.QUESTION_ANNOUNCEMENT"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">
              {{ QUESTION_ANNOUNCEMENT_CONFIG.title }}
            </h1>
            <div class="content">
              <p
                v-for="(item, index) in QUESTION_ANNOUNCEMENT_CONFIG.content"
                :key="index"
                :style="item.style"
              >
                {{ item.text }}
              </p>
            </div>
            <div class="text-center mt-3">
              <countdown-button
                :key="state"
                :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                :text="QUESTION_ANNOUNCEMENT_CONFIG.buttonText"
                :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                buttonClass="btn btn-primary"
                @click="() => updateState(STATES.QUESTION_1_THINK)"
              >
              </countdown-button>
            </div>
          </card>

          <!-- 问题部分 -->
          <template v-if="currentQuestion">
            <card
              body-classes="px-lg-5 py-lg-5"
              class="border-0 mt-1 mb-1"
              header-classes="bg-white"
              shadow
            >
              <h1 class="text-center mb-3">
                {{ currentQuestion.title }}
              </h1>
              <div class="content">
                <p>{{ currentQuestion.content }}</p>
                <p>
                  {{
                    state % 2 === 1
                      ? currentQuestion.think.hint
                      : currentQuestion.answer.hint
                  }}
                </p>
              </div>
              <div class="text-center mt-3">
                <countdown-button
                  :key="state"
                  :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                  :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                  :text="
                    state % 2 === 1
                      ? currentQuestion.think.buttonText
                      : currentQuestion.answer.buttonText
                  "
                  :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                  buttonClass="btn btn-primary"
                  @click="() => updateState(state + 1)"
                >
                </countdown-button>
              </div>
            </card>
          </template>

          <!-- 墨迹测试公告 -->
          <card
            v-if="state === STATES.RORSCHACH_ANNOUNCEMENT"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">
              {{ RORSCHACH_ANNOUNCEMENT_CONFIG.title }}
            </h1>
            <div class="content">
              <template
                v-for="(item, index) in RORSCHACH_ANNOUNCEMENT_CONFIG.content"
              >
                <div
                  v-if="index === 2"
                  :key="`img-${index}`"
                  class="text-center mb-3"
                >
                  <img
                    :src="RORSCHACH_ANNOUNCEMENT_CONFIG.exampleImage"
                    alt="墨迹图"
                    class="img-fluid rounded shadow"
                    width="80%"
                  />
                </div>
                <p v-else :key="`text-${index}`" :style="item.style">
                  {{ item.text }}
                </p>
              </template>
            </div>
            <div class="text-center mt-3">
              <countdown-button
                :key="state"
                :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                :text="RORSCHACH_ANNOUNCEMENT_CONFIG.buttonText"
                :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                buttonClass="btn btn-primary"
                @click="() => updateState(STATES.RORSCHACH_1_THINK)"
              >
              </countdown-button>
            </div>
          </card>

          <!-- 墨迹测试部分 -->
          <template v-if="currentRorschachTest">
            <card
              body-classes="px-lg-5 py-lg-5"
              class="border-0 mt-1 mb-1"
              header-classes="bg-white"
              shadow
            >
              <h1 class="text-center mb-3">
                {{ currentRorschachTest.title }} {{ currentRorschachTest.id }}
              </h1>
              <div class="content">
                <p>{{ currentRorschachTest.description }}</p>
                <div class="text-center mb-3">
                  <img
                    :src="currentRorschachTest.image"
                    alt="墨迹图"
                    class="img-fluid rounded shadow"
                    width="80%"
                  />
                </div>
                <p>
                  {{
                    state % 2 === 0
                      ? currentRorschachTest.think.hint
                      : currentRorschachTest.answer.hint
                  }}
                </p>
              </div>
              <div class="text-center mt-3">
                <countdown-button
                  :key="state"
                  :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                  :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                  :text="
                    state % 2 === 0
                      ? currentRorschachTest.think.buttonText
                      : currentRorschachTest.answer.buttonText
                  "
                  :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                  buttonClass="btn btn-primary"
                  @click="() => updateState(state + 1)"
                >
                </countdown-button>
              </div>
            </card>
          </template>

          <!-- 量表公告 -->
          <card
            v-if="state === STATES.SCALE_ANNOUNCEMENT"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <h1 class="text-center mb-3">
              {{ SCALE_ANNOUNCEMENT_CONFIG.title }}
            </h1>
            <div class="content">
              <p
                v-for="(item, index) in SCALE_ANNOUNCEMENT_CONFIG.content"
                :key="index"
                :style="item.style"
              >
                {{ item.text }}
              </p>
            </div>
            <div class="text-center mt-3">
              <countdown-button
                :key="state"
                :autoClick="COUNTDOWN_CONFIG[state].autoClick"
                :autoDuration="COUNTDOWN_CONFIG[state].autoDuration"
                :text="SCALE_ANNOUNCEMENT_CONFIG.buttonText"
                :unlockDuration="COUNTDOWN_CONFIG[state].unlockDuration"
                buttonClass="btn btn-primary"
                @click="() => updateState(STATES.SCALE)"
              >
              </countdown-button>
            </div>
          </card>

          <!-- 量表部分 -->
          <card
            v-if="state === STATES.SCALE"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <Scale
              :description="SCALE_CONFIG.description"
              :questions="SCALE_CONFIG.questions"
              :title="SCALE_CONFIG.title"
              @finish="(value) => updateState(STATES.RESULT, value)"
            >
            </Scale>
          </card>

          <card
            v-if="state === STATES.RESULT"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mt-1 mb-1"
            header-classes="bg-white"
            shadow
          >
            <Result
              v-if="state === STATES.RESULT"
              :signatureFile="signatureFile"
              :videoFile="videoFile"
              :videoTimesFile="videoTimesFile"
              :answerFile="answerFile"
            ></Result>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CountdownButton from "@/views/custom/CountdownButton.vue";
import Modal from "@/components/Modal.vue";
import Signature from "@/views/custom/Signature.vue";
import Watch from "@/views/custom/Watch.vue";
import Scale from "@/views/custom/Scale.vue";
import Test from "@/views/custom/Test.vue";
import Result from "@/views/custom/Result.vue";
import RecordingService from "@/services/recordingService";
import { mapActions } from "vuex";
import {
  COUNTDOWN_CONFIG,
  NOTICE_ANNOUNCEMENT_CONFIG,
  QUESTION_ANNOUNCEMENT_CONFIG,
  QUESTIONS_CONFIG,
  RORSCHACH_ANNOUNCEMENT_CONFIG,
  RORSCHACH_CONFIG,
  SCALE_ANNOUNCEMENT_CONFIG,
  SCALE_CONFIG,
  SIGNATURE_CONFIG,
  STATES,
  WATCH_CONFIG,
} from "@/config/collection";

export default {
  name: "Collection",
  components: {
    CountdownButton,
    Modal,
    Signature,
    Watch,
    Scale,
    Test,
    Result,
  },
  data() {
    return {
      STATES,
      COUNTDOWN_CONFIG,
      SIGNATURE_CONFIG,
      NOTICE_ANNOUNCEMENT_CONFIG,
      WATCH_CONFIG,
      QUESTION_ANNOUNCEMENT_CONFIG,
      QUESTIONS_CONFIG,
      RORSCHACH_ANNOUNCEMENT_CONFIG,
      RORSCHACH_CONFIG,
      SCALE_ANNOUNCEMENT_CONFIG,
      SCALE_CONFIG,
      state: STATES.SIGNATURE,
      recordingService: new RecordingService(),
      signatureFile: null,
      videoFile: null,
      videoTimesFile: null,
      answerFile: null,
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    currentQuestion() {
      const questionIndex = Math.floor(
        (this.state - STATES.QUESTION_1_THINK) / 2,
      );
      return questionIndex >= 0 && questionIndex < QUESTIONS_CONFIG.length
        ? QUESTIONS_CONFIG[questionIndex]
        : null;
    },
    currentRorschachTest() {
      const testIndex = Math.floor((this.state - STATES.RORSCHACH_1_THINK) / 2);
      return testIndex >= 0 && testIndex < RORSCHACH_CONFIG.length
        ? RORSCHACH_CONFIG[testIndex]
        : null;
    },
    showVideo() {
      return (
        this.state >= STATES.WATCH && this.state <= STATES.RORSCHACH_5_ANSWER
      );
    },
  },
  methods: {
    ...mapActions("modal", ["showError", "showMessage"]),
    handleVideoError(error) {
      this.showError({
        title: "视频错误",
        message: "视频加载失败",
      });
    },
    handleVideoLoaded() {
      const video = this.$refs.video;
      if (video && video.srcObject) {
        video.play().catch((error) => {
          this.showError({
            title: "视频错误",
            message: "视频播放失败",
          });
        });
      }
    },
    async startVideoRecording() {
      try {
        await this.$nextTick();
        await this.recordingService.startVideoRecording(this.$refs.video);
        this.recordingService.recordVideoTime("start");
      } catch (error) {
        this.showError({
          title: "录制错误",
          message: error.message || "启动录制失败",
        });
      }
    },
    async updateState(newState, value) {
      this.state = newState;

      switch (newState) {
        case this.STATES.SIGNATURE:
          break;

        case this.STATES.NOTICE_ANNOUNCEMENT:
          if (value) {
            this.signatureFile = value;
          }
          break;

        case this.STATES.TEST:
          break;

        case this.STATES.WATCH:
          await this.startVideoRecording();
          this.recordingService.recordVideoTime("start");
          break;

        case this.STATES.QUESTION_ANNOUNCEMENT:
          this.recordingService.recordVideoTime("watch");
          break;

        case this.STATES.QUESTION_1_THINK:
          this.recordingService.recordVideoTime("questionAnnouncement");
          break;

        case this.STATES.QUESTION_1_ANSWER:
          this.recordingService.recordVideoTime("questionOneThink");
          break;

        case this.STATES.QUESTION_2_THINK:
          this.recordingService.recordVideoTime("questionOneAnswer");
          break;

        case this.STATES.QUESTION_2_ANSWER:
          this.recordingService.recordVideoTime("questionTwoThink");
          break;

        case this.STATES.QUESTION_3_THINK:
          this.recordingService.recordVideoTime("questionTwoAnswer");
          break;

        case this.STATES.QUESTION_3_ANSWER:
          this.recordingService.recordVideoTime("questionThreeThink");
          break;

        case this.STATES.QUESTION_4_THINK:
          this.recordingService.recordVideoTime("questionThreeAnswer");
          break;

        case this.STATES.QUESTION_4_ANSWER:
          this.recordingService.recordVideoTime("questionFourThink");
          break;

        case this.STATES.QUESTION_5_THINK:
          this.recordingService.recordVideoTime("questionFourAnswer");
          break;

        case this.STATES.QUESTION_5_ANSWER:
          this.recordingService.recordVideoTime("questionFiveThink");
          break;

        case this.STATES.RORSCHACH_ANNOUNCEMENT:
          this.recordingService.recordVideoTime("questionFiveAnswer");
          break;

        case this.STATES.RORSCHACH_1_THINK:
          this.recordingService.recordVideoTime("rorschachAnnouncement");
          break;

        case this.STATES.RORSCHACH_1_ANSWER:
          this.recordingService.recordVideoTime("rorschachOneThink");
          break;

        case this.STATES.RORSCHACH_2_THINK:
          this.recordingService.recordVideoTime("rorschachOneAnswer");
          break;

        case this.STATES.RORSCHACH_2_ANSWER:
          this.recordingService.recordVideoTime("rorschachTwoThink");
          break;

        case this.STATES.RORSCHACH_3_THINK:
          this.recordingService.recordVideoTime("rorschachTwoAnswer");
          break;

        case this.STATES.RORSCHACH_3_ANSWER:
          this.recordingService.recordVideoTime("rorschachThreeThink");
          break;

        case this.STATES.RORSCHACH_4_THINK:
          this.recordingService.recordVideoTime("rorschachThreeAnswer");
          break;

        case this.STATES.RORSCHACH_4_ANSWER:
          this.recordingService.recordVideoTime("rorschachFourThink");
          break;

        case this.STATES.RORSCHACH_5_THINK:
          this.recordingService.recordVideoTime("rorschachFourAnswer");
          break;

        case this.STATES.RORSCHACH_5_ANSWER:
          this.recordingService.recordVideoTime("rorschachFiveThink");
          break;

        case this.STATES.SCALE_ANNOUNCEMENT:
          try {
            this.videoFile = await this.recordingService.stopRecording(
              this.$refs.video,
            );
            this.recordingService.recordVideoTime("rorschachFiveAnswer");
            this.videoTimesFile = this.recordingService.createVideoTimesFile();
          } catch (error) {
            this.showError({
              title: "录制错误",
              message: "停止录制失败",
            });
          }
          break;

        case this.STATES.SCALE:
          break;

        case this.STATES.RESULT:
          if (value) {
            this.answerFile = value;
          }
          break;
      }
    },
    logOut() {
      this.$store.commit("CLEAR_TOKEN");
    },
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
p {
  font-weight: 700 !important;
}
</style>
