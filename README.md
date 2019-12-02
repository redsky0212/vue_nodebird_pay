# vue 로 nodebird SNS 만들기

## 소개
* 제로초 메일 : zerohch0@gmail.com (숙제 제출)
* nodebird.com ( react로 만든 nodebird )
* vue 소스코드 : https://github.com/zerocho/vue-nodebird
* DB는 mysql 5.7안정적, vue는 2버전 nuxt는2버전

## 공식문서
* vue가이드 : https://kr.vuejs.org/v2/guide/index.html
* nuxt : https://ko.nuxtjs.org/guide

## git
* git에서 버전관리를 할 경우 node_modules, .nuxt같은 것들은 버전관리에서 빼줘야 하므로 미리 .gitignore파일을 만들어서 제외 항목을 작성한다.
  - ignore 해야할 목록을 알려주는 사이트 (https://www.gitignore.io/)

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
        <nav>
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
        </nav>
        <nuxt />
    </v-app>
</template>
```
* 아이콘관련 (https://vuetifyjs.com/en/components/icons)
* prepend-icon="mdi-magnify" 이런식으로 사용하면 되는데 (https://materialdesignicons.com/)에서 사용 아이콘 이름에서 **mdi-** 를 앞에 꼭 붙여준다.

## vuetify 그리드 시스템 사용( https://vuetifyjs.com/en/components/grids )
* 우선 layout은 가로로쪼개고 세로로쪼개는 형태로 구성한다.
* 12 grid중에 앞쪽4는 좌측메뉴 나머지 8은 컨텐츠부부능로 나눌꺼임.
* cols는 전체를 몇개로 나눌지... 보통 12로 나누는 그리드시스템을 많이 사용한다.
* xs, sm, md, lg, xl에 관련하여 그리드 시스템을 확인해보자. (화면크기별로 반응형을 적용해주는 것, 공식문서참조)
  - xs : 모바일 화면크기정도 일때 
  - sm : 태블릿 정도의 사이즈 일때
  - md : 큰 태블릿 또는 노트북 정도의 크기일때
  - lg : desktop 정도의 크기일때
  - xl : 울트라와이드

```
<v-row>
    <v-col cols="12" xs="12" md="4">로그인창</v-col>
    <v-col cols="12" xs="12" md="8">컨텐츠<nuxt /></v-col>
</v-row>
```

## 기본페이지 화면만들기(각 .vue파일 소스 참조)
* nuxt환경에서 pages폴더의 파일들은 모두 화면 페이지 관련 파일들이고 components폴더의 .vue파일들은 일반적으로 재사용되는 파일들을 모아둔다.
* components폴더에 LoginForm.vue, PostCard.vue파일을 생성하고 template안에 v-container로 처음 감싼다.
  - v-container는 div로 감싼다라고 생각하면 될듯.... 다닥다닥 붙지않고 padding을 조금 주면서 감싸는 느낌...
  - 계속해서 v-card를 넣고 그 안쪽에 로그인폼을 코딩한다.(https://vuetifyjs.com/en/components/cards)
* import 할때 상대경로를 ../../ 이렇게 하지 않고 간단하게 '~'로 루트폴더를 접근하여 사용할 수 있다. 정확하게 말하면 소스의 루트...
  - 현재 프로젝트는 루트에 소스들이 같이 있으므로 특별히 구분은 안되어있음.
* 계속해서 회원가입폼 코딩 시작.
* 메인에 들어갈 PostCard.vue 템플릿 코딩.
* no-gutters를 통해 layout간 padding을 제거할 수 있습니다. (https://vuetifyjs.com/en/components/grids#no-gutters)
* 마지막 FollowList.vue파일을 공통으로 생성하고 profile.vue화면에서 가져와 사용하여 코딩한다.

## 폼 검증하기
* db, backend가 없기 때문에 dumy데이터를 만들어 회원가입 화면 코딩.
  - vuetify에서 제공하는 valid, rules 기능... vuetify를 안쓰면 모두 자체 구현을 해줘야 하는 기능이다.
    - valid값은 rules가 모두 참 일때 true가 됨.
  - 여기서 사용한 vue 다양한 방법
    - 이벤트 바인딩 @submit... : 이벤트 바인딩 축약방법
    - v-model : data의 변수를 연결
    - ref설정 사용시에는 this.$refs.설정이름.validate() : validate()는 vuetify에서 제공.
    - vuetify의 valid, rules 기능
```
<v-text-field
    v-model="email"
    label="이메일"
    type="email"
    :rules="emailRules" // vuetify에서 제공하는 validation 룰을 정해주는 방법
    required
/>
data() {
    return {
      valid: false, // 회원가입에 값들이 모두 잘 들어가 있는지 아닌지에 대한 vuetify에서 제공하는 true, false값 자동셋팅 해줌.
      email: '',
      emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',  //vuetify에서 자동으로 할 수 있게 제공해 준다.
      ],
    };
  },
```
* 로그인폼 또한 코딩(ch1 : components/LoginForm.vue 참조)
  - 값이 모두 유효하지 않았을 경우 :disabled=false 부분을 적용하여 로그인 버튼을 비활성화 시키는 방법코딩.
  - valid값은 rules가 모두 참 일때 true가 됨.

## eslint 도입하기 (npm i eslint eslint-plugin-vue)
* 보통 실무에서는 폴더구조다음 eslint를 설정하는 부분을 중요시 한다.(test, cicd 관련도 찾아보자.)
* 여러사람이 코딩할 경우 스타일을 지정해줘야 한다. 그래서 eslint를 도입
  - 사람마다 코딩 스타일이 다르므로 그것을 정해진 규칙대로 코딩스타일을 맞춰서 하게끔 하기 위함.
* eslint를 npm 으로 설치를 한 다음. 루트에 .eslintrc파일을 생성하고 아래 코딩(eslint에 대한 설정)
* 그다음 package.json의 scripts부분에 lint라는것을 하나 만들어서 npm run lint를 했을때 코딩 스타일을 체크할 수 있는것을 실행하게끔 만든다.
  - 기본 eslint의 스타일가이드중에 특정 가이트를 끄고자 하면 아래와 같이 'rules'에서 해당 가이드명을 off해주면 된다.
    - package.json에 lint로 scripts정해놓았기 때문에 npm run lint하면 에러내용을 볼 수 있다 여기서 해당 rule을 끌 수 있다.
    - 들여쓰기 관련하여 warning이 발생했을때 vscode에서 settings를 변경하는 방법은 file-preferences-settings에서 Commonly Used에서
      - Tab Size : 2, Insert Spaces : 체크, Detact Indentation:체크해제 해서 사용.
```
"scripts": {
    "dev": "nuxt",
    "lint": "eslint **/*"   // 모든파일을 다 검사
  },
```
```
{
  "parserOptions": {
    "ecmaVersion": 2019,    // js 버전
    "sourceType": "module"  // js 코드에서 모듈 시스템을 이용하여 할거기 때문에 module
  },
  "env": {
    "browser": true,    // 브라우져 환경에서 볼꺼기 때문에 true
    "node": true        // vue에서 nodejs를 쓰기때문에 true
  },
  "extends": [          // 여러가지 룰들을 켜기 위함.(plugin들을 모아두는곳)
    "plugin:vue/recommended"    // vue를 사용할때  eslint가 추천하는 기본 코딩 스타일을 켬. 우리가 만든 코딩스타일을 지정하려면 바꿔준다.
  ],
  "plugins": [],
  "rules": {
    "vue/max-attributes-per-line": "off", // eslint에서 걸러내고자 하는 기능은 이렇게 빼준다.
    "vue/singleline-html-element-content-newline": "off"
  }
}
```
* 꼭 검사하지 않아도 되는 파일들은 .eslintignore 파일을 만들어서 검사하지 않을 파일들을 적어둔다.
  - 원래 package.json에서 error가 많이 났었는데 제외항목으로 빼놓으니까 error가 통과됨.

# Vuex로 데이터 관리하기 (ch2)
## Vuex 모듈 시스템(https://ko.nuxtjs.org/guide/vuex-store)
* nuxt에는 vuex가 포함되어있기때문에 따로 설치가 필요없다.
* nuxt에서는 두가지 store모드를 제공한다.
  - 클래식모드, 모듈모드
  - 클래식모드 : Vuex.Store의 store 하나를 export하여 사용하는 형식(여러가지 파일로 나누어 사용하기 힘듬)
  - 모듈모드 : store폴더에서 기능별로 각각 js파일로 분리하여 state, mutations, actions등을 따로 export하여 분리하는 방식.
* store폴더 생성 : index.js, posts.js, users.js 파일 생성.
  - 기능별로 상태관리를 하기 위하여 모듈시스템 방식으로 파일로 나누어 3개의 파일을 생성한다. index.js는 전체 상태에 관련된 코딩을 한다.
  - 만들어진 파일에서 state, mutations, actions를 모두 따로 export한다.
  - nuxt는 store폴더가 생성되면 알아서 Vue.use를 해서 사용할 수 있게끔 자동으로 만들어준다.
* 만들어진 store폴더내의 파일들 .js들에 접근할때는 각 화면에서 **this.$store.state.파일명.스테이트명**  이렇게 접근가능
  - mutations으로 접근할때는 **this.$store.commit('파일명/mutation명')** 이렇게 접근가능.

## Vuex actions
* 회원가입 더비데이터 구현
  - store의 users.js모듈에서 작업
  - mutations는 동기적작업, actions는 비동기적 작업.
  - commit 은 mutaions를 실행하는 것, dispatch는 actions를 실행하는것.
  - 그래서 actions에는 서버에 요청을 보내는 ajax호출을 한다.

## 로그인/회원가입 더미 데이터 처리
* 폼들은 component로 파일분리해서 코딩하는게 좋음.
* 미리 데이터를 예상하여 더미데이터를 만든다.
* 로그인, 로그아웃, 회원가입등 코딩 처리
* 로그인 후 화면전환시 router 사용법은 공식문서 참조 ( https://router.vuejs.org/guide/essentials/navigation.html )
  - this.$router.push({path: '/'})
* commit, dispatch함수들은 모두 비동기 이므로 javascript가 순서대로 읽히는 순서는 정해져 있지 않으므로 반드시 아래쪽 소스는 commit, dispatch처리 후 값의 변화에 따라 처리가 되게끔 해야한다.
  - commit, dispatch 비동기 처리 후 값의 변화에 따라 아래쪽 소스 처리를 진행하게끔 처리 필요.
  - commit, dispatch함수는 자체적으로 promise함수 이므로 해당함수 호출 후 .then() 또는 .catch() 를 붙여서 사용할 수 있다. 또는 async, await 으로 처리할 수 있다.

