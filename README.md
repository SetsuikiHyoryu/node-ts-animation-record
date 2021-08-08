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
        "dev": "ts-node binary/server.ts"
      },
    }
    ```

---
