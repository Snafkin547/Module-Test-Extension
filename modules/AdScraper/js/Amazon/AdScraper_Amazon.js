/* global chrome */

function ltrim(str) {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
}

function getBetween(str, str_a, str_b) {
    const substring = str.match(str_a + '(.*)' + str_b)[0];
    const res = substring.replace('from', '').replace('. "', '');
    if (res[0] == "") return ltrim(res)
    return res
}

/*
 * Scraping ads at the top container
 */

const topAds = document.querySelectorAll('[class="_bGlmZ_container_GMk6b sbx-desktop"]')
if (topAds.length > 0) {

    topAds.forEach((e) => {

        const sponsored_Large = e.querySelector('[aria-label^="Sponsored ad from"]')
        const sponsored_Ad = sponsored_Large.attributes
        const title = sponsored_Ad["aria-label"].textContent
        const supplier = getBetween(title, 'from', '. "');

        const largeImg = e.querySelector('[class="_bGlmZ_image_1dPQY"]')
        const img_elem = largeImg.querySelector('img')
        const imageURL = img_elem.src
        const imageSize = img_elem.sizes
        console.log("[Amazon Search (Top)] Supplier: " + supplier)
        console.log("[Amazon Search (Top)] Image URL: " + imageURL)
        console.log("[Amazon Search (Top)] Image Size: " + imageSize)



        const sponsoredSmall = e.querySelectorAll('[class="_bGlmZ_item_awNhH"]')
        sponsoredSmall.forEach((e2) => {
            const img_elem = e2.querySelector('img')
            const imageURL = img_elem.src
            const imageSize = img_elem.sizes
            console.log("[Amazon Search (Top)] Supplier: " + supplier)
            console.log("[Amazon Search (Top)] Image URL: " + imageURL)
            console.log("[Amazon Search (Top)] Image Size: " + imageSize)
        })
    })
}

/*
 * Scraping ads at the bottom container
 */

const bottomAds = document.querySelectorAll('[class="a-section a-spacing-base a-spacing-top-base"]')
if (bottomAds.length > 0) {

    bottomAds.forEach((e) => {
        const sponsored = e.querySelectorAll('[class="_bXVsd_container_3aZDQ"]')
        sponsored.forEach((e2) => {
            const img_elem = e2.querySelector('img')
            const title = img_elem['alt']
            const supplier = getBetween(title, 'from', '. "');
            console.log("[Amazon Search (Bottom)] Supplier: " + supplier)
            const imageURL = img_elem.src
            console.log("[Amazon Search (Bottom)] Image URL: " + imageURL)
        })
    })
}

/*
 * Scraping ads inside the search reult
 * It did not contain supplier name itself, only description in title
 */

const withinSearch = document.querySelectorAll('[alt^="Sponsored Ad"]')
withinSearch.forEach((e) => {
    const title = e['alt']
    console.log("[Amazon Search (within search)] Supplier and product description: " + title)
    const imageURL = e.src
    console.log("[Amazon Search (within search)] Image URL: " + imageURL)
})

/*
 * Scraping a big section betweem the search reult
 */

const withVideo = document.querySelectorAll('[aria-label^="Sponsored video"]')
withVideo.forEach((e) => {
    const imgURL = e['href']
    console.log("[Amazon Search (between search) Image URL: " + imgURL)
    const videoURLs = e.querySelectorAll('video')
    videoURLs.forEach((v) => {
        const videopreview = v['poster']
        const videoURL = v['src']
        console.log("[Amazon Search (between search)] Video Preview URL: " + videopreview)
        console.log("[Amazon Search (between search)] Video URL: " + videoURL)
    })
})

/*
 * Scraping vertical side ads
 */

const verticalSideAds = document.querySelectorAll('[aria-label^="Sponsored video"]')
verticalSideAds.forEach((e) => {
    const imgURL = e['href']
    console.log("[Amazon Search (between search) Image URL: " + imgURL)
    const videoURLs = e.querySelectorAll('video')
    videoURLs.forEach((v) => {
        const videopreview = v['poster']
        const videoURL = v['src']
        console.log("[Amazon Search (between search)] Video Preview URL: " + videopreview)
        console.log("[Amazon Search (between search)] Video URL: " + videoURL)
    })
})

