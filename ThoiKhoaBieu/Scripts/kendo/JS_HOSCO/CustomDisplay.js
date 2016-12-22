// Luu thong tin trang thai
function SaveCustomDisplay(gridID,formName)
{
    var grid = $("#"+gridID).data("kendoGrid");

    var dataSource = grid.dataSource;

    var state = {
        columns: grid.columns,
        page: dataSource.page(),
        pageSize: dataSource.pageSize(),
        sort: dataSource.sort(),
        filter: dataSource.filter(),
        group: dataSource.group()
    };
    //var sss = JSON.stringify(state);

    $.ajax({
        url: "/CustomDisplay/SaveCustomerGrid",
        type: "POST",
        dataType: "json",
        data: {
            data: JSON.stringify(state),
            formName: formName
        },
        success: function (result) {

            state = JSON.parse(result);
            var options = grid.options;

            options.columns = state.columns;

            options.dataSource.page = state.page;
            options.dataSource.pageSize = state.pageSize;
            options.dataSource.sort = state.sort;
            options.dataSource.filter = state.filter;
            options.dataSource.group = state.group;

            grid.destroy();

            $("#" + gridID)
               .empty()
               .kendoGrid(options);

        },
        error: function () {
            alert("Có lỗi xảy ra");
        }, async: false
    });

}

//Cap nhat trang thai da luu trong CSDL
function UpdateCustomDisplay(gridID,data) {

    
    if (data != "" || data.length > 10) {
        var grid = $("#" + gridID).data("kendoGrid");
        var dataSource = grid.dataSource;
        state = JSON.parse(data);

        var options = grid.options;

        options.columns = state.columns;

        options.dataSource.page = state.page;
        options.dataSource.pageSize = state.pageSize;
        options.dataSource.sort = state.sort;
        options.dataSource.filter = state.filter;
        options.dataSource.group = state.group;

        grid.destroy();

        $("#" + gridID)
           .empty()
           .kendoGrid(options);
    }
}