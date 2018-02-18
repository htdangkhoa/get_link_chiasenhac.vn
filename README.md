# get_link_chiasenhac.vn
![Screen-Shot-2018-02-18-at-5.02.27-PM.png](http://sv1.upsieutoc.com/2018/02/18/Screen-Shot-2018-02-18-at-5.02.27-PM.png)
![Screen-Shot-2018-02-18-at-5.03.19-PM.png](http://sv1.upsieutoc.com/2018/02/18/Screen-Shot-2018-02-18-at-5.03.19-PM.png)

## Deployment
- Worker
```shell
$ cd server/worker
$ npm run build
$ node build/bundle.js 9001 & node build/bundle.js 9002 & node build/bundle.js 9003 &...
```
- Master
```shell
$ cd server/master
$ npm run build
$ node build/bundle.js 9000
```
- Client
```shell
$ cd client
$ npm run dev
```
