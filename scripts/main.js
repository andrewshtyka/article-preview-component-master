const buttonShare = document.getElementById("share-button");
const tooltip = document.getElementById("tooltip");

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

//////////////////////////////////////////////////////////////////////////
//
// Show Popper tooltip when width >=48rem
const minWidth48rem = window.matchMedia("(min-width: 48rem)");
let popperInstance = null;

function handleWidth(e) {
  if (e.matches && !popperInstance) {
    popperInstance = Popper.createPopper(buttonShare, tooltip, settings);
  } else if (!e.matches && popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

minWidth48rem.addEventListener("change", handleWidth);
handleWidth(minWidth48rem);

//////////////////////////////////////////////////////////////////////////
//
// tooltip main logic
function show() {
  tooltip.setAttribute("data-show", "");
  buttonShare.classList.add("is-active");

  popperInstance.update();
}

function hide() {
  tooltip.removeAttribute("data-show");
  buttonShare.classList.remove("is-active");
}

//////////////////////////////////////////////////////////////////////////
//
// change button state to active when clicked
buttonShare.addEventListener("click", () => {
  const isShown = tooltip.hasAttribute("data-show");

  if (isShown) {
    tooltip.removeAttribute("data-show");
    buttonShare.classList.remove("is-active");
  } else {
    tooltip.setAttribute("data-show", "");
    buttonShare.classList.add("is-active");
    popperInstance.update();
  }
});

//////////////////////////////////////////////////////////////////////////
//
// hide tooltip when clicked outside button or tooltip
document.addEventListener("click", (e) => {
  if (tooltip.hasAttribute("data-show") && !buttonShare.contains(e.target) && !tooltip.contains(e.target)) {
    tooltip.removeAttribute("data-show");
    buttonShare.classList.remove("is-active");
  }
});
