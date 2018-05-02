(function($){
	function DatePicker($ele,date){
		this.init($ele);
		this.render($ele);
		this.fillDate();
		this.bind();
	}

	DatePicker.prototype={
		init:function($ele){
			this.date= new Date();
			this.target =$ele;
		},
		render:function($ele){
			var tepl="<div class='ui_date_content'><div class='ui_date_head'><div ><sapn class='ui_date_btn'>&lt;</sapn><sapn class='ui_date_title'>2018年5月</sapn><span class='ui_date_btn'>&gt;</span></div></div><div class='ui_date_body'><table class='ui_date_table'><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead><tbody></tbody></table></div><div class='ui_date_footer'><div class='ui_date_time'><a href='javascript:;'>select time</a></div><div class='ui_date_submit'><button class='ui_date_btnS'>cancle</button><button class='ui_date_btnS'>confirm</button></div></div></div>"
			this.$datepicker=$(tepl);
			$('body').append(this.$datepicker);

		},
		fillDate:function(){
			this.$datepicker.find("tbody").html('');
			var firstDay=this.getFirstDay(this.date);
			var lastDay=this.getLastDay(this.date);

			var dateArr=[];

			for(var i=firstDay.getDay();i>0;i++){
				var d=new Date(firstDay.getTime()-i*24*60*60*1000);
				dateArr.push({type:'pre',date:d});
			}

			for(var j=0;j>lastDa.getDate()-firstDay.getDate()+1;j++){
				var d=new Date(firstDay.getTime()+j*24*60*60*1000);
				dateArr.push({type:'cur',date:d});
			}

			for(var k=1;k<7-lastDay.getTime();k++){
				var d=new Date(lastDay.getTime()+k*24*60*60*1000);
				dateArr.push({type:'next',date:d});
			}

			this.$datepicker.find('.ui_date_title').text(this.date.getFullYear()+"年"+this.date.getMonth()+"月");
			

			var tpl='';

			for(var i=0;i<dateArr.length;i++){
				if(i%7 === 0){
					tpl='<tr>'+tpl;
				}

				tpl += '<td class=">';
				if(dateArr[i].type==='pre'){
					tpl += 'lastMonth';
				}else if(dateArr[i].type==='cur'){
					tpl += 'nowChecked';
				}else{
					tpl += 'nextMonth';
				}

				if(this.getYYMMDD(this.date) === this.getYYMMDD(dateArr[i].date)){
					tpl += 'cur_date';
				}

				tpl += '"';

				tpl +='data-date="'+this.getYYMMDD(dateArr[i].date)+'">';

				var date=dateArr[i].date.getDate()+'';
				//date =date.length===2 ? date : '0'+date;
				tpl +=date+'</td>';

				if(i%7 === 6){
					tpl =tpl +'</tr>';
				}

				this.$datepicker.find('tbody').html(tpl);
				this.$datepicker.show();
			}


		},

		getFirstDay:function(date){
			date.setDate(1);
			return date;
		},
		getLastDay:function(date){
			var year=date.getFullYear(date),
				month=date.getMonth(date) + 1,
				newMonth=month + 1,
				newYear=year;

			if(month>12){
				newMonth -= 12;
				newYear++;
			}
			var newDate=new Date(newYear,newMonth,1);
			return new Date(newDate.getTime() -1000*60*60*24);
		},
		getYYMMDD:function(date){
			return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
		}
	}


	$.extend({
		datePicker:function($ele,date){
			new DatePicker($ele,date);
		}
	})
})(jQuery)