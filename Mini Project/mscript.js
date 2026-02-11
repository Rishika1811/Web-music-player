document.addEventListener('DOMContentLoaded', () => {

let isDefault =false;
const setinfo=async(songs,li,index,list)=>{
    // let data= await fetch(`https://v1.nocodeapi.com/xyzapi/spotify/aWdLCaiygjYnPuoK/search?q=${songs[index]}&type=track&perPage=5`);
    let c= await data.json();
    tracks= c.tracks.items;
    console.log(tracks);

    li.querySelector("img").src = tracks[0].album.images[0].url;
    li.querySelector('.pname').innerText=tracks[0].name;
    li.querySelector('.sub').innerText=tracks[0].artists[0].name;

    if (index === 0 && list === 1) {
        currentPlaylist = 1; 
        currentSongIndex = 0; 
        isDefault=true;
        playSong(); 
    }
}

document.querySelectorAll('.first .pl').forEach((li, index) => {
    list=1;
    let songs=["ishq hai","Die with a smile","sahiba","raanjhan","APT.","Millionare","peelings","aaj ki raat","Born to shine","chuttamalle","suniyan suniyan"]
    setinfo(songs,li,index,list);
});
document.querySelectorAll('.second .pl').forEach((li, index) => {
    let songs =["kesariya","raataan lambiyan","kun faya kun","tum hi ho bandhu","sooraj dooba hain","tum se hi","pehle bhi main","kalank title track","naina crew","Sajni re","iktara"]
    setinfo(songs,li,index);
});
document.querySelectorAll('.third .pl').forEach((li, index) => {
    let songs=["shape of you","Believer","faded","memories","perfect","darkside","demons","thunder","a thousand years","animals","night changes"]
    setinfo(songs,li,index);
});
let playbar = document.querySelector('.playbar');             
let player = document.getElementsByClassName('pl');
console.log(player);    
let currentSong = null; 

let masterPlay = document.getElementById('masterPlay'); 
let currentStart = document.getElementById('currentStart')
let currentEnd = document.getElementById('currentEnd')

let seek= document.getElementById('seek')
let bar2= document.getElementById('bar2')
let dot = document.getElementsByClassName('dot')[0];

let vol_icon = document.getElementById('vol_icon')
let vol = document.getElementById('vol')
let vol_bar = document.getElementsByClassName('vol_bar')[0]
let vol_dot = document.getElementById('vol_dot')

masterPlay.addEventListener('click', () => {
    if (currentSong) {
        if (currentSong.paused || currentSong.currentTime <= 0) {
            currentSong.play();
            masterPlay.src = "pause.svg"; 
        } else {
            currentSong.pause();
            masterPlay.src = "play.svg"; 
        }
    }
});

let shuffle = document.getElementsByClassName('shuffle')[0]
shuffle.addEventListener('click',()=>{
    let a = shuffle.innerHTML;
    switch (a) {
        case 'next':
            shuffle.classList.remove('fa-music')
            shuffle.classList.add('fa-repeat')
            shuffle.classList.remove('fa-shuffle')
            shuffle.innerHTML='repeat'
            break;
    
        case 'repeat':
            shuffle.classList.remove('fa-music')
            shuffle.classList.remove('fa-repeat')
            shuffle.classList.add('fa-shuffle')
            shuffle.innerHTML='random'
            break;
        
        case 'random':
            shuffle.classList.add('fa-music')
            shuffle.classList.remove('fa-repeat')
            shuffle.classList.remove('fa-shuffle')
            shuffle.innerHTML='next'
            break;
    }
})

let like = document.getElementsByClassName('like')[0]
let boxplay = document.getElementsByClassName('box')[0]

let currentPlaylist = 1; 
let currentSongIndex = 0; 
const playlists = {
    0: document.querySelectorAll('.box .songItem'),
    1: document.querySelectorAll('.first .pl'),
    2: document.querySelectorAll('.second .pl'),
    3: document.querySelectorAll('.third .pl'),
    4: document.querySelectorAll('.sget')
};

const playSong = async() =>{
    // console.log(currentPlaylist)
    // console.log(currentSongIndex)
    if(currentPlaylist!=0)
        e=playlists[currentPlaylist][currentSongIndex]
    console.log(e)

    let sname = e.querySelector('.pname');
    console.log(sname.innerText);

    // let data = await fetch(`https://v1.nocodeapi.com/xyzapi/spotify/aWdLCaiygjYnPuoK/search?q=${sname.innerText}&type=track&perPage=5`);
    let c = await data.json();
    let tracks = c.tracks.items;

    let i = 0;
    while (i < tracks.length && !tracks[i].preview_url) {
        i++;
    }

    console.log("Track name:", tracks[i].name);
    let surl = tracks[i].preview_url;
    console.log("Preview URL:", surl);

    if (currentSong && !currentSong.paused) {
        currentSong.pause();
        masterPlay.src = "play.svg";
    }

    currentSong = new Audio(surl);
    if(isDefault===true){
        currentSong.pause();
        masterPlay.src = "play.svg";
        isDefault=false;
    }else{
        currentSong.play(); 
        masterPlay.src = "pause.svg";
    }
    //change background
    Array.from(player).forEach((a) => {
        a.style.background='rgb(105,105,105,0)';
    });
    e.style.background= 'rgb(105,105,105,.2)';

    //playbar changes
    const imgElement = playbar.querySelector('#poster');
    imgElement.src = e.querySelector('img').src;
    let n = playbar.querySelector('#title');
    n.innerText = sname.innerText;
    let a = playbar.querySelector('.sub');
    a.innerText = e.querySelector('.sub').innerText; 

    currentSong.addEventListener('timeupdate',()=>{
        let music_curr=currentSong.currentTime;
        let music_durr= currentSong.duration;
        // console.log(music_durr);
        let min1 = Math.floor(music_durr/60);
        let sec1 = Math.floor(music_durr%60);
    
        if(sec1<10){
            sec1= `0${sec1}`;
        }
        currentEnd.innerText = `${min1}:${sec1}`;
    
        let min2 = Math.floor(music_curr/60);
        let sec2 = Math.floor(music_curr%60);
        if(sec2<10){
            sec2= `0${sec2}`;
        }
        currentStart.innerText = `${min2}:${sec2}`;
    
        let progress = parseInt((music_curr/music_durr)*100);
        seek.value=progress;
        let seekbar=seek.value;
        bar2.style.width=`${seekbar}%`
        dot.style.left=`${seekbar}%`
    })
    currentSong.addEventListener('ended', ()=>{
        if (shuffle.innerHTML=='next') {
        currentSongIndex = (currentSongIndex +1) % playlists[currentPlaylist].length;
        }else if(shuffle.innerHTML=='repeat'){
            currentSongIndex;
        }else if(shuffle.innerHTML=='random'){
            currentSongIndex = Math.floor(Math.random() * playlists[currentPlaylist].length)
        }
        playSong()
    })
    
    let fname=playbar.querySelector('#title').innerText;
    console.log(fname);
    let songIndex = Array.from(boxplay.children).findIndex(song => {
        console.log('Current song item:', song);
        const songTitle = song.querySelector('.pname'); 
        console.log(songTitle.innerText);
        return songTitle && songTitle.innerText.trim() === fname;
    });
    console.log(songIndex);
    if (songIndex === -1) {
        like.innerHTML='<i class="fa-regular fa-heart" style="color: #ffffff;"></i>'
    }else{
        like.innerHTML='<i class="fa-solid fa-heart" style="color: #f60404"></i>'
    }
}
Array.from(player).forEach((e,index) => {
    e.addEventListener('click', () => {
        if(e.closest('.box')){
            currentPlaylist=0;
        }else if (e.closest('.first')) {
            currentPlaylist = 1;
        } else if (e.closest('.second')) {
            currentPlaylist = 2;
        } else if (e.closest('.third')) {
            currentPlaylist = 3;
        }else if (e.closest('.search_result')) {
            currentPlaylist = 4;
            result.style.display = 'none';
        }
        list= Array.from(playlists[currentPlaylist])
        currentSongIndex=list.indexOf(e)
        playSong(); 
    });
});
//////////////////////////////////////
seek.addEventListener('change', ()=>{
    currentSong.currentTime = seek.value * currentSong.duration / 100;
})
vol.addEventListener('change', ()=>{
    if(vol.value==0){
        vol_icon.innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
    }
    else if(vol.value>0 && vol.value<100){
        vol_icon.innerHTML='<i class="fa-solid fa-volume-low"></i>'
    }
    else if(vol.value==100){
        vol_icon.innerHTML='<i class="fa-solid fa-volume-high"></i>'
    }
    let vol_value=vol.value
    vol_bar.style.width= `${vol_value}%`
    vol_dot.style.left= `${vol_value}%`
    currentSong.volume= vol_value/100
})

let prev= document.getElementById('prev')
let next= document.getElementById('next')

prev.addEventListener('click',()=>{
    currentSongIndex = (currentSongIndex -1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
    playSong()
})
next.addEventListener('click',()=>{
    currentSongIndex = (currentSongIndex +1) % playlists[currentPlaylist].length;
    playSong()
})

like.addEventListener('click', ()=>{
    let fname=playbar.querySelector('#title').innerText;

    let songIndex = Array.from(boxplay.children).findIndex(song => {
        console.log('Current song item:', song);
        const songTitle = song.querySelector('.pname'); 
        console.log(songTitle.innerText);
        return songTitle && songTitle.innerText.trim() === fname;
    });
    console.log(songIndex);
    if (songIndex === -1) {
        like.innerHTML='<i class="fa-solid fa-heart" style="color: #f60404"></i>'

        let liked = document.createElement('li');
        liked.classList.add('songItem', 'pl');
        e=playlists[currentPlaylist][currentSongIndex]
        let sname = e.querySelector('.pname');

        // Add the content to the <li> element
        liked.innerHTML = `
        <img class="img" src="${e.querySelector('img').src}"></img>
        <h5><p id="title" class="pname">${sname.innerText}</p>
            <div class="sub">${playbar.querySelector('.sub').innerText}</div> </h5>
        <img class="playic" src="play.svg">
        `
        boxplay.appendChild(liked);

    } else {
        like.innerHTML='<i class="fa-regular fa-heart" style="color: #ffffff;"></i>'
        let songToRemove = boxplay.children[songIndex];
        boxplay.removeChild(songToRemove);
    }
})
boxplay.addEventListener('click', (event) => {
    if (event.target.closest('.songItem')) {
        e = event.target.closest('.songItem');
        currentPlaylist = 0; 
        
        playSong(); 
    }
});

let search_button = document.getElementsByClassName('fa-magnifying-glass')[0]
let result = document.getElementsByClassName('search_result')[0]
let input = document.getElementById('search_input')
let search_list = document.getElementsByClassName('sget')
let img=search_list[0].querySelector('img')
console.log(img)
input.addEventListener('keyup', ()=>{
    if(input.value==0){
        result.style.display = 'none';
    }
})
search_button.addEventListener('click', async()=>{
    input_value =input.value
    // let data = await fetch(`https://v1.nocodeapi.com/xyzapi/spotify/aWdLCaiygjYnPuoK/search?q=${input_value}&type=track&perPage=5`);
    let c = await data.json();
    let tracks = c.tracks.items;
    tracks.forEach((element, i) => {
        let img=search_list[i].querySelector('img')
        img.src = element.album.images[0].url;
        let name = search_list[i].querySelector('p')
        name.innerText=element.name;
        let a=search_list[i].querySelector('.sub')
        a.innerHTML=element.artists[0].name;
    })
    result.style.display = 'block';
})
let tleft = document.getElementsByClassName("larrow");
let tright = document.getElementsByClassName("rarrow");
Array.from(tright).forEach((a,index) => {
    a.addEventListener('click', () => {
        let tcards = document.getElementsByClassName("tcards")[index];
        tcards.scrollLeft += 170;
    });
});
Array.from(tleft).forEach((a,index) => {
    a.addEventListener('click', () => {
        let tcards = document.getElementsByClassName("tcards")[index];
        tcards.scrollLeft -= 170;
    });
});

document.getElementById("sbtn").addEventListener('click',()=>{
    window.location.href='sign.html'
})
document.getElementById("lbtn").addEventListener('click',()=>{
    window.location.href='log.html'
})

});
