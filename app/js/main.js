
const body = document.querySelector('body')


window.addEventListener( "scroll", function() {
 var st = window.pageYOffset;

    if (st > 300) {
      
      document.querySelector(".header").classList.add("scroll");
    } else {

        document.querySelector(".header").classList.remove("scroll");
    }
});