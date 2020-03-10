

function get_time_diff() {
	//2019.11.17
	var time = 1573920000;
	var diff = new Array();
	var time_diff = Math.round(new Date() / 1000) - time;
	// 计算相差天数 
	var days = Math.floor(time_diff / (24 * 60 * 60));
	diff[0] = days;
	// 计算相差小时数 
	var leave1 = time_diff - ( days * 24 * 60 * 60); 
	var hours = Math.floor(leave1 / (60 * 60));
	diff[1] = hours;
	// 计算相差分钟数 
	var leave2 =leave1 - (hours * 60 * 60);
	var minutes = Math.floor(leave2 / 60);
	diff[2] = minutes;
	// 计算相差秒数 
	var leave3 = leave2 - ( minutes * 60);
	var seconds = leave3;
	diff[3] = seconds;
	return diff;
}