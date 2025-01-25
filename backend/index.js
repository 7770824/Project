const express = require("express")
const app = express()

// 配置静态文件服务
app.use('/dataImg', express.static('dataImg'))

const data = [
    {
        name: "BELLE百丽小白鞋",
        img1: "http://localhost:5000/dataImg/BELLE/1/1.jpg",
        img2: "http://localhost:5000/dataImg/BELLE/1/2.jpg",
        oldprice: 299,
        newprice: 199,
        Symbol: "Trending",
        kinds: "服饰"
    },
    {
        name: "BELLE百丽跑道系列休闲鞋",
        img1: "http://localhost:5000/dataImg/BELLE/2/1.jpg",
        img2: "http://localhost:5000/dataImg/BELLE/2/2.jpg",
        oldprice: 399,
        newprice: 299,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "报喜鸟休闲条纹衬衫",
        img1: "http://localhost:5000/dataImg/bird/1/1.jpg",
        img2: "http://localhost:5000/dataImg/bird/1/2.jpg",
        oldprice: 359,
        newprice: 279,
        Symbol: "Trending",
        kinds: "服饰"
    },
    {
        name: "报喜鸟防风防水夹克外套",
        img1: "http://localhost:5000/dataImg/bird/2/1.jpg",
        img2: "http://localhost:5000/dataImg/bird/2/2.jpg",
        oldprice: 699,
        newprice: 579,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "传祺新能源汽车E9",
        img1: "http://localhost:5000/dataImg/chuanqi/1.jpg",
        img2: "http://localhost:5000/dataImg/chuanqi/2.jpg",
        oldprice: 1999,
        newprice: 1799,
        Symbol: "Featured",
        kinds: "日用"
    },
    {
        name: "德佑湿厕纸80抽*3",
        img1: "http://localhost:5000/dataImg/daily/deyou/1.jpg",
        img2: "http://localhost:5000/dataImg/daily/deyou/2.jpg",
        oldprice: 29,
        newprice: 19,
        Symbol: "Trending",
        kinds: "日用"
    },
    {
        name: "EKO",
        img1: "http://localhost:5000/dataImg/daily/eko/1.jpg",
        img2: "http://localhost:5000/dataImg/daily/eko/2.jpg",
        oldprice: 399,
        newprice: 359,
        Symbol: "Featured",
        kinds: "日用"
    },
    {
        name: "FENDI 特别订制",
        img1: "http://localhost:5000/dataImg/Fendi/1/1.jpg",
        img2: "http://localhost:5000/dataImg/Fendi/1/2.jpg",
        oldprice: 1799,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "FENDI 2025春节限定系列",
        img1: "http://localhost:5000/dataImg/Findi/2/1.jpg",
        img2: "http://localhost:5000/dataImg/Findi/2/2.jpg",
        oldprice: 679,
        newprice: 599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "FENDI 2025春夏男士系列",
        img1: "http://localhost:5000/dataImg/Findi/3/1.jpg",
        img2: "http://localhost:5000/dataImg/Findi/3/2.jpg",
        oldprice: 1299,
        newprice: 1199,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "脆升升15g*20",
        img1: "http://localhost:5000/dataImg/food/cuishengsheng/1.jpg",
        img2: "http://localhost:5000/dataImg/food/cuishengsheng/2.jpg",
        oldprice: 38.8,
        newprice: 28.8,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "多力 葵花籽油",
        img1: "http://localhost:5000/dataImg/food/duoli/1.jpg",
        img2: "http://localhost:5000/dataImg/food/duoli/2.jpg",
        oldprice: 29.9,
        newprice: 19.9,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "可漾 红豆薏米水500ml*12",
        img1: "http://localhost:5000/dataImg/food/keyang/1.jpg",
        img2: "http://localhost:5000/dataImg/food/keyang/2.jpg",
        oldprice: 89.9,
        newprice: 75.9,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "IWC 工程师自动腕表40",
        img1: "http://localhost:5000/dataImg/IWC/1/1.jpg",
        img2: "http://localhost:5000/dataImg/IWC/1/2.jpg",
        oldprice: 1679,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "IWC 葡萄牙系列自动腕表42曜石黑",
        img1: "http://localhost:5000/dataImg/IWC/2/1.jpg",
        img2: "http://localhost:5000/dataImg/IWC/2/2.jpg",
        oldprice: 1699,
        newprice: 1659,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "老庙·古韵金“富富有余”系列戒指",
        img1: "http://localhost:5000/dataImg/laomiao/1/2.jpg",
        img2: "http://localhost:5000/dataImg/laomiao/1/1.jpg",
        oldprice: 1679,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "老庙·古韵金“富富有余”系列胸针",
        img1: "http://localhost:5000/dataImg/laomiao/2/2.jpg",
        img2: "http://localhost:5000/dataImg/laomiao/2/1.jpg",
        oldprice: 1699,
        newprice: 1659,
        Symbol: "Featured",
        kinds: "服饰"
    }
]
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/api/data', (req, res) => {
    res.json(data);
});
app.listen(5000, () => {
    console.log(111);
})