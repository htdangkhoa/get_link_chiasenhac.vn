# get_link_chiasenhac.vn

## Screenshots
  - **Web**
  <img src="https://github.com/htdangkhoa/get_link_chiasenhac.vn/blob/master/screenshots/web1.png" width="80%">
  <img src="https://github.com/htdangkhoa/get_link_chiasenhac.vn/blob/master/screenshots/web2.png" width="80%">
  
  - **Mobile**
  <img src="https://github.com/htdangkhoa/get_link_chiasenhac.vn/blob/master/screenshots/mobile.png" width="50%">

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
