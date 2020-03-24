# cosync
> An ultra-simple lan file server.
>
> 一个简易的内网文件服务器。

## 简介

**cosync**是一款简易的内网文件服务器，其目的是让局域网内更加容易的共享文件。更通俗的讲，**cosync**类似于局域网下的私人网盘。

**cosync**一词来源于英文单词**cosy**(舒适)和**sync**(同步)相组合，意为**让共享文件更加舒适**。

## 特色

- 可**预览PDF文件(.pdf)**
- 可**预览Markdown文件(.md)**
- 可**预览HTML文件(.html)**
- 支持代码**语法高亮**
- Markdown文件支持**代码语法高亮**和**LaTeX公式**
- 支持两种**视图查看模式**，大图标视图带有**图片缩略图**功能
- 文件带有**彩色图标**和**彩色标题**，便于识别不同的文件类型

## 运行环境配置

> **注：安装所需安装包均在*installer*文件夹下**

1. 安装**Node.js**（**已安装的用户可以跳过这一步**）

2. 安装**GraphicsMagick**(GM)

   保持默认选项安装即可，安装完成后请在**控制台**(cmd/powershell/bash/etc.)中测试能否运行**gm.exe**。若能成功调用则跳至**步骤3**；否则请在**系统环境变量**中手动将**gm的安装目录**添加至**PATH变量中**。

## 启动服务器

执行服务器目录下的**start.sh**（如在shell中执行`sh start.sh`）或在服务器目录下用shell执行`node .`。

## 使用

1. **进入服务器**

   **本地**：在浏览器中输入`http://localhost:8088`或`http://127.0.0.1:8088`即可访问。

   **其他设备**：先查询服务器的IP地址（如在服务器本机上用cmd执行ipconfig查看ipv4地址），在其他设备上访问`http://<服务器IP地址>:8088`即可访问。

2. **添加文件**

   直接将文件复制至服务器目录下的**data**目录下即可（不需要重启服务器）。

   > 若目录下没有data目录，请先**启动一次服务器**

3. **进入目录**

   点击目录即可。

4. **返回上级目录**

   点击目录视图顶部的**←返回上级目录**/左上角的**←图标**/浏览器的**返回按钮**皆可。

5. **切换视图模式**

   点击目录视图右上角的图标即可切换视图模式。

6. **下载文件**

   点击右侧的下载按钮即可下载。若为不能预览的文件，点击文件标题也可下载。

7. **预览文件**

   若文件可预览，直接点击标题即可预览。

   以下文件可在线预览：

   |   文件类型   |                 特别说明                  |
   | :----------: | :---------------------------------------: |
   |   媒体文件   | 包含图片/音频/视频文件（需要HTML5的支持） |
   |   PDF文件    |                   *无*                    |
   |   文本文件   |                   .txt                    |
   | Markdown文件 |                    .md                    |
   |  源代码文件  |    基本覆盖所有highlight.js支持的类型     |

8. **查看文件纯文本**

   在需要查看的文件的链接后添加`@raw`即可查看文件的纯文本。

9. **查看带语法高亮的文本**

   在需要查看的文件的链接后添加`@hl`即可查看文件的带高亮模式。

## 未来会更新的新功能

- [ ] 文件搜索【即将实现】
- [ ] 上传功能【构思中】
- [ ] 在线文件操作（复制、粘贴、删除、新建等）【构思中】
- [ ] 权限认证系统（登录/注册等）【考虑中】
- [ ] 在线压缩/解压（包含文件夹打包下载操作）【构思中】
- [ ] 错误页面美化（404页面等）【实现中】

## 目前BUG

- 未发现BUG

## 联系开发者

若要报告BUG或建议新功能，请在[[Issues]](https://github.com/0And1Story/cosync/issues)中留言。

## 感谢

感谢以下框架/包的技术支持

- 前端：
  - MDUI（前端Material Design框架）
  - Highlight.js（语法高亮支持）
  - Mathjax（LaTeX公式支持）
  - Marked（Markdown文件解析框架）
- 后端：
  - Node.js（服务器运行环境）
  - Express（Node.js服务器框架）
  - GraphicsMagick（图片运算支持，缩略图基础）