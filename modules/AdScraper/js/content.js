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

window.registerModuleCallback(function (config) {

  /*
   * Google Search
  */

  // if (locationFilterMatches(window.location, "https://www.google.com/",)) {
  const adsContainer = document.querySelectorAll('[aria-label="Ads"]')
  // console.log(adsContainer)
  if (adsContainer.length > 0) {
    adsContainer.forEach((e) => {
      const headerList = e.querySelectorAll('[class="sVXRqc"]')
      if (headerList.length > 0) {
        headerList.forEach((header) => {
          // console.log(header)
          const adsDescription = header.querySelector('[class="CCgQ5 vCa9Yd QfkTvb MUxGbd v0nnCb"]')
          const supplier = adsDescription.querySelector("span")?.innerText
          console.log("Header/Supplier: " + supplier)
          const productURL = header?.href
          console.log("Product URL: " + productURL)
        })
      }
    }
    )
  }

  /*
   * Ads container on the side
  */

  const adsSideContainer = document.querySelectorAll(".cu-container")
  adsSideContainer.forEach((e) => {
    const adsList = e.querySelectorAll('[class="mnr-c pla-unit"]')
    /*
     * This section capture Google Ad banner with photos
    */
    if (adsList.length > 0) {
      adsList.forEach((al) => {
        const adsDescription = al.querySelector('[class="pla-unit-container"]')
        const supplier = adsDescription.querySelector('[class="rhsg3 rhsl5 zPEcBd"], [class="zPEcBd VZqTOd"]')?.innerText
        console.log("Supplier: " + supplier)
        const image = al.querySelector("[alt^='Image of']")
        const imageURL = image.src
        console.log("Image URL: " + imageURL)
        const imageHeight = image.height
        console.log("Image height: " + imageHeight)
        const imageWidth = image.width
        console.log("Image width: " + imageWidth)
        const imagePosX = image.offsetLeft
        console.log("Image X-coordinate: " + imagePosX)
        const productURL = al.querySelector('[class="plantl pla-unit-title-link"]')?.href
        console.log("Product URL: " + productURL)
      })
    }
  })
  // }

  /*
   * Amazon Search
   */

  // if (locationFilterMatches(window.location, "https://www.amazon.com/")) {

  /* Scraping ads at the top container   */
  const sponsoredTop = document.querySelectorAll('[class="_bGlmZ_container_GMk6b sbx-desktop"]')
  if (sponsoredTop.length > 0) {

    sponsoredTop.forEach((e) => {

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

  const sponsoredBottom = document.querySelectorAll('[class="a-section a-spacing-base a-spacing-top-base"]')
  if (sponsoredBottom.length > 0) {

    sponsoredBottom.forEach((e) => {
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
  // }
  /*
 * Scraping ads inside the search reult
 */

  const sponsored = document.querySelectorAll('[alt^="Sponsored Ad"]')
  sponsored.forEach((e) => {
    const title = e['alt']
    console.log("[Amazon Search (within search)] Supplier and product description: " + title)
    const imageURL = e.src
    console.log("[Amazon Search (within search)] Image URL: " + imageURL)
  })
})

