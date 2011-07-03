javascript:(function(){
	_laugh_track = document.createElement('script');
	_laugh_track.type = 'text/javascript';
	_laugh_track.src = 'http://localhost:10721/javascripts/laughtrack.js';
	_laugh_track.onload = function() {
		LaughTrack.init();
	};
	
	document.getElementsByTagName('head')[0].appendChild(_laugh_track);
})();