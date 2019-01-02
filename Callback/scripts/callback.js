function handlesCallbackError(err) {
    console.log(err);
    throw new Error(err);
}
function loadImageCallback(url, elem, callback) {
    var image = new Image();
    image.onload = function () { callback(null, image, elem); };
    image.onerror = function () { callback(new Error('Could not load image at ' + url)); };
    image.src = url;
}
let callbackF = function (error, image, elem) {
    if (error) {
        handlesCallbackError(error);
    }
    elem.appendChild(image);
};
function appendImageCallback(elem, url) {
    loadImageCallback(url, elem, callbackF);
}
//# sourceMappingURL=callback.js.map