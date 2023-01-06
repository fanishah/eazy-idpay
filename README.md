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
    inquiry() // اسعلام آخرین وضعیت تراکنش
  ```
  
  # احراز هویت درگاه
  
  ```
      const  Eazyidpay = require("eazy-idpay");
    const  idpay = new  Eazyidpay(TOKEN, true);
  ```
  TOKEN :   درگاه جهت احراز هویت API
  
  # ایجاد تراکنش
  
  <p>
  برای ایجاد تراکنش از متد create استفاده کنید
  </p>
	
  ```

	const createpay = await  idpay.create({
		amount:  100000,
		order_id:  2423,
		callback:  "http://localhost:3000/callback",
		name:  "فتاح رنجبر",
		phone:  "09339993377",
		mail:  "my@site.com",
		desc:  "توضیحات",
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
    }}
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

</div>
