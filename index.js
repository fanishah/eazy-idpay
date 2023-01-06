const axios = require("axios").default;

class Eezyidpay {
  // پارامتر های ایجاد تراکنش
  #params_create = {
    headers: {
      "X-API-KEY": "",
      "X-SANDBOX": false, // تراکنش آزمایشی
    },
    method: "post",
    url: "https://api.idpay.ir/v1.1/payment",
    data: {
      //مبلغ
      amount: "",
      //شماره سفارش
      order_id: "",
      // کال بک تراکنش
      callback: "",
      // نام
      name: "", // اختیاری
      // شماره تماس
      phone: "", // اختیاری
      // ایمیل
      mail: "", // اختیاری
      // توضیحات
      desc: "", // اختیاری
    },
  };

  // پارامتر های تایید تراکنش
  #params_verify = {
    headers: this.#params_create.headers,
    method: "post",
    url: "https://api.idpay.ir/v1.1/payment/verify",
    data: {
      // آیدی سفارش
      id: "",
      // شماره سفارش
      order_id: "",
    },
  };

  // پارامتر های آخرین وصغیت تراکنش
  #params_inquiry = {
    headers: this.#params_create.headers,
    method: "post",
    url: "https://api.idpay.ir/v1.1/payment/inquiry",
    data: {
      // آیدی سفارش
      id: "",
      // شماره سفارش
      order_id: "",
    },
  };

  constructor(api, issandbox = 0) {
    this.#params_create.headers["X-API-KEY"] = api;
    this.#params_create.headers["X-SANDBOX"] = issandbox;
  }
  // ایجاد تراکنش
  async create({
    amount,
    order_id,
    callback,
    name = "Eezyidpay",
    phone = "09112223344",
    mail = "my@site.com",
    desc = "توضیحات پرداخت کننده",
  }) {
    try {
      this.#params_create.data.amount = amount;
      this.#params_create.data.order_id = order_id;
      this.#params_create.data.callback = callback;
      this.#params_create.data.name = name;
      this.#params_create.data.phone = phone;
      this.#params_create.data.mail = mail;
      this.#params_create.data.desc = desc;
      let requestpay = await axios(this.#params_create);

      return { status: requestpay.status, data: requestpay.data };
    } catch (err) {
      return { status: err.response.status, data: err.response.data };
    }
  }

  // تایید تراکنش
  async verify(id, order_id) {
    try {
      this.#params_verify.data.id = id;
      this.#params_verify.data.order_id = order_id;
      let verifypay = await axios(this.#params_verify);

      return { status: verifypay.status, data: verifypay.data };
    } catch (err) {
      return { status: err.response.status, data: err.response.data };
    }
  }

  // استعلام وضعیت تراکنش
  async inquiry(id, order_id) {
    try {
      this.#params_inquiry.data.id = id;
      this.#params_inquiry.data.order_id = order_id;
      let inquirypay = await axios(this.#params_inquiry);

      return inquirypay.data;
    } catch (err) {
      return { status: err.response.status, data: err.response.data };
    }
  }
}

module.exports = Eezyidpay;
