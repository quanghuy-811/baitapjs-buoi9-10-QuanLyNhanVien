export default class ManageService {
  constructor() {
    this.arr = [];
  }
  // thêm
  addUser(newArrUser) {
    this.arr.push(newArrUser);
  }

  getDetail(tk) {
    return this.arr.find((item) => {
      return item.tk === tk;
    });
  }

  update(user) {
    let indexUpdate = this.arr.findIndex((item) => {
      return item.tk === user.tk;
    });

    this.arr[indexUpdate] = user;
  }

  delete(tk) {
    let indexDelete = this.arr.findIndex((item) => {
      return item.tk === tk;
    });

    this.arr.splice(indexDelete, 1);
  }
}
