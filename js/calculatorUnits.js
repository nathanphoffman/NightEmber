function AddUnitOptions(units, opt) {
	if (units == 'Magnitude') {
		return createOpt(opt, 1, 0, 'Mag');

	}

	else if (units == 'Energy') {

		options += createOpt(opt, 4.184, 15, 'Mton');
		options += createOpt(opt, 4.184, 12, 'kton');
        options += createOpt(opt, 1, 0, 'J');

        return options;

	}

	else if (units == 'Mass') {
        return createOpt(opt, 1, 0, 'kg');
	}

	else if (units == 'Distance') {
		var options = '';

		options += createOpt(opt, 1, 9, 'Gpc');
		options += createOpt(opt, 1, 6, 'Mpc');
		options += createOpt(opt, 1, 3, 'kpc');
		options += createOpt(opt, 1, 0, 'pc');
		options += createOpt(opt, 3.06594845, -1, 'Ly');
		options += createOpt(opt, 8.39428867, -4, 'Ld');
		options += createOpt(opt, 3.49762028, -5, 'Lh');
		options += createOpt(opt, 4.84813681, -6, 'AU');
		options += createOpt(opt, 5.82936713, -7, 'Lm');
		options += createOpt(opt, 9.71561189, -9, 'Ls');
		options += createOpt(opt, 5.2155287, -14, 'mi');
		options += createOpt(opt, 3.24077929, -14, 'km');
		options += createOpt(opt, 3.24077929, -17, 'm');
		options += createOpt(opt, 9.87789527, -18, 'ft');
		options += createOpt(opt, 8.2315794, -19, 'in');
		options += createOpt(opt, 3.24077929, -19, 'cm');
		options += createOpt(opt, 3.24077929, -20, 'mm');

		return options;
	}

	else if (units == 'Arc') {
		var options = '';

		options += createOpt(opt, 3.6, 3, 'deg');
		options += createOpt(opt, 60, 0, 'min');
		options += createOpt(opt, 1, 0, 'sec');
		options += createOpt(opt, 1, -3, 'mas');

		return options;
	}

	else if (units == 'Magnification') {
		var options = '';

		options += createOpt(opt, 1, 0, 'x1');

		return options;
	}
}

function createOpt(opt, value, exp, unit) {
	var option = '<option value="' + value * Math.pow(10, exp) + '"' + selectOpt(opt, unit) + '>' + unit + '</option>';
	return option;
}

function selectOpt(opt, unit) {
	if (opt == unit)
		return ' selected';
	else
		return '';
}