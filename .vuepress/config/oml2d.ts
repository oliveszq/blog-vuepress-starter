import type { Options } from 'oh-my-live2d';

/**
 * 看板娘插件配置
 * 详细配置选项请参考：https://oml2d.hacxy.cn/api/interfaces/Options.html
 */
export const oml2dConfig: Options = {
  // ========== 模型配置 ==========
  // 模型列表（本地 + 远程均可）
  models: [
    {
      path: 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Senko_Normals/senko.model3.json',
      scale: 0.12,
      position: [-10, 50],
      stageStyle: {
        width: 350
      }
    }
  ],

  // ========== 基础配置 ==========
  // 组件停靠位置：'left' | 'right'，影响状态条、舞台、菜单的位置
  dockedPosition: 'right',
  
  // 初始状态：'active'（活动）| 'sleep'（睡眠）
  initialStatus: 'active',
  
  // 主题色，影响所有模块的颜色
  primaryColor: '#38B0DE',
  
  // 组件入场和离开的过渡动画时长（单位：ms）
  transitionTime: 1000,
  
  // 是否在初始化阶段打印项目信息
  sayHello: true,

  // ========== 移动端配置 ==========
  // 移动端是否展示，开启后会在移动端设备上以移动端样式展示各元素
  mobileDisplay: false,

  // ========== 菜单配置 ==========
  menus: {
    disable: false,
    // 可以添加更多菜单配置，如：
    // items: ['switch-model', 'switch-texture', 'reset', 'close']
  },

  // ========== 提示框配置 ==========
  tips: {
    // 提示消息限制展示的行数，默认3行
    messageLine: 3,
    // 提示框样式配置
    style: {
      // 可以自定义提示框的样式，例如：
      // borderRadius: '10px',
      // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    // 闲置状态下的提示
    idleTips: {
      // 是否开启每日一言（从 https://v1.hitokoto.cn 获取）
      wordTheDay: false,
      // 提示框持续时间（单位：ms）
      duration: 5000,
      // 闲置状态循环播放消息的间隔时间（单位：ms）
      interval: 10000,
      // 自定义闲置提示消息
      // message: [
      //   '欢迎来到我的博客！',
      //   '有什么问题可以随时问我哦~',
      // ]
    },
    // 模型入场后的欢迎提示（会根据时间段自动显示不同消息）
    welcomeTips: {
      duration: 6000,
      // 可以自定义不同时间段的欢迎消息
      // message: {
      //   morning: '早上好！工作顺利嘛，不要久坐，多起来走动走动哦！',
      //   afternoon: '午后很容易犯困呢，来杯咖啡吧~',
      //   night: '晚上好，今天过得怎么样呢？',
      // }
    },
    // 复制网站文字内容时的提示
    copyTips: {
      duration: 3000,
      message: ['你复制了什么内容呢?记得注明出处哦~']
    }
  },

  // ========== 状态条配置 ==========
  statusBar: {
    // 是否禁用状态条，为true时将不会创建状态条
    disable: false,
    // 加载时的提示文本
    loadingMessage: '加载中',
    // 模型加载成功时提示的文本信息
    loadSuccessMessage: '加载成功',
    // 模型加载失败时提示的文本信息
    loadFailMessage: '加载失败',
    // 加载失败hover事件时模型重新加载文本信息
    reloadMessage: '重新加载',
    // 模型休息状态时提示的文本信息
    restMessage: '看板娘休息中',
    // 模型切换时提示的文本信息
    switchingMessage: '正在切换',
    // 状态条弹入弹出时过渡动画时长（单位：ms）
    transitionTime: 800,
  },

  // ========== 舞台样式配置 ==========
  // 公共舞台样式，作用于所有模型的舞台样式
  // 优先级低于模型选项中的舞台样式
  stageStyle: {
    // 可以在这里设置全局舞台样式
    // width: 350,
    // height: 600,
  },
};

