(function (document, window) {
	function euclid(a, b) {
		a = Math.abs(a);
		b = Math.abs(b);
		if (a < b) {
			var temp = a;
			a = b;
			b = temp;
		}
		var q = Math.floor(a / b);
		var r = a % b;

		var steps = [{a: a, b: b, q: q, r: r}];
		while (r > 0) {
			a = b;
			b = r;
			q = Math.floor(a / b);
			r = a % b;
			steps.push({a: a, b: b, q: q, r: r})
		}
		return steps;
	}

	function toHtml(steps){
		return steps.map(function(step){
			return `<div class="row"><span>${step.a}</span> = <span>${step.b}</span> x <span>${step.q}</span> + <span>${step.r}</span></div>`
		}).join('\n');
	}

	function setup(input_value1, input_value2, solver_form, solution_elm, mcd_elm){
		solver_form.addEventListener('submit', function (evt) {
			evt.preventDefault();
			var a = parseInt(input_value1.value);
			var b = parseInt(input_value2.value);
			
			if (isNaN(a) || isNaN(b)){
				return;
			}
			
			var steps = euclid(a, b);
			solution_elm.innerHTML = toHtml(steps);
			mcd_elm.innerHTML = `GCD: ${steps[steps.length - 1]['b']}`;
		});
	}

	window.Euclid = {
		solver: euclid,
		setup: setup
	};
})(document, window);

