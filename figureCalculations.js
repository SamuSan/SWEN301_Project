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
							var weightCost = price.weightcost * item.weight;
							var volumeCost = price.volumecost * item.volume;
							revenue+=(weightCost+volumeCost);
						}
					}
				}
				
			};



		};
		expenditure.toFixed(2).replace(/./g, function(c, i, a) {
   			 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
		});
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
							var weightCost = price.weightcost * item.weight;
							var volumeCost = price.volumecost * item.volume;
							revenue+=(weightCost+volumeCost);
						}
					}
				}
				
			};



		};
		revenue.toFixed(2).replace(/./g, function(c, i, a) {
   			 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
		});
		return revenue;
		};