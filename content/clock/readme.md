# <a src="https://inthe-darkness.github.io/JsPractice/content/clock/">clock</a> : ☆
## 知识点:
- 1、html自定义属性`data-name=value`,以`data-`开头
```html
<div class="hand hour" data-hour-hand></div>
```
- 2、css自定义变量`--name:value`,以`--`开头
```css
.clock .number {
    /* css自定义变量：--name:value */
    --rotation: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    /* 使用var引用变量 */
    transform: rotate(var(--rotation));
    font-size: 1.5rem;
}
```

## 运行效果
![](./image/1.png)

## [video](https://www.youtube.com/watch?v=Ki0XXrlKlHY)