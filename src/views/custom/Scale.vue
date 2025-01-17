<template>
  <section>
    <form @submit.prevent="submitForm">
      <h1 class="text-center mb-4">{{ title }}</h1>

      <div>
        <p
          v-for="(desc, index) in description"
          :key="index"
          :style="desc.style"
        >
          {{ desc.text }}
        </p>
      </div>

      <div class="mb-4">
        <base-progress
          :height="10"
		  label="完成进度"
          :value="progress"
          type="default"
        >
        </base-progress>
      </div>

      <div
        v-for="(question, index) in paginatedQuestions"
        :key="question.originalIndex"
        class="text-center rounded pt-3 pb-1 mb-3 shadow-sm"
        style="background-color: #e9ecef"
      >
        <div class="mb-1">
          <label
            :for="'question-' + (currentPage * questionsPerPage + index)"
            style="font-weight: 700; font-size: medium"
          >
            {{ question.text }}
          </label>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <label v-for="option in [1, 2, 3, 4, 5]" :key="option" class="mx-3">
            <base-radio
              v-model="answers[question.originalIndex]"
              :name="String(option)"
              :value="String(option)"
            >
              {{ option }}
            </base-radio>
          </label>
        </div>
      </div>

      <div class="d-flex justify-content-center gap-3 mt-4 mb-4">
        <base-button
          v-if="isDev"
          class="mx-3"
          type="warning"
          @click="fillRandomAnswers"
        >
          随机填充
        </base-button>
        <base-button
          :disabled="currentPage === 0"
          class="mx-3"
          type="secondary"
          @click="prevPage"
        >
          上一页
        </base-button>
        <base-button
          :disabled="currentPage === totalPages - 1 || !canProceed"
          class="mx-3"
          type="primary"
          @click="nextPage"
        >
          下一页
        </base-button>
        <base-button
          v-if="currentPage === totalPages - 1"
          :disabled="!isComplete"
          class="mx-3"
          native-type="submit"
          type="success"
        >
          提交
        </base-button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Scale",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (item) =>
            typeof item === "object" &&
            "text" in item &&
            typeof item.text === "string",
        );
      },
    },
    questions: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (item) =>
            typeof item === "object" &&
            "text" in item &&
            typeof item.text === "string",
        );
      },
    },
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    totalPages() {
      return Math.ceil(this.shuffledQuestions.length / this.questionsPerPage);
    },
    paginatedQuestions() {
      const start = this.currentPage * this.questionsPerPage;
      const end = start + this.questionsPerPage;
      return this.shuffledQuestions.slice(start, end);
    },
    progress() {
      const answeredQuestions = this.answers.filter(
        (answer) => answer !== undefined,
      ).length;
      return Math.round((answeredQuestions / this.questions.length) * 100);
    },
    canProceed() {
      const currentPageAnswers = this.paginatedQuestions.map(
        (q) => this.answers[q.originalIndex],
      );
      return currentPageAnswers.every((answer) => answer !== undefined);
    },
    isComplete() {
      return (
        this.answers.filter((answer) => answer !== undefined).length ===
        this.questions.length
      );
    },
  },
  methods: {
    ...mapActions("modal", ["showMessage"]),
    prevPage() {
      if (this.currentPage > 0) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1 && this.canProceed) {
        this.currentPage++;
      }
    },
    submitForm() {
      if (!this.isComplete) {
        this.showMessage({
          title: "提示",
          message: "请完成所有问题后再提交",
        });
        return;
      }

      const csv = this.questions
        .map((question, index) => {
          const answer = parseInt(this.answers[index], 10);
          return `${index + 1},${question.text},${answer}`;
        })
        .join("\n");

      const file = new File([csv], "answer.csv", { type: "text/csv" });
      this.$emit("finish", file);
    },
    shuffleQuestions() {
      const shuffled = [...this.questions].map((q, idx) => ({
        ...q,
        originalIndex: idx,
      }));

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      this.shuffledQuestions = shuffled;
    },
    fillRandomAnswers() {
      if (!this.isDev) {
        return;
      }
      for (let i = 0; i < this.answers.length; i++) {
        this.$set(this.answers, i, String(Math.floor(Math.random() * 5) + 1));
      }
    },
  },
  data() {
    return {
      shuffledQuestions: [],
      answers: [],
      currentPage: 0,
      questionsPerPage: 5,
    };
  },
  created() {
    this.answers = new Array(this.questions.length);
    this.shuffleQuestions();
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
p,
span {
  font-weight: 700 !important;
}
</style>
