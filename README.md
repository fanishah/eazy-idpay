<div dir=”rtl”>

  # درباره ایزی آیدی پی

  <p>استفاده آسان و راحت از درگاه پرداخت آیدی پی</p>
<p>
  آیدی پی یک سیستم درگاه پرداخت است. بهترین و راحت ترین راه جهت دریافت پول، مناسب برای شرکت ها، نمایندگی های بیمه، صندوق های وام خانگی، مدیران ساختمان، کترینگ ها، فروشندگان کالا و خدمات.
</p>

  # روش نصب
  
  ```
  npm i eazy-idpay
  ```

  # متد ها
  ```
    create() // ایجاد تراکنش
    verify() // تایید تراکنش
    inquiry() // استعلام آخرین وضعیت تراکنش
  ```
  
  # احراز هویت درگاه
  
```
const Eazyidpay = require("eazy-idpay");
const idpay = new Eazyidpay(TOKEN, true);
```
  TOKEN :   درگاه جهت احراز هویت API
  
  # ایجاد تراکنش
  
  <p>
  برای ایجاد تراکنش از متد create استفاده کنید
  </p>
	
  ```
const createpay = await idpay.create({
  amount: 100000,
  order_id: 2423,
  callback: "http://localhost:3000/callback",
  name: "فتاح رنجبر",
  phone: "09339993377",
  mail: "my@site.com",
  desc: "توضیحات",
});
  ```
	
  در صورت درست بودن تمام ورودی های متد پاسخ زیر برای شما به صورت جسون به شما داده میشود

  ```
{
  "id": "d2e353189823079e1e4181772cff5292",
  "link": "https://idpay.ir/p/ws-sandbox/d2e353189823079e1e4181772cff5292"
}
```
  
   شما باید برای انجام مراحل پرداخت کاربر را به  پراپرتی link در پاسخ ایجاد تراکنش ریدایرکت کنید 

در صورت بروز خطا در ایجاد تراکنش پاسخی مشابه زیر به صورت جسون دریافت می کنید

  ```
{
  status: 406
  data:{  
  "error_code": 32, 
  "error_message": ".نباید خالی باشد `order_id` مقدار"
  }
}
  ```
  [ لیست خطاها](https://idpay.ir/web-service/v1.1/?javascript#d7b83cfb9c)
  
	
اجباری | نوع | ورودی 
--- | --- | ---  
| بله| عدد |amount|
| بله| رشته |order_id|
| بله| رشته |callback|
| خیر| رشته |name|
| خیر| رشته |phone|
| خیر| رشته |mail|
| خیر| رشته |desc|


 # تایید تراکنش
	
در صفحه کال بک می توانید  مرحله اعتبار سنجی تراکنش را با متد verify انجام دهید.

  ```
const verifypay = await idpay.verify(id, order_id);
  ```  
	
مقدار id و order_id در بادی کال بک می باشد که در پکیج Express در req.body می باشد.

	
	
اجباری | نوع | ورودی 
--- | --- | ---  
| بله| رشته |id|
| بله| رشته |order_id|


در صورت کاربر تراکنش را پرداخت کرده باشد پاسخ متد verify مشابه زیر است
	
```
	{ 
"status": "100", 
"track_id": "10012", 
"id": "d2e353189823079e1e4181772cff5292", 
"order_id": "101", 
"amount": "10000", 
"date": "1546288200", 
"payment": { 
    "track_id": "888001", 
    "amount": "10000", 
    "card_no": "123456******1234", 
    "hashed_card_no": "E59FA6241C94B8836E3D03120DF33E80FD988888BBA0A122240C2E7D23B48295", 
    "date": "1546288500" }, 
"verify": { "date": "1546288800" } 
}
```


[ کد های وضعیت تراکنش ](https://idpay.ir/web-service/v1.1/?javascript#ad39f18522)
	
درصوت پرداخت توسط کاربر کد status باید 100 باشد و صورت کد 101 یعنی پرداخت قبلا تایید شده است و احتمال دارد کاربر می خواد دوباره از شناسه تراکنش بدون پرداخت دوباره استفاده کند 

**هشدار آیدی پی** : جهت جلوگیری از دوبار مصرف شدن یک پرداخت (Double Spending)، پذیرنده موظف است کلیدهای منحصر بفردی که از طریق API آیدی پی دریافت می‌کند را (مثل id و track_id) در دیتابیس خود ذخیره کند و از یکتا بودن آنها اطمینان حاصل فرماید.
توجه داشته باشید که ممکن است یک مشتری رسید پرداخت آیدی پی را ذخیره کند و برای یک خرید دیگر از آن استفاده کند.
مسئولیت بررسی و شناسایی Double Spending کاملا به عهده پذیرنده می‌باشد.
	
در صورت بروز خطا در ایجاد تراکنش پاسخی مشابه زیر به صورت جسون دریافت می کنید

  ```
{
  status: 406
  data:{  
  "error_code": 32, 
  "error_message": ".نباید خالی باشد `order_id` مقدار"
  }
}
  ```
	
  # استعلام آخرین وضعیت تراکنش

با استفاده از متد inquiry می توانید از آخرین وضعیت یک تراکنش مطلع شوید.

```
const inquirypay = await idpay.inquiry(id, order_id);
```  


اجباری | نوع | ورودی 
--- | --- | ---  
| بله| رشته |id|
| بله| رشته |order_id|


در صورت صحیح بودن اطلاعات تراکنشد پاسخ متد inquiry مشابه زیر است
	
```
{
  "status": "100",
  "track_id": "10012",
  "id": "d2e353189823079e1e4181772cff5292",
  "order_id": "101",
  "amount": "10000",
  "wage": {
    "by": "payee",
    "type": "percent",
    "amount": "2500"
  },
  "date": "1546288200",
  "payer": {
    "name": "قاسم رادمان",
    "phone": "09382198592",
    "mail": "my@site.com",
    "desc": "توضیحات پرداخت کننده"
  },
  "payment": {
    "track_id": "888001",
    "amount": "10000",
    "card_no": "123456******1234",
    "hashed_card_no": "E59FA6241C94B8836E3D03120DF33E80FD988888BBA0A122240C2E7D23B48295",
    "date": "1546288500"
  },
  "verify": {
    "date": "1546288800"
  },
  "settlement": {
    "track_id": "12345678900",
    "amount": "7500",
    "date": "1546398000"
  }
}
```

	
در صورت بروز خطا پاسخی مشابه زیر به صورت جسون دریافت می کنید

```
{
  status: 406
  data:{  
  "error_code": 32, 
  "error_message": ".نباید خالی باشد `order_id` مقدار"
  }
}
```
	
# نمونه کد
```
const Eazyidpay = require("eazy-idpay");

const express = require("express");
const bodyParser = require("body-parser");

const idpay = new Eazyidpay("318a34543-dff-40a2-bcc0-25435f30bde8b");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/buy", async (req, res) => {
  const createpay = await idpay.create({
    order_id: 2423,
    amount: 100000,
    callback: "http://localhost:3000/callback",
    name: "فتاح رنجبر",
    phone: "09000000000",
    mail: "my@site.com",
    desc: "تلگرام : @fanishah",
  });
  console.log(create);
  res.redirect(create.data.link);
});

app.post("/callback", async (req, res) => {
  const verifypay = await idpay.verify(req.body.id, req.body.order_id);
  const inquirypay = await idpay.inquiry(req.body.id, req.body.order_id);
  console.log(verifypay);
  res.send(inquirypay);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

```
	
</div>
