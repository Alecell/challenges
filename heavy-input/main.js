const flags = {
  rightOrigin: {
    firstBreak: false,
    secondBreak: false,
  },
  leftOrigin: {
    slided: false
  }
}

window.onload = function() {
  const rightOriginInput = document.querySelector('input.origin-right');
  const leftOriginInput = document.querySelector('input.origin-left');

  rightOriginInput.addEventListener('input', transformRightOriginInput)
  leftOriginInput.addEventListener('input', transformLeftOriginInput)
}

function transformRightOriginInput(e) {
  const el = e.target;
  const rotation = el.value.length;
  let interval = null;

  function secondBreak() {
    if (rotation > 14) {
      el.classList.add('right-broke-animation');
      flags.rightOrigin.secondBreak = true;
      clearInterval(interval)
    }
  }

  if ((rotation > 7 || flags.rightOrigin.firstBreak) && !flags.rightOrigin.secondBreak) {
    el.style.transform = `rotate(${-34}deg)`;
    flags.rightOrigin.firstBreak = true;
    interval = setInterval(secondBreak, 1000)
  } else if (rotation > 1 && !flags.rightOrigin.firstBreak) {
    el.style.transform = `rotate(${-rotation}deg)`;
  }
}

function transformLeftOriginInput(e) {
  const el = e.target;
  const rotation = el.value.length;

  el.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'padding-left') {
      el.style.transition = '.1s transform linear';
      flags.leftOrigin.slided = true;
    }
  })

  if (rotation > 17) {
    el.classList.add('left-broke-animation');
  } else if (rotation > 0 ) {
    el.style.transform = `rotate(${rotation + 2}deg)`;
    el.style.paddingLeft = `calc(100% - ${rotation+1}ch)`;
  } else if (flags.leftOrigin.slided) {
    el.style.paddingLeft = 'calc(100% - 67px)';
  }
}
