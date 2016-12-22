function SetInitialize()
{
    var index = 3;
    var dropdownlist = $("#slOption").data("kendoDropDownList");
    dropdownlist.select(index);
    return index;
}