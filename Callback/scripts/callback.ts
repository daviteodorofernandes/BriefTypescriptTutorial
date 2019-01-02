function handlesCallbackError(err : string){
  console.log(err);
  throw new Error(err);
}

type TCallback = (url:any, image? : Node, elem?: HTMLElement) => any;

function loadImageCallback(url:string, elem: HTMLElement, callback: TCallback) {
  var image = new Image();
  
  image.onload = function() { callback(null, image, elem); };
  image.onerror = function() { callback(new Error('Could not load image at ' + url));};
  image.src = url;
}

let callbackF: TCallback = function(error: any, image: Node, elem: HTMLElement) {
  
    if (error){
      handlesCallbackError(error);
    } 
    elem.appendChild(image);
  }

 function appendImageCallback(elem: HTMLElement, url : string)
 {
   loadImageCallback(url, elem, callbackF);
 }

 
