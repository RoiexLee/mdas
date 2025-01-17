import OSS from "ali-oss";
import api from "./api";

class OSSService {
  constructor() {
    this.ossClient = null;
    this.clientExpireTime = -1;
    this.credentials = null;
    this.chunkSize = 1024 * 1024;
    this.progress = 0;
  }

  isClientValid() {
    if (!this.ossClient || this.clientExpireTime === -1) {
      return false;
    }
    return Date.now() < this.clientExpireTime;
  }

  async getOSSToken() {
    const response = await api.oss.getAccess();

    if (response.data.code !== 1) {
      throw new Error(`Failed to fetch OSS token: ${response.data.message}`);
    }

    return response.data.data;
  }

  async refreshToken() {
    const newCredentials = await this.getOSSToken();
    this.clientExpireTime = Date.now() + 900000;
    return {
      accessKeyId: newCredentials.accessKeyId,
      accessKeySecret: newCredentials.accessKeySecret,
      stsToken: newCredentials.securityToken,
    };
  }

  async initOSSClient() {
    try {
      this.credentials = await this.getOSSToken();
      this.clientExpireTime = Date.now() + 900000;

      this.ossClient = new OSS({
        region: this.credentials.region,
        accessKeyId: this.credentials.accessKeyId,
        accessKeySecret: this.credentials.accessKeySecret,
        bucket: this.credentials.bucketName,
        stsToken: this.credentials.securityToken,
        endpoint: this.credentials.endpoint,
        refreshSTSToken: async () => this.refreshToken(),
        refreshSTSTokenInterval: 900000,
      });
    } catch (error) {
      console.error("Failed to initialize OSS client:", error);
      throw error;
    }
  }

  generateFileName(folder, file) {
    const fileExtension = file.name
      .substring(file.name.lastIndexOf(".") + 1)
      .toLowerCase();
    return `${folder}/${this.credentials.fileName}.${fileExtension}`;
  }

  async ensureClient() {
    if (!this.isClientValid()) {
      await this.initOSSClient();
    }
  }

  async uploadToOSS(folder, file, fileType) {
    try {
      await this.ensureClient();
      const fileName = this.generateFileName(folder, file);

      const result = await this.ossClient.put(fileName, file);
      console.log(
        `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} upload to OSS successful:`,
        result,
      );
      return result;
    } catch (error) {
      console.error(`Failed to upload ${fileType} to OSS:`, error);
      throw new Error(
        `OSS ${fileType.charAt(0).toUpperCase() + fileType.slice(1)} Upload Failed`,
      );
    }
  }

  async multipartUploadToOSS(folder, file, fileType) {
    const progress = (p, _checkpoint) => {
      console.log(`上传进度：${(p * 100).toFixed(2)}%`);
      console.log(_checkpoint);
      this.progress = (p * 100).toFixed(2);
    };

    try {
      await this.ensureClient();
      const fileName = this.generateFileName(folder, file);

      const result = await this.ossClient.multipartUpload(fileName, file, {
        partSize: this.chunkSize,
        progress,
        headers: {
          "x-oss-storage-class": "Standard",
          "x-oss-tagging": "Tag1=1&Tag2=2",
          "x-oss-forbid-overwrite": "true",
        },
      });

      console.log("文件上传成功：", result);
      return result;
    } catch (error) {
      if (error.code === "ConnectionTimeoutError") {
        console.log("超时错误，尝试重新上传");
      }
      console.error("分片上传失败：", error);
      throw new Error(
        `OSS ${fileType.charAt(0).toUpperCase() + fileType.slice(1)} Upload Failed`,
      );
    }
  }
}

export default new OSSService();
