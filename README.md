# creditCardChecker
check credit card number, used luhn algorithm on javascript

자바스크립트를 이용햔 신용카드 번호체크 입니다..
아직 능숙하지 않아 뻘짓도 많아 보이지만.. 틈틈히 개선해볼까합니다.

- 아직 valid 체크가 상당히 약하기때문에 브랜드의 경우엔 개별적으로 해주어야 할거같습니다.
- 번호의 문자열 체크 같은 경우에도 현재 딱히 신경을 안썻기떄문에 체그가 필요할거 같네요..

how to use this?

var choice_card = document.getElemnetsById('sel_card_brand');
var card_no = document.getElemnetsById('inp_card_no');

cardInfo.setChkTargetInfo(choice_card.toLowerCase());
cardInfo.checkBaseCardNo( card_no );
cardInfo.checkLuhn( card_no );
