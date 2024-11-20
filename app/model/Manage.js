export default class Manage {
  constructor(
    tk,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam,
    tongLuong,
    loaiNv
  ) {
    this.tk = tk;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNv = "";
  }

  tinhTongLuong() {
    let chucVuUser = this.chucVu;

    if (chucVuUser === "Sếp") {
      this.tongLuong = this.luongCB * 3;
    } else if (chucVuUser === "Trưởng phòng") {
      this.tongLuong = this.luongCB * 2;
    } else if (chucVuUser === "Trưởng phòng") {
      this.tongLuong = this.luongCB;
    }

    let formattedNumber = new Intl.NumberFormat("vi-VN").format(this.tongLuong);
    this.tongLuong = formattedNumber;
  }

  xepLoaiNV() {
    if (this.gioLam >= 192) {
      this.loaiNv = "Xuất Sắc";
    } else if (this.gioLam >= 176) {
      this.loaiNv = "Giỏi";
    } else if (this.gioLam >= 160) {
      this.loaiNv = "Khá";
    } else {
      this.loaiNv = "Trung Bình";
    }
  }
}
