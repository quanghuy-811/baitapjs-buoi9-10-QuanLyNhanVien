// lấy value

import Manage from "../model/Manage.js";
import ManageService from "../service/ManageService.js";
import { getEle } from "../ultils/ultil.js";
import { valid } from "../ultils/validation.js";

const manageService = new ManageService();

const getValueForm = () => {
  let tk = getEle("#tknv").value.trim();
  let name = getEle("#name").value.trim();
  let email = getEle("#email").value.trim();
  let password = getEle("#password").value;
  let ngayLam = getEle("#datepicker").value;
  let luongCB = getEle("#luongCB").value;
  let chucvu = getEle("#chucvu").value;
  let gioLam = getEle("#gioLam").value;

  let newUer = new Manage(
    tk,
    name,
    email,
    password,
    ngayLam,
    luongCB,
    chucvu,
    gioLam
  );

  newUer.tinhTongLuong();
  newUer.xepLoaiNV();

  return newUer;
};

// hiển thị dữ liệu lên bảng

const renderTable = (paramArr) => {
  let contentTable = "";
  paramArr.map((item) => {
    const { tk, hoTen, email, ngayLam, chucVu, tongLuong, loaiNv } = item;
    let trFood = `<tr>
      <th>${tk}</th>
      <th>${hoTen}</th>
      <th>${email}</th>
      <th>${ngayLam} </th>
      <th>${chucVu} </th>
      <th>${tongLuong} </th>
      <th>${loaiNv} </th>
      <th>

      <button 
      id="btnXem" type="button" 
      class="btn btn-warning mb-3 text-white" 
      data-toggle="modal" 
      data-target="#exampleModal"
      onclick="showDetail('${tk}')">
          Xem
     </button>

      <button 
      id="btnXoa" 
      type="button" 
      class="btn btn-danger mb-3 text-white"
      onclick="deleteUser('${tk}')" >
      
          Xóa
     </button>
  </th>
    </tr>`;

    contentTable += trFood;
  });

  getEle("#tableDanhSach").innerHTML = contentTable;
};
const setLocalStorage = () => {
  // localStorage, JSON được JS cung cấp sẵn
  // để lưu xuống localStorage: convert data về dạng JSON
  // convert arrFood về kiểu JSON
  let data = JSON.stringify(manageService.arr);

  // localStorage.setItem(key, value)
  localStorage.setItem("userList", data);
};

const getLoccalStorage = () => {
  let data = localStorage.getItem("userList");

  if (data !== null) {
    manageService.arr = JSON.parse(data);
    renderTable(manageService.arr);
  }
};

getLoccalStorage();

getEle("#btnThem").onclick = () => {
  getEle("#tknv").disabled = false;
  getEle("#btnCapNhat").disabled = true;
  getEle("#btnThemNV").disabled = false;
};
// Thêm
getEle("#btnThemNV").onclick = () => {
  let newArr = getValueForm();

  let isValid = valid(newArr);

  if (isValid) {
    manageService.addUser(newArr);

    $("#myModal").modal("hide"); // đóng modal
    setLocalStorage(); // LocalStorage
    renderTable(manageService.arr); // load lại table
  }
};

// Xem
const showDetail = (paramDetail) => {
  let detail = manageService.getDetail(paramDetail);

  $("#myModal").modal("show");
  getEle("#btnCapNhat").disabled = false;
  getEle("#btnThemNV").disabled = true;
  getEle("#tknv").disabled = true;

  const { tk, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam } =
    detail;

  getEle("#tknv").value = tk;
  getEle("#name").value = hoTen;
  getEle("#email").value = email;
  getEle("#password").value = matKhau;
  getEle("#datepicker").value = ngayLam;
  getEle("#luongCB").value = luongCB;
  getEle("#chucvu").value = chucVu;
  getEle("#gioLam").value = gioLam;
};

window.showDetail = showDetail;

// update

getEle("#btnCapNhat").onclick = () => {
  let dataUpdate = getValueForm();

  let isValid = valid(dataUpdate);

  if (isValid) {
    manageService.update(dataUpdate);
    $("#myModal").modal("hide");
    setLocalStorage();
    renderTable(manageService.arr);
  }
};

// Xóa
const deleteUser = (paramDel) => {
  manageService.delete(paramDel);
  setLocalStorage();
  renderTable(manageService.arr);
};

window.deleteUser = deleteUser;

// tìm loại nhân viên

getEle("#btnTimNV").onclick = () => {
  let valueSelect = getEle("#searchName").value;

  if (valueSelect === "Loại nhân viên") {
    alert("Hãy chọn loại nhân viên");
  } else {
    let filterLoaiNv = manageService.arr.filter((item) => {
      return item.loaiNv === valueSelect;
    });
    if (filterLoaiNv.length > 0) {
      renderTable(filterLoaiNv);
      getEle("#searchName").selectedIndex = 0; // select trở về giá trị mặc định khi tìm thành công
    } else {
      getEle(
        "table #tableDanhSach"
      ).innerHTML = `<tr><td colspan='8' class='text-center'>Không tìm thấy User nào</td></tr>`;
    }
  }
};
