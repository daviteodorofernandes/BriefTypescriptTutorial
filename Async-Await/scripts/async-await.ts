
function handlesErrorAsync(error : string){
    console.log(error);
  }

async function appendImageAsync(elem: HTMLElement, url: string) {
    try {
        // This async call may fail.
        let result = await loadImageAsync(url, elem);
    }
    catch(error) {
        // If it does we will catch the error here.
        handlesErrorAsync(error);
    }  
}


function loadImageAsync(url: string, elem: HTMLElement) {
    var image = new Image();

    image.onload = function() { elem.appendChild(image); };
    image.onerror = function() { handlesErrorAsync('Could not load image at ' + url); };
    image.src = url;
}
