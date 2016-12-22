function UpdateGridData_All() {
    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    var txt = parseFloat("0");
    for (var i = 0; i < displayedData.length; i++) {
        if (displayedData[i].quantity == null || displayedData[i].quantity == "") {
            displayedData[i].quantity = 0;
        }
        var _price = displayedData[i].price + "";
        var _quantity = displayedData[i].quantity + "";
        var _discount = displayedData[i].discount + "";
        _price = _price.replace(/,/g, '');
        _quantity = _quantity.replace(",", '');
        var _dicountMoney = parseFloat(_quantity) * parseFloat(_price) * parseFloat(_discount / 100);
        txt += parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        displayedData[i].total = (parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney));
        //txt += _discount + " ";
    }
    var split = (txt + "").split(".");
    txt = split[0];
    $("#txtThanhTien").val(numberWithCommas(txt));
    handleThue();
    handleGiamgia();
}

function UpdateGridData_OrderRetail() {
    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    var txt = parseFloat("0");
    for (var i = 0; i < displayedData.length; i++) {
        if (displayedData[i].quantity == null || displayedData[i].quantity == "") {
            displayedData[i].quantity = 0;
        }
        var _price = displayedData[i].price + "";
        var _quantity = displayedData[i].quantity + "";
        var _discount = displayedData[i].discount + "";
        _price = _price.replace(/,/g, '');
        _quantity = _quantity.replace(",", '');
        var _dicountMoney = parseFloat(_quantity) * parseFloat(_price) * parseFloat(_discount/100);
        txt += parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        displayedData[i].total = parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        //txt += _discount + " ";
    }
    var split = (txt + "").split(".");
    txt = split[0];
    $("#txtThanhTien").val(numberWithCommas(txt));
    handleGiamgia();
}

function TimKiemDonViPhu(sid, unit, id) {
    var selectedItem = $("#tblProduct").data("kendoGrid").dataSource.get(id);
    $.cookie("mahanghoa", id);
    $.ajax({
        url: "/DMSMainPage/DonViPhu",
        type: "GET",
        data: { svalue: sid },
        success: function (data) {
            var len = data.length;
            var listItems = "";
            listItems += "<option value='1'>" + data[0].Main_Unit + "</option>";
            for (var i = 0; i < len; i++) {
                listItems += "<option value='" + data[i].s_ID + "'>" + data[i].s_Unit + "</option>";
            }
            $("#donviphu").html(listItems);
            $.cookie("donviphu", JSON.stringify(data));
            $("#tensp").val(selectedItem.name);
            $("#tiendvt").val(numberWithCommas(parseInt(data[0].Unit_Price)));
            $("#ghichu1").val("Đơn vị chính");
            $('#NewModel').modal('show');
        }
    });
}
function showpro(id) {
  
    
}
function gridDataBound(e) {
    var grid = e.sender;
    if (grid.dataSource.total() == 0) {
        var colCount = grid.columns.length;
        $(e.sender.wrapper)
            .find('tbody')
            .append('<tr class="kendo-data-row"><td colspan="' +
                            colCount +
                            '" style="text-align:center"><b>Xin mời bạn lựa chọn sản phẩm !</b></td></tr>');
    }
};

function GridData(model) {

    var obj = JSON.parse(model);
    var tempSavedRecords = null;
    var gridDataSource = new kendo.data.DataSource({
        data: obj,
        schema: {
            model: {
                id: 'id',
                fields: {
                    id: { type: "string", editable: false, nullable: false },
                    name: { type: "string", editable: false },
                    dvt: { type: "string", editable: true },
                    price: { type: "number", editable: true, nullable: false, validation: { min: 0 } },
                    quantity: { type: "number", editable: true, nullable: false, validation: { min: 1 } },
                    discount: { type: "number", editable: true, nullable: false, validation: { min: 0, max: 100 } },
                    total: { type: "number", editable: false }
                }
            }
        }
    });

    $('#tblProduct').kendoGrid({
        dataSource: gridDataSource,
        scrollable: true,
        sortable: true,
        selectable: true,
        dataBound: gridDataBound,
        resizable: true,
        height: 300,
        columns: [
            { field: "id", title: "Mã hàng", width: "130px" },
            { field: "name", title: "Tên hàng", width: "180px" },
            { field: "dvt", title: "ĐVT", width: "100px", editor: serviceItemAutoCompleteEditor, attributes: { style: "text-align:center;" } },
            { field: "price", title: "Giá cả", format: "{0:#,#}", width: "100px", attributes: { style: "text-align:right;" } },
            { field: "quantity", title: "SL", width: "100px", attributes: { style: "text-align:center;" } },
            { field: "discount", title: "Giảm giá(%)", width: "120px", attributes: { style: "text-align:center;" } },
            { field: "total", title: "Tổng tiền", format: "{0:#,#}", width: "100px", attributes: { style: "text-align:right;" } },
            { command: { name: "destroy", text: "" }, title: "", width: "50px" }
        ],

        editable: true,
        save: function (e) {
            $("#tblProduct").data("kendoGrid").refresh();
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();

            if (e.values.quantity) {

                // the user changed the name field
                if (e.values.quantity != e.model.quantity) {
                    e.model.quantity = e.values.quantity;
                    UpdateGridData_All();
                }
            }
            else
                if (e.values.discount) {
                    // the user changed the name field
                    if (e.values.discount != e.model.discount) {
                        e.model.discount = e.values.discount;
                        UpdateGridData_All();
                    }
                }
                else
                    if (e.values.price) {
                        // the user changed the name field
                        if (e.values.price != e.model.price) {
                            e.model.price = e.values.price;
                            UpdateGridData_All();
                        }

                    }
                    else
                        if (e.values.price == 0) {
                            e.model.price = 0;
                            UpdateGridData_All();
                        }
                        else
                            if (e.values.discount == 0) {
                                e.model.discount = 0;
                                UpdateGridData_All();
                            }
                            else
                                if (e.values.quantity == 0) {
                                    e.model.quantity = 0;
                                    UpdateGridData_All();
                                }
                                else
                                    if (e.values.quantity == null) {
                                        this.read();
                                    }
                                    else
                                        if (e.values.price == null) {
                                            this.read();
                                        }
                                        else
                                            if (e.values.discount == null) {

                                                this.read();
                                            }

        },
        cancel: function (e) {
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
            $('#tblProduct').data('kendoGrid').dataSource.data(displayedData);
        },
        remove: function (e) {
            $('#tblProduct').data('kendoGrid').dataSource.remove(e.model);
            UpdateGridData_All();
        }
    });
    UpdateGridData_All();
}

function GridData_OrderRetail() {

    var tempSavedRecords = null;
    var gridDataSource = new kendo.data.DataSource({
        schema: {
            model: {
                id: 'id',
                fields: {
                    sid: { type: "string", editable: false, nullable: false },
                    id: { type: "string", editable: false },
                    name: { type: "string", editable: false },
                    dvt: { type: "string", editable: true },
                    price: { type: "number", editable: false, nullable: false, validation: { min: 0 } },
                    quantity: { type: "number", editable: true, nullable: false, validation: { min: 0 } },
                    discount: { type: "number", editable: true, nullable: false, validation: { min: 0,max:100 } },
                    total: { type: "number", editable: false },
                    b_isPromotion: { type: "boolean", editable: false }
                }
            }
        }
    });

    $('#tblProduct').kendoGrid({
        dataSource: gridDataSource,
        scrollable: true,
        sortable: true,
        selectable: true,
        
      
        height: 300,
        columns: [
            { field: "sid", title: " hàng hóa", width: "80px" ,hidden:true},
            { field: "id", title: "Mã hàng hóa", width: "170px"},
            { field: "name", title: "Tên hàng hóa", width: "180px" },
            { field: "dvt", title: "ĐVT", width: "100px", editor: serviceItemAutoCompleteEditor },
            { field: "price", title: "Giá cả", format: "{0:#,#}", width: "150px" },
            { field: "quantity", title: "SL", width: "100px" },
            { field: "discount", title: "Giảm giá", width: "100px" },
            { field: "total", title: "Tổng tiền", format: "{0:#,#}", width: "120px" },
            { field: "b_isPromotion", title: "Tổng tiền", width: "120px", hidden: true },
            { command: { name: "destroy", text: "" }, title: "", width: "80px" }
        ],

        editable: true,
        save: function (e) {
            $("#tblProduct").data("kendoGrid").refresh();
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();

            if (e.values.quantity) {

                // the user changed the name field
                if (e.values.quantity != e.model.quantity) {
                    e.model.quantity = e.values.quantity;
                    UpdateGridData_OrderRetail();
                }
            }
            else
                if (e.values.discount) {
                    // the user changed the name field
                    if (e.values.discount != e.model.discount) {
                        e.model.discount = e.values.discount;
                        UpdateGridData_OrderRetail();
                    }
                }
                else
                    if (e.values.price) {
                        // the user changed the name field
                        if (e.values.price != e.model.price) {
                            e.model.price = e.values.price;
                            $("#Gia").val(numberWithCommas(e.model.price));
                            UpdateGridData_OrderRetail();
                            
                        }

                    }
                    else
                        if (e.values.price == 0) {
                            e.model.price = 0;
                            UpdateGridData_OrderRetail();
                        }
                        else
                            if (e.values.discount == 0) {
                                e.model.discount = 0;
                                UpdateGridData_OrderRetail();
                            }
                            else
                                if (e.values.quantity == 0) {
                                    e.model.quantity = 0;
                                    UpdateGridData_OrderRetail();
                                }
                                else
                                    if (e.values.quantity == null) {
                                        this.read();
                                    }
                                    else
                                        if (e.values.price == null) {
                                            this.read();
                                        }
                                        else
                                            if (e.values.discount == null) {

                                                this.read();
                                            }

        },
        cancel: function (e) {
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
            $('#tblProduct').data('kendoGrid').dataSource.data(displayedData);
        },
        remove: function (e) {
            $('#tblProduct').data('kendoGrid').dataSource.remove(e.model);
            UpdateGridData_OrderRetail();
        },
    });
    UpdateGridData_OrderRetail();
    
}


function serviceItemAutoCompleteEditor(container, options) {
    var entityGrid = $("#tblProduct").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());
    showpro(selectedItem.id);
    TimKiemDonViPhu(selectedItem.sid, selectedItem.dvt, selectedItem.id);
    $("#tblProduct").data("kendoGrid").refresh();
}

function GetNumberID(name,SID)
{
    $.ajax({
        url: "/DMSMainPage/GetNumberId",
        type: "GET",
        data: {
            Name: name,
        },
        success: function (result) {
            $("#" + SID).val(result);
        },
        error: function () {
            alert("Có lỗi xảy ra");
        }
    });
}

function ResetForm() {
    $("#search_mv").val("");
    $("#CheckCongNo").val("");
    $("#txtThanhTien").val(0);
    $("#txtPercent").val(0);
    $("#txtMoney").val(0);
    $("#txtDecP").val(0);
    $("#txtDecM").val(0);
    $("#txtTotal").val(0);
    $("#txtTGD").val(0);
    $("#txtBill").val(0);
    $("#Number_ID").val("");
    $("#Number_SID").val("");
    $("#Obj_ID").val("");
    $("#Obj_Name").val("");
    $("#Obj_SID").val("");
    //$("#dtCreateNew").val('@DateTime.Now');
    //$("#ngaytao").val('@DateTime.Now');
    $("#Store_StoreID").val("");
    $("#Store_SID").val("");
    $("#Store_Name").val("");
    //$("#Emp_ID").val("");
    //$("#Emp_SID").val("");
    $("#note").val("");
    $("#trangthai").val("");
    $("#Obj_Address").val("");
    $("#Obj_Phone").val("");
    $("#CT_ID").val("");
    $("#CK_TC").val("0");
    $("#CK_CK").val("0");
    $("#CK_MT").val("0");
    $("#CK_PH").val("0"); 
    $("#CK_CN").val("0");
    $("#tblProduct").data('kendoGrid').dataSource.data([]);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function addThousandsSeparator(x) {

    retVal = x ? parseFloat(x.replace(/,/g, '')) : 0;
    if (retVal > 100)
    {
        retVal = 100;
    }
    handleThue();
    handleGiamgia();
    return retVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addThousandsSeparator_M(x) {
    retVal = x ? parseFloat(x.replace(/,/g, '')) : 0;
    var money = $("#txtDecM").val();
    var vat = $("#txtMoney").val();
    var total = $("#txtThanhTien").val();
    money = money.replace(/,/g, '');
    vat = vat.replace(/,/g, '');
    total = total.replace(/,/g, '');
    if (parseFloat(money) > (parseFloat(vat) + parseFloat(total)))
    {
        money = parseFloat(vat) + parseFloat(total);
        retVal = money;
    }
    var decP = parseFloat(money) / (parseFloat(vat) + parseFloat(total)) * 100;
   
    $("#txtDecP").val(decP);
    handleThue();
    handleGiamgia();
    return retVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function handleString(s) {
    return (s.value + "").replace(/[^\w\s]/gi, '');
}

function handleThue() {
    var tp = document.getElementById("txtPercent");//Tiền thuế tính theo %

    var tt = document.getElementById("txtThanhTien");//Tổng tiền
    var tm = document.getElementById("txtMoney");//TIền thuế tính theo tiền

    var ttt = document.getElementById("txtTotal");//Tiền tổng công
    var tb = document.getElementById("txtBill");//Tiền thanh toán
    var tdm = document.getElementById("txtDecM");//Tiền giảm giá theo M
    var tdp = document.getElementById("txtDecP");//Tiền giảm giá theo %

    if (tp.value == "" || tp.value == null || tp.value == "NaN") {
        tp.value = 0;
    }
    if (tp.value > 100) {
        tp.value = 100;
    }
    //tt.value = (tt.value + "").replace(/[^\w\s]/gi, '');
    tt.value = handleString(tt);
    tm.value = handleString(tm);

    ttt.value = handleString(ttt);
    tb.value = handleString(tb);
    tdm.value = handleString(tdm);
    var tienthue_split = parseFloat(tp.value) * 0.01 * parseFloat(tt.value);
    var split = (tienthue_split + "").split(".");
    var tienthue = parseFloat(split[0]);
    var tiengiamgia_split = (parseFloat(tienthue) + parseFloat(tt.value)) * parseFloat(tdp.value) * 0.01;
    var split1 = (tiengiamgia_split + "").split(".");
    var tiengiamgia = split1[0];
    var tientongcong = parseFloat(tt.value) + tienthue - tiengiamgia;
    tm.value = numberWithCommas(tienthue);
    //Tiền thành tiền + money - tiền giảm giá theo M
    ttt.value = numberWithCommas(tientongcong);
    tb.value = numberWithCommas(tientongcong);
    $("#txtThanhTien").val(numberWithCommas(tt.value));
    $("#txtDecM").val(numberWithCommas(tiengiamgia));

}
function handleGiamgia() {
    var tt = document.getElementById("txtThanhTien");
    var tm = document.getElementById("txtMoney");
    var tdm = document.getElementById("txtDecM");
    var tp = document.getElementById("txtDecP");
    var ttt = document.getElementById("txtTotal");
    var tb = document.getElementById("txtBill");
    if (tdm.value == "" || tdm.value == null || tdm.value == "NaN") {
        tdm.value = 0;
    }
    if (tp.value == "" || tp.value == null || tp.value == "NaN") {
        tp.value = 0;
    }
    if (tp.value > 100) {
        tp.value = 100;
    }
    tt.value = handleString(tt);
    tm.value = handleString(tm);
    ttt.value = handleString(ttt);
    tb.value = handleString(tb);
    tdm.value = handleString(tdm);

    var money_split = (parseFloat(tp.value) * (parseFloat(tt.value) + parseFloat(tm.value)) * 0.01);
    var split = (money_split + "").split(".");
    var money = parseFloat(split[0]);
    tdm.value = numberWithCommas(money);
    var total = parseFloat(tt.value) + parseFloat(tm.value) - parseFloat(money);
    ttt.value = numberWithCommas(total);
    tb.value = numberWithCommas(total);
    $("#txtThanhTien").val(numberWithCommas(tt.value));
    $("#txtMoney").val(numberWithCommas(tm.value));

}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}