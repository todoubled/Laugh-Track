LaughTrack = {
	message:null,
	config:null,
	socket:null,
	clientId:Math.floor(Math.random()*11),
	
	init:function() {
		LaughTrack.socket = new io.Socket(LaughTrack.config.host, {port: LaughTrack.config.port});
		
		// Connect client sockets and log messages to console
		LaughTrack.socket.connect();
		LaughTrack.socket.on('message', function(msg){
			console.log(msg);
		});
		
		// Attach click handler
		LaughTrack.sendReady()
	},
	
	sendReady:function() {
		// Click handler to send message
		$(LaughTrack.config.sendTrigger).bind('click', function(e) { e.preventDefault();
			// Get message from DOM
			var string = $(LaughTrack.config.form +' '+ LaughTrack.config.input).val();
			
			// Construct JSON packet with message and metadata
			LaughTrack.message = {
				message:string,
				from:LaughTrack.clientId
			};
			
			LaughTrack.socket.send(LaughTrack.message);
		});
	}
};