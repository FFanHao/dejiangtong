import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // 支持的语言列表（德语为主，中文为辅，英语支持）
  locales: ['de', 'zh', 'en'],

  // 当无法根据路由判断语言时使用的默认语言
  defaultLocale: 'de',
});
 
// 导出导航工具函数
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
