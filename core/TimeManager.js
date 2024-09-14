const { UpdateListeners } = require("./listeners/UpdateListeners");

class TimeManager{
  hourInMinutes = 59;
  dayInHours = 23;

  pdateListenerId = null;
  static instance = null;
  currentTime = null;

  decimalMinutes = 0;
  minutes = 0;
  hours = 0;

  days = 1;

  constructor(){
    UpdateListeners.getInstance().registerListener(this.onUpdate);
  }

  static getInstance(){
    if(!TimeManager.instance){
      TimeManager.instance = new TimeManager();
    }

    return TimeManager.instance;
  }

  getTranscurredSeconds(time){
    return ( time - this.currentTime ) / 1000;
  }

  onUpdate = (time) => {
    const minutesTmp = this.currentTime === null ? 0 : this.getTranscurredSeconds( time );
    this.decimalMinutes += minutesTmp;
    this.minutes = Math.floor( this.decimalMinutes )

    if(this.minutes > this.hourInMinutes){
      this.decimalMinutes = 0;
      this.minutes = 0;
      this.hours++;
    }

    if(this.hours > this.dayInHours){
      this.hours = 0;
      this.decimalMinutes = 0;
      this.minutes = 0;
      this.days++;
    }

    this.currentTime = time;
  }
}

module.exports.TimeManager = TimeManager;