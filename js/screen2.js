// 高亮对应的左侧项目
function highlightItem(type) {
  document.getElementById(`${type}-item`).classList.add("highlight");
}

function unhighlightItem(type) {
  document.getElementById(`${type}-item`).classList.remove("highlight");
}

// 重置动画函数
function resetAnimations() {
  const charactersContainer = document.querySelector(".characters-container");
  const plumBlossom = document.querySelector(".plum-blossom");

  // 添加重置类
  charactersContainer.classList.add("reset-animation");
  plumBlossom.classList.add("reset-animation");

  // 强制重绘
  void charactersContainer.offsetWidth;
  void plumBlossom.offsetWidth;

  // 移除重置类并添加动画类
  charactersContainer.classList.remove("reset-animation");
  plumBlossom.classList.remove("reset-animation");

  charactersContainer.classList.add("animate-characters");
  plumBlossom.classList.add("animate-plum");
}
