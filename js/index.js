$(function () {
    let topSpace = 40;
    if (window.innerWidth < 600) {
        topSpace = 30
        // $('section').css({ 'min-height': `${window.innerHeight}px` });
        // $('section.two-mb-screens').css({ 'min-height': `${2 * window.innerHeight}px` });
    }

    $("#project .filter-btn").click(function () {
        $(".filter-btn.selected").removeClass("selected");
        const selectedBtn = $(this);
        selectedBtn.addClass("selected");
    });

    let scrollComplete = true;
    const scrollToScreen = (delta) => {
        if (scrollComplete) {
            scrollComplete = false;
            //Calculate next position
            const currentScreen = Math.round(($(window).scrollTop() + topSpace) / window.innerHeight);
            const nextPos = (currentScreen + delta) * window.innerHeight - topSpace;

            // animate
            $('html, body').animate({ scrollTop: nextPos }, 1250, 'easeInOutExpo', () => {
                scrollComplete = true;
                // setTimeout(() => scrollComplete = true, 300);
            });

        }
    }
    // Scroll in mobile device
    if (window.innerWidth < 1000) {
        // let ts;
        // window.addEventListener("touchstart", e => {
        //     ts = e.touches[0].clientY;
        // });

        // window.addEventListener("touchend", e => {
        //     var te = e.changedTouches[0].clientY;
        //     if (ts > te + 5 || ts < te - 5) {
        //         const delta = Math.sign(ts - te); // -1 -> up | 1 -> down
        //         scrollToScreen(delta);
        //     }
        // });

        // const touchMoveListener = (e) => e.preventDefault();
        // window.addEventListener("touchmove", touchMoveListener, { passive: false });

        // //allow scroll on modal
        // $('.modal').on('shown.bs.modal', function () {
        //     window.removeEventListener("touchmove", touchMoveListener);
        // })
        // $('.modal').on('hidden.bs.modal	', function () {
        //     window.addEventListener("touchmove", touchMoveListener, { passive: false });
        // })

    } else {
        window.addEventListener("wheel", event => {
            event.preventDefault();
            //medium to strong scroll
            if (event.deltaY > 40 || event.deltaY < -40) {
                const delta = Math.sign(event.deltaY); // -1 -> up | 1 -> down
                scrollToScreen(delta)
            }
        }, { passive: false });
    }

    $("#page-nav a").click(function () {
        // $("#page-nav a.selected").removeClass("selected");
        const selected = $(this);
        // selected.addClass("selected");
        const aid = selected.attr("href");
        const nextPos = $(aid).offset().top - topSpace;
        $('html,body').animate({ scrollTop: nextPos }, 750, 'easeInOutExpo');

    });
    $(window).scroll(function () {
        //right nav
        const currentScreen = Math.round(($(window).scrollTop() + topSpace) / window.innerHeight);
        const pageNavArray = $("#page-nav a");
        pageNavArray.removeClass("selected");
        $(pageNavArray[currentScreen]).addClass("selected");
        const aid = $(pageNavArray[currentScreen]).attr("href");
        //main navbar
        $(".nav-menu li.menu-active").removeClass("menu-active");
        $(`.nav-menu a[href="${aid}"]`).closest("li").addClass("menu-active")
    });


});

