		function addLink(fields,header,title)
		{
			$('#links').append('<a href="#" onClick="Initialize(' + fields + ', ' + header + ')">' + title + '</a><br/>');
		}
		
		function header(title,equation,summary)
		{
			this.title = title;
			this.equation = equation;
			this.summary = summary;
		}
	
		function field(id,eqn,title,units,defaultUnit)
		{
			this.id = id;
			this.eqn = eqn;
			this.title = title;
			this.units = units;
			this.defaultUnit = defaultUnit;
			
			this.addEvent = function (fields)
			{
				var fieldObj = this;
				$( "#link" + fieldObj.id ).click(function(e) {  
					e.preventDefault();  // Prevents the link from popping to the top
					calculate(fieldObj, fields);});
			}
			
			var calculate = function (obj, fields)
			{
				var result = eval(formattedEqn());
				var negative = false;
				
				// Take into account the units of the solution
				result = result *(1/$('#Units' + obj.id).val());
				
				if(result < 0)
				{
					negative = true;
					result = -result;
				}
	
				var exp = Math.floor(log10(result));
				
				if(negative == true)
				{
					result = -result;
				}
				
				// Take the exponent amount out of the result value
				result = result/Math.pow(10,exp);
				
				//Round the result up to x decimal places
				var roundAmount = 10;
				result = Math.round(result*Math.pow(10,roundAmount))/Math.pow(10,roundAmount);
				
				/*
				// Add trailing 0s
				while(String(result).length < roundAmount + 1)
				{
					result = result + '0';
				}
				*/
				
				$('#Exp' + obj.id).val(exp);
				$('#' + obj.id).val(result);
			}
			
			var formattedEqn = function ()
			{
				var leftBracket = eqn.split("{");
				var finalEquation = "";
				
				for(var i = 0; i < leftBracket.length; i++)
				{
					if(i != 0)
					{
						var rightBracket = leftBracket[i].split("}");
						finalEquation += "parseFloat($('#' + '" + rightBracket[0] + "').val()*applyCoefficient(" + rightBracket[0] + "))" + rightBracket[1];
					}
					else
					{
						finalEquation += leftBracket[0];
					}
				}
				//document.write(finalEquation);
				return finalEquation;
			}
			
			function applyCoefficient (obj)
			{
				var coefficient = 1;
				
				if(typeof $('#Units' + obj.id).val() !== 'undefined' && typeof $('#Units' + obj.id).val() != '' )
				{
					var coefficient = $('#Units' + obj.id).val()*Math.pow(10,$('#Exp' + obj.id).val());
					return coefficient;
				}
				else
				{
					return 1;
				}
			}
		}
		
		function Initialize(fields,header)
		{
			// If the element already exists, do not add it again
			if($('#parent' + fields[0].id).length)
				return false;
			
			var content = '';
			content += '<div class="main col-lg-6" id="parent' + fields[0].id + '">';
			content += '<h1>' + header.title + ' <a href="#" id="close' + fields[0].id + '">[X]</a></h1>';
			content += '<div><h3>Summary:</h3>' + header.summary + '</div>';
			content += '<div id="section"><b>Equation</b>: ' + header.equation + '</div>';
			content += '<p><h3>Calculation:</h3><center><table border="0" cellspacing="20" cellpadding="20">';
			
			for(var i = 0; i < fields.length; i++)
			{
				content += '<tr>';
	
				content += '<td width="250"><a href="#" id="link' + fields[i].id + '">' + fields[i].title + ':</a></td>';
				content += '<td width="135"><input size="15" type="text" id="' + fields[i].id + '"/></td>';
				content += '<td width="120">*10^<input size="2" value="0" id="Exp' + fields[i].id + '" type="text"/></td>';
				content += '<td width="50"><select id="Units' + fields[i].id + '">' + AddUnitOptions(fields[i].units,fields[i].defaultUnit) + '</select></td>';
							
				content += '</tr>';
				
			}
			
			content += '</table></center></p></div>';
			
			$('#calcHeader').append(content);
			
			for(var i = 0; i < fields.length; i++)
			{
				fields[i].addEvent(fields);
			}
			
			// Add the event for closing the calculator
			$( "#close" + fields[0].id ).click(function(e) {  
				e.preventDefault();  // Prevents the link from popping to the top

				// Gets the parent id by replacing the close link prefix on the id with parent
				var parentId = e.target.id.replace('close','parent');

				$('#' + parentId).remove();
				
				});
			
		}
		
		function log10(val) {
			return Math.log(val) / Math.LN10;
		}