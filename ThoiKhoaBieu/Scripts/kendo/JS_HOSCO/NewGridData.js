function NewUpdateGridData_All() {
    var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
    var txt = parseFloat("0");
    for (var i = 0; i < displayedData.length; i++) {
        if (displayedData[i].quantity == null || displayedData[i].quantity == "") {
            displayedData[i].quantity = 0;
        }
        var _price = displayedData[i].price + "";
        var _quantity = displayedData[i].quantity + "";
        var _discount = displayedData[i].discountP + "";
        _price = _price.replace(/,/g, '');
        _quantity = _quantity.replace(",", '');
        var _dicountMoney = parseFloat(_quantity) * parseFloat(_price) * parseFloat(_discount / 100);
        txt += parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        displayedData[i].total = parseFloat(_price) * parseFloat(_quantity) - parseFloat(_dicountMoney);
        //txt += _discount + " ";

    }
    var split = (txt + "").split(".");
    txt = split[0];
    $("#txtThanhTien").val(numberWithCommas(txt));
    handleThue();
    handleGiamgia();
}


function NewGridData(model) {

    var obj = JSON.parse(model);
    var tempSavedRecords = null;
    var gridDataSource = new kendo.data.DataSource({
        data: obj,
        schema: {
            model: {
                id: 'id',
                fields: {
                    sid: { type: "string", editable: false, nullable: false },
                    id: { type: "string", editable: false, nullable: false },
                    name: { type: "string", editable: false },
                    dvt: { type: "string", editable: true },
                    quantity: { type: "number", editable: true, validation: { min: 0 } },
                    price: { type: "number", editable: true, nullable: false },
                    discountP: { type: "number", editable: true, nullable: false, validation: { min: 0,max:100 } },
                    discountM: { type: "number", editable: true, nullable: false },
                    total: { type: "number", editable: false, nullable: false },
                    note: { type: "string", editable: true }
                }
            }
        }
    });

    $('#tblProduct').kendoGrid({
        dataSource: gridDataSource,
        scrollable: true,
        sortable: true,
        selectable: true,
        resizable: true,
        height: 300,
        columns: [
            { field: "sid", title: "Mã hàng", width: 100, hidden: true },
            { field: "id", title: "Mã hàng ", width: "130px" },
            { field: "name", title: "Tên hàng", width: "180px" },
            { field: "dvt", title: "ĐVT", width: "100px" },
            { field: "quantity", title: "SL", width: "100px" },
            { field: "price", title: "Giá cả", format: "{0:#,#}", width: "100px" },
            { field: "discountP", title: "% CK", width: "100px" },
            { field: "discountM", title: "Chiết khấu", width: "100px", hidden: true },
            { field: "total", title: "Tổng tiền", format: "{0:#,#}", width: "100px" },
            { field: "note", title: "Ghi chú", width: "200px" },
            { command: { name: "destroy", text: "" }, title: "", width: "50px" }
        ],

        editable: true,
        save: function (e) {
            $("#tblProduct").data("kendoGrid").refresh();
            var displayedData = $("#tblProduct").data().kendoGrid.dataSource.view();
            if (e.values.note) {

                // the user changed the name field
                if (e.values.note != e.model.note) {
                    e.model.note = e.values.note;
                    
                }
            }
            else
            if (e.values.quantity) {

                // the user changed the name field
                if (e.values.quantity != e.model.quantity) {
                    e.model.quantity = e.values.quantity;
                    NewUpdateGridData_All();
                }
            }
            else
                if (e.values.discountP) {
                    // the user changed the name field
                    if (e.values.discountP != e.model.discountP) {
                        e.model.discountP = e.values.discountP;
                        NewUpdateGridData_All();
                    }
                }
                else
                    if (e.values.price) {
                        // the user changed the name field
                        if (e.values.price != e.model.price) {
                            e.model.price = e.values.price;
                            NewUpdateGridData_All();
                        }

                    }
                    else
                        if (e.values.price == 0) {
                            e.model.price = 0;
                            NewUpdateGridData_All();
                        }
                        else
                            if (e.values.discountP == 0) {
                                e.model.discountP = 0;
                                NewUpdateGridData_All();
                            }
                            else
                                if (e.values.quantity == 0) {
                                    e.model.quantity = 0;
                                    NewUpdateGridData_All();
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
            NewUpdateGridData_All();
        }
    });
    NewUpdateGridData_All();
}

// Xử lý thêm sản phẩm
function NewHandleMavach(event) {
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
                if (row[i].id == svalue || row[i].name == svalue) {
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
                    var congdon = $("#congdon").is(':checked');

                    if (result.length == 1) {
                        if (!congdon) {
                            grid.add({
                                sid: result[0].sid,
                                id: result[0].id,
                                name: result[0].name,
                                dvt: result[0].s_Unit,
                                quantity: 1,
                                price: result[0].price,
                                discountP: 0,
                                discountM: 0,
                                total: result[0].price,
                                note: "",
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
                                    name: result[0].name,
                                    dvt: result[0].s_Unit,
                                    quantity: 1,
                                    price: result[0].price,
                                    discountP: 0,
                                    discountM: 0,
                                    total: result[0].price,
                                    note: "",
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
                                    name: result[0].name,
                                    dvt: result[0].s_Unit,
                                    quantity: 0,
                                    price: result[0].price,
                                    discountP: 0,
                                    discountM: 0,
                                    total: result[0].price,
                                    note: "",
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


function ConvertMoney()
{
    
}