# 功能
- 实现对localStorager的加密封装
- 对localStorager进行有效期限制

# 如何安装
- npm install bstorager
- yarn add bstorager

# 如何使用
## 引入
```
import bstorager from 'bstorager'
```
## 保存键值
```
bstorager.save(key, value, ?etime)
// key: string
// value: any
// etime?: string （默认一天，数字加单位，eg：'10d'）
// ['s','m','h','d','M','y']=[秒,分,时,天,月,年]
```
## 获取值
```
bstorager.get(key)
```
## 获取键有效期
```
bstorager.getExpire(key)
```
