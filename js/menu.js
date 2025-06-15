const submenu = document.querySelector('.submenu');
const menus = document.querySelectorAll('.menu');

// 每个导航项映射到对应的子菜单类名
const menuMap = {
    qin: 'submenu-qin',
    qi: 'submenu-qi',
    shu: 'submenu-shu',
    hua: 'submenu-hua'
};

let hideTimeout;

function showSubMenu(className) {
    clearTimeout(hideTimeout);
    menus.forEach(menu => menu.classList.remove('active'));
    const targetMenu = document.querySelector(`.${className}`);
    if (targetMenu) {
        targetMenu.classList.add('active');
        submenu.style.display = 'block';

        // 添加延迟以触发过渡效果
        setTimeout(() => {
            submenu.style.opacity = '1';
        }, 10);
    }
}


function hideSubMenu() {
    hideTimeout = setTimeout(() => {
        submenu.style.opacity = '0';
        // 等待过渡效果完成后隐藏菜单
        setTimeout(() => {
            submenu.style.display = 'none';
        }, 200);
    }); // 延迟 200ms 再开始隐藏动画
}


// 绑定每个导航项的 hover 事件
Object.keys(menuMap).forEach(key => {
    const navItem = document.querySelector(`.${key}`);
    if (navItem) {
        navItem.addEventListener('mouseenter', () => showSubMenu(menuMap[key]));
        navItem.addEventListener('mouseleave', () => hideSubMenu());
    }
});

// 子菜单区域不触发隐藏
submenu.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);

    const activeMenu = submenu.querySelector('.menu.active');
    if (activeMenu) {
        const menuType = activeMenu.dataset.menu;
        const targetLink = document.querySelector(`.${menuType} a.underline`);
        if (targetLink) {
            targetLink.classList.add('hovered');
        }
    }
});

submenu.addEventListener('mouseleave', () => {
    const activeMenu = submenu.querySelector('.menu.active');
    if (activeMenu) {
        const menuType = activeMenu.dataset.menu;
        const targetLink = document.querySelector(`.${menuType} a.underline`);
        if (targetLink) {
            targetLink.classList.remove('hovered');
        }
    }

    hideSubMenu();
});



// 初始化时也执行一次
document.querySelectorAll('.white-bg').forEach(el => {
    el.style.top = '-70px'; // 默认首页 top 为 -75px
});

// 页面加载时初始化一次
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const submenu = document.querySelector('.submenu');

    header.classList.add('dark-nav'); // 首页默认深色
    submenu.classList.add('dark-menu'); // 首页默认深色
});


document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.submenu .menu a');
    const navLinks = document.querySelectorAll('.site-header nav ul li a');

    // 点击导航栏标题时同步激活状态
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 如果需要阻止跳转

            // 移除所有 active 类
            navLinks.forEach(a => a.classList.remove('active'));

            // 给当前点击的标题添加 active
            this.classList.add('active');
        });
    });

    // 点击子菜单项时同步激活导航栏标题
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const parentMenu = this.closest('.menu');
            const menuType = parentMenu.dataset.menu;

            // 移除所有 active 类
            navLinks.forEach(a => a.classList.remove('active'));

            // 找到对应导航项并添加 active
            const targetLink = document.querySelector(`.${menuType} a`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
        });
    });

    // 页面加载时设置首页为激活状态
    const homeLink = document.querySelector('.site-header nav ul li:first-child a');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});
