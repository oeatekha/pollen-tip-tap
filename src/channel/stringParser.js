export function isValidUrl(str) {
    if(!str.includes(" ") && str.includes(".")) {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!urlPattern.test(str);
    }
      // chnge ot return the paragraph, or a string indicatign the type it has...
      // add a checker to see what we do witit 
      return false
}

  // add http if not there
export function hasHTTP(str) {
    if(!str.includes("http")){
        return "http://" + str;
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
            const id = url.split('/').pop()
                if (!id) {
                    return null
                }
            return `https://www.youtube.com/embed/${id}` // adding the embed url for yout.be links
        }
        return "video";
    }
    else if(str.includes(".png") || str.includes(".jpg") || str.includes("jpeg") || str.includes("gif") || str.includes("svg") || str.includes("bmp") || str.includes("tiff")){
        return "image";
    }
    else if(str.includes("twitter") || str.includes("instagram")){
        return "social-media";
    }
    else if(str.includes("mp3") || str.includes("mp4") || str.includes("mov") || str.includes("pdf")){
        return "supported-media";
    }  
    else{
        return "link";
        // then we render a screen shot or summary of the link... if substack, we can get the content of the article
    }
}

export function contentParser(str){
    const isUrl = isValidUrl(str);
    const type = null;
    if(isUrl){
        type = urlType(str);
        str = hasHTTP(str);
    }

    else{
        type = "text";
    }

    return {type, str};
}