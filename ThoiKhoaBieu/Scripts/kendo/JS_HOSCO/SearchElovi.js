function SearchStore_PQ(customerCode)
{
    if (customerCode != "HSELOV") {
        $.ajax({

            url: "/DMSMainPage/DSKhoHang",
            type: "GET",
            data: { svalue: $("#searchStore").val() },
            success: function (result) {
                $("#Storegrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Storegrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_StoreID: result[i].s_StoreID,
                        name: result[i].name,
                    });
                }
                grid.sync();
            }
        });
    }
    else {
        $.ajax({

            url: "/PurchaseImport/GetStoreElovi",
            type: "GET",
            data: { sSearch: $("#searchStore").val() },
            success: function (result) {
                $("#Storegrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Storegrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_StoreID: result[i].s_StoreID,
                        name: result[i].name,
                    });
                }
                grid.sync();
            }
        });
    }
}

function SearchEmp_PQ(customerCode)
{
    if (customerCode == "HSELOV") {
        var storeID = $("#sIdStore").val();
        var sSearch = $("#searchEmp").val();
        $.ajax({

            url: "/PurchaseImport/GetEmployeeElovi",
            type: "GET",
            data: {
                sSearch: sSearch,
                storeID: storeID
            },
            success: function (result) {
                $("#Empgrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Empgrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        sid: result[i].sid,
                        id: result[i].id,
                        name: result[i].name,
                        phone: result[i].phone,

                    });
                }
                grid.sync();
            }
        });
    }
    else {
        var txtSearch = $("#searchEmp").val();

        $.ajax({

            url: "/DMSMainPage/DSNhanVien",
            type: "GET",
            data: { svalue: $("#searchEmp").val() },
            success: function (result) {
                $("#Empgrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Empgrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        sid: result[i].sid,
                        id: result[i].id,
                        name: result[i].name,
                        phone: result[i].phone,

                    });
                }
                grid.sync();
            }
        });
    }
}

function SearchStore_PQ1(customerCode) {
    if (customerCode != "HSELOV") {
        $.ajax({

            url: "/DMSMainPage/DSKhoHang",
            type: "GET",
            data: { svalue: $("#searchStore").val() },
            success: function (result) {
                $("#Storegrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Storegrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_StoreID: result[i].s_StoreID,
                        name: result[i].name,
                    });
                }
                grid.sync();
            }
        });
    }
    else {
        $.ajax({

            url: "/PurchaseImport/GetStoreElovi",
            type: "GET",
            data: { sSearch: $("#searchStore").val() },
            success: function (result) {
                $("#Storegrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Storegrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        s_ID: result[i].s_ID,
                        s_StoreID: result[i].s_StoreID,
                        name: result[i].name,
                    });
                }
                grid.sync();
            }
        });
    }
}
function SearchEmp_PQ1(customerCode) {
    if (customerCode == "HSELOV") {
        var storeID = $("#Store_SID").val();
        var sSearch = $("#searchEmp").val();
        $.ajax({

            url: "/PurchaseImport/GetEmployeeElovi",
            type: "GET",
            data: {
                sSearch: sSearch,
                storeID: storeID
            },
            success: function (result) {
                $("#Empgrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Empgrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        sid: result[i].sid,
                        id: result[i].id,
                        name: result[i].name,
                        phone: result[i].phone,

                    });
                }
                grid.sync();
            }
        });
    }
    else {
        var txtSearch = $("#searchEmp").val();

        $.ajax({

            url: "/DMSMainPage/DSNhanVien",
            type: "GET",
            data: { svalue: $("#searchEmp").val() },
            success: function (result) {
                $("#Empgrid").data('kendoGrid').dataSource.data([]);
                var gridE = $("#Empgrid").data("kendoGrid").dataSource;
                for (var i = 0; i < result.length; i++) {
                    gridE.add({
                        sid: result[i].sid,
                        id: result[i].id,
                        name: result[i].name,
                        phone: result[i].phone,

                    });
                }
                grid.sync();
            }
        });
    }
}