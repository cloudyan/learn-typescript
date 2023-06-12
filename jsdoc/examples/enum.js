// @ts-check
// 定义枚举 @enum

/**
 * 文件类型
 * @enum {string}
 * @property {string} FileType.Image 图片
 * @property {string} FileType.Video 视频
 * @property {string} FileType.Audio 音频
 * @property {string} FileType.Accessory 附件
 */
export const FileType = {
  /** 图片 */
  Image: '1',
  /** 视频 */
  Video: '2',
  /** 音频 */
  Audio: '3',
  /** 附件 */
  Accessory: '4'
}


/**
 * @enum {number}
 */
const HTTPStatusCodes = {
  ok: 200,
  forbidden: 403,
  notFound: 404,
}
