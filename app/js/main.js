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
    
    //accordeon
    
    const accordeons = document.querySelectorAll('.steps__item');
    for (let item = 0; item < accordeons.length; item++) {
        
        accordeons[item].addEventListener('click', () => {
            for (let x = 0; x < accordeons.length; x++){
                accordeons[x].classList.remove('active')
            };
            
            accordeons[item].classList.toggle('active');
        });
    };
    
    var mySwiper = new Swiper('.swiper', {
    
});
});
