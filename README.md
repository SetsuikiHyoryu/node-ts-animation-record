# 記録動畫進度程序的 NOTE + TS 實現的服務端

注：本項目在 windows 上開發

## 從空文件夹開始初始化（下載本項目的話請跳過此步驟）

### 1. 安裝依頼（衹在當前項目内，非本地計算機全局）

注：默認你已安裝 **node** 和 **git**

```shell
# 生成 package.json 文件
npm init -y

# 安裝依頼
# --save-dev: 縮寫爲 -D，意爲安裝編譯時依頼。install 小寫爲 i。
npm install typescript --save-dev # 安裝 TypeScript（編程語言）
npx tsc --init # 生成 tsconfig.json 文件
npm install @types/node --save-dev # 安裝 types/node（node 的 ts 類型包）
npm install --save-dev ts-node # 安裝 ts-node（ts 的執行工具）

```

### 2. 創建文件

新建任意文件, 如：index.ts

```typescript
// index.ts

const showBelief = (belief: string): void => {
  console.log(belief)
};

showBelief(`L'Internationale Sera le genre humain.`);
```

### 3. 執行

- 在命令行中執行

    ```shell
    $ npx ts-node index.ts
    "L'Internationale Sera le genre humain."
    ```

- 修改 package.json 中的 scripts 屬性

  注：scripts 中的屬性名和文件名可以自定義

    ```json
    {
      "scripts": {
        "dev": "ts-node index.ts"
      },
    }
    ```

---

## 在 Docker 上運行程序

注：默認你已安裝 Docker

1. 創建 Dockerfile

   - 文件名建議使用默認的 `Dockerfile`，注意首字母大寫。  
   - 其中的内容可以被 docker-compose.yaml 文件重寫。

     ```Dockerfile
     # 定義基於哪個鏡像，可以用“鏡像名:版本號”指定版本
     FROM node
     # 定義程序運行在容器（容器基於鏡像創建）的哪個目録
     WORKDIR /app
     # 複製本地目録内的 package.json 至容器目録
     COPY package.json /app/
     # 安裝依頼
     RUN npm install
     # 複製本地目録内的文件至容器目録（可用 .dockerignore 文件過濾文件）
     # 在安裝依賴之行複製是因爲不希望每次改動業務代碼都重新安裝一次依頼
     COPY . /app/
     # 定義暴露容器的哪個端口（本地無法直接訪問，需要在創建容器時映射）
     EXPOSE 8090
     # 定義容器啟動後執行的命令（即啟動項目的命令）
     CMD ["npm", "run", "dev"]
     ```

2. 基於 Dockerfile 生成鏡像文件

     ```shell
     # --tag 縮寫 -t，用來給鏡像命名，如果不命名則名字顯示爲 none
     docker build --tag nickname .
     
     # 查看所有鏡像
     docker image ls
     
     # 删除指定鏡像 如果創建了容器需要加 --force（簡寫 -f）
     docker iamge rm --force 鏡像名或ID
     ```

3. 基於鏡像創䢖容器

     ```shell
     # --publish -p, 本地端口:容器端口；--detach -d, 後臺運行
     docker run --publish 1848:1848 --detach --name nickname 鏡像名或ID
     
     # 進入容器
     docker exec -it 容器名 bash
     
     # 查看所有容器 不加 --all 則查看當前運行中的容器
     docker ps --all
     
     # 删除容器 删除運行中的容器要加 --force（簡寫 -f）
     docker rm --force 容器名或ID
     ```

4. 在瀏覽器中打開端口
5. 同步本地文件夾和 docker 卷

   需要事先在 docker desktop 的 Setting > Resources > FILE SHARING 中設置允許共享的目録（可以是父級目録）
   注意同步時本地目録會覆盖目標目録，所以想保留的 docker 容器内的目録需要使用卷保存

     ```shell
     # --volume / -v, ro means readonly. 綁定一個卷。例：C:\...:/app:ro。可以快捷獲取當前路徑，cmd: %cd%, shell: ${pwd}, linux: $(pwd)
     docker run --volume <本地目録路徑>:<docker 卷路徑>:ro --publish 1848:1848 --detach --name nickname 鏡像名或ID
     
     #可以傳入環境變量
     docker run --env xxx=xxx
     docker run --env-file <env path>
     
     # 查看所有容器 不加 --all 則查看當前運行中的容器
     docker ps --all
     
     # 删除容器 删除運行中的容器要加 --force（簡寫 -f）
     # --volumes / -v: 删除相關的卷
     docker rm 容器名或ID --force --volumes
     ```

### Docker 常用指令

```shell
# 查看 docker 幫助
docker --help
# 查看 docker 指令的幫助
docker 指令 iamge 
# 查看容器記録
docker logs 容器名
```

### 使用 Docker Componse

1. 創建 docker-compose.yaml
2. 執行 docker-compose 命令

     ```shell
     # 構建鏡像並啟動容器，如果鏡像已存在（通過名字比對），則直接啟動容器。
     docker-compose up --detach
     # 修改的内容需要重新生成鏡像時需要手動告知 docker-compose
     docker-compose up --detach --bulid
     # 指定使用的 docker-compose 文件。
     docker-compose -f docker-compose.yaml up --detach
     
     # 關閉並删除容器 
     # -v, --volumes 删除所有相關卷。如果要保留數據庫，不要使用這個功能。
     docker-compose down
     ```

### 連接服務器

- 查找 IP 地址
  - 在容器詳情中查找 IP 地址，字段名爲 `NetworkSettings > Networks > IPAddress`

    ```shell
    # 獲取容器詳情
    docker inspect 容器
    ```

- 以 mongoose 爲例
  1. 安裝 mongoose
  
       ```shell
       npm install mongoose
       ```

  2. 在服務器中使用 mongoose
  
       ```typescript
       // ./bin/server.js

       import HTTP from 'http'
       // 導入 mongoose 
       import mongoose from 'mongoose'

       // 連接 mongodb
       mongoose
         .connect('mongodb://username:password@MongoDBIPAddressInDocker:27017/?authSource=admin')
         .then(() => console.log('success to connect database'))
         .catch((error) => console.log(error))
  
       ```
