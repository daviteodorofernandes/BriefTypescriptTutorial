function loadImagePromises(url : string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.addEventListener('load', e => resolve(img));
      img.addEventListener('error', () => {
        reject(new Error("Failed to load image's URL: ${url}"));
      });
      img.src = url;
    });
  }

function handlesErrorPromises(error : string){
  console.error(error);
}

function appendImagePromises(elem:HTMLElement, url : string)
{
  loadImagePromises(url).then((img : Node) => elem.appendChild(img))
  .catch(error => handlesErrorPromises(error));  
}

