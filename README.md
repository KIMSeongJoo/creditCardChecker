# creditCardChecker

자바스크립트를 이용한 신용카드 번호 체커

- 아직 이게 하나의 모듈로서 완벽한지에는 자신이 없습니다.
- 그러나 제가 손수 만든 모듈로서 실제 제가 일하는 회사에서 사용하고 있는 모듈과 거의 일치하며, 오히려 조금더 개량한 것입니다.

사양
이용 가능 브랜드
- VISA
- MASTER
- JCB
- DINERS
- AMEX

내장 함수
- 브랜드 확인 함수
- 선택된 브랜드에 의한 카드번호 최대 길이 체크 함수 (14,15,16)
- 카드번호 선두 4자리로 지정된 브랜드와 매치 함수 ( 선두 4자리는 wiki에 따릅니다 )
- 카드번호 룬 알고리즘 체크 함수


사용법

1. javascript 파일 load
2. var instance = new CreditCardChecker() 를 통한 인스턴스 생성
3. instance.creditCardNoCheck( 브랜드명, 카드번호 ) 로 사용
