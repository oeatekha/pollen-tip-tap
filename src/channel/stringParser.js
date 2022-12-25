export function isValidUrl(str) {
    const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return pattern.test(str);
  }

  // add http if not there
export function hasHTTP(str) {
    if (!/^https?:\/\//i.test(str)) {
        str = 'https://www.' + str;
    }
    return str;
}

export function urlType(str) {
    if(str.includes("spotify")){
        return "spotify";
    }
    if(str.includes("soundcloud")){
        return "soundcloud";
    }
    else if(str.includes("youtube") || str.includes("youtu.be") || str.includes("vimeo") || str.includes("dailymotion")){
        if (str.includes(str.includes("youtu.be") || str.includes("youtube"))){
            const id = str.split('/').pop()
                if (!id) {
                    return null
                }
            return `https://www.youtube.com/embed/${id}` // adding the embed url for yout.be links
        }
        return "video";
    }
    else if(str.includes(".png") || str.includes("jpg") || str.includes("jpeg") || str.includes("gif") || str.includes("svg") || str.includes("bmp") || str.includes("tiff")){
        return "image";
    }
    else if(str.includes("twitter")){
        return "twitter";
    }
    else if(str.includes("instagram")){
        return "instagram";
    }
    else if(str.includes("mp3") || str.includes("mp4") || str.includes("mov") || str.includes("pdf")){
        return "supported-media";
    }  
    else{
        return "link";
        // then we render a screen shot or summary of the link... if substack, we can get the content of the article
    }
}

export function contentParser(str_input){
    const isUrl = isValidUrl(str_input);
    let type = null;
    if(isUrl){
        type = urlType(str_input);
        str_input = hasHTTP(str_input);
    }

    else{
        type = "text";
    }

    return {type, str_input};
}