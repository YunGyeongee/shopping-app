updated : 13/03/2024

# 개발 환경
- 언어/프레임워크 : TypeScript, Node.js(18.19.0), NestJs(10.3.0)
- 패키지관리자 : npm(10.2.3)
- DB : MySQL

# 목표
- ```NestJS``` 가 무엇인지, 어떻게 사용하는지 숙지 후 API 생성
- ```oAuth``` 를 사용하여 구글 로그인 연동
- 정산 커맨드 작성 (*정산 수수료는 판매금의 5%로 통일한다.)
- ```AWS``` 를 통한 배포

# ERD
![erd_2](https://github.com/YunGyeongee/shopping-app/assets/86589216/04101bbf-da16-4405-94d4-3eaf3e87c9b2)

# 프로젝트 구조
```
└─src
    ├─auth
    │  ├─decorator
    │  ├─security
    │  ├─constroller
    │  ├─module
    │  └─service
    ├─category
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─config
    ├─database
    │  ├─migrations
    │  └─data-source
    ├─order
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─product
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─seller
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─user
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─user-permission
    │  ├─constroller
    │  ├─entity
    │  ├─module
    │  └─service
    ├─app.controller
    ├─app.module
    ├─app.service
    ├─main
    └─test
├─.env
├─.eslintrc
├─.http
├─.prettierrc
├─.nest-cli.json
├─.package.json
├─.package-lock.json
├─README.md
├─tsconfig.build.json
└─tsconfig.json
```

# 프로젝트 실행
```
npm run start:dev
```

# swagger 실행
```
http://localhost:3000/api
```

# Trouble Shooting
- [Mac M1 zsh: command not found: nest](https://reyoo-dev.tistory.com/entry/Mac-M1-zsh-command-not-found-nest)
- [Validation failed(numeric string is expected)](https://reyoo-dev.tistory.com/entry/NestJs-Validation-failed-numeric-string-is-expected)
