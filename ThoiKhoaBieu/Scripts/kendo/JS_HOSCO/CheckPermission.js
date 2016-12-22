function CheckPermission(check) {
    if (check == "True") {
        return true;
    }
    else {
       
        swal("Bạn không có quyền thực hiện chức năng này!");
        return false;
    }
}
function SetOption()
{
    var index = 3;
    return index;
}

