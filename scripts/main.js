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
// show Popper tooltip when width >=48rem
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

//////////////////////////////////////////////////////////////////////////
//
// change button state to active when clicked, and back
buttonShare.addEventListener("click", () => {
  const isShown = tooltip.hasAttribute("data-show");

  if (!isShown) {
    tooltip.setAttribute("data-show", "");
    buttonShare.classList.add("is-active");
    popperInstance.update();
  } else {
    tooltip.removeAttribute("data-show");
    buttonShare.classList.remove("is-active");
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
