updated : 18/02/2024

## 개발 환경
- IDE : WebStorm
- 언어/프레임워크 : TypeScript, NestJs(10.3.0)
- 패키지관리자 : npm(10.2.3)
- DB : MySQL

## 목표
- [ ] ```NestJS``` 가 무엇인지, 어떻게 사용하는지 숙지 후 API 생성
- [ ] ```oAuth``` 를 사용하여 구글 로그인 연동
- [ ] 결제 시스템 연동
- [ ] 정산 커맨드 작성 (*정산 수수료는 판매금의 5%로 통일한다.)
- [ ] 이벤트 등으로 인한 대규모 트래픽 처리
- [ ] ```Jenkins``` 를 통한 배포

## 프로젝트 구조
```
└─src
    ├─auth
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