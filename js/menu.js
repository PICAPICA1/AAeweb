const submenu = document.querySelector(".submenu");
const menus = document.querySelectorAll(".menu");

// 每个导航项映射到对应的子菜单类名
const menuMap = {
  qin: "submenu-qin",
  qi: "submenu-qi",
  shu: "submenu-shu",
  hua: "submenu-hua",
};

let hideTimeout;

function showSubMenu(className) {
  clearTimeout(hideTimeout);
  menus.forEach((menu) => menu.classList.remove("active"));
  const targetMenu = document.querySelector(`.${className}`);
  if (targetMenu) {
    targetMenu.classList.add("active");
    submenu.style.display = "block";

    // 添加延迟以触发过渡效果
    setTimeout(() => {
      submenu.style.opacity = "1";
    }, 10);
  }
}

function hideSubMenu() {
  hideTimeout = setTimeout(() => {
    submenu.style.opacity = "0";
    // 等待过渡效果完成后隐藏菜单
    setTimeout(() => {
      submenu.style.display = "none";
    }, 200);
  }); // 延迟 200ms 再开始隐藏动画
}

// 绑定每个导航项的 hover 事件
Object.keys(menuMap).forEach((key) => {
  const navItem = document.querySelector(`.${key}`);
  if (navItem) {
    navItem.addEventListener("mouseenter", () => showSubMenu(menuMap[key]));
    navItem.addEventListener("mouseleave", () => hideSubMenu());
  }
});

// 子菜单区域不触发隐藏
submenu.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout);

  const activeMenu = submenu.querySelector(".menu.active");
  if (activeMenu) {
    const menuType = activeMenu.dataset.menu;
    const targetLink = document.querySelector(`.${menuType} a.underline`);
    if (targetLink) {
      targetLink.classList.add("hovered");
    }
  }
});

submenu.addEventListener("mouseleave", () => {
  const activeMenu = submenu.querySelector(".menu.active");
  if (activeMenu) {
    const menuType = activeMenu.dataset.menu;
    const targetLink = document.querySelector(`.${menuType} a.underline`);
    if (targetLink) {
      targetLink.classList.remove("hovered");
    }
  }

  hideSubMenu();
});

// 初始化时也执行一次
document.querySelectorAll(".white-bg").forEach((el) => {
  el.style.top = "-70px"; // 默认首页 top 为 -75px
});

// 页面加载时初始化一次
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const submenu = document.querySelector(".submenu");

  header.classList.add("dark-nav"); // 首页默认深色
  submenu.classList.add("dark-menu"); // 首页默认深色
});

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".submenu .menu a");
  const navLinks = document.querySelectorAll(".site-header nav ul li a");

  // 点击导航栏标题时同步激活状态
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // 移除所有 active 类
      navLinks.forEach((a) => a.classList.remove("active"));

      // 给当前点击的标题添加 active
      this.classList.add("active");
    });
  });

  // 点击子菜单项时同步激活导航栏标题
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const parentMenu = this.closest(".menu");
      const menuType = parentMenu.dataset.menu;

      // 移除所有 active 类
      navLinks.forEach((a) => a.classList.remove("active"));

      // 找到对应导航项并添加 active
      const targetLink = document.querySelector(`.${menuType} a`);
      if (targetLink) {
        targetLink.classList.add("active");
      }
    });
  });

  // toTop 按钮显示/隐藏与滚动到顶部（支持 swiper 和普通页面）
  const toTopBtn = document.querySelector(".toTop");
  if (toTopBtn) {
    // 设置样式（如未设置）
    // toTopBtn.style.position = "fixed";
    // toTopBtn.style.right = "30px";
    // toTopBtn.style.bottom = "30px";
    // toTopBtn.style.width = "40px";
    // toTopBtn.style.height = "40px";
    // toTopBtn.style.cursor = "pointer";
    // toTopBtn.style.display = "none";
    // toTopBtn.style.zIndex = "999";
    // toTopBtn.style.background =
    //   "url('../images/toTop.svg') no-repeat center/contain";

    // swiper 场景
    if (window.mySwipermain) {
      window.mySwipermain.on("slideChange", function () {
        if (this.activeIndex > 0) {
          toTopBtn.style.bottom = "60px";
          toTopBtn.style.opacity = "1";
        } else {
          toTopBtn.style.bottom = "-40px";
          toTopBtn.style.opacity = "0.01";
        }
      });
      toTopBtn.onclick = function () {
        window.mySwipermain.slideTo(0, 600);
      };
    } else {
      // 普通页面滚动
      window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
          toTopBtn.style.bottom = "60px";
          toTopBtn.style.opacity = "1";
        } else {
          toTopBtn.style.bottom = "-40px";
          toTopBtn.style.opacity = "0.01";
        }
      });
      toTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    }
  } else {
    console.log(".toTop 按钮未找到");
  }
});






const btn = document.getElementById('siteMapBtn');
const modal = document.getElementById('siteMapModal');
const content = document.getElementById('siteMapContent');
let timer = null;

function showModal() {
  clearTimeout(timer);
  modal.style.display = 'flex';
}

function hideModal() {
  timer = setTimeout(() => {
    modal.style.display = 'none';
  }, 100); // 延迟隐藏，避免闪烁
}

btn.addEventListener('mouseenter', showModal);
btn.addEventListener('mouseleave', hideModal);
content.addEventListener('mouseenter', showModal);
content.addEventListener('mouseleave', hideModal);