// 兼容全局 Swiper
const SwiperClass = window.Swiper || Swiper;


document.addEventListener("DOMContentLoaded", function () {
  const bottomBtn = document.querySelector(".bottomBtn a");

  // Swiper主实例，暴露到window，供其他脚本访问
  window.mySwipermain = new SwiperClass(".swiper-main", {
    direction: "vertical", // 垂直切换选项
    mousewheel: true, // 如果有这一行，请注意是否影响了页面滚动
    nested: true, // 允许嵌套
    slidesPerView: 'auto', // 自动适应视窗
    on: {
      slideChange: function () {
        const whiteBgElements = document.querySelectorAll(".white-bg");
        const isOnFirstSlide = this.activeIndex === 0;
        const header = document.querySelector(".site-header");
        const submenu = document.querySelector(".submenu");

        whiteBgElements.forEach((el) => {
          el.style.top = isOnFirstSlide ? "-70px" : "0";
        });

        if (this.activeIndex === 0) {
          // 第一页：深色主题
          header.classList.add("dark-nav");
          header.classList.remove("white-nav");

          submenu.classList.remove("white-bg");
          submenu.classList.add("dark-menu");
          submenu.classList.remove("white-menu");
        } else {
          // 其它页面：白色主题
          header.classList.add("white-nav");
          header.classList.remove("dark-nav");

          submenu.classList.add("white-bg", "white-menu");
          submenu.classList.remove("dark-menu");
        }

        // 当滑动到第二个页面时触发动画
        if (this.activeIndex === 1) {
          // 使用setTimeout确保DOM更新
          setTimeout(resetAnimations, 50);
        }
        // 控制bottomBtn显示/隐藏
        const bottomBtnWrap = document.querySelector(".bottomBtn");
        if (bottomBtnWrap) {
          if (this.activeIndex === this.slides.length - 2) {
            bottomBtnWrap.style.display = "none";
          } else {
            bottomBtnWrap.style.display = "";
          }
        }
      },
      init: function () {
        // 初始化时检查是否在第二页
        if (this.activeIndex === 1) {
          resetAnimations();
        }
      },
    },
  });

  if (bottomBtn) {
    console.log("bottomBtn found:", bottomBtn);
    bottomBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("bottomBtn clicked");
      mySwipermain.slideNext();
    });
  } else {
    console.log("bottomBtn not found");
  }
});

const myBannerSwiper1 = new SwiperClass(".banner1-swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const myBannerSwiper2 = new SwiperClass(".banner2-swiper", {
  direction: "horizontal",
  loop: true,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});


