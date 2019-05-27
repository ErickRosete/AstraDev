$(document).ready(function () {
    let language;
    function getLanguage() {
        let selectedLang = localStorage.getItem('language');
        if (selectedLang == null) {
            setLanguage('en');
            selectedLang = 'en';
        }

        $.getJSON(`language/${selectedLang}.json`, function (lang) {
            console.log(lang)
        });
    }

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
    }

    function ipLookUp() {
        $.ajax('http://ip-api.com/json')
            .then(
                function success(response) {
                    if (response.countryCode.toUpperCase() == 'MX') {
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

    function populateText() {
        console.log("Llenando Textos");
        console.log(language)
    }


    ipLookUp();
    getLanguage();
    populateText();
});