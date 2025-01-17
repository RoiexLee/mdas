export default class RecordingService {
  constructor() {
    this.mediaRecorder = null;
    this.recordedChunks = [];
	this.startVideoTime = null;
    this.videoTimes = {};
    this.currentStream = null;
  }

  async startAudioRecording(maxDuration = 0) {
    try {
      this.recordedChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      this.currentStream = stream;
      return this._startRecording(stream, "audio/webm", maxDuration);
    } catch (error) {
      throw new Error("启动音频录制失败");
    }
  }

  async startVideoRecording(videoElement, maxDuration = 0) {
    if (!videoElement) {
      throw new Error("视频元素未准备就绪");
    }

    try {
      this.recordedChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1280 },
          height: { min: 720 },
          frameRate: { min: 30 },
          facingMode: "user",
        },
        audio: true,
      });

      this.currentStream = stream;
      videoElement.srcObject = stream;
      videoElement.muted = true;

      // 等待视频元素加载完成
      await new Promise((resolve, reject) => {
        videoElement.onloadedmetadata = () => {
          videoElement
            .play()
            .then(resolve)
            .catch((error) =>
              reject(new Error("视频播放失败：" + error.message)),
            );
        };
        videoElement.onerror = () => reject(new Error("视频加载失败"));
      });

      return this._startRecording(stream, "video/webm", maxDuration);
    } catch (error) {
      this._cleanupVideoElement(videoElement);
      throw new Error("启动视频录制失败");
    }
  }

  _startRecording(stream, mimeType, maxDuration) {
    return new Promise((resolve, reject) => {
      try {
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: mimeType,
        });

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        // 开始录制
        this.mediaRecorder.start();

        // 如果设置了最大录制时长
        if (maxDuration > 0) {
          setTimeout(() => {
            if (
              this.mediaRecorder &&
              this.mediaRecorder.state === "recording"
            ) {
              this.stopRecording();
            }
          }, maxDuration);
        }

        resolve(this.mediaRecorder);
      } catch (error) {
        reject(new Error("启动录制失败：" + (error.message || "未知错误")));
      }
    });
  }

  async stopRecording(videoElement = null) {
    if (!this.mediaRecorder) {
      throw new Error("录制尚未开始");
    }

    return new Promise((resolve, reject) => {
      try {
        this.mediaRecorder.onstop = () => {
          try {
            if (this.currentStream) {
              this.currentStream.getTracks().forEach((track) => track.stop());
            }

            if (videoElement) {
              videoElement.srcObject = null;
            }

            const blob = new Blob(this.recordedChunks, {
              type: this.mediaRecorder.mimeType,
            });
            const url = URL.createObjectURL(blob);

            resolve({
              url,
              blob,
              file: new File(
                [blob],
                `recording.${this.mediaRecorder.mimeType.split("/")[1]}`,
                { type: this.mediaRecorder.mimeType },
              ),
            });
          } catch (error) {
            reject(
              new Error("处理录制文件失败：" + (error.message || "未知错误")),
            );
          }
        };

        this.mediaRecorder.stop();
      } catch (error) {
        reject(new Error("停止录制失败：" + (error.message || "未知错误")));
      }
    });
  }

  _cleanupVideoElement(videoElement) {
    if (videoElement && videoElement.srcObject) {
      videoElement.srcObject.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  }

  recordVideoTime(timePoint) {
    if (!timePoint) {
      throw new Error("时间点标识不能为空");
    }
	if (timePoint === "start") {
		this.startVideoTime = new Date().getTime();
	} else if(!this.startVideoTime) {
		throw new Error("开始录制时间未记录");
	} else {
		this.videoTimes[timePoint] = new Date().getTime() - this.startVideoTime;
	}
  }

  createVideoTimesFile() {
    const csv = Object.entries(this.videoTimes)
      .map(([key, time]) => `${key},${time}`)
      .join("\n");
    return new File([csv], "times.csv", { type: "text/csv" });
  }
}
