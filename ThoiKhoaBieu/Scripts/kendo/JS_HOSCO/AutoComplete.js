//Tim kiem danh sach khach hang
function AutoCpt_Customer(svalue, sid, name, phone, address) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListCustomer",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#" + sid).val(ui.item.data.sid);
            if (name == "OrderReturns") {
                handleOrderReturns();
            }
            else if (name == "ImportReturns") {
                handleImportReturns();
            }
            else {
                $("#" + name).val(ui.item.data.sid);
            }
        }
    });
}

function AutoCpt_FullCustomer(svalue, id, sid, phone, address) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListCustomer",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#" + sid).val(ui.item.data.sid);
            $("#" + name).val(ui.item.data.name);
            $("#" + id).val(ui.item.data.id);
            $("#" + phone).val(ui.item.data.phone);
            $("#" + address).val(ui.item.data.address);
        }
    });
}


//Tim kiem danh sach nha cung cap
function AutoCpt_Supplier(svalue, sid, name, phone, address) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListSupplier",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.id,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#" + sid).val(ui.item.data.sid);
            $("#" + name).val(ui.item.data.name);
            $("#" + phone).val(ui.item.data.phone);
            $("#" + address).val(ui.item.data.address);
        }
    });
}

//Lay danh sach nhan vien
function AutoCpt_Employee(svalue, sid, name, phone, address) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListEmployees",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#" + sid).val(ui.item.data.sid);
            $("#" + name).val(ui.item.data.name);
            $("#" + phone).val(ui.item.data.phone);
            $("#" + address).val(ui.item.data.address);
        }
    });
}

//Autocomplete kendo
function AutoCpt_Kendo(svalue, sid, name, phone, address) {
    $("#" + svalue).kendoAutoComplete({
        dataSource: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListSupplier",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 3,
        filter: "startswith",
        placeholder: "Select country...",
        separator: ", "
    });
}


//Lay danh sach kho hang

function AutoCpt_Stores(svalue, sid, id) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListStores",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.s_StoreID,
                            value: v.s_StoreID,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#" + sid).val(ui.item.data.s_ID);
            $("#" + id).val(ui.item.data.s_StoreID);
        }
    });
}

//Lay danh sach hang hoa

function AutoCpt_ListProducts(svalue) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListProducts",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            var x = true;
            var CheckDB = false;
            if (x) {
                var svalue = $("#search_mv").val();
                if (svalue != "") {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue + " ") {
                            count = i;
                            CheckDB = true;
                            break;
                        }
                    }
                    if (CheckDB) {

                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                        handleCongDon();
                        $("#tblProduct").data("kendoGrid").refresh();
                        $("#search_mv").val("");
                    }
                }
                else {

                    CheckDB = true;
                }
            }
            if (!CheckDB) {
                var grid = $("#tblProduct").data("kendoGrid").dataSource;
                var congdon = $("#congdon").is(':checked');
                //alert(congdon);
                if (!congdon) {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        discount: 0,
                        total: ui.item.data.price,
                        //total : selectedItem.price
                    });
                    // alert("đú");
                    handleCongDon1();
                    //$("#search_mv").val("");
                }
                else {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    if (displayedData.length == 0) {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                        handleCongDon1();
                        return;
                    }

                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    var checkC = false;

                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == ui.item.data.id) {
                            count = i;
                            checkC = true;
                            break;
                        }
                    }
                    if (checkC) {
                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                    }
                    else {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                    }

                    handleCongDon1();

                    $("#tblProduct").data("kendoGrid").refresh();
                    //$("#search_mv").val("");
                }
                grid.sync();
            }
        }
    });
}
function AutoCpt_ListProducts_Orther(svalue) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListProducts",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            var x = true;
            var CheckDB = false;
            if (x) {


                var svalue = $("#search_mv").val();
                var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                var count = 0;
                for (var i = 0; i < row.length; i++) {
                    if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue+" ") {
                        count = i;
                        CheckDB = true;
                        break;
                    }
                }
                if (CheckDB) {
                    var quantity = Number(displayedData[count].quantity) + 1;
                    displayedData[count].quantity = quantity;
                    handleCongDon();
                    $("#tblProduct").data("kendoGrid").refresh();
                    $("#search_mv").val("");
                }

            }
            if (!CheckDB) {
                var grid = $("#tblProduct").data("kendoGrid").dataSource;
                var congdon = $("#congdon").is(':checked');
                //alert(congdon);
                if (!congdon) {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        discount: 0,
                        total: ui.item.data.price,
                        //total : selectedItem.price
                    });
                    // alert("đú");
                    handleCongDon();
                    //$("#search_mv").val("");
                }
                else {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    if (displayedData.length == 0) {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                        handleCongDon();
                        return;
                    }

                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    var checkC = false;

                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == ui.item.data.id) {
                            count = i;
                            checkC = true;
                            break;
                        }
                    }
                    if (checkC) {
                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                    }
                    else {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                    }

                    handleCongDon();

                    $("#tblProduct").data("kendoGrid").refresh();
                    //$("#search_mv").val("");
                }
                grid.sync();
            }
        }
    });
}
function handleCongDon1() {

    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    //var displayedDataAsJSON = JSON.stringify(displayedData); parse Json to string
    var txt = parseInt("0");
    for (var i = 0; i < displayedData.length; i++) {
        var _price = displayedData[i].price + "";
        var _quantity = displayedData[i].quantity + "";
        var _discount = displayedData[i].discount + "";
        _price = _price.replace(/[^\w\s]/gi, '');


        var _dicountMoney = parseFloat(_quantity) * parseFloat(_price) * parseFloat(_discount);

        txt += parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        displayedData[i].total = parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        //txt += displayedData[i].price + "  "+displayedData[i].quantity +" ";
    }
    var split = (txt + "").split(".");
    txt = split[0];
    $("#txtThanhTien").val(numberWithCommas(txt));

    handleGiamgia();
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function handleString(s) {
    return (s.value + "").replace(/[^\w\s]/gi, '');
}
function handleGiamgia() {
    var tt = document.getElementById("txtThanhTien");
    var tm = "0";
    var tdm = document.getElementById("txtDecM");
    var tp = document.getElementById("txtDecP");
    var ttt = document.getElementById("txtTotal");

    tt.value = handleString(tt);


    ttt.value = handleString(ttt);

    tdm.value = handleString(tdm);
    if (parseFloat(tp.value) > 100 || parseFloat(tp.value) < 0) {
        alert("Yêu cầu bạn nhập đúng % giảm giá");
    }
    else {
        var money_split = (parseFloat(tp.value) * (parseFloat(tt.value)) * 0.01);
        var split = (money_split + "").split(".");
        var money = parseFloat(split[0]);
        tdm.value = numberWithCommas(money);
        var total = parseFloat(tt.value) - parseFloat(money);
        ttt.value = numberWithCommas(total);

        $("#txtThanhTien").val(numberWithCommas(tt.value));
    }
    handleMoney();
}
function handleMoney() {
    var khachTra = $("#Comp_KT").val().replace(/[^\w\s]/gi, '');;
    var duNo = document.getElementById("Comp_DN");
    var tienchuyen = $("#CK_TC").val().replace(/[^\w\s]/gi, '');
    var tongCong = $("#txtTotal").val().replace(/[^\w\s]/gi, '');;

    duNo.value = numberWithCommas(parseFloat(khachTra) + parseFloat(tienchuyen) - parseFloat(tongCong));
}

function handleOrderReturns() {
    var s_objID = $("#Obj_SID").val();
    if (s_objID != "") {

        $.ajax({
            url: "/OrderReturns/SearchOrder",
            type: "GET",
            data: {
                search: $("#CT_ID").val(),
                s_Object_ID: s_objID
            },
            success: function (result) {
                $("#Ordergrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Ordergrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_Order_ID: result[i].s_Order_ID,
                        dt_OrderDate: result[i].dt_OrderDate,
                        m_Ordertotal: result[i].m_Ordertotal,
                        s_Note: result[i].s_Note
                    });
                }
                $("#searchOrder").val($("#CT_ID").val());

            }, error: function () {
                alert("Có lỗi xảy ra");
            }

        });
    }
    else {
        alert("Bạn phải chọn 1 khách hàng");
    }
}
function handleImportReturns() {
    var s_objID = $("#Obj_SID").val();
    if (s_objID != "") {

        $.ajax({
            url: "/ImportReturns/SearchOrder",
            type: "GET",
            data: {
                search: $("#CT_ID").val(),
                s_Object_ID: s_objID
            },
            success: function (result) {
                $("#Ordergrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Ordergrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_Order_ID: result[i].s_Order_ID,
                        dt_orderDate: result[i].dt_orderDate,
                        m_totalMoney: result[i].m_totalMoney,
                        m_per: result[i].m_per,
                        s_Note: result[i].s_Note
                    });
                }
                $("#searchOrder").val($("#CT_ID").val());

            }, error: function () {
                alert("Có lỗi xảy ra");
            }

        });
    }
    else {
        alert("Bạn phải chọn 1 khách hàng");
    }
}

function handleMavach(event) {
    var keycode = event.keyCode;
    if (keycode == 13) {
        var x = true;
        var CheckDB = false;
        if (x) {
            var svalue = $("#search_mv").val();
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
            var row = $("#tblProduct").data("kendoGrid").dataSource.data()
            var count = 0;
            for (var i = 0; i < row.length; i++) {
                if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue + " ") {
                    count = i;
                    CheckDB = true;
                    break;
                }
            }
            if (CheckDB) {
                var quantity = Number(displayedData[count].quantity) + 1;
                displayedData[count].quantity = quantity;
                handleCongDon();
                $("#tblProduct").data("kendoGrid").refresh();
                $("#search_mv").val("");
            }

        }
      
        if (!CheckDB) {
            var svalue = $("#search_mv").val();
            $.ajax({
                url: "/DMSMainPage/DSHanghoa",
                type: "GET",
                data: { svalue: svalue },
                success: function (result) {

                    var grid = $("#tblProduct").data("kendoGrid").dataSource;
                    var congdon = true;

                    if (result.length == 1) {
                        if (!congdon) {
                            grid.add({
                                sid: result[0].sid,
                                id: result[0].id,
                                dvt: result[0].s_Unit,
                                name: result[0].name,
                                price: result[0].price,
                                quantity: 1,
                                discount: 0,
                                total: result[0].price,
                                //total : selectedItem.price
                            });
                            handleCongDon();
                        }
                        else {
                            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                            if (displayedData.length == 0) {
                                grid.add({
                                    sid: result[0].sid,
                                    id: result[0].id,
                                    dvt: result[0].s_Unit,
                                    name: result[0].name,
                                    price: result[0].price,
                                    quantity: 1,
                                    discount: 0,
                                    total: result[0].price,
                                });
                                handleCongDon();
                            }

                            var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                            var count = 0;
                            var checkC = false;
                            for (var i = 0; i < row.length; i++) {
                                if (row[i].id == result[0].id) {
                                    count = i;
                                    
                                    checkC = true;
                                    break;
                                }
                            }
                            if (checkC) {
                               
                                var quantity = Number(displayedData[count].quantity) + 1;
                                displayedData[count].quantity = quantity;
                            }
                            else {
                                grid.add({
                                    sid: result[0].sid,
                                    id: result[0].id,
                                    dvt: result[0].s_Unit,
                                    name: result[0].name,
                                    price: result[0].price,
                                    quantity: 1,
                                    discount: 0,
                                    total: result[0].price,
                                });
                            }

                            handleCongDon();

                            $("#tblProduct").data("kendoGrid").refresh();
                        }

                        grid.sync();
                    }
                    else {
                        //SearchProduct(svalue);
                        $("#Productgrid").data('kendoGrid').dataSource.data([]);
                        var grid1 = $("#Productgrid").data("kendoGrid").dataSource;
                        for (var i = 0; i < result.length; i++) {
                            grid1.add({
                                sid: result[i].sid,
                                id: result[i].id,
                                name: result[i].name,
                                price: result[i].price,
                                namegroup: result[i].namegroup,
                                s_Unit: result[i].s_Unit
                            });
                        }
                        grid.sync();
                        $('#lproduct').modal('show');
                    }

                }, error: function () {
                    alert("Có lỗi xảy ra");
                }

            });

            $("#search_mv").val("");
        }
    }
}

function AutoCpt_ListProducts_Transfer(svalue) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListProducts",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            var x = true;
            var CheckDB = false;
            if (x) {


                var svalue = $("#search_mv").val();
                var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                var count = 0;
                for (var i = 0; i < row.length; i++) {
                    if (row[i].id == svalue ) {
                        count = i;
                        CheckDB = true;
                        break;
                    }
                }
                if (CheckDB) {
                    var quantity = Number(displayedData[count].quantity) + 1;
                    displayedData[count].quantity = quantity;
                    handleCongDon();
                    $("#tblProduct").data("kendoGrid").refresh();
                    $("#search_mv").val("");
                }

            }
            if (!CheckDB) {
                var grid = $("#tblProduct").data("kendoGrid").dataSource;
                var congdon = $("#congdon").is(':checked');
                //alert(congdon);
                if (!congdon) {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        discount: 0,
                        total: ui.item.data.price,
                        //total : selectedItem.price
                    });
                    // alert("đú");
                    handleCongDon();
                    //$("#search_mv").val("");
                }
                else {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    if (displayedData.length == 0) {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                        handleCongDon();
                        return;
                    }

                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    var checkC = false;

                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == ui.item.data.id) {
                            count = i;
                            checkC = true;
                            break;
                        }
                    }
                    if (checkC) {
                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                    }
                    else {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discount: 0,
                            total: ui.item.data.price,
                        });
                    }

                    handleCongDon();

                    $("#tblProduct").data("kendoGrid").refresh();
                    //$("#search_mv").val("");
                }
                grid.sync();
            }
        }
    });
}

function GetStatus() {
    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    return displayedData;
}

//Xử lý autocomplete list hàng hóa
function handleListProduct(event)
{
    var grid,grid1;
    var keycode = event.keyCode;
    if (keycode == 13) {

        $.ajax({
            url: "/SearchAutoComplete/SearchListProduct",
            dataType: "json",
            data: {
                svalue: $("#searchCus").val(),
            },
            success: function (data) {
                grid = $("#gridOrder").data("kendoGrid");
                grid.setDataSource(data);
                grid.dataSource.pageSize(16);
                grid1 = $("#gridOrder1").data("kendoListView");
                grid1.setDataSource(data);
              
            }, error: function () {

            },
            async: false
        });
     
    }
    
}

function AutoCpt_ListProducts_BaoGia(svalue) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListProducts",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            var x = true;
            var CheckDB = false;
            if (x) {
                var svalue = $("#search_mv").val();
                if (svalue != "") {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue + " ") {
                            count = i;
                            CheckDB = true;
                            break;
                        }
                    }
                    if (CheckDB) {

                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                        handleCongDon();
                        $("#tblProduct").data("kendoGrid").refresh();
                        $("#search_mv").val("");
                    }
                }
                else {

                    CheckDB = true;
                }
            }
            if (!CheckDB) {
                var grid = $("#tblProduct").data("kendoGrid").dataSource;
                var congdon = true;
                //alert(congdon);
                if (!congdon) {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        discountP: 0,
                        discountM: 0,
                        total: ui.item.data.price,
                        //total : selectedItem.price
                    });
                    // alert("đú");
                    handleCongDon1();
                    //$("#search_mv").val("");
                }
                else {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    if (displayedData.length == 0) {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discountP: 0,
                            discountM: 0,
                            total: ui.item.data.price,
                        });
                        handleCongDon2();
                        return;
                    }

                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    var checkC = false;

                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == ui.item.data.id) {
                            count = i;
                            checkC = true;
                            break;
                        }
                    }
                    if (checkC) {
                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                    }
                    else {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,
                            discountP: 0,
                            discountM: 0,
                            total: ui.item.data.price,
                        });
                    }

                    handleCongDon2();

                    $("#tblProduct").data("kendoGrid").refresh();
                    //$("#search_mv").val("");
                }
                grid.sync();
            }
        }
    });
}
function handleCongDon2() {

    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    //var displayedDataAsJSON = JSON.stringify(displayedData); parse Json to string
    var txt = parseInt("0");
    for (var i = 0; i < displayedData.length; i++) {
        var _price = displayedData[i].price + "";
        var _quantity = displayedData[i].quantity + "";
        var _discount = displayedData[i].discountP + "";
        _price = _price.replace(/[^\w\s]/gi, '');


        var _dicountMoney = parseFloat(_quantity) * parseFloat(_price) * parseFloat(_discount) /100;

        txt += parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        displayedData[i].total = parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        //txt += displayedData[i].price + "  "+displayedData[i].quantity +" ";
    }
    var split = (txt + "").split(".");
    txt = split[0];
    $("#txtThanhTien").val(numberWithCommas(txt));

    handleGiamgia();
}

function AutoCpt_ListProducts_Transfer(svalue) {
    $("#" + svalue).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/SearchAutoComplete/ListProducts",
                dataType: "json",
                data: { svalue: $("#" + svalue).val() },
                success: function (data) {

                    response($.map(data, function (v, i) {
                        return {
                            label: v.name,
                            value: v.name,
                            data: data[i]
                        };
                    }));
                }, error: function () {

                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            var x = true;
            var CheckDB = false;
            if (x) {
                var svalue = $("#search_mv").val();
                if (svalue != "") {
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue + " ") {
                            count = i;
                            CheckDB = true;
                            break;
                        }
                    }
                    if (CheckDB) {
                       
                        var quantity = Number(displayedData[count].quantity) + 1;
                       
                        displayedData[count].quantity = quantity;
                       
                        updateTempRecords();
                        
                        $("#search_mv").val("");
                    }
                }
                else {

                    CheckDB = true;
                }
            }
            if (!CheckDB) {
               
                var grid = $("#tblProduct").data("kendoGrid").dataSource;
                var congdon = true;
                //alert(congdon);
                if (!congdon) {
               
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,                       
                        total: ui.item.data.price,
                        //total : selectedItem.price
                    });
                    // alert("đú");
                    updateTempRecords();
                    //$("#search_mv").val("");
                }
                else {
               
                    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                    if (displayedData.length == 0) {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,                          
                            total: ui.item.data.price,
                        });

                        updateTempRecords();

                        return;
                    }
                    alert("1");
                    var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                    var count = 0;
                    var checkC = false;

                    for (var i = 0; i < row.length; i++) {
                        if (row[i].id == ui.item.data.id) {
                            count = i;
                            checkC = true;
                            break;
                        }
                    }
                    if (checkC) {
                        var quantity = Number(displayedData[count].quantity) + 1;
                        displayedData[count].quantity = quantity;
                    }
                    else {
                        grid.add({
                            sid: ui.item.data.sid,
                            id: ui.item.data.id,
                            dvt: ui.item.data.s_Unit,
                            name: ui.item.data.name,
                            price: ui.item.data.price,
                            quantity: 1,                           
                            total: ui.item.data.price,
                        });
                    }

                    updateTempRecords();

                    $("#tblProduct").data("kendoGrid").refresh();
                    //$("#search_mv").val("");
                }
                grid.sync();
            }
        }
    });
}

function handleMavach_Transfer(event) {
    var keycode = event.keyCode;
    if (keycode == 13) {
        var x = true;
        var CheckDB = false;
        if (x) {
            var svalue = $("#search_mv").val();
            if (svalue != "") {
                var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                var count = 0;
                for (var i = 0; i < row.length; i++) {
                    if (row[i].id == svalue || row[i].name == svalue || row[i].name == svalue + " ") {
                        count = i;
                        CheckDB = true;
                        break;
                    }
                }
                if (CheckDB) {

                    var quantity = Number(displayedData[count].quantity) + 1;

                    displayedData[count].quantity = quantity;

                    updateTempRecords();

                    $("#search_mv").val("");
                }
            }
            else {

                CheckDB = true;
            }
        }
        if (!CheckDB) {

            var grid = $("#tblProduct").data("kendoGrid").dataSource;
            var congdon = true;
            //alert(congdon);
            if (!congdon) {

                grid.add({
                    sid: ui.item.data.sid,
                    id: ui.item.data.id,
                    dvt: ui.item.data.s_Unit,
                    name: ui.item.data.name,
                    price: ui.item.data.price,
                    quantity: 1,
                    total: ui.item.data.price,
                    //total : selectedItem.price
                });
                // alert("đú");
                updateTempRecords();
                //$("#search_mv").val("");
            }
            else {

                var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
                if (displayedData.length == 0) {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        total: ui.item.data.price,
                    });

                    updateTempRecords();

                    return;
                }
                alert("1");
                var row = $("#tblProduct").data("kendoGrid").dataSource.data()
                var count = 0;
                var checkC = false;

                for (var i = 0; i < row.length; i++) {
                    if (row[i].id == ui.item.data.id) {
                        count = i;
                        checkC = true;
                        break;
                    }
                }
                if (checkC) {
                    var quantity = Number(displayedData[count].quantity) + 1;
                    displayedData[count].quantity = quantity;
                }
                else {
                    grid.add({
                        sid: ui.item.data.sid,
                        id: ui.item.data.id,
                        dvt: ui.item.data.s_Unit,
                        name: ui.item.data.name,
                        price: ui.item.data.price,
                        quantity: 1,
                        total: ui.item.data.price,
                    });
                }

                updateTempRecords();

                $("#tblProduct").data("kendoGrid").refresh();
                //$("#search_mv").val("");
            }
            grid.sync();
        }
    }
}