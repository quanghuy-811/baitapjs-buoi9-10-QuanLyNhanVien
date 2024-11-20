import { getEle } from "./ultil.js";

const alertText = (selector, textAlert) => {
  getEle(selector).style.display = "block";
  getEle(selector).innerHTML = textAlert;
};

export const valid = (paramOjb) => {
  document
    .querySelectorAll(".sp-thongbao")
    .forEach((element) => (element.style.display = "none"));

  const { tk, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam } =
    paramOjb;
  const regexName = /^[A-Za-z]+$/; // Biểu thức chính quy chỉ cho phép chữ cái
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
  const regexPassWord =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
  if (!tk || tk.length < 4 || tk.length > 6) {
    alertText("#tbTKNV", "Tài khoản tối đa 4 - 6 ký số, không để trống");
    return false;
  } else if (!hoTen || !regexName.test(hoTen)) {
    alertText("#tbTen", "Tên nhân viên phải là chữ, không để trống");
    return false;
  } else if (!email || !regexEmail.test(email)) {
    alertText("#tbEmail", "Email phải đúng định dạng, không để trống");
    return false;
  } else if (!matKhau || !regexPassWord.test(matKhau)) {
    alertText(
      "#tbMatKhau",
      " mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống"
    );
    return false;
  } else if (!ngayLam || !regexDate.test(ngayLam)) {
    alertText("#tbNgay", "Ngày làm không để trống, định dạng mm/dd/yyyy");
    return false;
  } else if (!luongCB || isNaN(luongCB) || luongCB < 1e6 || luongCB > 2e7) {
    alertText(
      "#tbLuongCB",
      "Lương cơ bản 1 000 000 - 20 000 000, phải là số, không để trống"
    );
    return false;
  } else if (chucVu === "Chọn chức vụ") {
    alertText("#tbChucVu", "Hãy chọn chức vụ");
    return false;
  } else if (!gioLam || isNaN(gioLam) || gioLam < 80 || gioLam > 200) {
    alertText(
      "#tbGiolam",
      "Số giờ làm trong tháng 80 - 200 giờ, phải là số, không để trống"
    );
    return false;
  }

  return true;
};
