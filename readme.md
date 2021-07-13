# MP updates, 小程序更新汇总

### 项目初衷

因为小程序的功能更新比较频繁，浩瀚的文档中难以去找新功能，他们也没有统一的出处，所以我就根据他们的文档自动生成了一版，通过接口的版本号来判断哪些是新的功能，肯定缺少一些东西，欢迎意见或建议

### 项目组成

1. scrapy 爬虫

```bash
scrapy crawl mp_component -o mpcomponent.json
scrapy crawl mp_api -o mpapi.json
```

2. parcel 自动生成前端文件

```
parcel build
```

3. 部署到netlify
通过GitHub的action自动部署，
部署文件在`.github/workflows/main.yml`

4. **缺点**
因为是自动生成的，所以想手动添加的就没法做，后面再看看怎么添加
### **欢迎提issue**

### License
MIT
