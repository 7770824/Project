const express = require("express")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'wsyyyue777';

const path = require('path')
const fs = require('fs');
// const { json } = require("stream/consumers");

const app = express()
const cartFilePath = path.join(__dirname, 'cart.json');
const usersFilePath = path.join(__dirname, 'users.json');

const writeCart = (cart) => {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
};
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

const authCheck = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: 'fail',
            message: '未登录'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // 检查用户是否仍然存在
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const userExists = users.some(user => user.email === decoded.email);

        if (!userExists) {
            return res.status(401).json({
                status: 'fail',
                message: '用户不存在，请重新登录'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        // token过期或无效时会抛出异常
        return res.status(401).json({
            status: 'fail',
            message: 'token无效'
        });
    }
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// 配置静态文件服务
app.use('/dataImg', express.static(path.join(__dirname, 'dataImg')))

const data = [
    {
        name: "BELLE百丽小白鞋",
        id: 1,
        img1: "http://localhost:5000/dataImg/BELLE/1/1.jpg",
        img2: "http://localhost:5000/dataImg/BELLE/1/2.jpg",
        oldprice: 299,
        newprice: 199,
        Symbol: "Trending",
        kinds: "服饰"
    },
    {
        name: "BELLE百丽跑道系列休闲鞋",
        id: 2,
        img1: "http://localhost:5000/dataImg/BELLE/2/1.jpg",
        img2: "http://localhost:5000/dataImg/BELLE/2/2.jpg",
        oldprice: 399,
        newprice: 299,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "报喜鸟休闲条纹衬衫",
        id: 3,
        img1: "http://localhost:5000/dataImg/bird/1/1.png",
        img2: "http://localhost:5000/dataImg/bird/1/2.png",
        oldprice: 359,
        newprice: 279,
        Symbol: "Trending",
        kinds: "服饰"
    },
    {
        name: "报喜鸟防风防水夹克外套",
        id: 4,
        img1: "http://localhost:5000/dataImg/bird/2/1.png",
        img2: "http://localhost:5000/dataImg/bird/2/2.png",
        oldprice: 699,
        newprice: 579,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "传祺新能源汽车E9",
        id: 5,
        img1: "http://localhost:5000/dataImg/chuanqi/1.jpg",
        img2: "http://localhost:5000/dataImg/chuanqi/2.jpg",
        oldprice: 1999,
        newprice: 1799,
        Symbol: "Featured",
        kinds: "日用"
    },
    {
        name: "德佑湿厕纸80抽*3",
        id: 6,
        img1: "http://localhost:5000/dataImg/daily/deyou/1.png",
        img2: "http://localhost:5000/dataImg/daily/deyou/2.png",
        oldprice: 29,
        newprice: 19,
        Symbol: "Trending",
        kinds: "日用"
    },
    {
        name: "EKO",
        id: 7,
        img1: "http://localhost:5000/dataImg/daily/eko/1.png",
        img2: "http://localhost:5000/dataImg/daily/eko/2.png",
        oldprice: 399,
        newprice: 359,
        Symbol: "Featured",
        kinds: "日用"
    },
    {
        name: "FENDI 特别订制",
        id: 8,
        img1: "http://localhost:5000/dataImg/Fendi/1/1.jpg",
        img2: "http://localhost:5000/dataImg/Fendi/1/2.jpg",
        oldprice: 1799,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "FENDI 2025春节限定系列",
        id: 9,
        img1: "http://localhost:5000/dataImg/Fendi/2/1.jpg",
        img2: "http://localhost:5000/dataImg/Fendi/2/2.jpg",
        oldprice: 679,
        newprice: 599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "FENDI 2025春夏男士系列",
        id: 10,
        img1: "http://localhost:5000/dataImg/Fendi/3/1.jpg",
        img2: "http://localhost:5000/dataImg/Fendi/3/2.jpg",
        oldprice: 1299,
        newprice: 1199,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "脆升升15g*20",
        id: 11,
        img1: "http://localhost:5000/dataImg/food/cuishengsheng/1.png",
        img2: "http://localhost:5000/dataImg/food/cuishengsheng/2.png",
        oldprice: 38.8,
        newprice: 28.8,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "多力 葵花籽油",
        id: 12,
        img1: "http://localhost:5000/dataImg/food/duoli/1.png",
        img2: "http://localhost:5000/dataImg/food/duoli/2.png",
        oldprice: 29.9,
        newprice: 19.9,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "可漾 红豆薏米水500ml*12",
        id: 13,
        img1: "http://localhost:5000/dataImg/food/keyang/1.png",
        img2: "http://localhost:5000/dataImg/food/keyang/2.png",
        oldprice: 89.9,
        newprice: 75.9,
        Symbol: "Trending",
        kinds: "食品"
    },
    {
        name: "IWC 工程师自动腕表40",
        id: 14,
        img1: "http://localhost:5000/dataImg/IWC/1/1.jpg",
        img2: "http://localhost:5000/dataImg/IWC/1/2.jpg",
        oldprice: 1679,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "IWC 葡萄牙系列自动腕表42曜石黑",
        id: 15,
        img1: "http://localhost:5000/dataImg/IWC/2/1.jpg",
        img2: "http://localhost:5000/dataImg/IWC/2/2.jpg",
        oldprice: 1699,
        newprice: 1659,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "老庙·古韵金“富富有余”系列戒指",
        id: 16,
        img1: "http://localhost:5000/dataImg/laomiao/1/2.jpg",
        img2: "http://localhost:5000/dataImg/laomiao/1/1.jpg",
        oldprice: 1679,
        newprice: 1599,
        Symbol: "Featured",
        kinds: "服饰"
    },
    {
        name: "老庙·古韵金“富富有余”系列胸针",
        id: 17,
        img1: "http://localhost:5000/dataImg/laomiao/2/2.jpg",
        img2: "http://localhost:5000/dataImg/laomiao/2/1.jpg",
        oldprice: 1699,
        newprice: 1659,
        Symbol: "Featured",
        kinds: "服饰"
    }
]

app.use(express.json());

app.post('/api/cart/add', authCheck, (req, res) => {
    const { id, nums } = req.body;
    const product = data.find(item => item.id === parseInt(id));
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.newprice,
        nums: nums,
        img: product.img1
    };
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'))
    if (!cart[req.user.email]) {
        cart[req.user.email] = [];
    }
    const userCart = cart[req.user.email];
    const productIndex = userCart.findIndex(item => item.id === id);
    if (productIndex !== -1) {
        userCart[productIndex].nums += nums;
    } else userCart.push(cartItem);
    writeCart(cart);
    res.json({ message: '添加成功！', length: userCart.length });
});
app.post('/api/cart/numsChange', authCheck, (req, res) => {
    const { id, nums } = req.body;
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'))
    const userCart = cart[req.user.email];
    if (nums === 0)
        cart[req.user.email] = userCart.filter(item => item.id !== id);
    else {
        const item = userCart.find(item => item.id === id);
        if (item) item.nums = nums;
    }
    writeCart(cart);
    res.json('修改成功')
})

app.get('/api/cart/read', authCheck, (req, res) => {
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    const userCart = cart[req.user.email] || [];
    res.json(userCart);
})

app.get('/api/data', (req, res) => {
    res.json(data);
});
app.get('/api/data/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = data.find(item => item.id === id);
    res.json(product);
});

app.post('/api/user/regin', (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(item => item.email === email);

    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: '用户不存在'
        });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            status: 'fail',
            message: '密码错误'
        });
    }
    const token = jwt.sign(
        { email: user.email },
        SECRET_KEY,
        { expiresIn: '24h' }
    );

    res.json({
        status: 'success',
        message: '登录成功',
        token
    });
})

app.post('/api/user/regist', (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({
            status: 'fail',
            message: '邮箱、用户名和密码都是必填项'
        });
    }
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    if (users.find(item => item.email === email))
        return res.status(400).json({
            status: 'fail',
            message: '邮箱已被注册'
        });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
        email,
        username,
        password: hashedPassword,
    };
    users.push(newUser);
    writeUsers(users);
    res.json({
        status: 'success',
        message: '注册成功'
    });
})

app.get('/api/user/info', authCheck, (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(user => user.email === req.user.email);
    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: '用户不存在'
        });
    }
    res.json({
        status: 'success',
        data: {
            email: user.email,
            username: user.username
        }
    });
});

app.delete('/api/user/delete', authCheck, (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userIndex = users.findIndex(user => user.email === req.user.email);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: '用户不存在'
        });
    }

    // 删除用户
    users.splice(userIndex, 1);
    writeUsers(users);

    // 删除用户的购物车数据
    const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    delete cart[req.user.email];
    writeCart(cart);

    res.json({
        status: 'success',
        message: '账号已注销'
    });
});

app.listen(5000, () => {
    console.log(111);
})