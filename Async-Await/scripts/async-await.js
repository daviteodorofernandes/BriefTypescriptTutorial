var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function handlesErrorAsync(error) {
    console.log(error);
}
function appendImageAsync(elem, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // This async call may fail.
            let result = yield loadImageAsync(url, elem);
        }
        catch (error) {
            // If it does we will catch the error here.
            handlesErrorAsync(error);
        }
    });
}
function loadImageAsync(url, elem) {
    var image = new Image();
    image.onload = function () { elem.appendChild(image); };
    image.onerror = function () { handlesErrorAsync('Could not load image at ' + url); };
    image.src = url;
}
//# sourceMappingURL=async-await.js.map