Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].ID === obj) {
            return true;
        }
    }
    return false;
}

function expenditure(data){
		var expenditure = 0;
		for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
			var item = data.simulation.mail[i];
			var routes = data.simulation.route;
			for (var x = routes.length - 1; x >= 0; x--) {
				var currRoute = routes[x];
				if(routes[x].to ===  item.to){
					if(routes[x].from === item.from){
						var currRouteType  = data.simulation.priority[item.priority];
						
						if(routes[x].routeType === currRouteType){
							var weightcost = currRoute.weightcost * item.weight;
							var volumecost = currRoute.volumecost * item.volume;
							expenditure+=(weightcost+volumecost);
						}
					}
				}		
			};
		};
				expenditure =numeral(expenditure).format('0,0.00');
	return expenditure;
};
		
function revenue(data){
		var revenue = 0;
		for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
			var item = data.simulation.mail[i];
			var origin = "";
			if(NZ.contains(item.from)){
				origin = "New Zealand";
			}
			else{
				origin = item.from;
			}

			var prices = data.simulation.price;
			for (var x = prices.length - 1; x >= 0; x--) {
				var currPrice = prices[x];
				if(prices[x].to ===  item.to){
					if(prices[x].from === origin){
						if(prices[x].priority === item.priority){
							price = prices[x];
							var weightCost = +price.weightcost * +item.weight;
							var volumeCost = +price.volumecost * +item.volume;
							revenue+=(+weightCost + +volumeCost);
						}
					}
				}
				
			};



		};
		revenue = numeral(revenue).format('0,0.00');
				
	return revenue;
};
function deliveryTimes(data){
var averageDelTime = 0;
		for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
			var item = data.simulation.mail[i];
			var routes = data.simulation.route;
			for (var x = routes.length - 1; x >= 0; x--) {
				var currRoute = routes[x];
				if(routes[x].to ===  item.to){
					if(routes[x].from === item.from){
						var currRouteType  = data.simulation.priority[item.priority];
						
						if(routes[x].routeType === currRouteType){
							console.log(currRoute.duration)
							averageDelTime+= +currRoute.duration;
						}
					}
				}		
			};
		};
		averageDelTime = (averageDelTime / data.simulation.mail.length);
		console.log(numeral(averageDelTime).format('0.0'));
		averageDelTime = numeral(averageDelTime).format('0.0');

	return averageDelTime;
};
