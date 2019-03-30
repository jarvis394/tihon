/* eslint-disable no-undef */
$(window).ready(() => {
  $(".sidenav").sidenav()
  $(".scrollspy").scrollSpy({ "scrollOffset": 64 })
  $(".collapsible").collapsible()
  
  const nav = () => {
    if (window.pageYOffset !== 0 && !$("nav").attr("class").split(" ").includes(el => el === "shadow"))
      $("nav").removeClass("z-depth-0"),
      $("nav").addClass("shadow")
    else
      $("nav").addClass("z-depth-0"),
      $("nav").removeClass("shadow")
    
    requestAnimationFrame(nav)
  }
  
  nav()
})