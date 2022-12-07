/* global registerCustomModule */

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.generator === 'Ad-Scraper') {
            console.log('[Ad Scraper] Recording HTML Elements.')
            console.log("You are seeing html of " + request.payload.url)
            const html = request.payload.html
            console.log("HTML: " + html)
            const ads = request.payload.ads
            var htmlObject = $(ads); // jquery call
            console.log("We found ads " + htmlObject)
        }
    }
);
const recordHTML = function (request, sender, sendResponse) {

}


registerCustomModule(function (config) {
    console.log('[Ad Scraper] Service worker initialized.')
    registerMessageHandler('Ad_scraper', recordHTML)
})


