/*
 * Ads banner with NO photos
*/

const adsBanner = document.querySelectorAll('[aria-label="Ads"]')
if (adsBanner.length > 0) {

    adsBanner.forEach((e) => {
        const headerList = e.querySelectorAll('[class="sVXRqc"]')
        if (headerList.length > 0) {
            headerList.forEach((header) => {
                // console.log(header)
                const adsDescription = header.querySelector('[class="CCgQ5 vCa9Yd QfkTvb MUxGbd v0nnCb"]')
                const supplier = adsDescription.querySelector("span")?.innerText
                console.log("[Google Search] Header/Supplier: " + supplier)
                const productURL = header?.href
                console.log("[Google Search] Product URL: " + productURL)
            })
        }
    })
}

/*
 * Ads container with photos
*/

const adsContainer = document.querySelectorAll(".cu-container")
if (adsContainer.length > 0) {
    adsContainer.forEach((e) => {
        const adsList = e.querySelectorAll('[class="mnr-c pla-unit"]')
        /*
         * This section capture Google Ad banner with photos
        */
        if (adsList.length > 0) {
            adsList.forEach((al) => {
                const adsDescription = al.querySelector('[class="pla-unit-container"]')
                const supplier = adsDescription.querySelector('[class="rhsg3 rhsl5 zPEcBd"], [class="zPEcBd VZqTOd"]')?.innerText
                console.log("[Google Search] Supplier: " + supplier)

                const image = al.querySelector("[alt^='Image of']")
                const imageURL = image.src
                console.log("[Google Search] Image URL: " + imageURL)
                const imageHeight = image.height
                console.log("[Google Search] Image height: " + imageHeight)
                const imageWidth = image.width
                console.log("[Google Search] Image width: " + imageWidth)
                const imagePosX = image.offsetLeft //TODO FIXME: This isn't fetching the actual position of the image relative to the browser
                console.log("[Google Search] Image X-coordinate: " + imagePosX)
                const productURL = al.querySelector('[class="plantl pla-unit-title-link"]')?.href
                console.log("[Google Search] Product URL: " + productURL)
            })
        }
    })
}
