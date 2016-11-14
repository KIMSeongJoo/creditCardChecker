// CardChecker
// 신용 카드 관련 체크 오브젝트
var CardChecker = function() {
    // 입력된 브랜드
    var inpCardBrand           = "";
    // 브랜드별 최대 길이
    var brandCardNoMXLength    = "";
    // 브랜드별 앞머리 번호
    var brandCardNoHeadPattern = "";
    var brandInfo = {
        'visa': {
            'length': 16,
            'pattern': /^4/
        },
        'master': {
            'length': 16,
            'pattern': /^5[1-5]/
        },
        'jcb': {
            'length': 16,
            'pattern': /^35(2[89]|[3-8][0-9])/
        },
        'amex': {
            'length': 15,
            'pattern': /^3[47]/
        },
        'diners': {
            'length': 14,
            'pattern': /^30[0-59]|^3[689]/
        },
    };

    // @public
    // 카드번호 체크
    // 순서대로
    //     브랜드 명 -> 카드번호 길이 -> 선택된 브랜드에 따른 앞자리 숫자 확인 -> 룬알고리즘 체크
    // param : brand ( 카드 브랜드)
    //       : cardNo ( 카드 번호 )
    // return : boolean
    this.creditCardNoCheck = function(brand, cardNo)
    {
        // 브랜드 체크
        var brandChkRes = _checkCardBrand(brand);
        if (brandChkRes === false) {
            return false;
        }

        // 카드번호 길이 체크
        var baseCardNochkRes = _checkCardNoLength( cardNo );
        if( baseCardNochkRes === true ){
            // 앞자리 체크
            baseCardNochkRes = _checkHeadCardNo( cardNo );
            if( baseCardNochkRes === true ){
                // 룬 알고리즘 체크
                return _checkLuhnAlgorithm( cardNo );
            }
        }
        return false;
    };

    // @private
    // 기본 길이 길이 체크
    // param : cardNo
    // return : boolean
    var _checkCardNoLength = function(cardNo)
    {
        if( cardNo.length === 0 || cardNo.length > brandCardNoMXLength ){
            return false;
        }
        return true;
    };

    // @private
    // 카드 브랜드 체크
    // param : brand
    // return : boolean
    var _checkCardBrand = function(brand)
    {
        brand = _whitespaceDelete(brand);
        if (typeof brand != "string" || brand.length === 0) {
            return false;
        }
        // 소문자로
        brand = brand.toLowerCase();
        var chkRes = false;
        switch (brand) {
            case 'visa':
            case 'master':
            case 'amex':
            case 'jcb':
            case 'diners':
                chkRes                 = true;
                inpCardBrand           = brand;
                brandCardNoMXLength    = brandInfo[brand]['length'];
                brandCardNoHeadPattern = brandInfo[brand]['pattern'];
                break;
            default:
                break;
        }
        return chkRes;
    };

    // @private
    // 카드번호 앞자리 체크
    // param : cardNo
    // return : boolean
    var _checkHeadCardNo = function(cardNo)
    {
        return brandCardNoHeadPattern.test( _whitespaceDelete(cardNo) );
    };

    // @private
    // 룬 알고리즘 체크
    // param : cardNo
    // return : boolean
    var _checkLuhnAlgorithm = function(cardNo)
    {
        cardNo = _whitespaceDelete(cardNo);
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
            if (tmpCount % 2 === 0) {
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
        if (tmpTotal % 10 !== 0) {
            return false;
        }
        return true;
    };

    // @private
    // 공백 삭제용
    // 이 오브젝트 내에선 공백을 수용하지 않음
    // param : str ( 문자열 )
    // return : str ( 공백 삭제됨 )
    var _whitespaceDelete = function( str ){
        return str.replace(/ /gi, '');
    };
};
