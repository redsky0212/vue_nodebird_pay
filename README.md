# vue 로 nodebird SNS 만들기

## 소개
* 제로초 메일 : zerohch0@gmail.com (숙제 제출)
* nodebird.com ( react로 만든 nodebird )
* vue 소스코드 : https://github.com/zerocho/vue-nodebird
* DB는 mysql 5.7안정적, vue는 2버전 nuxt는2버전

## 공식문서
* vue가이드 : https://kr.vuejs.org/v2/guide/index.html
* nuxt : https://ko.nuxtjs.org/guide

## nuxt, vue설치하고 pages만들기
* npm i vue nuxt
* vue cli, nuxt create, 는 사용하지 않음.
* pages 폴더 생성. 
  - index.vue, signup.vue, profile.vue 파일 3개 생성 후 기본 vue코딩 입력.
  - nuxt에서는 pages라는 이름의 폴더를 사용하여 각 화면들을 알고 체크 하기때문에 꼭 pages라고 이름을 지어야 한다.
  - pages폴더안에 있는 파일들은 화면이동시 자동으로 url로 된다.
* package.json에서 실행하는 scripts를 작성한다.
  - 보통 개발모드, 배포모드 두가지의 웹프로그래밍 실행 방법이 있다. dev: 개발모드, 
    - "dev" : "nuxt" 라고 입력해놓고 띄울때 npm run dev로 띄우면 된다.
* 띄워진 페이지 접근은 localhost:3000, localhost:3000/signup, localhost:3000/profile 로 접근할 수 있다.
  - 주소를 좀 더 복잡하게 하려면 pages안에 폴더를 더 깊게 만들어서 파일을 생성하여 만들면 된다.
* nuxt는 기본으로 hot reloader가 적용되어있어서 파일소스를 수정하면 띄워진 브라우져가 자동으로 바뀌어진다.
* nuxt는 눈속임 url이 아닌 실제 파일의 url이다. SSR
  - 실제 각각의 파일이 페이지이면 화면 전환시 깜빡이는 문제가 있는데 그런 점을 자연스럽게 처리하는 방법도 내부적으로 하고있다.

## nuxt router와 layouts, head 
* pages/index.vue 에 nuxt-link를 넣어서 서로 화면전환을 해본다.
  - nuxt-link는 사실 내부적으로 router-link를 사용하고 있지만 nuxt-link에서 각 페이지별 화면전환시 미리로드 등 추가적인 기능을 처리하기때문에 nuxt-link를 사용한다.
```
<div>
 <nuxt-link to="/">Home</nuxt-link>
 <nuxt-link to="/profile">Profile</nuxt-link>
 <nuxt-link to="/signup">Signup</nuxt-link>
</div>
```
* 3개 페이지 모두 네비게이션이 필요하므로 모두 코딩을 한다.
  - 하지만 모든 페이지에 들어가는 중복된 코드가 되므로 nuxt에서 중복코딩부분을 처리해줘야 한다. 
    - **layouts** 폴더를 생성하고 default.vue파일을 생성한다.
    - 공통된 template부분인 nuxt-link부분을 default.vue쪽으로 옮긴다.
    - 그리고 화면전환시 달라지는 부분 router-view에 해당하는 부분을 코딩한다. ---> **nuxt**
    - layouts폴더 만들고 default.vue를 만들면 서버가 자동실행이 안되는거 같음... 재실행
```
<div>
    <div>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/profile">Profile</nuxt-link>
        <nuxt-link to="/signup">Signup</nuxt-link>
    </div>
    <nuxt />    // router-view 에 해당하는 영역
</div>
```
* nuxt API 참조(https://ko.nuxtjs.org/api/)
* layout이 여러개인 화면을 만들때 작업방법...
  - 상황에따라 관리자용, 로그인한사용자화면, 비로그인 화면 등과 같이 layout이 달라지는경우가 있다.
    - layouts폴더에 따로 .vue파일을 생성하여 (admin.vue, complate.vue) 따로 만들어 해당 layout을 사용하는 컴포넌트에서 layout: 'admin' 과 같이 사용할 수 있다.
    - 보통 .vue컴포넌트는 data, methods, computed와 같은것들만 있는데 **layout**과 같이 새로운 속성은 사실 nuxt가 추가로 확장한 속성이다.
    - **layout**이외에 **head**라는것도 있다.
```
export default {
  layout: 'blog',
  // 또는
  layout (context) {
    return 'blog'
  }
  head () { // head태그에 들어가는 것들을 조종할 수 있다.
    return {
        title: this.title,
        meta: [
        { hid: '유니크한 아이디', name: '설명', content: '내가 커스텀한 설명' }
        ]
    }
  }
}

```
* layouts/default.vue 단에서 공통으로도 head를 넣어서 사용할 수도있다.
* head가 하위에도 있어서 중복이 된다면 nuxt.config.js파일을 만들어서 중복제거 설정을 할 수있다.
  - nuxt.config.js파일 생성. head를 이곳에 넣어서 중복을 제거 할 수도있다.
  - 아래와 같이 객체형식으로 넣는다.(https://ko.nuxtjs.org/api/configuration-head)
```
module.exports = {
    head: {
        title : 'NodeBird',
    }
};
```

## nuxt를 vuetify와 연결하기
* 디자인 관련 .. 자주쓰는 UI컴포넌트.
* 설치 ( npm i vuetify @nuxtjs/vuetify )
  - @nuxtjs/vuetify를 설치하는 이유는 nuxt자체는 외부 lib를 연결하는 방법이 조금 독특하므로
  - 보통은 import하고 Vue.use를 이용하여 연결하는데 nuxt에서는 이렇게 하지않고 다르게 한다.
  - nuxt페이지는 하나가 아니므로 모든 페이지에 Vue.use해주기(중복) 힘드므로 nuxt.config.js에서 아래와 같이 추가한다.
  - nuxt.config.js에 이렇게 추가하면 사실 nuxt가 내부적으로 모든 페이지에 vuetify plugins를 Vue.use 해준다.
```
modules:[
    '@nuxtjs/axios',
],
devModules: [
    '@nuxtjs/vuetify',  // 이곳에 추가 되어야 아래 vuetify설정을 할 수 있다.
],
vuetify: {  // 위에 devMudules에 적어 있기 때문에 이곳에 vuetify 설정을 할 수 있다.

}
```
* axios도 같은 계념으로 설치를 하고 nuxt.config.js쪽에 적어준다. ( npm i @nuxtjs/axios )

## vuetify 레이아웃과 아이콘 (https://vuetifyjs.com/en/getting-started/quick-start)
* vuetify의 api는 항상 버전별로 달라질 수 있으므로 항상 공식문서를 확인해야한다.
* 가장 최상위 부분에는 v-app을 넣어준다. (https://vuetifyjs.com/en/components/application)
* 우선 상단 header부분을 만들어 본다. 사용 vuetify는 v-toolbar를 사용한다.(https://vuetifyjs.com/en/components/toolbars#toolbars)
```
// default.vue파일
<template>
    <v-app>
        <div>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">Nodebird</nuxt-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{display:'flex', alignItems:'center'}"></v-text-field>
                    <v-btn nuxt to="/profile" :style="{display:'flex', alignItems:'center'}"><div>프로필</div></v-btn>
                    <v-btn nuxt to="/signup" :style="{display:'flex', alignItems:'center'}"><div>회원가입</div></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </div>
        <nuxt />
    </v-app>
</template>
```
* 아이콘관련 (https://vuetifyjs.com/en/components/icons)
* prepend-icon="mdi-magnify" 이런식으로 사용하면 되는데 (https://materialdesignicons.com/)에서 사용 아이콘 이름에서 **mdi-**를 앞에 꼭 붙여준다.


