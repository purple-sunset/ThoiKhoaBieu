function CheckValidate(email) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
}
function checkForm(n) {
    var reg = /\`|\~|\!|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\[|\{|\]|\}|\\|\||\;|\:|\'|\"|\,|\@|\<|\.|\>|\/|\?/;
    return (reg.test(n));
}

function CompareDate(fromdate, todate) {
    //Note: 00 is month i.e. January
    
    if (ValidateDate(fromdate) && ValidateDate(todate)) {
        var arr1 = fromdate.split('/');
        if (arr1[2].length > 4) {
            var arr11 = arr1[2].split(' ');
            var arr12 = arr11[0];
        }
        else {
            var arr12 = arr1[2];
        }
        var arr2 = todate.split('/');
        if (arr2[2].length > 4) {
            var arr21 = arr2[2].split(' ');
            var arr22 = arr21[0];
        }
        else {
            var arr22 = arr2[2];
        }
        var dateOne = new Date(arr12, arr1[1], arr1[0], 0, 0, 0); //Year, Month, Date
        var dateTwo = new Date(arr22, arr2[1], arr2[0], 0, 0, 0); //Year, Month, Date
        
        if ((arr12 == arr22) && (arr1[1] == arr2[1]) && (arr1[0] == arr2[0])) {
            
            return true;
        }
        else if (dateOne < dateTwo) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }

}
function ValidateDate(dt) {

    var isValidDate = false;

    var arr1 = dt.split('/');
    if (arr1[2].length > 4) {
        var arr11 = arr1[2].split(' ');
        var arr12 = arr11[0];
    }
    else {
        var arr12 = arr1[2];
    }
    var year = 0; var month = 0; var day = 0;
    if (isNumber(arr12) && isNumber(arr1[1]) && isNumber(arr1[0])) {
        if (arr1.length == 3) {
            try {
                year = parseInt(arr12, 10);
                month = parseInt(arr1[1], 10);
                day = parseInt(arr1[0], 10);
                
                var isLeapYear = false;
                if (year % 4 == 0) {
                    isLeapYear = true;
                }
                if ((month == 4 || month == 6 || month == 9 || month == 11) && (day >= 0 && day <= 30)) {
                    isValidDate = true;
                }
                else if ((month != 2) && (day >= 0 && day <= 31)) {
                    isValidDate = true;
                }
                if (!isValidDate) {
                    if (isLeapYear) {
                        if (month == 2 && (day >= 0 && day <= 29))
                            isValidDate = true;
                    }
                    else {
                        if (month == 2 && (day >= 0 && day <= 28))
                            isValidDate = true;
                    }
                }

            }
            catch (er)
            { isValidDate = false; }
        }

    }
    return isValidDate;
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }