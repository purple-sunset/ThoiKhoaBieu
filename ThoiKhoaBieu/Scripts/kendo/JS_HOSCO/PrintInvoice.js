function ReplaceTableData(data, jsondata, i) {
    //Dữ liệu bảng bao gồm: id,name,dvt,price,quantity,discount,total
    jsondata = jsondata.replace(/{Ma_Hang_Hoa}/g, data[i].id);
    jsondata = jsondata.replace(/{Ten_Hang_Hoa}/g, data[i].name);
    jsondata = jsondata.replace(/{DVT}/g, data[i].dvt);
    jsondata = jsondata.replace(/{Don_Gia_Chiet_Khau}/g, data[i].price);
    jsondata = jsondata.replace(/{So_Luong}/g, data[i].quantity);
    jsondata = jsondata.replace(/{Giam_Gia_Hang_Hoa}/g, data[i].discount);
    jsondata = jsondata.replace(/{Thanh_Tien}/g, data[i].total);
    return jsondata;
}


function ReplaceAllData(data, jsonData) {
    data = data.replace(/{DVT}/g, jsonData.dvt);
    data = data.replace(/{Thanh_Tien}/g, jsonData.thanhtien);
    data = data.replace(/{Giam_Gia_Hang_Hoa}/g, jsonData.discount);
    data = data.replace(/{Chi_Nhanh_Ban_Hang}/g, jsonData.chinhanh);
    data = data.replace(/{Ngay_Thang_Nam}/g, jsonData.ngaythang);
    data = data.replace(/{Khach_Hang}/g, jsonData.khachhang);
    data = data.replace(/{Dia_Chi_Khach_Hang}/g, jsonData.diachi);
    data = data.replace(/{So_Dien_Thoai}/g, jsonData.sdt);
    data = data.replace(/{Nhan_Vien_Ban_Hang}/g, jsonData.nhanvien);
    data = data.replace(/{Ma_Don_Hang}/g, jsonData.madonhang);
    data = data.replace(/{Ten_Hang_Hoa}/g, jsonData.tenhang);
    data = data.replace(/{Don_Gia_Chiet_Khau}/g, jsonData.dongia);
    data = data.replace(/{So_Luong}/g, jsonData.soluong);
    data = data.replace(/{Thanh_Tien}/g, jsonData.thanhtien);
    data = data.replace(/{Ghi_Chu}/g, jsonData.ghichu);
    data = data.replace(/{Tong_Tien_Hang}/g, jsonData.tongtienhang);
    data = data.replace(/{Chiet_Khau_Hoa_Don}/g, jsonData.chietkhau);
    data = data.replace(/{Tong_Cong}/g, jsonData.tongcong);
    data = data.replace(/{Tien_Khach_Tra}/g, jsonData.khachtra);
    return data;
}



function CreateObjectInvoice(mahang, tenhang, dvt, dongia, soluong, giamgia, thanhtien,
    chinhanh, ngaythang, khachhang, diachi, sdt, nhanvien, madonhang, ghichu, tongtienhang, chietkhau, tongcong, khachtra) {
    var invoice = {
        "mahang": mahang,
        "tenhang": tenhang,
        "dvt": dvt,
        "dongia": dongia,
        "soluong": soluong,
        "giamgia": giamgia,
        "thanhtien": thanhtien,
        "chinhanh": chinhanh,
        "ngaythang": ngaythang,
        "khachhang": khachhang,
        "diachi": diachi,
        "sdt": sdt,
        "nhanvien": nhanvien,
        "madonhang": madonhang,
        "ghichu": ghichu,
        "tongtienhang": tongtienhang,
        "chietkhau": chietkhau,
        "tongcong": tongcong,
        "khachtra": khachtra
    }
    return invoice;
}

function CreateInvoiceIncome(chinhanh, sodienthoai, madonhang, ngaythang,
    doitac, dienthoai, diachi, lydo, giatri, tienchietkhau,tienbangchu)
{
        var invoice = {
            "chinhanh": chinhanh,
            "sodienthoai": sodienthoai,
            "madonhang": madonhang,
            "ngaythang": ngaythang,
            "doitac": doitac,
            "dienthoai": dienthoai,
            "diachi": diachi,
            "lydo": lydo,
            "giatri": giatri,
            "tienchietkhau": tienchietkhau,
            "tienbangchu": tienbangchu
        }
        return invoice;
}

function DataInvoiceAvailble_Income()
{
    return CreateInvoiceIncome("Hà Nội","0123456789","PT123456","15/12/2015",
        "Bahanto","0987654321","Hoàn Kiếm - Hà Nội","Thu tiền công nợ","100,000","0","Một trăm nghìn đồng");
}

function DataInvoiceAvailble_Outcome() {
    return CreateInvoiceIncome("Hà Nội", "0123456789", "PC123456", "15/12/2015",
        "Bahanto", "0987654321", "Hoàn Kiếm - Hà Nội", "Chi tiền công nợ", "200,000","0", "Hai trăm nghìn đồng");
}


function ReplaceDataIncome(data, jsonData)
{
    data = data.replace(/{Chi_Nhanh_Ban_Hang}/g, jsonData.chinhanh);
    data = data.replace(/{So_Dien_Thoai}/g, jsonData.sodienthoai);
    data = data.replace(/{Ma_Don_Hang}/g, jsonData.madonhang);
    data = data.replace(/{Ngay_Thang_Nam}/g, jsonData.ngaythang);
    data = data.replace(/{Doi_Tac}/g, jsonData.doitac);
    data = data.replace(/{Dien_Thoai}/g, jsonData.dienthoai);
    data = data.replace(/{Dia_Chi}/g, jsonData.diachi);
    data = data.replace(/{Ly_Do}/g, jsonData.lydo);
    data = data.replace(/{Gia_Tri_Phieu}/g, jsonData.giatri);
    data = data.replace(/{Tien_Chiet_Khau}/g, jsonData.tienchietkhau);
    data = data.replace(/{Tien_Bang_Chu}/g, jsonData.tienbangchu); 
    return data;
}

function PrintInvoice(data) {
    var mywindow = window.open('', 'my div');
    mywindow.document.write('<html><head><title>Hóa đơn</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
}