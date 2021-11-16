// set btn
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');

let title = document.querySelector('#title');
// volume range調整
let recent_volume = document.querySelector('#volume');

let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');

let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
	{
		name: "first song",
		path: "music/song1.mp3",
		img: "img/img1.jpg",
		singer: "1"
	},
	{
		name: "second song",
		path: "music/song2.mp3",
		img: "img/img2.jpg",
		singer: "2"
	},
	{
		name: "third song",
		path: "music/song3.mp3",
		img: "img/img3.jpg",
		singer: "3"
	},
	{
		name: "fourth song",
		path: "music/song4.mp3",
		img: "img/img4.jpg",
		singer: "4"
	},
	{
		name: "fifth song",
		path: "music/song5.mp3",
		img: "img/img5.jpg",
		singer: "5"
	}
];


// All functions


// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	// 新增<audio>音訊檔的屬性
	track.src = All_song[index_no].path;
	// 渲染網頁音樂資料
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider, 1000);

	// 顯示當前全部歌曲數量，以及播放為第幾首歌
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
	// 1.0 is highest volume (100%. This is default)
	// 0為靜音
	track.volume = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		// 最後一首歌時，將index_no設置為 0，跳轉為第一首
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		// 當 index_no = 0 (第一首歌)，往前播為清單的最後一首歌
		// 將 index_no 設置為最後一首歌的index
		index_no = All_song.length - 1;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	// 調整聲音大小 (最大值為1，所以值要除100)
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
	// audio.duration 數字值，表示音頻的總長度，以秒計。
	// 選取的長度(slider.value / 100) * 音頻的總長度 為 跳轉的撥放位置
	slider_position = track.duration * (slider.value / 100);

	// Audio currentTime屬性以秒的形式返回音頻播放位置
	// 將值傳給 currentTime 
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#37474F";
	}
}


function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		// audio.duration 數字值，表示音頻的總長度，以秒計。
		// Audio currentTime屬性以秒的形式返回音頻播放位置
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}