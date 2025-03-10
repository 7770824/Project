const express = require("express")
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 分别设置两种token的密钥和过期时间
const ACCESS_TOKEN_SECRET = 'wsyyyue777';
const REFRESH_TOKEN_SECRET = 'wsyrefreshyue999';
const ACCESS_TOKEN_EXPIRY = '15m'; // 15分钟
const REFRESH_TOKEN_EXPIRY = '7d'; // 7天

const path = require('path')
const fs = require('fs');
const multer = require('multer');

const app = express()
const cartFilePath = path.join(__dirname, 'cart.json');
const usersFilePath = path.join(__dirname, 'users.json');
const tokenFilePath = path.join(__dirname, 'refreshTokens.json');

const writeCart = (cart) => {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
};
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
const writeTokens = (tokens) => {
    fs.writeFileSync(tokenFilePath, JSON.stringify(tokens, null, 2));
}

app.use(cookieParser());
app.use(express.json());

// 生成token的函数
const generateTokens = (userEmail) => {
    // 生成访问令牌
    const accessToken = jwt.sign(
        { email: userEmail },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // 生成刷新令牌
    const refreshToken = jwt.sign(
        { email: userEmail },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // 保存刷新令牌到文件中
    const tokens = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
    tokens[userEmail] = {
        token: refreshToken,
        createdAt: new Date().toISOString()
    };
    writeTokens(tokens);

    return { accessToken, refreshToken };
};

const authCheck = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    // 没有任何令牌
    if (!accessToken && !refreshToken) {
        return res.status(401).json({
            status: 'fail',
            message: '未登录'
        });
    }
    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next();
    } catch (accessError) {
        // 访问令牌无效或过期，尝试使用刷新令牌
        if (!refreshToken) {
            return res.status(401).json({
                status: 'fail',
                message: '访问令牌已过期，请重新登录'
            });
        }
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const tokens = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));

            // 检查refreshToken是否在存储中且有效
            if (!tokens[decoded.email] || tokens[decoded.email].token !== refreshToken) {
                return res.status(401).json({
                    status: 'fail',
                    message: '刷新令牌无效，请重新登录'
                });
            }

            // 刷新令牌有效，生成新的访问令牌
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(decoded.email);

            // 设置新的访问令牌和刷新令牌
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000 // 15min
            });
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7day
            });

            req.user = decoded;
            return next();
        } catch (refreshError) {
            // 刷新令牌也无效，清除所有cookie
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(401).json({
                status: 'fail',
                message: '身份验证失败，请重新登录'
            });
        }
    }
};

const avatarUploadDir = path.join(__dirname, 'uploads', 'avatars');

// 配置multer存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `avatar-${uniqueSuffix}${ext}`);
    }
});

// 文件类型过滤器
const fileFilter = (req, file, cb) => {
    // 只接受图片文件
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('只能上传图片文件！'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB限制
});

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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// 配置静态文件服务
app.use('/dataImg', express.static(path.join(__dirname, 'dataImg')))
// 设置静态文件服务，为头像提供访问
app.use('/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));

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

// 在app.get('/api/data')路由中添加过滤功能

app.get('/api/data', (req, res) => {
    // 获取分页参数
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    // 获取过滤条件
    const categories = req.query.categories ? req.query.categories.split(',') : [];
    const symbol = req.query.symbol || '';
    const kinds = req.query.kinds || '';
    const priceRange = parseFloat(req.query.priceRange) || 2000;
    const sortBy = req.query.sortBy || 'normal';
    const type = req.query.type || '';
    const searchText = req.query.searchText || '';

    // 应用过滤条件
    let filteredData = data.filter(item => {
        if (type && item.Symbol !== type) {
            return false;
        }
        // 按分类过滤
        if (categories.length > 0 &&
            !categories.some(cat => item.name.includes(cat) || item.kinds.includes(cat))) {
            return false;
        }
        // 按品牌过滤
        if (symbol && item.Symbol !== symbol) {
            return false;
        }
        // 按种类过滤
        if (kinds && item.kinds !== kinds) {
            return false;
        }
        // 按价格过滤
        if (item.newprice > priceRange) {
            return false;
        }
        if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }

        return true;
    });

    // 应用排序
    if (sortBy === 'minfirst') {
        filteredData.sort((a, b) => a.newprice - b.newprice);
    }

    // 计算分页
    const totalItems = filteredData.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // 准备返回结果
    const results = {};
    results.totalItems = totalItems;
    results.page = page;
    results.limit = limit;
    results.hasMore = endIndex < totalItems;
    results.items = filteredData.slice(startIndex, endIndex);

    res.json(results);
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
    // 生成双令牌
    const { accessToken, refreshToken } = generateTokens(user.email);

    // 设置cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15分钟
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7天
    });

    res.json({
        status: 'success',
        message: '登录成功',
    });
})

// 修改注册接口
app.post('/api/user/regist', upload.single('avatar'), (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            // 如果上传了文件但注册失败，删除文件
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                status: 'fail',
                message: '邮箱、用户名和密码都是必填项'
            });
        }

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        if (users.find(item => item.email === email)) {
            // 如果上传了文件但注册失败，删除文件
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                status: 'fail',
                message: '邮箱已被注册'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const avatarPath = req.file
            ? `http://localhost:5000/avatars/${path.basename(req.file.path)}`
            : null;

        const newUser = {
            email,
            username,
            password: hashedPassword,
            avatar: avatarPath
        };

        users.push(newUser);
        writeUsers(users);

        res.json({
            status: 'success',
            message: '注册成功'
        });
    } catch (error) {
        // 如果上传了文件但处理过程中出错，删除文件
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error('注册出错:', error);
        res.status(500).json({
            status: 'fail',
            message: '服务器错误'
        });
    }
});

// 修改用户信息接口
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
            username: user.username,
            avatar: user.avatar
        }
    });
});

// 更新用户个人资料
app.post('/api/user/update', authCheck, upload.single('avatar'), (req, res) => {
    try {
        const { username } = req.body;
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const userIndex = users.findIndex(user => user.email === req.user.email);

        if (userIndex === -1) {
            // 用户不存在
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                status: 'fail',
                message: '用户不存在'
            });
        }

        const user = users[userIndex];

        // 更新用户名
        if (username) user.username = username;

        // 处理头像更新
        if (req.file) {
            // 如果用户已有头像，删除旧头像
            if (user.avatar) {
                try {
                    const oldAvatarFilename = user.avatar.split('/').pop();
                    const oldAvatarPath = path.join(avatarUploadDir, oldAvatarFilename);

                    if (fs.existsSync(oldAvatarPath)) {
                        fs.unlinkSync(oldAvatarPath);
                    }
                } catch (error) {
                    console.error('删除旧头像失败:', error);
                    // 继续执行，即使删除旧头像失败
                }
            }

            // 设置新头像路径
            user.avatar = `http://localhost:5000/avatars/${path.basename(req.file.path)}`;
        }

        // 保存更新后的用户数据
        users[userIndex] = user;
        writeUsers(users);

        res.json({
            status: 'success',
            message: '个人资料已更新',
            data: {
                email: user.email,
                username: user.username,
                avatar: user.avatar
            }
        });
    } catch (error) {
        // 如果上传了文件但处理过程中出错，删除文件
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error('更新个人资料出错:', error);
        res.status(500).json({
            status: 'fail',
            message: '服务器错误'
        });
    }
});

app.post('/api/user/logout', (req, res) => {
    // 从存储中删除刷新令牌
    if (req.user && req.user.email) {
        const tokens = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
        delete tokens[req.user.email];
        writeTokens(tokens);
    }

    // 清除cookie
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ status: 'success', message: '已登出' })
})

// 修改删除用户API接口
app.delete('/api/user/delete', authCheck, (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        // 找到当前用户
        const userIndex = users.findIndex(user => user.email === req.user.email);

        if (userIndex === -1) {
            return res.status(404).json({
                status: 'fail',
                message: '用户不存在'
            });
        }

        // 获取用户数据，包括头像路径
        const user = users[userIndex];

        // 如果用户有头像，删除头像文件
        if (user.avatar) {
            try {
                // 从URL中提取文件名
                const avatarFilename = user.avatar.split('/').pop();
                const avatarPath = path.join(avatarUploadDir, avatarFilename);

                // 检查文件是否存在，然后删除
                if (fs.existsSync(avatarPath)) {
                    fs.unlinkSync(avatarPath);
                    console.log(`删除用户头像: ${avatarPath}`);
                }
            } catch (fileError) {
                console.error('删除头像文件失败:', fileError);
                // 继续执行删除用户操作，即使头像删除失败
            }
        }

        // 从用户列表中删除用户
        users.splice(userIndex, 1);
        writeUsers(users);

        // 删除用户的刷新令牌
        const tokens = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
        if (tokens[req.user.email]) {
            delete tokens[req.user.email];
            writeTokens(tokens);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.json({
            status: 'success',
            message: '账号已注销'
        });
    } catch (error) {
        console.error('删除用户出错:', error);
        res.status(500).json({
            status: 'fail',
            message: '服务器错误'
        });
    }
});

app.listen(5000, () => {
    console.log(111);
})