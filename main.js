setTimeout(() => {
    mainFunc()
}, 700)

async function mainFunc()
{
    // https://returnyoutubedislikeapi.com/votes?videoId=[vidid]

    const id = window.location.href.split("v=")[1]

    let dislikes = await getDislikes(id)

    dislikes = abbreviateNumber(dislikes)

    try{
        document.querySelectorAll("yt-formatted-string[class='style-scope ytd-toggle-button-renderer style-text']")[1].innerHTML = dislikes
    }catch{
        
        document.querySelectorAll("yt-formatted-string[class='style-scope ytd-toggle-button-renderer style-text']")[0].innerHTML = dislikes
    }

}


async function getDislikes(vidID)
{
    let data;
    await fetch('https://returnyoutubedislikeapi.com/votes?videoId=' + vidID)
        .then(response => response.json())
        .then(dataRes => {
            data = dataRes
        })

    return data['dislikes']
}


function abbreviateNumber(number){
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
