Module.register("sea-temp",{
	// Default module config.
	defaults: {
		URL: 'https://erddap.marine.ie//erddap/tabledap/IWBNetwork.json?&station_id="M5"&orderByMax("time")'
    },
    
    getStyles: function() {
        return [
            'font-awesome.css' // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
        ]
    },

    start: function() {
        var self = this;
        setInterval(function() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var results = JSON.parse(xmlhttp.responseText);
                self.temperature= results.table.rows[0][15]
		self.waveHeight= results.table.rows[0][9]
		self.windSpeed= results.table.rows[0][7]
                }
            };
            xmlhttp.open("GET", self.config.URL, true);
            xmlhttp.send();
            self.updateDom();
            }, 5000); //perform every 5000 milliseconds.
    },

	// Override dom generator.
	getDom: function() {
        var wrapper = document.createElement("div");
        if (!this.temperature || !this.waveHeight) {
			wrapper.innerHTML = "No data";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		wrapper.innerHTML = 'Sea Temperature '+this.temperature +'&deg;'+'Wave Height '+ this.waveHeight+"m Wind Speed "+this.windSpeed+"Mph ";
		return wrapper;
	}
});
