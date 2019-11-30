// Bubble Sort
var temp = 0;
var tempDiv = "";
var sorting = true;
var active = false;

function sort() {
	if (!active) {
		sorting = true;
		document.getElementById("button").innerHTML = "stop";
		document.getElementById("grid").innerHTML = "";
		var sort = new Array(parseInt(document.getElementById("quantity").value));
		var interval = 300-document.getElementById("slider").value;
		var divs = new Array(sort.length);
		var type = document.getElementById("select").value;
	
		for (i = 0; i < sort.length; i++) {
			sort[i] = Math.floor(Math.random() * 100+1);
			divs[i] = i;
			document.getElementById("grid").innerHTML += `<div style="height: ${sort[i]}%;" id="${i}" class="div"></div>`;
		}
	}
	if (active) {
		window.location.reload(false);
		return;
	} else if (type == "1") { // bubble
		active = true;
		for (let j = 0; j <= sort.length; j++) {
			setTimeout(function () {
				if (sorting) {
					sorting = false;
					for (let i = 0; i <= sort.length-(j+2) ; i++) {
						setTimeout(function () {
					
							for (z = 0; z < document.getElementsByClassName("div").length; z++) {
								document.getElementsByClassName("div")[z].style.backgroundColor = "#eee";
							}
							document.getElementById(divs[i]).style.backgroundColor = "red";
							document.getElementById(divs[i+1]).style.backgroundColor = "#5f5";

							if (sort[i] > sort[i + 1]) {
								sorting = true;
								document.getElementById(divs[i+1]).style.backgroundColor = "red";

								temp = sort[i + 1];
								sort[i + 1] = sort[i];
								sort[i] = temp;
							
								document.getElementById(divs[i]).style.gridColumnStart = i+2;
								document.getElementById(divs[i+1]).style.gridColumnStart = i+1;
							
								temp = divs[i + 1];
								divs[i + 1] = divs[i];
								divs[i] = temp;
							}
						}, i * interval);
					}
				} else {
					for (z = 0; z < document.getElementsByClassName("div").length; z++) {
						document.getElementsByClassName("div")[z].style.backgroundColor = "#5f5";
					}
					active = false;
					interval = 0;
					document.getElementById("button").innerHTML = "run";
				}
			}, ((j * sort.length) - ( j*( j * .5) ) ) * interval);
		}
	} else if (type == "2") {
		active = true;
		for(let j = 0; j < sort.length; j++) {
			setTimeout(function () {
				for(let i = 0; i < j; i++) { // TODO Skip when place has been found
					setTimeout(function () {
						for (z = 0; z < document.getElementsByClassName("div").length; z++) {
							document.getElementsByClassName("div")[z].style.backgroundColor = "#eee";
						}
						document.getElementById(divs[j]).style.backgroundColor = "blue";
						document.getElementById(divs[i]).style.backgroundColor = "red";
						if(sort[j] <= sort[i]) {
							document.getElementById(divs[j]).style.backgroundColor = "#5f5";

							temp = sort[j];
							sort.splice(j,1);
							sort.splice((i), 0, temp);

							temp = divs[j];
							divs.splice(j,1);
							divs.splice((i), 0, temp);

							for(z = 0; z < divs.length; z++) {
								document.getElementById(divs[z]).style.gridColumnStart = z+1;
							}
						}
						if (j == sort.length-1) {
							for (z = 0; z < document.getElementsByClassName("div").length; z++) {
								document.getElementsByClassName("div")[z].style.backgroundColor = "#5f5";
							}
							active = false;
							interval = 0;
							document.getElementById("button").innerHTML = "run";
						}
					}, i * interval);
					
				}
			}, j * interval * j);
		}
		
	}
}

document.getElementById("slider").oninput = function() {
  document.getElementById("sped").innerHTML = ` Speed: ${Math.round(this.value/300*100)}%`;
}

document.getElementById("quantity").oninput = function() {
  document.getElementById("amm").innerHTML = ` Amount: ${this.value}/180`;
}

document.getElementById("sped").innerHTML = ` Speed: ${Math.round(document.getElementById("slider").value/300*100)}%`;
document.getElementById("amm").innerHTML = ` Amount: ${document.getElementById("quantity").value}/180`;