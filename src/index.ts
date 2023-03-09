import axios from "axios";

class Eazyidpay {
  private _api: string; // آی پی ای درگاه پرداخت
  private _sandbox?: boolean; // تراکنش آزمایشی
  constructor(api: string, sandbox: boolean = false) {
    if (!api) {
      throw Error("Invalid API KEY");
    }
    this._api = api;
    this._sandbox = sandbox;
  }

  // ایجاد تراکنش
  async create({
    amount,
    order_id,
    callback,
    name = "Eezyidpay",
    phone = "09112223344",
    mail = "Eezyidpay",
    desc = "Package NPM Eezyidpay",
  }: {
    amount: number;
    order_id: string | number;
    callback: string;
    name: string;
    phone: string;
    mail: string;
    desc: string;
  }): Promise<any> {
    try {
      let requestpay = await axios.post(
        "https://api.idpay.ir/v1.1/payment",
        {
          amount, //مبلغ
          order_id, //شماره سفارش
          callback, // کال بک تراکنش
          name, // نام (اختیاری)
          phone, // شماره تماس (اختیاری)
          mail, // ایمیل (اختیاری)
          desc, // توضیحات (اختیاری)
        },
        {
          headers: { "X-API-KEY": this._api, "X-SANDBOX": this._sandbox },
        }
      );

      return { status: requestpay.status, data: requestpay.data };
    } catch (err: any) {}
  }

  // تایید تراکنش
  async verify({
    id,
    order_id,
  }: {
    id: string;
    order_id: string | number;
  }): Promise<any> {
    try {
      let verifypay = await axios.post(
        "https://api.idpay.ir/v1.1/payment/verify",
        {
          id, // آیدی یونیک سفارش
          order_id, //شماره سفارش
        },
        {
          headers: { "X-API-KEY": this._api, "X-SANDBOX": this._sandbox },
        }
      );

      return { status: verifypay.status, data: verifypay.data };
    } catch (err: any) {
      return { status: err.response.status, data: err.response.data };
    }
  }

  //
  async inquiry({
    id,
    order_id,
  }: {
    id: string;
    order_id: string | number;
  }): Promise<any> {
    try {
      let inquirypay = await axios.post(
        "https://api.idpay.ir/v1.1/payment/inquiry",
        {
          id, // آیدی یونیک سفارش
          order_id, //شماره سفارش
        },
        {
          headers: { "X-API-KEY": this._api, "X-SANDBOX": this._sandbox },
        }
      );

      return inquirypay.data;
    } catch (err: any) {
      return { status: err.response.status, data: err.response.data };
    }
  }
}
export default Eazyidpay;
