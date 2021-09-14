
$(window).on( 'load', function() {
    gsap.utils.toArray('.gsap__left').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "-100 bottom",
                end: "-100 center",
                scrub: true,
                markers: false
            },
            x : innerWidth * -0.2,
            opacity : 0.2,
            y : innerHeight * 0.2,
            scale: 0.2
        })
    });
    gsap.utils.toArray('.gsap__right').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "center center",
                scrub: true,
                markers: false
            },
            x : innerWidth * 0.2,
            opacity : 0.2,
            scale: 0.2
        })
    });
    gsap.utils.toArray('.block__content').forEach(elem => {
        if (elem.classList.contains('from__left')) {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    markers: false
                },
                x : innerWidth * -0.2,
            })
        } else {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    markers: false
                },
                x : innerWidth * 0.2,
            })
        }
    })
});


$(document).ready(function(){
    //Open info content
    $('.block__content').click((e)=>{
        e.preventDefault();
        if(e.target.classList.contains('block_link')) {
            if(!($('.block__disc__hidden', e.target.closest('div')).is(':visible'))){
                e.target.innerHTML = 'Скрыть';
            } else {
                e.target.innerHTML = 'Читать';
            }
            e.target.classList.toggle('hide');
            $('.block__disc__hidden', e.target.closest('div')).slideToggle('slow');
        }
    });
    //WowJS plaguin
    new WOW().init();
    //popup
});
//Slick slider plaguin
$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    speed: 700,
    infinite: true,
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});    
function mobileOnlySlider() {
    $(document).ready(function(){
        setTimeout(()=> {
            $('.playlist').slick({
                slidesToShow:3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '0px',
                speed: 700,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }, 500);
    })
}

if (window.innerWidth <= 991) {
    mobileOnlySlider();
}

$(window).resize(function() {
    if(window.innerWidth <= 991) {
        if($('.playlist').hasClass('slick-initialized')) {
            return;
        }
        mobileOnlySlider();
    } else {
        if($('.playlist').hasClass('slick-initialized')) {
            $('.playlist').slick('unslick');
        } else {
            return;
        }
    }
});

