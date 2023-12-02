/**
 * 获取 Vite 项目 src/assets 目录下的静态资源路径
 * @example
 * // src/svgs/a.svg
 * getAssetsURL("svgs/a.svg");
 * // src/svgs/a/b.svg
 * getAssetsURL("svgs/a/b.svg");
 * // src/images/a/b.png
 * getAssetsURL("images/a/b.png");
 */
export function getAssetsURL(path: string): string {
  return new URL(`../../assets/${path}`, import.meta.url).href;
}
