function loadImagePromises(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.addEventListener('load', e => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error("Failed to load image's URL: ${url}"));
        });
        img.src = url;
    });
}
function handlesErrorPromises(error) {
    console.error(error);
}
function appendImagePromises(elem, url) {
    loadImagePromises(url).then((img) => elem.appendChild(img))
        .catch(error => handlesErrorPromises(error));
}
//# sourceMappingURL=promises.js.map