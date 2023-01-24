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

function listenClickOnAd(node, redirectURL) {
  node.addEventListener("click", () => {
    const redirectEvent = {
      host: window.location.host,
      url: window.location.href,
      redirectURL,
    };

    console.log(`Redirecting to ${redirectEvent}`);
  });
}

function sendMsg(item) {
  console.log(item);
  // chrome.runtime.sendMessage(item);
}
