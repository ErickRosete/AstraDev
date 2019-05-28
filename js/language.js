$(document).ready(function () {
    $('#language-select').on('change', function () {
        setLanguage(this.value)
    });

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        getLanguage();
    }

    function getLanguage() {
        let selectedLang = localStorage.getItem('language');

        $.getJSON(`language/${selectedLang}.json`, function (lang) {
            if (selectedLang != $("#language-select").val()) {
                $("#language-select").val(selectedLang);
            }
            populateText(lang);
        });
    }

    function languageLookUp() {
        const navLang = navigator.language.split('-')[0].toLowerCase();
        if (navLang == 'es') {
            setLanguage('es');
        } else {
            $.ajax('http://ip-api.com/json')
                .then(
                    function success(response) {
                        if (response.countryCode.toLowerCase() == 'mx') {
                            setLanguage("es")
                        }
                        else {
                            setLanguage("en")
                        }
                    },

                    function fail(data, status) {
                        console.log('Request failed.  Returned status of', status);
                        setLanguage("en")
                    }
                );
        }
    }

    function populateText(language) {
        //populate nav-menu
        for (let name in language.nav) {
            $(`.nav-menu #${name}-link`).html(language.nav[name]);
        }
        //populate intro
        for (let name in language.intro) {
            $(`#intro #intro-${name}`).html(language.intro[name]);
        }
        //populate about
        for (let name in language.about) {
            $(`#about #about-${name}`).html(language.about[name]);
        }
        //populate specialty
        for (let name in language.specialty) {
            $(`#specialty #specialty-${name}`).html(language.specialty[name]);
        }
        for (let categoryName in language.categories) {
            for (let name in language.categories[categoryName]) {
                $(`#specialty #${categoryName}-category .${name}`).html(language.categories[categoryName][name]);
            }
        }
        //populate process
        for (let name in language.process) {
            $(`#process #process-${name}`).html(language.process[name]);
        }
    }

    //document ready 
    if (localStorage.getItem('language') == null) {
        languageLookUp();
    } else {
        getLanguage();
    }
});