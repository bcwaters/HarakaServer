// rcpt_to.disposable
var fs = require('fs');
// documentation via: haraka -c /home/ubuntu/emailserver/haraka -h plugins/rcpt_to.disposable

// Put your plugin code here

exports.hook_rcpt = function (next, connection, params) {	
	var mailTo = connection.transaction.rcpt_to[0].user
	var emailFrom = connection.transaction.mail_from.user;
	var filename = mailTo + ":"+ connection.uuid.substring(0,6);	
	var writeDir = '/tmp/emails/';
		 			
if(connection.transaction.rcpt_to[0].host == 'devwaters.com'){
	writeDir = '/tmp/devEmails/';

	}	 			
	var stream =  fs.createWriteStream(writeDir + filename);
	stream.once('close',function(){console.log('file written')})
	connection.transaction.message_stream.pipe(stream, {dot_stuffing: true});
	
	this.loginfo('received email from: '+emailFrom +' to: '+ mailTo)
	connection.notes.discard = true;
	next(OK)
}




// type: `haraka -h Plugins` for documentation on how to create a plugin
