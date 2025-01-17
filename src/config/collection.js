export const STATES = {
  SIGNATURE: 0,
  NOTICE_ANNOUNCEMENT: 1,
  TEST: 2,
  WATCH: 3,
  QUESTION_ANNOUNCEMENT: 4,
  QUESTION_1_THINK: 5,
  QUESTION_1_ANSWER: 6,
  QUESTION_2_THINK: 7,
  QUESTION_2_ANSWER: 8,
  QUESTION_3_THINK: 9,
  QUESTION_3_ANSWER: 10,
  QUESTION_4_THINK: 11,
  QUESTION_4_ANSWER: 12,
  QUESTION_5_THINK: 13,
  QUESTION_5_ANSWER: 14,
  RORSCHACH_ANNOUNCEMENT: 15,
  RORSCHACH_1_THINK: 16,
  RORSCHACH_1_ANSWER: 17,
  RORSCHACH_2_THINK: 18,
  RORSCHACH_2_ANSWER: 19,
  RORSCHACH_3_THINK: 20,
  RORSCHACH_3_ANSWER: 21,
  RORSCHACH_4_THINK: 22,
  RORSCHACH_4_ANSWER: 23,
  RORSCHACH_5_THINK: 24,
  RORSCHACH_5_ANSWER: 25,
  SCALE_ANNOUNCEMENT: 26,
  SCALE: 27,
  RESULT: 28,
};

export const COUNTDOWN_CONFIG = {
  [STATES.NOTICE_ANNOUNCEMENT]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: false,
  },
  [STATES.QUESTION_ANNOUNCEMENT]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_1_THINK]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_1_ANSWER]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.QUESTION_2_THINK]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_2_ANSWER]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.QUESTION_3_THINK]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_3_ANSWER]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.QUESTION_4_THINK]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_4_ANSWER]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.QUESTION_5_THINK]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.QUESTION_5_ANSWER]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_ANNOUNCEMENT]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.RORSCHACH_1_THINK]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_1_ANSWER]: {
    unlockDuration: 90,
    autoDuration: 180,
    autoClick: true,
  },
  [STATES.RORSCHACH_2_THINK]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_2_ANSWER]: {
    unlockDuration: 90,
    autoDuration: 180,
    autoClick: true,
  },
  [STATES.RORSCHACH_3_THINK]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_3_ANSWER]: {
    unlockDuration: 90,
    autoDuration: 180,
    autoClick: true,
  },
  [STATES.RORSCHACH_4_THINK]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_4_ANSWER]: {
    unlockDuration: 90,
    autoDuration: 180,
    autoClick: true,
  },
  [STATES.RORSCHACH_5_THINK]: {
    unlockDuration: 30,
    autoDuration: 60,
    autoClick: true,
  },
  [STATES.RORSCHACH_5_ANSWER]: {
    unlockDuration: 90,
    autoDuration: 180,
    autoClick: true,
  },
  [STATES.SCALE_ANNOUNCEMENT]: {
    unlockDuration: 15,
    autoDuration: 30,
    autoClick: true,
  },
  [STATES.SCALE]: { unlockDuration: 30, autoDuration: 60, autoClick: false },
};

export const SIGNATURE_CONFIG = {
  title: "实验知情同意书",
  sections: [
    {
      title: "0. 研究说明",
      content: [
        {
          text: "您好，我们是合肥工业大学计算机与信息学院媒体计算实验室的研究团队。我们正邀请您参加一项心理学研究。",
          style: {},
        },
        {
          text: "请您仔细阅读本知情同意书并决定是否参与我们的研究。",
          style: { color: "#dc3545" },
        },
      ],
    },
    {
      title: "1. 研究目的",
      content: [
        {
          text: "本研究借助多种生理刺激、问答和行为检测方法，以期研究自动的大五人格评测方法。当下流行的MBTI人格测试虽然一定程度上能反映真实人格，但其测试结果的离散性以及无负面性导致学界对其科学性持质疑态度。",
          style: {},
        },
        {
          text: "因此，本项目的研究应用了心理学界广泛认可的大五人格模型，并致力于研究自动的大五人格评测方法。快速准确的自动人格识别和分析方法将极大地便利对个体心理的准确分析和把控，并助推情感呵护、心理健康分析等领域的发展。",
          style: {},
        },
      ],
    },
    {
      title: "2. 研究步骤",
      content: [
        {
          text: "本研究目前需要招募一批数据采集的志愿者，如果您符合入组标准，在您签署本知情同意书后，我们开始记录您的人口学信息等，并进行数据采集工作，全流程预计时间为30分钟~60分钟。",
          style: {},
        },
        {
          text: "a.入组标准：1）不符合DSM-IV诊断标准中所列出的任何一种精神疾病；2）无精神疾病家族史；3）无较严重的心脑血管疾病，神经系统疾病；4）精神正常，意识清醒，身体健康，具备基本的自理能力；5）年龄18岁及以上；6）签署知情同意书；7）承诺不会泄露实验过程的具体细节。",
          style: {},
        },
        {
          text: "b.人口学信息：性别、年龄、受教育程度、职业、兴趣爱好等。",
          style: {},
        },
        {
          text: "c.采集流程：采集全程会对您进行录音和录像。采集流程分为如下四步：1）视频刺激：观看一系列视频片段；2）基本问答：回答几个开放式问题；3）墨迹测试：观看墨迹图并陈述感受；4）量表填写：填写一份人格量表。",
          style: {},
        },
      ],
    },
    {
      title: "3. 本研究的风险",
      content: [
        {
          text: "本研究不采用任何侵入性实验手段，全程无害，数据采集全过程您可以保持放松的状态，按照真实情况进行反应和作答即可。在研究进行中的任何时刻，您都有权利选择退出本研究。",
          style: {},
        },
      ],
    },
    {
      title: "4. 信息保密情况",
      content: [
        {
          text: "本研究中收集的您所有的个人信息和观察记录将会以电子及书面形式保存并保密，仅用于研究和科学分析。签署了这份知情同意书，就表明您同意使用您的信息。",
          style: {},
        },
        {
          text: "在科学会议或者科学杂志上发表本研究获得的研究信息和数据时，您的身份不会被公开，伦理委员会、国家主管部门和研究者有权查阅研究内容。要求您进行的所有监测及实验室检查均为研究需要。研究结果根据国家规定至少保存5年。",
          style: {},
        },
      ],
    },
    {
      title: "5. 参与本研究获得的奖励",
      content: [
        {
          text: "完成初筛阶段数据采集，在核实视听数据和电子量表的可用性及可靠性之后，您可以获得如下的奖励。",
          style: {},
        },
        {
          text: "数据存在严重问题或错误，无法使用则无法获得志愿时长；完成采集且数据质量合格即可获得1小时志愿时长；数据质量较高（完全符合要求）则可追加额外的1小时志愿时长奖励，即总共2小时。",
          style: {},
        },
        {
          text: "在采集过程中，如果发现任何系统的bug，可以向QQ群管理员提出，从而获得额外的志愿时长奖励。",
          style: {},
        },
        {
          text: "测试结束后，您还可以查看经量表和AI分析的您的大五人格维度分析结果，从而便于您更好地了解自身的人格和心理。",
          style: {},
        },
      ],
    },
    {
      title: "6. 自愿参加的原则",
      content: [
        {
          text: "您可以选择不参与本研究；在同意参与本研究后，您可以随时退出，无须理由。此外，研究者有权在研究过程中任何时间终止您的研究，不管是否得到您的同意。",
          style: {},
        },
      ],
    },
    {
      title: "7. 知情同意声明",
      content: [
        {
          text: "「我已告知该受试者的研究背景、目的、步骤、风险及获益情况，给予他/她足够的时间阅读知情同意书、与他人讨论，并解答了其有关研究的问题；我已告知该受试者他/她随时可以退出本研究；我已告知该受试者他/她将得到这份知情同意书的副本，上面包含我和他/她的签名。」",
          style: {},
        },
        {
          text: "如果您已充分了解本数据采集的相关信息并愿意进行数据采集工作，请在下方区域内签名。（提示：可以在下方文本框中输入姓名，也可以在画板中签名）",
          style: { color: "#dc3545" },
        },
      ],
    },
  ],
};

export const NOTICE_ANNOUNCEMENT_CONFIG = {
  title: "注意事项",
  content: [
    {
      text: "务必仔细阅读下列内容，否则采集过程中出现问题影响数据采集质量的后果由您本人承担：",
      style: { color: "#dc3545" },
    },
    {
      text: "（1）采集地点：线上采集，地点由您自行决定，但要求设备放在稳定的平面上，环境安静，不要有太大的噪音（推荐寝室、自习室等环境）",
      style: {},
    },
    {
      text: "（2）采集设备检查：使用含摄像头的笔记本电脑，注意要求摄像头必须可以录制720p 30fps的视频（后续的设备检查环节会进行检测，如果不符合要求请更换设备）；还需要含麦克风的耳机，要求麦克风和耳机正常；不建议在手机或平板上进行（未经测试），出现问题则由您本人承担",
      style: { color: "#dc3545" },
    },
    {
      text: "（3）采集姿势：采集前请仔细矫正您的坐姿，要求正对摄像头，头和肩膀都需要出现在摄像头内",
      style: {},
    },
    {
      text: "（4）采集备份文件处理：由于服务器带宽限制，您在提交文件的过程中可能会遇到传输速率慢、提交失败等情况，为了避免文件丢失问题，采集过程中会下载以local为开头名称的文件，这些文件是实验采集数据的本地备份，采集结束提交时，如果出现提交时间长或提交失败且重试没用的情况，请您将这些文件发到QQ群管理员处，发送成功后不会影响志愿时长奖励获取",
      style: { color: "#dc3545" },
    },
    {
      text: "（5）允许采集权限：采集过程中浏览器会请求三种权限（摄像机权限、麦克风权限、同时下载多个文件权限），务必均同意请求，否则无法采集正常数据的后果由您本人承担",
      style: {},
    },
    {
      text: "（6）采集过程中请尽量保持放松，按照真实的想法反应和回答问题，您的数据均会严格保密，无需担心泄露",
      style: {},
    },
    {
      text: "（7）采集结束后，务必对采集流程保密，发现泄露实验内容的行为将取消志愿时长奖励",
      style: {},
    },
  ],
  buttonText: "我已仔细阅读并同意",
};

export const WATCH_CONFIG = {
  title: "步骤一 观看视频",
  content: [
    {
      text: "你好，现在请观看一组视频片段，时间在10分钟左右。",
      style: {},
    },
    {
      text: "视频将自动播放，请勿暂停或调整进度，观看完成后点击下一步继续。",
      style: { color: "#dc3545" },
    },
  ],
};

export const QUESTION_ANNOUNCEMENT_CONFIG = {
  title: "步骤二 回答问题",
  content: [
    {
      text: "我们将依次询问您5个问题。在每个问题陈述完毕后，您将有30秒的时间进行思考。",
      style: {},
    },
    {
      text: "思考时间结束后，你将有3分钟的时间回答，时间会显示在屏幕上。你也可以点击结束按钮提前结束思考和回答时间。",
      style: {},
    },
    {
      text: "每个问题的答案无对错之分，不带有任何评价意义，你可以自由表达。希望您表达的尽可能详细且真实。",
      style: {},
    },
    {
      text: "请问你准备好了吗？",
      style: {},
    },
  ],
  buttonText: "准备好了",
};

export const QUESTIONS_CONFIG = [
  {
    title: "问题一",
    content:
      "你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？",
    think: {
      hint: "现在你有30秒的时间可思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有60秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    title: "问题二",
    content:
      "你能告诉我，在过去的生活中，你有过什么不愉快或悲伤的记忆吗？为什么？",
    think: {
      hint: "现在你有30秒的时间可思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有60秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    title: "问题三",
    content: "你最近过得怎么样？发生了什么，你的心情怎么样？",
    think: {
      hint: "现在你有30秒的时间可思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有60秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    title: "问题四",
    content: "你对现在正在做的这件事感觉如何？",
    think: {
      hint: "现在你有30秒的时间可思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有60秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    title: "问题五",
    content: "你的生活中有什么你想改变的吗？",
    think: {
      hint: "现在你有30秒的时间可思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有60秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
];

export const RORSCHACH_ANNOUNCEMENT_CONFIG = {
  title: "步骤三 墨迹测试",
  content: [
    {
      text: "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
      style: {},
    },
    {
      text: "思考时间60s，回答时间180s。",
      style: {},
    },
    {
      text: "例如",
      style: {},
    },
    {
      text: "这张图中我觉得中间的部分像是一张面具，有点像是戏剧中的面具。",
      style: {},
    },
    {
      text: "它的上方有类似于眼睛的图形，中间有一个倒三角形状的鼻子，以及上翘的形状似乎在暗示一个微笑。",
      style: {},
    },
    {
      text: "周围的图形让我联想到了动物的翅膀，特别像是夜晚飞翔的蝙蝠，因为它们有一种流畅而又对称的外形。",
      style: {},
    },
    {
      text: "墨迹的边缘有些地方像是羽毛或者毛发般细腻，增加了一种自然的质感。",
      style: {},
    },
    {
      text: "而墨迹图的整体布局对称，让我感觉图中的形象在平衡中寻找着秩序。",
      style: {},
    },
    {
      text: "总的来说，这张图给我的感觉是既神秘又有生命力的。",
      style: {},
    },
  ],
  buttonText: "开始测试",
  exampleImage: "img/exm/rorschach0.png",
};

export const RORSCHACH_CONFIG = [
  {
    id: 1,
    image: "img/exm/rorschach1.png",
    title: "墨迹测试",
    description:
      "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
    think: {
      hint: "现在你有60秒的时间可以思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有180秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    id: 2,
    image: "img/exm/rorschach2.png",
    title: "墨迹测试",
    description:
      "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
    think: {
      hint: "现在你有60秒的时间可以思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有180秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    id: 3,
    image: "img/exm/rorschach3.png",
    title: "墨迹测试",
    description:
      "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
    think: {
      hint: "现在你有60秒的时间可以思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有180秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    id: 4,
    image: "img/exm/rorschach4.png",
    title: "墨迹测试",
    description:
      "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
    think: {
      hint: "现在你有60秒的时间可以思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有180秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
  {
    id: 5,
    image: "img/exm/rorschach5.png",
    title: "墨迹测试",
    description:
      "根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。",
    think: {
      hint: "现在你有60秒的时间可以思考。",
      buttonText: "结束思考",
    },
    answer: {
      hint: "现在你有180秒的时间可以回答。",
      buttonText: "结束回答",
    },
  },
];

export const SCALE_ANNOUNCEMENT_CONFIG = {
  title: "步骤四 填写量表",
  content: [
    {
      text: "恭喜你！你已经完成了视听数据采集的基本工作，只剩下最后一步，填写一份量表的任务就完成了！",
      style: {},
    },
    {
      text: "现在你需要填写一份人格问卷，它一共有60个问题，完成时间在10分钟以内。",
      style: {},
    },
    {
      text: "希望你能够认真作答。填写结束之后会显示你在每个人格维度上的分数，这有助于你加深对自己的了解。",
      style: { "font-weight": "700" },
    },
    {
      text: "如果你准备好了，点击下面的按钮，我们就可以开始了。",
      style: {},
    },
  ],
  buttonText: "准备好了",
};

export const SCALE_CONFIG = {
  title: "BFI-2 量表",
  description: [
    {
      text: "下面是一些关于个人特征的描述，有些可能适用于你，有些可能不适用于你。",
      style: {},
    },
    {
      text: '比如，你是否同意"我是一个喜欢与他人待在一起的人"? ',
      style: {},
    },
    {
      text: "用 1 至 5 描述你对于这些特征的认同程度，1 表示非常不认同，5 表示非常认同。",
      style: {},
    },
  ],
  questions: [
    { text: "性格外向，喜欢交际。" },
    { text: "心肠柔软，有同情心。" },
    { text: "缺乏同情心。" },
    { text: "从容，善于处理压力。" },
    { text: "对艺术没有什么兴趣。" },
    { text: "性格坚定自信，敢于表达自己的观点。" },
    { text: "为人恭谦，尊重他人。" },
    { text: "比较懒。" },
    { text: "经历挫折后仍能保持积极心态。" },
    { text: "对许多不同的事物都感兴趣。" },
    { text: "很少觉得兴奋或者特别想要（做）什么。" },
    { text: "常常挑别人的毛病。" },
    { text: "可信赖的，可靠的。" },
    { text: "喜怒无常，情绪起伏较多。" },
    { text: "善于创造，能找到聪明的方法来做事。" },
    { text: "比较安静。" },
    { text: "对他人没有什么同情心。" },
    { text: "做事有计划有条理。" },
    { text: "容易紧张。" },
    { text: "着迷于艺术、音乐或文学。" },
    { text: "常常处于主导地位，像个领导一样。" },
    { text: "常与他人意见不和。" },
    { text: "很难开始行动起来去完成一项任务。" },
    { text: "觉得有安全感，对自己满意。" },
    { text: "不喜欢知识性或者哲学性强的讨论。" },
    { text: "不如别人有活力。" },
    { text: "宽宏大量。" },
    { text: "有时比较没有责任心。" },
    { text: "情绪稳定，不易生气。" },
    { text: "几乎没有什么创造性。" },
    { text: "有时会害羞，比较内向。" },
    { text: "乐于助人，待人无私。" },
    { text: "习惯让事物保持整洁有序。" },
    { text: "时常忧心忡忡，担心很多事情。" },
    { text: "重视艺术与审美。" },
    { text: "感觉自己很难对他人产生影响。" },
    { text: "有时对人比较粗鲁。" },
    { text: "有效率，做事有始有终。" },
    { text: "时常觉得悲伤。" },
    { text: "思想深刻。" },
    { text: "精力充沛。" },
    { text: "不相信别人，怀疑别人的意图。" },
    { text: "可靠的，总是值得他人信赖。" },
    { text: "能够控制自己的情绪。" },
    { text: "缺乏想象力。" },
    { text: "爱说话，健谈。" },
    { text: "有时对人冷淡，漠不关心。" },
    { text: "乱糟糟的，不爱收拾。" },
    { text: "很少觉得焦虑或者害怕。" },
    { text: "觉得诗歌、戏剧很无聊。" },
    { text: "更喜欢让别人来领头负责。" },
    { text: "待人谦逊礼让。" },
    { text: "有恒心，能坚持把事情做完。" },
    { text: "时常觉得郁郁寡欢。" },
    { text: "对抽象的概念和想法没什么兴趣。" },
    { text: "充满热情。" },
    { text: "把人往最好的方面想。" },
    { text: "有时候会做出一些不负责任的行为。" },
    { text: "情绪多变，容易愤怒。" },
    { text: "有创意，能想出新点子。" },
  ],
};
