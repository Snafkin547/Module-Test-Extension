window.registerModuleCallback(googleScraper);

function googleScraper() {
  if (document.location.host !== "www.google.com") return;

  window.onload = function () {
    adsWithPhotos();
  };
}

/*
 * Ads container with photos
 */
function adsWithPhotos() {
  const adsContainers = document.querySelectorAll("div.cu-container");

  for (const adsContainer of adsContainers) {
    const itemList = adsContainer.querySelectorAll("div.mnr-c.pla-unit");
    for (const item of itemList) {
      const adsDescription = item
        .querySelector("div.pla-unit-title")
        .querySelector("span.pymv4e").textContent;
      const productATag = item.querySelector("a.clickable-card");
      const supplier = productATag["ariaLabel"]
        .substring(productATag["ariaLabel"].lastIndexOf("from") + 4)
        .trim();
      const productURL = productATag["href"];
      const currentPrice = extractCurrentGooglePrice(item);
      const originalPrice = extractOriginalGooglePrice(item);
      const img = item.querySelector("img");
      const imgBASE64 = img["src"];

      const listAds = {
        content: "records_Ads",
        url: window.location.href,
        pageTitle: document.title,
        supplier,
        productURL,
        currentPrice,
        originalPrice,
        imgURL: null,
        imgBASE64,
        adsDescription,
        imageHeight: img.height,
        imageWidth: img.width,
        imageSize: null,
        videoPreview: null,
        videoURL: null,
      };

      console.log(listAds);
    }
  }
}

function extractCurrentGooglePrice(node) {
  try {
    const currentPrice = node.querySelector("span.e10twf.ONTJqd").textContent;
    return Number(currentPrice.replace("$", ""));
  } catch (error) {
    return null;
  }
}

function extractOriginalGooglePrice(node) {
  try {
    const orginalPrice = node.querySelector("span.hdYIY").textContent;
    return Number(orginalPrice.replace("$", ""));
  } catch (error) {
    return null;
  }
}
