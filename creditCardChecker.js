var cardInfo = {
    // 카드 브랜드별 문자수, 사용가능 앞자리 번호 ( 비자의 경우, 일본내의 house 카드를 일부 비자로 인식시키기 때문에
    // wiki에 적용된것가 조금 다름
    'visa' : {
        'length' : 16,
        'pattern' : /^4|^6950([0-1][0-9]|2[0-3]|70|80|8[8-9]|9[0-7])/
    },
    'master' : {
        'length' : 16,
        'pattern' : /^5/
    },
    'jcb' : {
        'length' : 16,
        'pattern' : /^35(2[89]|[3-8][0-9])/
    },
    'amex' : {
        'length' : 15,
        'pattern' : /^3[47]/
    },
    'diners' : {
        'length' : 14,
        'pattern' : /^30[0-59]|^3[689]/
    },
    // 카드 회브랜드를 설정
    setChkTargetInfo : function( comp )
    {
        this.length = this[comp].length;
        this.pattern = this[comp].pattern;
    },
    // 룬 알고리즘 체크를 실시
    checkLuhn : function( cardNo )
    {
        // 카드번호의 길이
        var tmpCardNoLen = cardNo.length;
        // 입력된 번호를 리스트로 변경
        var tmpCardNo = cardNo.split("");
        // 카운터
        var tmpCount = 1;
        // 숫자의 합계
        var tmpTotal = 0;
        // 계산 시작
        for (var i = tmpCardNoLen; i > 0; i--) {
            // 카드번호의 오른쪽(끝)에서 부터 왼쪽(선두)로 이동하며 2번째가 될때마다 곱셈, 곱셈한 결과가 10이상 될경우 1의자리와 10의 자리를 더함

            // 2번째 자릿수가 될때마다 x2를 실시
            if (tmpCount % 2 == 0) {
                var tmpDouble = tmpCardNo[i - 1] * 2;
                // 곱셈의 결과가 10보다 크거나 같은경우 1의자리수와 10의자리수를 더함
                if (tmpDouble >= 10) {
                    var tmp = tmpDouble.toString().split("");
                    tmpTotal = parseInt(tmpTotal) + parseInt(tmp[0]) + parseInt(tmp[1]);
                } else {
                    // 그렇지 않을경우엔 평범히 계속 더해감
                    tmpTotal += parseInt(tmpDouble);
                }
            } else {
                // 2의 배수 자리가 아닐경우엔 그냥 덧셈
                tmpTotal += parseInt(tmpCardNo[i - 1]);
            }
            tmpCount++;
        }
        // 이렇게 전체를 더한 결과가 10의 배수가 아닐경우 Luhn알고리즘적으로 적용되지 않으므로 올바른 번호가 아니라 판단 False를 return
        if (tmpTotal % 10 != 0) {
            return false;
        }
        return true;
    },
    checkBaseCardNo : function( cardNo ){
        // 기본적인 체크, 길이와, 카드번호의 앞자리를 체크
        if (cardNo.length != this.length || this.pattern.test(cardNo) == false ) {
            return false;
        }
        return true;
    }
}
