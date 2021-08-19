$(document).ready(function () {
    

    
    // const body = document.querySelector('body')


    // window.addEventListener( "scroll", function() {
    //  var st = window.pageYOffset;

    //     if (st > 300) {
    //       document.querySelector(".header").classList.add("scroll");
    //     } else {

    //         document.querySelector(".header").classList.remove("scroll");
    //     }
    // });


    function slidesPlugins(activeSlide) {
        const slides = document.querySelectorAll('.slider__item');
        const topSlider = document.querySelector('.slider__top');
        const topSliderImg = document.querySelector('.slider__top img');
        slides[activeSlide].classList.add('active');

        for (const slide of slides) {
            slide.addEventListener('click', () => {
                let imgAttr = slide.getAttribute('data-img');
                topSliderImg.src = `images/content/top-slider/${imgAttr}`;
                clearActiveClasses();
            
                slide.classList.add('active');
                topSlider.classList.add('active');
            
                function addClassTopSlider() {
                    topSlider.classList.remove('active');
                }
                setTimeout((addClassTopSlider), 500);
            });
        }
    
        function clearActiveClasses() {
            slides.forEach(element => {
                element.classList.remove('active');
            });
        }
    }
    slidesPlugins(0);

    // mixitup

    var mixer = mixitup('.portfolio__items');
    
});