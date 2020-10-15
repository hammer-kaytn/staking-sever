## 2020-10-14(수)

1. mission 스키마에 content, status 추가
2. mission api에서 내 참여 미션 확인하는 api 수정
3. account 스키마에서 participateList 삭제(mission 스키마에서 활용)
4. mission status 변경하는 작업 추가
5. 카테고리로 정렬 시 최신순으로 나오게 수정

## 2020-10-13(화)

1. 휴대폰 본인 인증 완료(네이버 SENS API 활용)

## 2020-10-12(월)

1. 휴대폰 본인 인증 가능하게 수정(테스트단계)

## 2020-10-11(일)

1. 카테고리 적용가능 하게 수정
2. 미션 디테일 페이지 주소 및 좋아요 추가 가능하게 수정

## 2020-10-10(토)

1. 미션 스키마 재수정
2. 미션 리스트 api

## 2020-10-07(수)

1. 미션 스키마 수정

## 2020-10-06(화)

1. 등록하기 구현 to 몽고db

## 2020-10-05(월)

1. 몽고db 설정
2. sns 계정 연동 설정(get, post)

## 2020-09-23(화)

1. 크롤링 관련 api 적용중..

## 2020-08-28(금)

1. 접속 키 및 토큰 컨트랙트 주소 수정

## 2020-08-25(화)

1. 서버 구현 (node app.js -> localhost:5000로 서버 시작)
2. KAS중 token history api 이용하여 기 배포된 hammer token의 transfer 내역 조회 가능

- http://localhost:5000/api/transfers/ -> hammer token의 모든 transfer 내역 조회
- http://localhost:5000/api/transfers/특정지갑주소 -> hammer token의 transfer 내역 중 특정지갑주소의 모든 transfer 내역 조회
