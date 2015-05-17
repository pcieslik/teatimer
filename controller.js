function Controller(){
	var self = this;
	self.timer = new Timer();
	
	self.teas = [
		new Tea("black", 3, 93),
		new Tea("green", 1, 80),
		new Tea("oolong", 3, 90),
		new Tea("matcha", 4, 90),
		new Tea("white", 5, 80),
		new Tea("pu-erh", 4, 98),
		new Tea("herbal", 6, 98),
		new Tea("rooibos", 6, 98),
	];
	
	self.runTimer = function(tea){
		self.timer.start(tea.time * 60);
	};
}

function Timer(){
	var self = this;
	self.timerId = 0;
	self.remainingTime = ko.observable(0);
	self.remainingTimeFormatted = ko.computed(function() {
		var minutes = Math.floor(this.remainingTime() / 60);
		var seconds = (this.remainingTime() % 60);
		
		if(seconds < 10){
			return minutes + ":0" + seconds + "s";
		}
		
        return minutes + ":" + seconds + "s";
    }, this);
	
	self.start = function(seconds){
		self.stop();
		self.remainingTime(seconds);
		self.timerId = setInterval(self.action, 1000);
	};
	
	self.action = function(){
		self.remainingTime(self.remainingTime() - 1);
		if(self.remainingTime() < 1){
			self.stop();
			alert('gotowe!');
		}
	}
	
	self.stop = function(){
		clearInterval(self.timerId);
	}
}

function Tea(type, time, temperature){
	this.type = type;
	this.time = time;
	this.temperature = temperature;
}