<div dir="rtl">

# درباره ایزی آیدی پی

  <p>استفاده آسان و راحت از درگاه پرداخت آیدی پی</p>

# روش نصب

</div>

```
npm i eazy-idpay
```

<div dir="rtl">

# متد ها

  </div>
  
```
create() // ایجاد تراکنش
verify() // تایید تراکنش
inquiry() // استعلام آخرین وضعیت تراکنش
```

  <div dir="rtl">

# احراز هویت درگاه

  </div>
  
```
const Eazyidpay = require("eazy-idpay");
const idpay = new Eazyidpay(TOKEN, issandbox);
```

<p>
  TOKEN :   درگاه جهت احراز هویت API
<p>
</p>

issandbox : بودن درگاه به صورت آزمایشی می باشد true می باشد و در صورت false به صورت پیش فرض

</p>

  <div dir="rtl">
  
  # ایجاد تراکنش
  
  
  <p>
  برای ایجاد تراکنش از متد create استفاده کنید
  </p>
	
  </div>

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

  <div dir="rtl">
	
  در صورت درست بودن تمام ورودی های متد پاسخ زیر برای شما به صورت جیسون به شما داده میشود

</div>

```
{
"id": "d2e353189823079e1e4181772cff5292",
"link": "https://idpay.ir/p/ws-sandbox/d2e353189823079e1e4181772cff5292"
}
```

<div dir="rtl">
  
   شما باید برای انجام مراحل پرداخت کاربر را به  پراپرتی link در پاسخ ایجاد تراکنش ریدایرکت کنید

در صورت بروز خطا در ایجاد تراکنش پاسخی مشابه زیر به صورت جیسون دریافت می کنید

</div>

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

| اجباری | نوع  | ورودی    |
| ------ | ---- | -------- |
| بله    | عدد  | amount   |
| بله    | رشته | order_id |
| بله    | رشته | callback |
| خیر    | رشته | name     |
| خیر    | رشته | phone    |
| خیر    | رشته | mail     |
| خیر    | رشته | desc     |

<div dir="rtl">

# تایید تراکنش

در صفحه کال بک می توانید مرحله اعتبار سنجی تراکنش را با متد verify انجام دهید.

</div>

```
const verifypay = await idpay.verify(id, order_id);
```

  <div dir="rtl">
مقدار id و order_id در بادی کال بک می باشد که در پکیج Express در req.body می باشد.

</div>
	
	
اجباری | نوع | ورودی 
--- | --- | ---  
| بله| رشته |id|
| بله| رشته |order_id|

<div dir="rtl">
در صورتی که کاربر تراکنش را پرداخت کرده باشد پاسخ متد verify مشابه زیر است
توجه کنید باید مقدار status عدد 100 باشد	
</div>

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

<div dir="rtl">

[ کد های وضعیت تراکنش ](https://idpay.ir/web-service/v1.1/?javascript#ad39f18522)
درصوت پرداخت توسط کاربر کد status باید 100 باشد و صورت کد 101 یعنی پرداخت قبلا تایید شده است و احتمال دارد کاربر می خواد دوباره از شناسه تراکنش بدون پرداخت دوباره استفاده کند

**هشدار آیدی پی** : جهت جلوگیری از دوبار مصرف شدن یک پرداخت (Double Spending)، پذیرنده موظف است کلیدهای منحصر بفردی که از طریق API آیدی پی دریافت می‌کند را (مثل id و track_id) در دیتابیس خود ذخیره کند و از یکتا بودن آنها اطمینان حاصل فرماید.
توجه داشته باشید که ممکن است یک مشتری رسید پرداخت آیدی پی را ذخیره کند و برای یک خرید دیگر از آن استفاده کند.
مسئولیت بررسی و شناسایی Double Spending کاملا به عهده پذیرنده می‌باشد.
در صورت بروز خطا در ایجاد تراکنش پاسخی مشابه زیر به صورت جیسون دریافت می کنید

</div>

```
{
status: 406
data:{
  "error_code": 32,
  "error_message": ".نباید خالی باشد `order_id` مقدار"
}
}
```

  <div dir="rtl">
	
  # استعلام آخرین وضعیت تراکنش

با استفاده از متد inquiry می توانید از آخرین وضعیت یک تراکنش مطلع شوید.

</div>

```
const inquirypay = await idpay.inquiry(id, order_id);
```

| اجباری | نوع  | ورودی    |
| ------ | ---- | -------- |
| بله    | رشته | id       |
| بله    | رشته | order_id |

<div dir="rtl">

در صورت صحیح بودن اطلاعات تراکنشد پاسخ متد inquiry مشابه زیر است

</div>

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

<div dir="rtl">
در صورت بروز خطا پاسخی مشابه زیر به صورت جیسون دریافت می کنید

</div >

```
{
  status: 406
  data:{
    "error_code": 32,
    "error_message": ".نباید خالی باشد `order_id` مقدار"
  }
}
```

  <div dir="rtl">

# نمونه کد

</div>

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
  console.log(createpay);
  res.redirect(createpay.data.link);
});

app.post("/callback", async (req, res) => {
  const verifypay = await idpay.verify(req.body.id, req.body.order_id);
  const inquirypay = await idpay.inquiry(req.body.id, req.body.order_id);
  console.log(verifypay);
  res.send(inquirypay);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

```
