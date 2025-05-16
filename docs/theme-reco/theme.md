# 1、使用git将本地代码上传到远程仓库！

~~~shell
# 使用命令
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
~~~

**小知识点：**生成的ssh秘钥只能被一个GitHub账号使用，GitHub 不允许同一个 SSH Key 被多个账户重复使用。

**报错**

~~~shell
Permission to oliveszq/blog-vuepress-starter.git denied to sueqinglong.
fatal: Could not read from remote repository.
Please make sure you have the correct access rights and the repository exists.

#问题解释：你正在尝试推送到别人的仓库，你需要改为自己的远程仓库地址。
~~~

**解决方法1**

修改远程仓库地址为你的 GitHub 账户下的项目地址：

~~~
git remote set-url origin https://github.com/oliveszq/blog-vuepress-starter.git
~~~

**解决方法2**

~~~shell
# 1. 生成新的 SSH 密钥对，并指定一个新的文件名，如 id_rsa_sueqinglong
ssh-keygen -t rsa -b 4096 -C "your-email@example.com" -f ~/.ssh/id_rsa_olives
解释 -t rsa: 指定密钥类型为 RSA。 
    -b 4096: 设置密钥长度为 4096 位（推荐安全性）。
    -C "...": 添加注释（如邮箱或用户名，仅用于标识密钥归属，不影响功能）。
# 2. 删除旧的 remote 再重新添加
git remote remove origin
git remote add origin https://github.com/XXXX/blog-vuepress-starter.git

~~~

**报错**

~~~shell
To github.com:oliveszq/blog-vuepress-starter.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:oliveszq/blog-vuepress-starter.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

~~~

错误分析：

​	错误的原因是：**远程仓库中存在你本地没有的提交（即远程分支比你的本地分支超前）**，此时 Git 禁止你直接推送以防止覆盖远程的更新。

**解决方案**

1、**拉取远程更新**先将远程分支的更新合并到本地分支`git pull origin main`，在**推送更新到远程仓库**`git push origin main`

**其他说明**

如果你确定要强制覆盖远程分支（不推荐，除非你清楚自己在做什么），可以使用强制推送

~~~
git push --force origin main
~~~

