/* global chrome */

function ltrim(str) {
  if (!str) return str;
  return str.replace(/^\s+/g, "");
}

function getBetween(str, str_a, str_b) {
  const substring = str.match(str_a + "(.*)" + str_b)[0];
  const res = substring.replace("from", "").replace('. "', "");
  if (res[0] == "") return ltrim(res);
  return res;
}

window.registerModuleCallback(function (config) {
  /*
   * Google Search
   */
  /*
   * Ads banner with NO photos
   */
  //   const adsBanner = document.querySelectorAll('[aria-label="Ads"]');
  //   if (adsBanner.length > 0) {
  //     adsBanner.forEach((e) => {
  //       const headerList = e.querySelectorAll('[class="sVXRqc"]');
  //       if (headerList.length > 0) {
  //         headerList.forEach((header) => {
  //           // console.log(header)
  //           const adsDescription = header.querySelector(
  //             '[class="CCgQ5 vCa9Yd QfkTvb MUxGbd v0nnCb"]'
  //           );
  //           const supplier = adsDescription?.querySelector("span")?.innerText;
  //           console.log("[Google Search] Header/Supplier: " + supplier);
  //           const productURL = header?.href;
  //           console.log("[Google Search] Product URL: " + productURL);
  //           chrome.runtime.sendMessage({
  //             content: "record_Ads",
  //             url: window.location.href,
  //             pageTitle: document.title,
  //             supplier: supplier,
  //             productURL: productURL,
  //             imgURL: "",
  //             adsDescription: "",
  //             imageHeight: "",
  //             imageWidth: "",
  //             imageSize: "",
  //             videopreview: "",
  //             videoURL: "",
  //           });
  //         });
  //       }
  //     });
  //   }
});
