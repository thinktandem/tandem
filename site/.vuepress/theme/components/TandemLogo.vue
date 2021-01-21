<template>
  <div id="logo--tandem" class="logo logo--tandem">
    <svg viewBox="0 0 200 48" preserveAsopectRatio xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="logo__clip">
          <rect x="12" y="0" width="200" height="48" />
        </clipPath>
      </defs>
      <g class="circles">
        <g class="reg">
          <circle class="circle" cx="0" cy="0" r="24"/>
          <circle class="circle" cx="0" cy="0" r="24"/>
        </g>
      </g>
      <g clip-path="url(#logo__clip)">
        <path class="text" d="M12.755,15.998l-0,3.541l-4.207,0l-0,12.463l-4.386,-0l0,-12.463l-4.162,0l0,-3.541l12.755,0Zm59.61,3.564l0,2.611l5.035,-0l-0,3.382l-5.035,-0l0,2.883l5.706,-0l0,3.564l-10.092,-0l0,-16.004l10.092,0l0,3.564l-5.706,0Zm-15.932,-3.564c1.656,0 3.107,0.337 4.352,1.01c1.246,0.674 2.204,1.616 2.876,2.827c0.671,1.21 1.007,2.595 1.007,4.154c-0,1.543 -0.34,2.92 -1.018,4.131c-0.679,1.211 -1.641,2.16 -2.887,2.849c-1.246,0.689 -2.689,1.033 -4.33,1.033l-6.243,-0l0,-16.004l6.243,0Zm-10.092,16.004l-4.385,-0l-5.841,-8.944l0,8.944l-4.385,-0l-0,-16.004l4.385,0l5.841,9.058l-0,-9.058l4.385,0l0,16.004Zm-22.197,-2.611l-5.594,0l-0.85,2.611l-4.61,-0l5.751,-16.004l5.057,0l5.728,16.004l-4.632,-0l-0.85,-2.611Zm75.856,-13.393l0,16.004l-4.386,-0l0,-8.831l-2.976,8.831l-3.67,-0l-2.998,-8.899l0,8.899l-4.386,-0l0,-16.004l5.303,0l3.961,10.397l3.871,-10.397l5.281,0Zm-43.902,12.077c1.282,-0 2.289,-0.356 3.02,-1.067c0.731,-0.711 1.097,-1.718 1.097,-3.019c-0,-1.317 -0.366,-2.335 -1.097,-3.054c-0.731,-0.718 -1.738,-1.078 -3.02,-1.078l-1.522,0l-0,8.218l1.522,-0Zm-33.05,-2.089l-1.701,-5.175l-1.678,5.175l3.379,0Z" style="fill-rule:nonzero;"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'TandemLogo'
};
</script>

<style lang="stylus">

$circles-inittrans = translate(0, 24px)
$reg-inittrans = translate(0, 0)
$reg-initrot = rotate(0)
$reg-initscale = scale(0.125)

@keyframes dotin {
  0% {
    fill-opacity 0
    transform $reg-inittrans $reg-initscale
  }
  70% {
    fill-opacity .975
    transform $reg-inittrans scale(1.125)
  }
  100% {
    transform $reg-inittrans scale(1)
  }
}

@keyframes spin {
  0% {
    transform $circles-inittrans $reg-initrot
  }
  100% {
    transform $circles-inittrans rotate(360deg)
  }
}

@keyframes circa {
  0% {
    transform translateX(0)
    fill rgb(237, 63, 122)
  }
  30% {
    transform translateX(8%)
    fill rgb(237, 63, 122)
  }
  100% {
    transform translateX(0)
    fill rgb(237, 63, 122)
  }
}

@keyframes circb {
  0% {
    transform translateX(0)
    fill rgb(237, 63, 122)
  }
  30% {
    transform translateX(-8%)
    fill rgb(237, 63, 122)
  }
  100% {
    transform translateX(0)
    fill rgb(237, 63, 122)
  }
}


/*
// making two animations
// it's sadly just way easier
// https://css-tricks.com/restart-css-animation/
*/
@keyframes text {
  0% {
    transform translate(-100%, 0)
  }
  100% {
    fill-opacity 1
    transform translate(38px, 0)
  }
}
@keyframes textReverse {
  0% {
    fill-opacity 1
    transform translate(38px, 0)
  }
  100% {
    transform translate(-100%, 0)
  }
}

.logo--tandem
  { logoDimensions }
  box-sizing border-box
  svg
    width 100%
    height 100%
    overflow visible
  .circles
    transform: $circles-inittrans
    animation spin 0.5s ease-out 0.1875s 1 forwards
  .reg
    transform $reg-inittrans $reg-initscale
    animation dotin 0.425s ease-in 0s 1 forwards
  .circle
    fill rgb(237, 63, 122)
    width 24%
    height 100%
  .circle:nth-child(1)
    animation circa 1.3s 0s 1 forwards
  .circle:nth-child(2)
    animation: circb 1.3s 0s 1 forwards
  .text
    fill-opacity 0
    fill $tandemPink
    animation-name text
    animation-duration 0.75s
    animation-timing-function cubic-bezier(0.58, 0.385, 0.36, 1)
    animation-delay 0.275s
    animation-iteration-count 1
    animation-fill-mode forwards
    aniamation-direction normal
  // Below: bad form to use selectors outside the component, but alas
  .fadeout &
    .text
      fill-opacity 1
      transform translate(38px, 0)
      animation-name text
      animation-duration 0.125s
      animation-timing-function cubic-bezier(0.58, 0.385, 0.36, 1)
      animation-delay 0
      animation-iteration-count 1
      aniamation-direction reverse
  .fadeout &
    .text
      fill-opacity 1
      transform translate(38px, 0)
      animation-name textReverse
      animation-duration 0.125s
      animation-timing-function cubic-bezier(0.58, 0.385, 0.36, 1)
      animation-delay 0
      animation-iteration-count 1
      aniamation-direction reverse
</style>
