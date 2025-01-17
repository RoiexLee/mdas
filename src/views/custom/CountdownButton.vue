<template>
  <section>
    <button :class="buttonClass" :disabled="isDisabled" @click="handleClick">
      {{ buttonText }}
    </button>
  </section>
</template>

<script>
export default {
  name: "CountdownButton",
  props: {
    unlockDuration: {
      type: Number,
      default: 30,
    },
    autoDuration: {
      type: Number,
      default: 60,
    },
    autoClick: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "下一步",
    },
    buttonClass: {
      type: String,
      default: "btn btn-primary",
    },
  },
  data() {
    return {
      countdown: 0,
      timer: null,
      isUnlocked: false,
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    buttonText() {
      if (this.isDev) {
        return this.text;
      }
      if (!this.isUnlocked) {
        return `${this.countdown}秒后解锁`;
      } else if (this.countdown > 0) {
        return `${this.countdown}秒后自动继续`;
      }
      return this.text;
    },
    isDisabled() {
      return this.isDev ? false : !this.isUnlocked;
    },
  },
  methods: {
    startCountdown() {
      this.countdown = this.unlockDuration;
      this.isUnlocked = false;

      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          if (!this.isUnlocked) {
            this.isUnlocked = true;
            this.countdown = this.autoDuration - this.unlockDuration;
          } else {
            clearInterval(this.timer);
            if (this.autoClick) {
              this.handleClick();
            }
          }
        }
      }, 1000);
    },
    handleClick() {
      if (!this.isDisabled) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.$emit("click");
      }
    },
  },
  mounted() {
    this.startCountdown();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style></style>
