const buttonShare = document.getElementById("share-button");
const tooltip = document.getElementById("tooltip");

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// initial tooltip settings
const settings = {
  placement: "top",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 32],
      },
    },
  ],
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// show tooltip logic
function showTooltip() {
  tooltip.setAttribute("data-show", "");
  buttonShare.classList.add("is-active");

  const markup = `
<p class="c-font_preset-4">Share</p>
<div class="o-flex_row u-flex_gap:1rem">
  <button class="c-button_small" id="fb-button" type="button">
    <svg class="c-icon_button:tooltip" height="20" width="20">
      <use href="./images/icons.svg#icon-facebook" />
    </svg>
  </button>
  <button class="c-button_small" id="tw-button" type="button">
    <svg class="c-icon_button:tooltip" height="20" width="20">
      <use href="./images/icons.svg#icon-twitter" />
    </svg>
  </button>
  <button class="c-button_small" id="pi-button" type="button">
    <svg class="c-icon_button:tooltip" height="20" width="20">
      <use href="./images/icons.svg#icon-pinterest" />
    </svg>
  </button>
</div>
<div id="arrow" data-popper-arrow></div>
`;

  tooltip.insertAdjacentHTML("beforeend", markup);

  // important part! points arrow to button, which called the tooltip
  const arrowElement = tooltip.querySelector("[data-popper-arrow]");
  popperInstance.setOptions({
    placement: "top",
    modifiers: [
      { name: "offset", options: { offset: [0, 32] } },
      { name: "arrow", options: { element: arrowElement } },
    ],
  });

  popperInstance.update();
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// hide tooltip logic
function hideTooltip() {
  tooltip.removeAttribute("data-show");
  tooltip.innerHTML = "";
  buttonShare.classList.remove("is-active");
  buttonShare.blur();
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// show tooltip when screen width is >= 48rem
const minWidth48rem = window.matchMedia("(min-width: 48rem)");
let popperInstance = null;

function handleWidth(e) {
  if (e.matches && popperInstance === null) {
    popperInstance = Popper.createPopper(buttonShare, tooltip, settings);
  } else if (!e.matches && popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}
minWidth48rem.addEventListener("change", handleWidth);
handleWidth(minWidth48rem);

buttonShare.addEventListener("click", () => {
  const isShown = tooltip.hasAttribute("data-show");

  if (!isShown) showTooltip();
  else hideTooltip();
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// hide tooltip when clicked outside button or tooltip
document.addEventListener("click", (e) => {
  if (tooltip.hasAttribute("data-show") && !buttonShare.contains(e.target) && !tooltip.contains(e.target)) {
    hideTooltip();
  }
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// ESC key logic
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && tooltip.hasAttribute("data-show")) {
    hideTooltip();
  }
});
