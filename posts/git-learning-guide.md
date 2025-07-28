---
title: "git使用指南"
date: "2025-07-28"
excerpt: "介绍了git的基本概念和常用命令，深化对git的理解。"
tags: ["git", "开发工具", "配置指南"]
author: "MarkChin"
---


###1.基础知识
**集中式版本控制系统**

**分布式版本控制系统**



### 2.基础命令

常见的使用方式就是命令行，这是最常用的方法



查看版本 git -v

![Git 版本查看](/images/git-guide/image-20250726151327333.png)


在初始化的时候需要对仓库进行配置，其中global是全局配置，对<span title="指登录系统的用户，而不是git的用户" style="color: steelblue;">所有仓库
</span>生效；local 本地配置，对本地仓库生效；system 系统配置，对所有用户生效

```
git config --global user.name "MarkChin" #如果没有空格双引号可以省略
git config --global user.email 1459*****qq.com
git config --global credential.helper store #保存用户名和密码，不需要每次都输入
git config --global --list # 查看配置信息

```

### 3.新建仓库

Repo可以理解为一个目录，里面的文件通过git可以检测到每个文件的修改、版本等。

```
mkdir dirname
cd dirname
git init (reponame)#此时默认会有分支的显示为main或者master，如上图所示
ls -a #显示所有文件,包括隐藏文件
git clone ********.git #克隆远程仓库
```

### 4.工作区域和文件状态



####工作区域

![Git 工作区域图](/images/git-guide/image-20250726153914086.png)


Working directory（工作区）

Staging Area/Index(暂存区)

​	为了防止一次修改文件就要提交一次，我们可以将文件分别先添加到暂存区，这个暂存区类似于一个装货物的卡车，然后一次性把文件运送到仓库里面。

Local Repository（本地仓库）

#### 文件状态

图中形象表明了各种文件状态之间的关系。

![文件状态关系图](/images/git-guide/image-20250726154458470.png)




###5.主要操作与流程

####1.添加到暂存区

```
git status

![Git 状态示例](/images/git-guide/image-20250726155028345.png)
 
```

 

```
git add . #提交全部文件到暂存区
git add <file>

git rm --cached<file>
```

#### 2.提交

```
git commit -m "第一次提交"
git log --oneline查看简洁的提交记录(ID+简洁信息)
git log #查看提交的详细历史记录
git commit -a -m"feat:登录" #-a参数支持一个命令暂存和提交 #省略写法-am
```

如果不指定-m参数在Linux系统中会进入一个交互式的界面(vim)来编辑提交信息，有的系统会报错。不在暂存区的文件就不会被commit。

查看版本库中的文件使用，

```
git ls-files
```

常见错误

​	与远程仓库的连接不正确，执行git remote 命令。

![远程仓库连接](/images/git-guide/image-20250728132534451.png)




#### 3.回退版本

```
git reset --soft #保留工作区和暂存区的所有修改内容
git reset --hard #丢弃修改内容
git reset --mixed #保存工作区的修改内容，丢弃暂存区的修改内容（默认参数）
```



soft和mixed回退版本可用于对于多次提交改动很少，可以退回到前几个版本，将提交一次性提交。

hard用于真的要放弃某个版本的所有内容。

如果不小心错误的使用了上述的指令，可以使用

```
git reflog 
```

查看操作的版本号，然后使用reset又可以回到误操作的原来的版本了。

#### 4.git diff

![Git diff 示例](/images/git-guide/image-20250726173129072.png)




```
git diff #用于比较工作区和暂存区之间的内容
```

```
git diff HEAD #比较工作区与版本库之间的内容
```

```
git diff --cached/staged #比较暂存区和版本库之间的内容
```
比较两个版本之间的差异，先通过 git log --oneline获取版本id，然后，

```
git diff 版本id1 版本id2
```

比较**当前版本和上一个版本**之间的差异，

```
git diff HEAD~ HEAD
```

注意，波浪号后加数字n，可以表示当前版本之前的n个版本。当git diff 后面加上文件名的时候，git只会查看某个文件的差异内容。

####5.git 删除文件

git删除和本地删除是不一样的概念，本地删除之后，暂存区中不一定会删除。

方法1

本地删除之后再执行git add告诉暂存区我的文件修改了。（相当于删除也是一种修改）

方法2（一般方法）

```
git rm <file>
```

| 命令                     | 作用                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `rm file; git add file`  | 先从工作区删除文件，然后再暂存删除内容                     |
| `git rm <file>`          | 把文件从工作区和暂存区同时删除                             |
| `git rm --cached <file>` | 把文件从暂存区删除，但保留在当前工作区中★                  |
| `git rm -r *`            | 递归删除某个目录下的所有子目录和文件（删除后不要忘记提交） |

#### 5 .gitignore

以下文件不应该被提交到仓库里面。

- 系统或者软件自动生成的文件
- 忽略日志文件和文件夹
- 忽略所有 `.class` 文件
- 编译产生的中间文件和结果文件
- 忽略所有 `.o` 文件
- 忽略所有 `.env` 文件
- 运行时生成的日志文件、缓存文件、临时文件
- 忽略所有 `.zip` 和 `.tar` 文件
- 忽略所有 `.pem` 文件
- 涉及身份、密码、口令、密钥等敏感信息的文件

一般来说在这个文件中添加想要忽略的文件名来忽略提交，例如

```
process.log
*.log #所有的log文件
!lib.log #忽略除了lib.log 以外的.log文件
temp/ #忽略任何目录下整个文件夹
/TODO #忽略当前目录下的TODO文件
doc/*.txt #忽略doc文件夹下的所有txt文件
doc/**/*.pdf #忽略doc目录及其子目录下的.pdf文件
```

注意，对于已经在版本库中的文件来说（在添加到.gitignore之前提交的文件），响应的修改是可以的，如果想要删除本版库中的文件，不删除本地库中的文件的话使用git rm --cached。

**匹配规则**：#开头的空行会被忽略；使用<span title="Shell中使用的简化的正则表达式" style="color : steelblue;">Blob</span>模式匹配;

### 6.远程仓库github

关联本地仓库和远程仓库

```
git remote add origin https://github.com/<用户名>/<仓库名>.git
git remote -v #查看对应的远程仓库的别名（origin）和地址
git branch -M master #指定分支的名称
git push -u（upstream） origin master:master #将本地仓库的master分支和远程master关联起来,后面如果两个分支相同可以省略只写一个就可以了。
```

当远程仓库修改好了之后，使用pull命令来拉取远程仓库的修改内容；也可以使用git fetch来获取远程仓库的修改内容，但是不对合并到本地仓库。当分支没有冲突时才可以合并。

```
git pull <远程仓库名> <远程分支>:<本地分支名> 可以省略
git pull
```

除了github之外还有其他两个平台，gitee.com（国内适用）、gitlab.com(私有化部署)

### 7.常用的图形化工具

github desktop、sourcetree、tortoisegit、gitkraken

### 8.分支

```
git branch
git branch dev
git checkout dev
git switch dev #为了避免歧义。使用该命令来切换分支
git branch -d/-D dev #删除合并后的分支
git merge +要合并的分支名 #合并到当前分支
git log --graph --oneline --decorate --all
```

分支是 Git 提供的一种功能，它允许你在开发过程中创建多个平行的开发路线。

![Git 分支概念图](/images/git-guide/image-20250727212719888.png)
每个分支都有自己独立的提交历史。你可以把分支看作是指向某个提交的指针。当你创建一个新分支时，Git 会在当前分支的基础上复制出一个新的分支指针，这个新分支会和原分支共享之前的提交历史。例如，主分支（`main` 或 `master`）是项目默认的分支。当你要开发一个新功能或者修复一个特定的漏洞时，你可能会创建一个新分支，比如 `feature - login`（用于开发登录功能）或者 `bugfix - dropdown`（用于修复下拉菜单的漏洞）。在这个分支上进行的提交不会影响其他分支，直到你将它合并到其他分支。



#### 分支命名规范

feat：login ：用于开发某一个功能的分支，比如这里是登录功能。

#### 解决分支冲突

以下就是遇到分支冲突的情况，这是因为不同的分支对同一个文件进行了修改，导致git不知道该保留哪个冲突。

![分支冲突示例](/images/git-guide/image-20250727213713285.png)




此时可以使用git status

![Git 状态示例](/images/git-guide/image-20250726155028345.png)
或者git diff 命令来查看冲突的具体内容。git merge --abort



### rebase操作

如果有这样的分支

![Rebase 前的分支状态](/images/git-guide/image-20250727214435455.png)




如果在dev分支上执行rebase操作的话，dev上的提交会变基到main分支上。如下图所示

![Rebase 后的分支状态](/images/git-guide/image-20250727214626666.png)




如果在吗，main分支上，执行rebase会成为这样，

![Main 分支 Rebase](/images/git-guide/image-20250727214737037.png)




本质上就是找到当前分支与目标分支的共同祖先，将当前分支从共同祖先到最新提交记录的所有提 交移动到目标分支最新提交的后面。

merge优点是不会破坏提交历史，方柏霓回溯和查看，缺点是产生额外的提交节点，分支图比较复杂。

rebase就是线性的提交，只直观和干净

通常是自己的分支rebase合并到共享库使用merge

### 9.分支管理

```
git tag 来标记版本号，方便确定哪一个版本
```



gitflow

![GitFlow 工作流](/images/git-guide/image-20250727220210569.png)




githubflow

![GitHub Flow](/images/git-guide/image-20250727220504235.png)






