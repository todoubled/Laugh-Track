LaughTrack = {
	message:null,
	config:{
		form:'#laugh-track',  
		input:'#input',  
		output:'#laughs',  
		sendTrigger:'#send',  
		host:'laugh-track.nodester.com',  
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
			var laugh = '<p><small>'+msg.time+'</small><br />'+msg.message+'</p>';
			$(LaughTrack.config.output).prepend(laugh);
		});
		
		// Append form elements
		LaughTrack.appendMarkup();
		
		// Attach click handler
		LaughTrack.sendReady();
	},
	
	// Add widget to page
	appendMarkup:function() {
		var markup = 	'<div id="laugh-track"><form>' +
										'<span class="directions">What do you think?</span>' +
										'<textarea id="input"></textarea><br>' +
										'<a id="send" href="#">Add Comment</a>' +
										'<div id="laughs"></div>' +
									'</form></div>';
		var style = 	'<style type="text/css">' +
										'span.directions { display:block; font-size:18px; }' +
										'#laugh-track { padding:20px; z-index:9999; position:fixed; bottom:0; right:0; background:#000; opacity:0.3; width:300px; min-height:100px; max-height:300px; overflow-y:auto; }' +
										'#laugh-track:hover { opacity:1; -webkit-transition: opacity .25s linear; transition: opacity .25s linear; }' +
										'#laugh-track.active { opacity:1; }' +
										'#laugh-track p { color:#fff!important; }' +
										'#laugh-track small { font-size:0.5em; letter-spacing:1px; }' +
									'</style>';
									
		$('body').append(markup);
		$('body').append(style);
	},
	
	// Add track listeners
	sendReady:function() {
		// Click handler to send message
		$(LaughTrack.config.sendTrigger).bind('click', function(e) { e.preventDefault();
			// Get message from DOM
			var string = $(LaughTrack.config.form +' '+ LaughTrack.config.input).val();
			
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

setTimeout(LaughTrack.init, 5000);