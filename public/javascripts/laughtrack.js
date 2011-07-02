LaughTrack = {
	message:null,
	config:{
		form:'#laugh-track',  
		input:'#input',  
		output:'#laughs',  
		sendTrigger:'#send',  
		host:'localhost',  
		port:'10721'
	},
	socket:null,
	time:new Date(),
	clientId:Math.floor(Math.random()*11),
	
	// Setup Laugh Track
	init:function(options) {
		LaughTrack.socket = new io.Socket(LaughTrack.config.host, { port: LaughTrack.config.port });
		
		// Connect client sockets and log messages to console
		LaughTrack.socket.connect();
		LaughTrack.socket.on('message', function(msg){
			var laugh = '<p><abbr title="'+msg.time+'" class="timeago">'+new Date(msg.time)+'</abbr><br />'+msg.message+'</p>';
			$(LaughTrack.config.output).prepend(laugh);
		});
		
		// Append form elements
		LaughTrack.appendMarkup();
		
		// Attach click handler
		LaughTrack.sendReady();
		
		// Add UI
		LaughTrack.ui();
	},
	
	// Add widget to page
	appendMarkup:function() {
		var markup = 	'<div id="laugh-track"><a href="#" id="show-laugh-track">Show</a><ul><li><a href="#" id="hide-laugh-track">Hide</a></li><li><a href="#" id="close-laugh-track">Close</a></li></ul>' +
                    '<form>' +
										'<span class="directions">What do you think?</span>' +
										'<textarea id="input"></textarea><br>' +
										'<a id="send" href="#">Add Comment</a>' +
										'<div id="laughs"></div>' +
									'</form></div>';
		var style = 	'<style type="text/css">' +
										'span.directions { display:block; font-size:18px; }' +
										'#laugh-track { padding:20px;-moz-box-shadow:-1px -1px 20px #ccc;-webkit-box-shadow: -1px -1px 20px #ccc;box-shadow: -1px -1px 20px #ccc; z-index:9999; position:fixed; bottom:0; right:0; background:#000; opacity:0.3; width:300px; min-height:100px; max-height:300px; overflow-y:auto; }' +
										'#laugh-track:hover { opacity:1; -webkit-transition: opacity .25s linear; transition: opacity .25s linear; }' +
										'#laugh-track.active { opacity:1!important; }' +
                    '#laugh-track span { color:#fff!important; display:block; margin-bottom:10px; font-weight:bold; }' +
                    '#laugh-track ul { margin:0; padding:0; float:right; width:100px; list-style:none; }' +
                    '#laugh-track ul li { display:inline; }' +
										'#laugh-track p { color:#fff!important; }' +
										'#laugh-track small { font-size:0.5em; letter-spacing:1px; }' +
                    '#laugh-track a#show-laugh-track { display:none; float:left; }' +
									'</style>';
									
		$('body').append(markup);
		$('body').append(style);
	},
	
	// UI animations and interactivity
	ui:function() {
		var $lt = $('div#laugh-track');
		var $input = $('div#laugh-track #input');
    var $show = $('div#laugh-track a#show-laugh-track');

    $lt.find('a#hide-laugh-track').bind('click', function() {
      $lt.animate({ 'right':'-250px' }, function(e) { e.preventDefault();
        $show.show();
      });
    });
    
    $lt.find('a#show-laugh-track').bind('click', function(e) { e.preventDefault();
      $lt.animate({ 'right':'0px' }, function() {
        $show.hide();
      });
    });

		$input.focus(function(e) {
			$lt.addClass('active');
		});
		
		$input.blur(function(e) {
			$lt.removeClass('active');
		});
	},
	
	// Add track listeners
	sendReady:function() {
		// Click handler to send message
		$(LaughTrack.config.sendTrigger).bind('click', function(e) { e.preventDefault();
			// Get message from DOM
			var string = $(LaughTrack.config.form +' '+ LaughTrack.config.input).val();
		  
      $(LaughTrack.config.form +' '+ LaughTrack.config.input).val('');

			// Construct JSON packet with message and metadata
			LaughTrack.message = {
				message:string,
				from:LaughTrack.clientId,
				time:LaughTrack.time
			};
			
			LaughTrack.socket.send(LaughTrack.message);
		});
	}
};

setTimeout(LaughTrack.init, 2000);
