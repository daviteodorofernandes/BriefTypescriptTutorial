class CImagesSources {
    get remote() {
        return this.remoteImages;
    }
    get local() {
        return this.localImages;
    }
    get all() {
        return this.allImages;
    }
    remotes(slice) {
        var first = [0, 5, 10];
        var last = [5, 10, 15];
        return this.remoteImages.slice(first[slice], last[slice]);
    }
    constructor() {
        this.remoteImages = [
            'https://static.pexels.com/photos/50988/ape-berber-monkeys-mammal-affchen-50988.jpeg',
            'https://static.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg',
            'https://static.pexels.com/photos/50988/undef.jpeg',
            'https://static.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg',
            'https://static.pexels.com/photos/213399/pexels-photo-213399.jpeg',
            'https://static.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg',
            'https://static.pexels.com/photos/50988/undef.jpeg',
            'https://static.pexels.com/photos/133459/pexels-photo-133459.jpeg',
            'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg',
            'https://images.pexels.com/photos/39571/gorilla-silverback-animal-silvery-grey-39571.jpeg',
            'https://images.pexels.com/photos/302304/pexels-photo-302304.jpeg',
            'https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg',
            'https://images.pexels.com/photos/33787/chimpanzee-sitting-sad-mammal.jpg',
            'https://static.pexels.com/photos/50988/undef.jpeg',
            'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg'
        ];
        this.localImages = [
            'images/pexels-photo-434090.jpeg',
            'images/pexels-photo-257540.jpeg',
            'images/pexels-photo-208834.jpeg',
            'images/pexels-photo-257519.jpeg'
        ];
        this.allImages = this.remoteImages.concat(this.localImages);
    }
}
//# sourceMappingURL=imgs-url.js.map