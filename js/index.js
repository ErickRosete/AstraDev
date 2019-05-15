$(function () {
    $("#project .filter-btn").click(function () {
        $(".filter-btn.selected").removeClass("selected");
        const selectedBtn = $(this);
        selectedBtn.addClass("selected");
    });

    let scrollComplete = true;
    window.addEventListener("wheel", event => {
        event.preventDefault();
        if (scrollComplete) {
            scrollComplete = false;
            //Calculate next position
            const delta = Math.sign(event.deltaY); // -1 -> up | 1 -> down
            const currentScreen = Math.round(($(window).scrollTop() + 70) / $(window).height());
            const nextPos = (currentScreen + delta) * $(window).height() - 70;

            //animate
            $('html, body').animate({ scrollTop: nextPos }, 2000, 'easeInOutExpo', () => {
                scrollComplete = true;
            });
        }
    }, { passive: false });

    $("#page-nav a").click(function () {
        // $("#page-nav a.selected").removeClass("selected");
        const selected = $(this);
        // selected.addClass("selected");
        const aid = selected.attr("href");
        const nextPos = $(aid).offset().top - 70;
        $('html,body').animate({ scrollTop: nextPos }, 750, 'easeInOutExpo');

    });
    $(window).scroll(function () {
        //right nav
        const currentScreen = Math.round(($(window).scrollTop() + 70) / $(window).height());
        const pageNavArray = $("#page-nav a");
        pageNavArray.removeClass("selected");
        $(pageNavArray[currentScreen]).addClass("selected");
        const aid = $(pageNavArray[currentScreen]).attr("href");
        //main navbar
        $(".nav-menu li.menu-active").removeClass("menu-active");
        $(`.nav-menu a[href="${aid}"]`).closest("li").addClass("menu-active")
    });
});

