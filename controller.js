function Controller(){
	var self = this;
	self.timer = new Timer();
	
	self.teas = [
		new Tea("black", 5, 90 ),
		new Tea("white", 5, 90 ),
		new Tea("green", 5, 90),
		new Tea("1", 5, 90),
		new Tea("2", 5, 90),
		new Tea("3", 5, 90),
	];
	
	self.showTimer = ko.observable(false);
	self.selectedTea = ko.observable({});
	
	self.runTimer = function(tea){
		self.showTimer(true);
		self.timer.start(tea.time);
		self.selectedTea(tea);
	};
}

function Timer(){
	var self = this;
	self.timerId = 0;
	self.remainingTime = ko.observable();
	
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