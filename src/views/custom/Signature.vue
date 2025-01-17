<template>
  <section>
    <div class="text-center mt-3 mb-3">
      <base-input v-model="username" placeholder="请输入你的姓名"></base-input>
      <canvas
        ref="signatureCanvas"
        :height="200"
        :style="{ border: '2px solid #000000', marginTop: '1rem' }"
        :width="500"
      >
      </canvas>
      <div class="mt-3 mb-3">
        <base-button class="mr-3" type="secondary" @click="handleClear">
          清除
        </base-button>
        <base-button type="primary" @click="handleSave"> 确认</base-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signature",
  data() {
    return {
      username: "",
      context: null,
      isDrawing: false,
    };
  },
  methods: {
    ...mapActions("modal", ["showMessage"]),
    setupCanvas() {
      const canvas = this.$refs.signatureCanvas;
      this.context = canvas.getContext("2d");
      this.context.strokeStyle = "#000000";
      this.context.lineWidth = 2;
      this.context.lineCap = "round";

      canvas.addEventListener("mousedown", this.startDrawing);
      canvas.addEventListener("mousemove", this.draw);
      canvas.addEventListener("mouseup", this.stopDrawing);
      canvas.addEventListener("mouseleave", this.stopDrawing);

      canvas.addEventListener("touchstart", this.handleTouchStart);
      canvas.addEventListener("touchmove", this.handleTouchMove);
      canvas.addEventListener("touchend", this.stopDrawing);

      this.drawText();
    },
    startDrawing(event) {
      this.isDrawing = true;
      this.context.beginPath();
      const { offsetX, offsetY } = this.getCoordinates(event);
      this.context.moveTo(offsetX, offsetY);
    },
    draw(event) {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = this.getCoordinates(event);
      this.context.lineTo(offsetX, offsetY);
      this.context.stroke();
    },
    stopDrawing() {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      this.context.closePath();
    },
    handleTouchStart(event) {
      event.preventDefault();
      this.startDrawing(event.touches[0]);
    },
    handleTouchMove(event) {
      event.preventDefault();
      this.draw(event.touches[0]);
    },
    getCoordinates(event) {
      const canvas = this.$refs.signatureCanvas;
      const rect = canvas.getBoundingClientRect();
      let x, y;

      if (event.touches) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      } else {
        x = event.offsetX;
        y = event.offsetY;
      }

      return {
        offsetX: x,
        offsetY: y,
      };
    },
    handleClear() {
      const canvas = this.$refs.signatureCanvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.drawText();
    },
    drawText() {
      if (!this.username) return;

      const canvas = this.$refs.signatureCanvas;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

      let fontSize = 50;
      this.context.font = `${fontSize}px Arial`;

      while (
        this.context.measureText(this.username).width >
        canvas.width - 20
      ) {
        fontSize--;
        this.context.font = `${fontSize}px Arial`;
      }

      this.context.fillStyle = "#000000";
      this.context.fillText(this.username, canvas.width / 2, canvas.height / 2);
    },
    handleSave() {
      const canvas = this.$refs.signatureCanvas;
      const isEmpty = !this.context
        .getImageData(0, 0, canvas.width, canvas.height)
        .data.some((value) => value !== 0);

      if (isEmpty) {
        this.showMessage({
          title: "提示",
          message: "请先在画布上签名",
        });
        return;
      }

      const dataURL = canvas.toDataURL("image/png");
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new Uint8Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      const file = new File([blob], "signature.png", { type: "image/png" });
      this.$emit("finish", file);
    },
  },
  watch: {
    username() {
      this.handleClear();
    },
  },
  mounted() {
    this.setupCanvas();
  },
  beforeDestroy() {
    const canvas = this.$refs.signatureCanvas;
    canvas.removeEventListener("mousedown", this.startDrawing);
    canvas.removeEventListener("mousemove", this.draw);
    canvas.removeEventListener("mouseup", this.stopDrawing);
    canvas.removeEventListener("mouseleave", this.stopDrawing);
    canvas.removeEventListener("touchstart", this.handleTouchStart);
    canvas.removeEventListener("touchmove", this.handleTouchMove);
    canvas.removeEventListener("touchend", this.stopDrawing);
  },
};
</script>
