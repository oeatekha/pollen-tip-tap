import collect from "collect.js";
// store filters as a state of array that contains a list of multiple filters
// each filter is an array of arrays
// f = [ [ ["t", "music"], [d], [s, 34], ] , [ ["t", "music"], [d], [s, 34], ]
// filter keys: t = type, d = date, s = search (content, authors), a = author, i = inertia
// sort keys: d = date, s = support, t = typedata (music, video, text, etc)
// sort = [["date", 0], ["support", 1], ["typedata", 0]]

export function filter(channel, filters) {
    let tempChannel = channel;
  
    // Given an array of filters loop per filter and apply the filter, and return the filtered channel
    if (!Array.isArray(filters) || !filters.length) {
      return tempChannel;
    }
  
    let filterLength = filters.length;
    for (let i = 0; i < filterLength; i++) {
      let currentFilter = filters[i];
      let filter = currentFilter[0]; // Filter: [ ["type", "music"], [d], [s, 34], ]
      switch (filter) {
        // Do i need the break bc break breaks the switch statement? or does it break the loop?
        case "type":
            console.log("Filter By Type");
            let curType = currentFilter[1];
            tempChannel = filterType(curType);
            console.log(tempChannel)
            break;
        case "author":
            console.log("Filter By Author");
            let curAuthor = currentFilter[1];
            tempChannel = filterAuthor(tempChannel, curAuthor);
            break;
        case "date":
            console.log("Filter By Date");
            tempChannel = filterDate(tempChannel);
            break;
        case "search":
            console.log("Filter By Search");
            let search = currentFilter[1];
            tempChannel = filterSearch(tempChannel, search);
            break;
        case "support":
            console.log("Filter By Support");
            tempChannel = filterSupport(tempChannel);
            break;
        default:
            break;
      }
    }
    return tempChannel;
}
  
export function sorter(channel, sort, direction) {
// Filter: s, d
// s = sort type
// d = direction
    let tempChannel = channel;
    console.log("run sorted")
    console.log(sort)
    // If there are not sorting values we dont return anything...

    switch (sort) {
        case "date":
            console.log("Sort By Date");
            tempChannel = sortDate(channel, direction);
            return tempChannel;
        case "type":
            console.log("Sort By Type");
            tempChannel = sortType(channel, direction);
            return tempChannel;
        case "author":
            console.log("Sort By Author");
            tempChannel = sortAuthor(channel, direction);
            return tempChannel;
        case "support":
            console.log("Sort By Support");
            tempChannel = sortSupport(channel, direction);
            return tempChannel;
        default:
            return tempChannel;
        // code block
    }
}

function filterSearch(channel, search) {
    // Filter Search
    // Let's search by content and author
    // Convert the channel to an array and then filter it by the search
    let search_filtered = channel.filter((a) => a.content.includes(search) || a.author.includes(search));   
    // Return the filtered channel as a collect.js object
    return collect(search_filtered);
}
  
function filterType(type, channel) {
    // Filter Type
    let type_filtered = channel.filter((a) => a.type === type);
    return type_filtered;
}

function filterAuthor(channel, author) {
    let author_filtered = channel.filter((a) => a.author === author);
    return author_filtered;
}
  
function filterDate( channel, startDate = this.created_at, endDate = Math.floor(Date.now() / 1000)) {
    // Filters Channel Depending on  the startdate and last updated
    let date_filtered = channel.filter((a) => a.updated_at > startDate && a.updated_at < endDate);
    return date_filtered;
}
  
function filterSupport(channel, support) {
    // Filter Support that is greater than the support value
    let support_filtered = channel.filter((a) => a.support > support);
    return support_filtered;
}

// Sorting
function sortAuthor(channel, direction) {
    // Sort by author using collect.js 
    if (direction === 0) {
        console.log("Sort By Author")
        return channel.sort((a, b) => (a.author > b.author) ? 1 : -1)
    }
    else {
        return channel.sort((a, b) => (a.author < b.author) ? 1 : -1)
    }
}

function sortType(channel, direction) {
    // Sort by type using collect.js
    if (direction === 0) {
        return channel.sort((a, b) => (a.type > b.type) ? 1 : -1)
    } 
    else {
        return channel.sort((a, b) => (a.type < b.type) ? 1 : -1)
    }
}

function sortDate(channel, direction) {
// Filters Channel Depending on  the startdate and last updated  // Order Switch
    if (direction === 0) {
        return channel.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    }
    else {
        return channel.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
    }
}
  
function sortSupport(channel, direction) {
// Order Switch
    if (direction === 0) {  
        return channel.sort((a, b) => (a.support > b.support) ? 1 : -1)
    }
    else {
        return channel.sort((a, b) => (a.support < b.support) ? 1 : -1)
    }
}