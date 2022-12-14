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
          const supplier = adsDescription?.querySelector("span")?.innerText
          console.log("[Google Search] Header/Supplier: " + supplier)
          const productURL = header?.href
          console.log("[Google Search] Product URL: " + productURL)

          chrome.runtime.sendMessage({
            content: 'record_Ads',
            url: window.location.href,
            pageTitle: document.title,
            supplier: supplier,
            productURL: productURL,
            imgURL: '',
            adsDescription: '',
            imageHeight: '',
            imageWidth: '',
            imageSize: '',
            videopreview: '',
            videoURL: '',
          })
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
          const productURL = al.querySelector('[class="plantl pla-unit-title-link"]')?.href
          console.log("[Google Search] Product URL: " + productURL)

          chrome.runtime.sendMessage({
            content: 'record_Ads',
            url: window.location.href,
            pageTitle: document.title,
            supplier: supplier,
            productURL: productURL,
            imgURL: imageURL,
            adsDescription: '',
            imageHeight: imageHeight,
            imageWidth: imageWidth,
            imageSize: '',
            videopreview: '',
            videoURL: '',
          })
        })
      }
    })
  }

  /*
   * Amazon Search
   */

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

      chrome.runtime.sendMessage({
        content: 'record_Ads',
        url: window.location.href,
        pageTitle: document.title,
        supplier: supplier,
        productURL: '',
        imgURL: imageURL,
        adsDescription: '',
        imageHeight: '',
        imageWidth: '',
        imageSize: imageSize,
        videopreview: '',
        videoURL: '',
      })

      const sponsoredSmall = e.querySelectorAll('[class="_bGlmZ_item_awNhH"]')
      sponsoredSmall.forEach((e2) => {
        const img_elem = e2.querySelector('img')
        const imageURL = img_elem.src
        const imageSize = img_elem.sizes
        console.log("[Amazon Search (Top)] Supplier: " + supplier)
        console.log("[Amazon Search (Top)] Image URL: " + imageURL)
        console.log("[Amazon Search (Top)] Image Size: " + imageSize)

        chrome.runtime.sendMessage({
          content: 'record_Ads',
          url: window.location.href,
          pageTitle: document.title,
          supplier: supplier,
          productURL: '',
          imgURL: imageURL,
          adsDescription: '',
          imageHeight: '',
          imageWidth: '',
          imageSize: imageSize,
          videopreview: '',
          videoURL: '',
        })

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

        chrome.runtime.sendMessage({
          content: 'record_Ads',
          url: window.location.href,
          pageTitle: document.title,
          supplier: supplier,
          productURL: '',
          imgURL: imageURL,
          adsDescription: '',
          imageHeight: '',
          imageWidth: '',
          imageSize: '',
          videopreview: '',
          videoURL: '',
        })

      })
    })
  }

  /*
   * Scraping ads inside the search reult
   * It did not contain supplier name itself, only description in title
   */

  const withinSearch = document.querySelectorAll('[alt^="Sponsored Ad"]')
  withinSearch.forEach((e) => {
    const adsDescription = e['alt']
    console.log("[Amazon Search (within search)] Supplier and product description: " + adsDescription)
    const imageURL = e.src
    console.log("[Amazon Search (within search)] Image URL: " + imageURL)

    chrome.runtime.sendMessage({
      content: 'record_Ads',
      url: window.location.href,
      pageTitle: document.title,
      supplier: '',
      productURL: '',
      imgURL: imageURL,
      adsDescription: adsDescription,
      imageHeight: '',
      imageWidth: '',
      imageSize: '',
      videopreview: '',
      videoURL: '',
    })

  })

  /*
   * Scraping a big section betweem the search reult
   */

  const withVideo = document.querySelectorAll('[aria-label^="Sponsored video"]')
  withVideo.forEach((e) => {
    const imageURL = e['href']
    console.log("[Amazon Search (between search) Image URL: " + imageURL)
    const videoURLs = e.querySelectorAll('video')
    videoURLs.forEach((v) => {
      const videopreview = v['poster']
      const videoURL = v['src']
      console.log("[Amazon Search (between search)] Video Preview URL: " + videopreview)
      console.log("[Amazon Search (between search)] Video URL: " + videoURL)

      chrome.runtime.sendMessage({
        content: 'record_Ads',
        url: window.location.href,
        pageTitle: document.title,
        supplier: '',
        productURL: '',
        imgURL: imageURL,
        adsDescription: '',
        imageHeight: '',
        imageWidth: '',
        imageSize: '',
        videopreview: videopreview,
        videoURL: videoURL,
      })

    })
  })

  /*
   * Scraping vertical side ads (WIP)
   * No name of products/supplier and image sizes found
   */

  const verticalSideAds = document.querySelectorAll('[aria-label="Sponsored Ad"]')
  console.log(verticalSideAds)
  verticalSideAds.forEach((e) => {
    const img = e['img']
    const imageURL = img['src']
    console.log("[Amazon Search (vertical) Image URL: " + imageURL)
    chrome.runtime.sendMessage({
      content: 'record_Ads',
      url: window.location.href,
      pageTitle: document.title,
      supplier: '',
      productURL: '',
      imgURL: imageURL,
      adsDescription: '',
      imageHeight: '',
      imageWidth: '',
      imageSize: '',
      videopreview: '',
      videoURL: '',
    })
  })

  /*
   * Scraping Recommended based on your browsing history (WIP)
   * 
   */

  /*
   * Scraping Products related to this search (WIP)
   * 
   */

  /*
   * Scraping horizontal banner at the bottom (WIP)
   * 
   */
})