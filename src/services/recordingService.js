export default class RecordingService {
  constructor() {
    this.mediaRecorder = null;
    this.recordedChunks = [];
	this.startVideoTime = null;
    this.videoTimes = {};
    this.currentStream = null;
    this.onAutoStop = null;
  }

  async startAudioRecording(maxDuration = 0) {
    try {
      this.recordedChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // 检查音频轨道
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        stream.getTracks().forEach(track => track.stop());
        throw new Error("未检测到麦克风输入");
      }

      this.currentStream = stream;
      return this._startRecording(stream, "audio/webm", maxDuration);
    } catch (error) {
      throw new Error(error.message || "启动音频录制失败");
    }
  }

  async startVideoRecording(videoElement, maxDuration = 0) {
    if (!videoElement) {
      throw new Error("视频元素尚未准备就绪");
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
      
      // 检查获取到的视频轨道参数
      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      
      const errors = [];
      if (settings.width < 1280 || settings.height < 720) {
        errors.push("摄像头分辨率不足，要求至少1280x720");
      }
      if (settings.frameRate < 30) {
        errors.push("摄像头帧率不足，要求至少30fps");
      }

      if (errors.length > 0) {
        stream.getTracks().forEach(track => track.stop());
        throw new Error(errors[0]);
      }

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
              reject(new Error("视频播放失败")),
            );
        };
        videoElement.onerror = () => reject(new Error("视频加载失败"));
      });

      return this._startRecording(stream, "video/webm", maxDuration);
    } catch (error) {
      this._cleanupVideoElement(videoElement);
      throw new Error(error.message || "启动视频录制失败");
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

        this.mediaRecorder.start();

        if (maxDuration > 0) {
          setTimeout(() => {
            if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
              this.mediaRecorder.stop();
            }
          }, maxDuration);
        }

        this.mediaRecorder.onstop = async () => {
          try {
            if (this.currentStream) {
              this.currentStream.getTracks().forEach((track) => track.stop());
            }

            const blob = new Blob(this.recordedChunks, {
              type: this.mediaRecorder.mimeType,
            });
            const url = URL.createObjectURL(blob);
            const result = {
              url,
              blob,
              file: new File(
                [blob],
                `recording.${this.mediaRecorder.mimeType.split("/")[1]}`,
                { type: this.mediaRecorder.mimeType },
              ),
            };

            if (this.onAutoStop) {
              this.onAutoStop(result);
            }

            resolve(result);
          } catch (error) {
            reject(new Error("处理录制文件失败"));
          }
        };

        resolve(this.mediaRecorder);
      } catch (error) {
        reject(new Error("启动录制失败"));
      }
    });
  }

  async stopRecording(videoElement = null) {
    if (!this.mediaRecorder) {
      throw new Error("录制尚未开始");
    }

    if (videoElement) {
      videoElement.srcObject = null;
    }

    // 如果已经停止，直接返回
    if (this.mediaRecorder.state === "inactive") {
      return;
    }

    this.mediaRecorder.stop();
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
		throw new Error("开始录制时间尚未记录");
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

  setAutoStopCallback(callback) {
    this.onAutoStop = callback;
  }
}
