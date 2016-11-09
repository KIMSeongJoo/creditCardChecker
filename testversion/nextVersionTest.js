var CardChecker = function() {
    var visa = {
        'length': 16,
        'pattern': /^4|^6950([0-1][0-9]|2[0-3]|70|80|8[8-9]|9[0-7])/
    };
    var master = {
        'length': 16,
        'pattern': /^5/
    };
    var jcb = {
        'length': 16,
        'pattern': /^35(2[89]|[3-8][0-9])/
    };
    var amex = {
        'length': 15,
        'pattern': /^3[47]/
    };
    var diners = {
        'length': 14,
        'pattern': /^30[0-59]|^3[689]/
    };
    
    var inpCardBrand = "";
    var inpCardLength = "";
    var inpCardPattern = "";
    
    this.creditCardNoCheck = function ( brand, cardNo ) {
        // 브랜드 체크
        var brandChkRes = _checkCardBrand( brand );
        if( brandChkRes === false ){
            return false;
        }
        
        var baseCardNochkRes = _checkCardNoLength( cardNo );
        if( baseCardNochkRes === true ){
            baseCardNochkRes = _checkHeadCardNo( cardNo );
            if( baseCardNochkRes === true ){
                return _checkLuhnAlgorithm( cardNo );
            }
        }
        return false;
    }
    
    //  브랜드 체크는 밖에서도 가능
    var _checkCardNoLength = function( cardNo ){
        
    };
    
    var _checkCardBrand = function( brand ){
        if( typeof brand !== string || brand.length === 0 ){
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
                chkRes = true;
                inpCardBrand = brand;
                inp
                break;
            default:
                break;
        }
        return chkRes;
    };
    
    var _checkHeadCardNo = function ( cardNo ){
        
    };
    
    var _checkLuhnAlgorithm = function ( cardNo ){
        asdf
    };


};