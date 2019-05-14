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
            const height = $(window).height();
            const currentScroll = $(window).scrollTop();
            const currentScreen = Math.trunc((currentScroll + 70) / height);
            const delta = Math.sign(event.deltaY); // -1 -> up | 1 -> down
            const nextPos = (currentScreen + delta) * height - 70;

            //animate
            $('html, body').animate({ scrollTop: nextPos }, 750, 'easeInOutExpo', () => {
                scrollComplete = true;
            });
        }
    }, { passive: false });

    $("#page-nav a").click(function () {
        $("#page-nav a.selected").removeClass("selected");
        const selected = $(this);
        selected.addClass("selected");
        const aid = selected.attr("href");
        const nextPos = $(aid).offset().top - 70;
        $('html,body').animate({ scrollTop: nextPos }, 750, 'easeInOutExpo');

    });
});

