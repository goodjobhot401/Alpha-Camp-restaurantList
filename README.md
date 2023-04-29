# Alpha-Camp-restaurantList2.0

### Features 產品功能
* 使用者可點擊任一餐廳瀏覽更詳細資訊
* 使用者可新增、修改、查閱、刪除餐廳資料
* 使用者可搜尋特定餐廳
* 使用者可註冊帳號
* 使用者可登入系統建立自己的餐廳資料

### Environment SetUp 環境建置與需求
* Node.js
* Nodemon
* Express@4.18.2
* Express-handlebars@3.0.0
* Express-session@1.17.1
* MongoDB
* Mongoose@7.0.3
* method-override@3.0.0
* bcryptjs@2.4.3
* body-parser@1.20.2
* connect-flash@0.1.1
* dotenv@16.0.3
* passport@0.4.1
* passport-facebook@3.0.0
* passpot-local@1.0.0

### Installing 專案安裝流程
1. 打開 terminal, Clone 此專案到本機電腦  

```
git clone https://github.com/goodjobhot401/Alpha-Camp-restaurantList.git 
```  

2. 進入放入此專案的資料夾  

``` 
cd Alpha-Camp-restaurantList 
```

3. 安裝 npm 套件  

``` 
輸入 npm install 指令 
```

4. 安裝 mongoose 套件 

``` 
npm i mongoose@5.9.7   
```

5. 設置 .env 檔

``` 
將 .env.example 檔名調整成 .env   
```

6. 匯入種子資料

``` 
npm run seed   
```

7. 終端機出現下列字樣，表示種子資料執行完畢

> mongodb connected!

> running restaurantSeeder script

> restaurantSeeder done!

8. 啟動伺服器，執行 app.js

``` 
npm run dev   
```

9. 終端機出現下列字樣，表示伺服器已啟動

> This website is listening on http://localhost:3000

> mongodb connected!
