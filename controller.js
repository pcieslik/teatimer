function Controller(){
	var self = this;
	self.timers = ko.observableArray();
	
	self.teas = [
		new Tea("white", 5, 7, 80),
		new Tea("green", 1, 3, 80),
		new Tea("oolong", 3, 4, 90),
		new Tea("black", 4, 4, 93),
		new Tea("herbal", 6, 7, 98),
		new Tea("rooibos", 5, 7, 98),
		new Tea("mate", 6, 7, 98)
	];
	
	self.runTimer = function(minutes){
		var timer = new Timer();
		timer.start(minutes * 60);
		self.timers.push(timer);
	};
	
	self.stopTimer = function(timer){
		timer.stop();
		self.timers.remove(timer);
	}
	
	self.teaTileControllers = self.teas.map(function(tea){
		return new TeaTileController(tea, self.runTimer)
	});
}

function TeaTileController(tea, runTimer){

	this.timeControllers = createTimeRange(tea.timeFrom, tea.timeTo).map(function(minutes){
		return new TeaTileTimeController(minutes, runTimer);
	});
	
	this.time = 'Czas parzenia: ' + tea.timeFrom + ' min - ' + tea.timeTo + ' min';
	this.temperature = 'Temperatura parzenia: ' + tea.temperatureFrom + ' C - ' + tea.temperatureTo + ' C';
	this.type = tea.type;
	
	function createTimeRange(timeFrom, timeTo){
		var result = [];
		var item = timeFrom;
		while(item <= timeTo){
			result.push(item);
			item+=1;
		}
		
		return result;
	}
}

function TeaTileTimeController(minutes, runTimer){
	this.minutes = minutes;
	this.runTimer = function(){
		runTimer(minutes);
	};
}

function Timer(){
	var self = this;
	var timerId = 0;
	self.remainingTime = ko.observable(0);
	self.remainingTimeFormatted = ko.computed(function() {
		var minutes = Math.floor(this.remainingTime() / 60);
		var seconds = (this.remainingTime() % 60);
        return minutes + " minut " + seconds + " sekund ";
    }, this);
	
	self.start = function(seconds){
		self.stop();
		self.remainingTime(seconds);
		timerId = setInterval(self.action, 1000);
	};
	
	self.action = function(){
		self.remainingTime(self.remainingTime() - 1);
		if(self.remainingTime() < 1){
			self.stop();
			alert('Twoja herbata jest już gotowa!');
		}
	}
	
	self.stop = function(){
		clearInterval(self.timerId);
	}
}

function Tea(type, timeFrom, timeTo, temperature){
	this.type = type;
	this.timeFrom = timeFrom;
	this.timeTo = timeTo;
	this.temperatureFrom = temperature;
	this.temperatureTo = temperature;
}