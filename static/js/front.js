function ShowTime(){
    var NowDate = new Date();
    var h=NowDate.getHours()
    var m=NowDate.getMinutes();
    var s=NowDate.getSeconds();
    var y=NowDate.getFullYear();
    var Mon=NowDate.getMonth()+1;
    var dat=NowDate.getDate();
    var d = NowDate.getDay();
    var dayNames = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    if(s<10) s="0"+s;
    if(m<10) m="0"+m;
    if(h<10) h="0"+h;
    if(Mon<10) Mon="0"+Mon;
    if(dat<10) dat="0"+dat;
    document.getElementById('time_small').innerHTML =y+"/"+Mon+"/"+dat+" " +dayNames[d]+" "+h + ":"+m+":"+s;
    setTimeout('ShowTime()', 1000);
}

function query(){
    var select1 = document.getElementById("startday").value;
    var select2 = document.getElementById("endday").value;
    var select3 = document.getElementById("area").value;
    var parseDaY = d3.timeParse("%Y-%m-%d");
    var newS = parseDaY(select1);
    var newE = parseDaY(select2);
    var sM = newS.getMonth()+1;
    var sY = newS.getFullYear();
    var sD = newS.getDate();
    var eM = newE.getMonth()+1;
    var eY = newE.getFullYear();
    var eD = newE.getDate();
    var ssM,ssD,eeM,eeD;
    if(sM<10) ssM="0"+sM;
    else ssM = sM;
    if(sD<10) ssD="0"+sD;
    else ssD = sD;
    if(eM<10) eeM="0"+eM;
    else eeM = eM;
    if(eD<10) eeD="0"+eD;
    else eeD = eD;

    var ns = sY+"/"+ssM+"/"+ssD+" "+"00:00" ;
    var ne = eY+"/"+eeM+"/"+eeD+" "+"23:59" ;

    if(select3 == "sea_data"){
         PH(select3,ns,ne);
         conduct(select3,ns,ne);
         temper(select3,ns,ne);
         DO(select3,ns,ne);

     }else{
         temp(select3,ns,ne);
         tide(select3,ns,ne);
     }
}

function query2(){
    var select1 = document.getElementById("startday2").value;
    var select2 = document.getElementById("endday2").value;
    var select3 = document.getElementById("hour").value;
    var select4 = document.getElementById("indicators").value;
    var select5 = document.getElementById("kind").value;
    var parseDaY = d3.timeParse("%Y-%m-%d");
    var newS = parseDaY(select1);
    var newE = parseDaY(select2);
    var sM = newS.getMonth()+1;
    var sY = newS.getFullYear();
    var sD = newS.getDate();
    var eM = newE.getMonth()+1;
    var eY = newE.getFullYear();
    var eD = newE.getDate();
    var ssM,ssD,eeM,eeD;
    if(sM<10) ssM="0"+sM;
    else ssM = sM;
    if(sD<10) ssD="0"+sD;
    else ssD = sD;
    if(eM<10) eeM="0"+eM;
    else eeM = eM;
    if(eD<10) eeD="0"+eD;
    else eeD = eD;

    var ns = sY+"/"+ssM+"/"+ssD+" "+"00:00" ;
    var ne = eY+"/"+eeM+"/"+eeD+" "+"23:59" ;
    if(select5 =="Sea temperature"){
        perfor_temp(ns,ne,select3,select4,select5);
    }
    if(select5 =="Tide height"){
        perfor_tide(ns,ne,select3,select4,select5);
    }
}

function query3(){
    var select1 = document.getElementById("startday2").value;
    var select2 = document.getElementById("endday2").value;
    var select3 = document.getElementById("area").value;
    var select4 = document.getElementById("indicators").value;
    var select5 = document.getElementById("kind").value;
    var parseDaY = d3.timeParse("%Y-%m-%d");
    var newS = parseDaY(select1);
    var newE = parseDaY(select2);
    var sM = newS.getMonth()+1;
    var sY = newS.getFullYear();
    var sD = newS.getDate();
    var eM = newE.getMonth()+1;
    var eY = newE.getFullYear();
    var eD = newE.getDate();
    var ssM,ssD,eeM,eeD;
    if(sM<10) ssM="0"+sM;
    else ssM = sM;
    if(sD<10) ssD="0"+sD;
    else ssD = sD;
    if(eM<10) eeM="0"+eM;
    else eeM = eM;
    if(eD<10) eeD="0"+eD;
    else eeD = eD;

    var ns = sY+"/"+ssM+"/"+ssD+" "+"00:00" ;
    var ne = eY+"/"+eeM+"/"+eeD+" "+"23:59" ;
    if(select5 =="Sea temperature"){
        perfor_temp2(ns,ne,select3,select4,select5);
    }
    if(select5 =="Tide height"){
        perfor_tide2(ns,ne,select3,select4,select5);
    }
}

var Url = 'http://120.126.151.152:5002/temp+tide/';
var Url1 = 'http://120.126.151.152:5002/predict_sea/';
var Url2 = 'http://120.126.151.152:5002/perfor/';

function old_temp(value,start,end){
    let data = [];
    let data2 = []; 
    let data3 = [];
    let data4 = [];
    let data5 = [];
    async function getData() {
        dataGet = await d3.json(Url+value);
        data2 = dataGet.filter(i=> i.time >= start );
        data = data2.filter(i=> i.time <= end ); 
        drawChart()
    };
    getData()

    function drawChart(){
        d3.select('.chart svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
        //   const zoom = d3.zoom()
        //                 .scaleExtent([1, 10])
        //                 .translateExtent([[margin, margin], [rwdSvgWidth - margin, rwdSvgHeight - margin]])
        //                 .on("zoom", zoomed);
                    
            const svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', rwdSvgWidth)
                    .attr('height', rwdSvgHeight)
                    // .call(zoom)
        
        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 200)
        .attr("y", 70)
        .attr("font-size", "20px")
        .attr("class", "title")
        .text("Sea temperature Line Chart")
        .style("font-size", "5rem")
        .style("stroke","red");

        var clip = svg.append("defs").append("SVG:clipPath")
                                    .attr("id", "clip")
                                    .append("SVG:rect")
                                    .attr("width", rwdSvgWidth - margin*2)
                                    .attr("height", rwdSvgHeight - margin*2)
                                    .style("fill", "none")
                                    .style("pointer-events", "all")
                                    .attr("x", margin)
                                    .attr("y", margin);

        var parseDate = d3.timeParse("%Y/%m/%d %H:%M");
        xData = data.map((i) => parseDate(i.time)); 
        yData = data.map((i) => parseFloat(i.temp));
        
        const xScale = d3.scaleTime()
                        .domain(d3.extent(xData))
                        .range([margin, rwdSvgWidth - margin]); // 寬度
        
        const xAxis = d3.axisBottom(xScale)
                        .ticks(24)

        const xAxisGroup = svg.append("g")
                        .call(xAxis)
                        .attr('id', 'axis_x')
                        .attr("transform", `translate(0,${rwdSvgHeight - margin + marginBottom * 2})`) // 調整刻度位置
                        .selectAll("text")
                        .style("font-size", "16px")
                        .attr("transform", "rotate(-35)");
        
        
        const yScale = d3.scaleLinear()
                        .domain([d3.min(yData)-1,d3.max(yData)+1])
                        .range([rwdSvgHeight - margin, margin]) 
                        .nice();// 數值要顛倒，才會從低往高排
        const yAxis = d3.axisLeft(yScale)
       
        const yAxisGroup = svg.append("g")
                            .call(yAxis)
                            .attr('id', 'axis_y')
                            .attr("transform", `translate(${margin},0)`)
                            .selectAll("text")
                            .style("font-size","16px")

        
                            svg.append("text")
                            .attr("class", "yaxis-label")
                            .text("Sea temperature")
                            .attr("x", marginLeft*3)
                            .attr("y", marginBottom*5)
                            .style("fill", "#333333")
                            .style("font-size", "1rem")
                            .style("stroke","green");
                                   
            var lineChart = d3.line()
                            .x((d) => xScale(parseDate(d.time)))
                            .y((d) => yScale(parseFloat(d.temp)))
                                   
                            let filteredData = data.filter(d => d.temp > 0);

                            var path =  svg.append("g")
                            .attr("clip-path", "url(#clip)");

                            path
                            .append("path")
                            .data(data)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line")
                            .attr("fill", "none")
                            .attr("stroke", "green")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData)); 

        const tooltip = d3.select('.chart')
                            .append('div')
                            .style('position', 'absolute')
                            .style("opacity", 0)
                            .style("background-color", "white")
                            .style("border", "1px solid black")
                            .style("border-radius", "5px")
                            .style("padding", "5px")
                
                    var scatter = svg.append('g')
                                .attr("clip-path", "url(#clip)")
                            
                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '5')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'green')
                            .attr('stroke', '#2a8e36')
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)
                
                    function dotsMouseover(d){
                    const pt = d3.pointer(event, svg.node())
                    tooltip.style("opacity", 100)
                            .style('left', (pt[0]+20) + 'px')
                            .style('top', (pt[1]) + 'px')
                            .html(`<p>time: ${d.target.__data__.time}</p>`+
                                    `<p>Sea Temperature: ${d.target.__data__.temp}℃</p>`)
                    }
                    function dotsMouseleave(){
                        tooltip.style('opacity', 0)
                        svg.selectAll('.dashed-X').remove()
                        svg.selectAll('.dashed-Y').remove()
                        }   

                        // function zoomed(ev) {                    
                        //     const newX = ev.transform.rescaleX(xScale);
                        //     const newY = ev.transform.rescaleY(yScale); 


                        //     var lineChart2 = d3.line()
                        //     .x((d) => newX(parseDate(d.time)))
                        //     .y((d) => newY(parseFloat(d.temp)))               

                        //     svg.select('#axis_x').transition().call(d3.axisBottom(newX));
                        //     svg.select('#axis_y').transition().call(d3.axisLeft(newY));
            
                        //     svg.select(".line")
                        //             .transition()
                        //             .attr("d", lineChart2(filteredData))
                        //             .attr('transform', ev.transform)
                                    
                        //     svg.selectAll("circle")
                        //             .transition()
                        //             .attr('cx', d => newX(parseDate(d.time)))
                        //             .attr('cy', d => newY(parseFloat(d.temp)))
                        //             .attr('transform', ev.transform)
                        //             .attr('r', '5')                          
                        // }
        
        }
        d3.select(window).on('resize', drawChart);
}

function old_tide(value,start,end){
    let data = [];
    let data2 = []; 
    async function getData() {
        dataGet = await d3.json(Url+value);
        data2 = dataGet.filter(i=> i.time >= start );
        data = data2.filter(i=> i.time <= end ); 
        drawChart()
    };
    getData()

    function drawChart(){
        d3.select('.chart2 svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart2').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
                    
            const svg = d3.select('.chart2')
                    .append('svg')
                    .attr('width', rwdSvgWidth)
                    .attr('height', rwdSvgHeight)
        
        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 200)
        .attr("y", 70)
        .attr("font-size", "20px")
        .attr("class", "title")
        .text("Tide Height Line Chart")
        .style("font-size", "5rem")
        .style("stroke","red");

        var clip = svg.append("defs").append("SVG:clipPath")
                                    .attr("id", "clip")
                                    .append("SVG:rect")
                                    .attr("width", rwdSvgWidth - margin*2)
                                    .attr("height", rwdSvgHeight - margin*2)
                                    .style("fill", "none")
                                    .style("pointer-events", "all")
                                    .attr("x", margin)
                                    .attr("y", margin);

        var parseDate = d3.timeParse("%Y/%m/%d %H:%M");
        xData = data.map((i) => parseDate(i.time)); 
        yData = data.map((i) => parseFloat(i.tide));
        
        const xScale = d3.scaleTime()
                        .domain(d3.extent(xData))
                        .range([margin, rwdSvgWidth - margin]); // 寬度
        
        const xAxis = d3.axisBottom(xScale)
                        .ticks(24)

        const xAxisGroup = svg.append("g")
                        .call(xAxis)
                        .attr('id', 'axis_x')
                        .attr("transform", `translate(0,${rwdSvgHeight - margin + marginBottom * 2})`) // 調整刻度位置
                        .selectAll("text")
                        .style("font-size", "16px")
                        .attr("transform", "rotate(-35)");
        
        
        const yScale = d3.scaleLinear()
                        .domain([d3.min(yData)-1,d3.max(yData)+1])
                        .range([rwdSvgHeight - margin, margin]) 
                        .nice();// 數值要顛倒，才會從低往高排
        const yAxis = d3.axisLeft(yScale)
       
        const yAxisGroup = svg.append("g")
                            .call(yAxis)
                            .attr('id', 'axis_y')
                            .attr("transform", `translate(${margin},0)`)
                            .selectAll("text")
                            .style("font-size","16px")

        
                            svg.append("text")
                            .attr("class", "yaxis-label")
                            .text("Tide Height")
                            .attr("x", marginLeft*3)
                            .attr("y", marginBottom*5)
                            .style("fill", "#333333")
                            .style("font-size", "1rem")
                            .style("stroke","green");
                                   
            var lineChart = d3.line()
                            .x((d) => xScale(parseDate(d.time)))
                            .y((d) => yScale(parseFloat(d.tide)))
                                   
                            let filteredData = data.filter(d => d.tide > -5);

                            var path =  svg.append("g")
                            .attr("clip-path", "url(#clip)");

                            path
                            .append("path")
                            .data(data)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line")
                            .attr("fill", "none")
                            .attr("stroke", "green")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData)); 

        const tooltip = d3.select('.chart2')
                            .append('div')
                            .style('position', 'absolute')
                            .style("opacity", 0)
                            .style("background-color", "white")
                            .style("border", "1px solid black")
                            .style("border-radius", "5px")
                            .style("padding", "5px")
                
                    var scatter = svg.append('g')
                                .attr("clip-path", "url(#clip)")
                            
                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '5')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'green')
                            .attr('stroke', '#2a8e36')
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)
                
                    function dotsMouseover(d){
                    const pt = d3.pointer(event, svg.node())
                    tooltip.style("opacity", 100)
                            .style('left', (pt[0]+20) + 'px')
                            .style('top', (pt[1]) + 'px')
                            .html(`<p>time: ${d.target.__data__.time}</p>`+
                                    `<p>Tide Height: ${d.target.__data__.tide}m</p>`)
                    }
                    function dotsMouseleave(){
                        tooltip.style('opacity', 0)
                        svg.selectAll('.dashed-X').remove()
                        svg.selectAll('.dashed-Y').remove()
                        }   

                    
        
        }
        d3.select(window).on('resize', drawChart);
}

function temp(value,start,end){
    let data = [];
    let data1 = []; 
    let data2 = []; 
    let data3 = []; 
    let data4 = [];
    let data5 = [];
    let data6 = [];
    let data7 = [];
    let data8 = [];
    async function getData() {
        dataGet = await d3.json(Url+value);
        data = dataGet.filter(i => i.time >= start && i.time <= end);
        getData1()
    };
    getData()

    async function getData1() {
        dataGet1 = await d3.json(Url1 + value+'_temp1'); // Fetch data for the second line
        data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
        getData2();
    };
    async function getData2() {
        dataGet2 = await d3.json(Url1+value+'_temp2');
        data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
        getData3()
    };
    async function getData3() {
        dataGet3 = await d3.json(Url1+value+'_temp3');
        data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
        getData4()
    };
    async function getData4() {
        dataGet4 = await d3.json(Url1+value+'_temp4');
        data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
        getData5()
    };
    async function getData5() {
        dataGet5 = await d3.json(Url1+value+'_temp5');
        data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
        getData6()
    };
    async function getData6() {
        dataGet6 = await d3.json(Url1+value+'_temp6');
        data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
        getData7()
    };
    async function getData7() {
        dataGet7 = await d3.json(Url1+value+'_temp7');
        data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
        getData8()
    };
    async function getData8() {
        dataGet8 = await d3.json(Url1+value+"_temp8");
        data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
        drawChart()
    };

    function drawChart(){
        d3.select('.chart svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
            const svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', rwdSvgWidth)
                    .attr('height', rwdSvgHeight)
        
        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 200)
        .attr("y", 70)
        .attr("font-size", "20px")
        .attr("class", "title")
        .text("Sea temperature Line Chart")
        .style("font-size", "5rem")
        .style("stroke","red");

        var clip = svg.append("defs").append("SVG:clipPath")
                                    .attr("id", "clip")
                                    .append("SVG:rect")
                                    .attr("width", rwdSvgWidth - margin*2)
                                    .attr("height", rwdSvgHeight - margin*2)
                                    .style("fill", "none")
                                    .style("pointer-events", "all")
                                    .attr("x", margin)
                                    .attr("y", margin);

        var parseDate = d3.timeParse("%Y/%m/%d %H:%M");
        xData = data.map((i) => parseDate(i.time));  
        xData1 = data1.map((i) => parseDate(i.time)); 
        xData2 = data2.map((i) => parseDate(i.time)); 
        xData3 = data3.map((i) => parseDate(i.time));     
        xData4 = data4.map((i) => parseDate(i.time));
        xData5 = data5.map((i) => parseDate(i.time));
        xData6 = data6.map((i) => parseDate(i.time));
        xData7 = data7.map((i) => parseDate(i.time));
        xData8 = data8.map((i) => parseDate(i.time));        
        yData = data.map((i) => parseFloat(i.temp));
        yData1 = data1.map((i) => parseFloat(i.temp));
        yData2 = data2.map((i) => parseFloat(i.temp));
        yData3 = data3.map((i) => parseFloat(i.temp));
        yData4 = data4.map((i) => parseFloat(i.temp));
        yData5 = data5.map((i) => parseFloat(i.temp));
        yData6 = data6.map((i) => parseFloat(i.temp));
        yData7 = data7.map((i) => parseFloat(i.temp));
        yData8 = data8.map((i) => parseFloat(i.temp));

        const xScale = d3.scaleTime()
                        .domain([d3.min(xData.concat(xData1,xData2,xData3,xData4,xData5,xData6,xData7,xData8)),
                                d3.max(xData.concat(xData1,xData2,xData3,xData4,xData5,xData6,xData7,xData8))])
                        .range([margin, rwdSvgWidth - margin]); // 寬度
        
        // const timeFormat = d3.timeFormat("%Y/%m/%d %H %hr"); // 注意没有换行符

        const xAxis = d3.axisBottom(xScale)
                    .ticks(12)
                    // .tickFormat(timeFormat);

        const xAxisGroup = svg.append("g")
                        .call(xAxis)
                        .attr('id', 'axis_x')
                        .attr("transform", `translate(0,${rwdSvgHeight - margin + marginBottom * 2})`) // 調整刻度位置
                        .selectAll("text")
                        .style("font-size", "16px");
                        // .attr("transform", "rotate(-35)");
        
        
        const yScale = d3.scaleLinear()
                        .domain([d3.min(yData.concat(yData1,yData2,yData3,yData4,yData5,yData6,yData7,yData8))-1,
                                d3.max(yData.concat(yData1,yData2,yData3,yData4,yData5,yData6,yData7,yData8))+1])
                        .range([rwdSvgHeight - margin, margin]) 
                        .nice();// 數值要顛倒，才會從低往高排
        const yAxis = d3.axisLeft(yScale)
       
        const yAxisGroup = svg.append("g")
                            .call(yAxis)
                            .attr('id', 'axis_y')
                            .attr("transform", `translate(${margin},0)`)
                            .selectAll("text")
                            .style("font-size","16px")

        
                            svg.append("text")
                            .attr("class", "yaxis-label")
                            .text("Sea temperature")
                            .attr("x", marginLeft*3)
                            .attr("y", marginBottom*5)
                            .style("fill", "#333333")
                            .style("font-size", "1rem")
                            .style("stroke","green");
                                   
            var lineChart = d3.line()
                            .x((d) => xScale(parseDate(d.time)))
                            .y((d) => yScale(parseFloat(d.temp)))
                                   
                            let filteredData = data.filter(d => d.temp > 0);
                            let filteredData1 = data1.filter(d => d.temp > 0);
                            let filteredData2 = data2.filter(d => d.temp > 0);
                            let filteredData3 = data3.filter(d => d.temp > 0);
                            let filteredData4 = data4.filter(d => d.temp > 0);
                            let filteredData5 = data5.filter(d => d.temp > 0);
                            let filteredData6 = data6.filter(d => d.temp > 0);
                            let filteredData7 = data7.filter(d => d.temp > 0);
                            let filteredData8 = data8.filter(d => d.temp > 0);

                            var path =  svg.append("g")
                            .attr("clip-path", "url(#clip)");

                            path
                            .append("path")
                            .data(data)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData)); 

                            path
                            .append("path")
                            .data(data1)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "blue")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData1));

                            path
                            .append("path")
                            .data(data2)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "red")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData2));

                            path
                            .append("path")
                            .data(data3)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "orange")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData3));

                            path
                            .append("path")
                            .data(data4)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "green")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData4));

                            path
                            .append("path")
                            .data(data5)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "navy")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData5));

                            path
                            .append("path")
                            .data(data6)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "lime")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData6));

                            path
                            .append("path")
                            .data(data7)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "orchid")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData7));

                            path
                            .append("path")
                            .data(data8)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line1")
                            .attr("fill", "none")
                            .attr("stroke", "brown")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData8));



        const tooltip = d3.select('.chart')
                            .append('div')
                            .style('position', 'absolute')
                            .style("opacity", 0)
                            .style("background-color", "white")
                            .style("border", "1px solid black")
                            .style("border-radius", "1px")
                            .style("padding", "1px")
                
                    var scatter = svg.append('g')
                                .attr("clip-path", "url(#clip)")
                            
                            scatter
                            .append('g')
                            .attr("class","circle")
                            .selectAll('circle')
                            .data(filteredData)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'black')
                            .attr('stroke', 'black')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            
                            scatter
                            .append('g')
                            .selectAll('circle1')
                            .attr("class","circle")
                            .data(filteredData1)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'blue')
                            .attr('stroke', 'blue')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData2)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'red')
                            .attr('stroke', 'red')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData3)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'orange')
                            .attr('stroke', 'orange')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData4)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'green')
                            .attr('stroke', 'green')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData5)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'navy')
                            .attr('stroke', 'navy')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData6)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'lime')
                            .attr('stroke', 'lime')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData7)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'orchid')
                            .attr('stroke', 'orchid')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)

                            scatter
                            .append('g')
                            .selectAll('circle')
                            .attr("class","circle")
                            .data(filteredData8)
                            .join('circle')
                            .attr("clip-path", "url(#clip)")
                            .attr('r', '1')
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.temp)))
                            .attr('fill', 'brown')
                            .attr('stroke', 'brown')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave)
                
                    function dotsMouseover(d){
                    const pt = d3.pointer(event, svg.node())
                    tooltip.style("opacity", 100)
                            .style('left', (pt[0]+20) + 'px')
                            .style('top', (pt[1]) + 'px')
                            .html(`<p>Time: ${d.target.__data__.time}</p>`+
                                    `<p>Sea Temperature: ${d.target.__data__.temp}℃</p>`)
                    }
                    function dotsMouseleave(){
                        tooltip.style('opacity', 0)
                        svg.selectAll('.dashed-X').remove()
                        svg.selectAll('.dashed-Y').remove()
                        } 
                        
                        
                    const legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(" + (rwdSvgWidth - margin) + "," + (margin / 2) + ")");
                
                    // 添加矩形和對應的文字
                    const colors = ["black", "blue", "red", "orange", "green","navy","lime","orchid","brown"]; // 對應線的顏色
                    const labels = ["Actual", "1 hour", "2 hours", "3 hours", "4 hours","5 hours","6 hours","7 hours","8 hours"]; // 對應線的名稱
                
                    legend.selectAll("rect")
                        .data(colors)
                        .enter()
                        .append("rect")
                        .attr("x", 0)
                        .attr("y", (d, i) => i * 20)
                        .attr("width", 10)
                        .attr("height", 10)
                        .attr("fill", d => d)
                
                    legend.selectAll("text")
                        .data(labels)
                        .enter()
                        .append("text")
                        .attr("x", 20)
                        .attr("y", (d, i) => i * 20 + 10)
                        .style("font-size", "14px")
                        .text(d => d);  
                        
                        // Add event listeners to checkboxes
                    d3.select("#checkbox-black").on("change", () => toggleLineVisibility("black", "chart"));
                    d3.select("#checkbox-blue").on("change", () => toggleLineVisibility("blue", "chart"));
                    d3.select("#checkbox-red").on("change", () => toggleLineVisibility("red", "chart"));
                    d3.select("#checkbox-orange").on("change", () => toggleLineVisibility("orange", "chart"));
                    d3.select("#checkbox-green").on("change", () => toggleLineVisibility("green", "chart"));
                    d3.select("#checkbox-navy").on("change", () => toggleLineVisibility("navy", "chart"));
                    d3.select("#checkbox-lime").on("change", () => toggleLineVisibility("lime", "chart"));
                    d3.select("#checkbox-orchid").on("change", () => toggleLineVisibility("orchid", "chart"));
                    d3.select("#checkbox-brown").on("change", () => toggleLineVisibility("brown", "chart"));

                    function toggleLineVisibility(color, chartName) {
                        const isChecked = d3.select(`#checkbox-${color}`).property("checked");
                        
                        console.log(`Toggle #checkbox-${color} visibility: ${isChecked}`);
                        
                        const line = d3.select(`.line1[stroke="${color}"]`);
                        line.style("display", isChecked ? "initial" : "none");
                        
                        const scatterGroup = d3.selectAll(`circle[fill="${color}"]`);
                        scatterGroup.style("display", isChecked ? "initial" : "none");
                    }
        }
        d3.select(window).on('resize', drawChart);
}

function tide(value,start,end){
    let data = [];
    let data1 = []; 
    let data2 = []; 
    let data3 = [];
    let data4 = [];
    let data5 = [];
    let data6 = []; 
    let data7 = [];
    let data8 = [];
    a();
    function a(){
    getData();
    async function getData() {
        dataGet = await d3.json(Url+value);
        data = dataGet.filter(i => i.time >= start && i.time <= end && !isNaN(i.tide));
        getData1();
    };
    async function getData1() {
        dataGet1 = await d3.json(Url1 + value+'_tide1'); // Fetch data for the second line
        data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
        getData2();
    };
    async function getData2() {
        dataGet2 = await d3.json(Url1+value+'_tide2');
        data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
        getData3();
    };
    async function getData3() {
        dataGet3 = await d3.json(Url1+value+'_tide3');
        data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
        getData4();
    };
    async function getData4() {
        dataGet4 = await d3.json(Url1+value+'_tide4');
        data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
        getData5();
    };
    async function getData5() {
        dataGet5 = await d3.json(Url1+value+'_tide5');
        data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
        getData6();
    };
    async function getData6() {
        dataGet6 = await d3.json(Url1+value+'_tide6');
        data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
        getData7();
    };
    async function getData7() {
        dataGet7 = await d3.json(Url1+value+'_tide7');
        data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
        getData8();
    };
    async function getData8() {
        dataGet8 = await d3.json(Url1+value+"_tide8");
        data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
        drawChart2();
    };
}

    function drawChart2(){
        d3.select('.chart2 svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart2').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
            const svg = d3.select('.chart2')
                    .append('svg')
                    .attr('width', rwdSvgWidth)
                    .attr('height', rwdSvgHeight);
        
        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 200)
        .attr("y", 70)
        .attr("font-size", "20px")
        .attr("class", "title")
        .text("Tide Height Line Chart")
        .style("font-size", "5rem")
        .style("stroke","red");

        var clip = svg.append("defs").append("SVG:clipPath")
                                    .attr("id", "clip")
                                    .append("SVG:rect")
                                    .attr("width", rwdSvgWidth - margin*2)
                                    .attr("height", rwdSvgHeight - margin*2)
                                    .style("fill", "none")
                                    .style("pointer-events", "all")
                                    .attr("x", margin)
                                    .attr("y", margin);

        var parseDate = d3.timeParse("%Y/%m/%d %H:%M");
        xData = data.map((i) => parseDate(i.time));  
        xData1 = data1.map((i) => parseDate(i.time)); 
        xData2 = data2.map((i) => parseDate(i.time)); 
        xData3 = data3.map((i) => parseDate(i.time));     
        xData4 = data4.map((i) => parseDate(i.time));
        xData5 = data5.map((i) => parseDate(i.time));
        xData6 = data6.map((i) => parseDate(i.time));
        xData7 = data7.map((i) => parseDate(i.time));
        xData8 = data8.map((i) => parseDate(i.time));        
        yData = data.map((i) => parseFloat(i.tide));
        yData1 = data1.map((i) => parseFloat(i.tide));
        yData2 = data2.map((i) => parseFloat(i.tide));
        yData3 = data3.map((i) => parseFloat(i.tide));
        yData4 = data4.map((i) => parseFloat(i.tide));
        yData5 = data5.map((i) => parseFloat(i.tide));
        yData6 = data6.map((i) => parseFloat(i.tide));
        yData7 = data7.map((i) => parseFloat(i.tide));
        yData8 = data8.map((i) => parseFloat(i.tide));

        const xScale = d3.scaleTime()
                        .domain([d3.min(xData.concat(xData1,xData2,xData3,xData4,xData5,xData6,xData7,xData8)),
                                d3.max(xData.concat(xData1,xData2,xData3,xData4,xData5,xData6,xData7,xData8))])
                        .range([margin, rwdSvgWidth - margin]); // 寬度
        
        const xAxis = d3.axisBottom(xScale)
                        .ticks(12);

        const xAxisGroup = svg.append("g")
                        .call(xAxis)
                        .attr('id', 'axis_x')
                        .attr("transform", `translate(0,${rwdSvgHeight - margin + marginBottom * 2})`) // 調整刻度位置
                        .selectAll("text")
                        .style("font-size", "16px");
                        // .attr("transform", "rotate(-35)");
        
        
        const yScale = d3.scaleLinear()
                        .domain([d3.min(yData.concat(yData1,yData2,yData3,yData4,yData5,yData6,yData7,yData8))-1,
                                d3.max(yData.concat(yData1,yData2,yData3,yData4,yData5,yData6,yData7,yData8))+1])
                        .range([rwdSvgHeight - margin, margin]) 
                        .nice();// 數值要顛倒，才會從低往高排

        const yAxis = d3.axisLeft(yScale);
       
        const yAxisGroup = svg.append("g")
                            .call(yAxis)
                            .attr('id', 'axis_y')
                            .attr("transform", `translate(${margin},0)`)
                            .selectAll("text")
                            .style("font-size","16px");

        
                            svg.append("text")
                            .attr("class", "yaxis-label")
                            .text("Tide Height")
                            .attr("x", marginLeft*3)
                            .attr("y", marginBottom*5)
                            .style("fill", "#333333")
                            .style("font-size", "1rem")
                            .style("stroke","green");
                                   
            var lineChart = d3.line()
                            .x((d) => xScale(parseDate(d.time)))
                            .y((d) => yScale(parseFloat(d.tide)))
                            
                                   
                            let filteredData = data.filter(d => d.tide > -10);
                            let filteredData1 = data1.filter(d => d.tide > -10);
                            let filteredData2 = data2.filter(d => d.tide > -10);
                            let filteredData3 = data3.filter(d => d.tide > -10);
                            let filteredData4 = data4.filter(d => d.tide > -10);
                            let filteredData5 = data5.filter(d => d.tide > -10);
                            let filteredData6 = data6.filter(d => d.tide > -10);
                            let filteredData7 = data7.filter(d => d.tide > -10);
                            let filteredData8 = data8.filter(d => d.tide > -10);

                            var path =  svg.append("g")
                            .attr("clip-path", "url(#clip)");

                            path
                            .append("path")
                            .data(data)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData)); 



                            path
                            .append("path")
                            .data(data1)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "blue")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData1));

                            path
                            .append("path")
                            .data(data2)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "red")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData2));

                            path
                            .append("path")
                            .data(data3)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "orange")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData3));

                            path
                            .append("path")
                            .data(data4)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "green")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData4));

                            path
                            .append("path")
                            .data(data5)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "navy")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData5));

                            path
                            .append("path")
                            .data(data6)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "lime")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData6));

                            path
                            .append("path")
                            .data(data7)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "orchid")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData7));

                            path
                            .append("path")
                            .data(data8)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line2")
                            .attr("fill", "none")
                            .attr("stroke", "brown")
                            .attr("stroke-width", 1.5)
                            //.attr("stroke-dasharray", '4,4')
                            .attr("d", lineChart(filteredData8));



        const tooltip = d3.select('.chart2')
                            .append('div')
                            .style('position', 'absolute')
                            .style("opacity", 0)
                            .style("background-color", "white")
                            .style("border", "1px solid black")
                            .style("border-radius", "1px")
                            .style("padding", "1px");
                
                    var scatter = svg.append('g')
                                .attr("clip-path", "url(#clip)");
                            
                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'black')
                            .attr('stroke', 'black')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData1)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'blue')
                            .attr('stroke', 'blue')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData2)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'red')
                            .attr('stroke', 'red')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData3)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'orange')
                            .attr('stroke', 'orange')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData4)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'green')
                            .attr('stroke', 'green')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData5)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'navy')
                            .attr('stroke', 'navy')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData6)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'lime')
                            .attr('stroke', 'lime')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData7)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'orchid')
                            .attr('stroke', 'orchid')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);

                            scatter
                            .append('g')
                            .selectAll('ellipse') // 使用<ellipse>元素
                            .attr("class", "ellipse") // 修改类名
                            .data(filteredData8)
                            .join('ellipse') // 使用<ellipse>元素
                            .attr("clip-path", "url(#clip)")
                            .attr('rx', '1') // 设置椭圆的 x 半径
                            .attr('ry', '1') // 设置椭圆的 y 半径
                            .attr('cx', d => xScale(parseDate(d.time)))
                            .attr('cy', d => yScale(parseFloat(d.tide)))
                            .attr('fill', 'brown')
                            .attr('stroke', 'brown')
                            .style("display", "initial")
                            .attr('stroke-width', '2')
                            .attr("transform", "translate(" +rwdSvgWidth - margin + "," +rwdSvgHeight - margin+ ")")
                            .style('cursor', 'pointer')
                            .on('mouseover', dotsMouseover)
                            .on('mouseleave', dotsMouseleave);
                
                    function dotsMouseover(d){
                    const pt = d3.pointer(event, svg.node())
                    tooltip.style("opacity", 100)
                            .style('left', (pt[0]+20) + 'px')
                            .style('top', (pt[1]) + 'px')
                            .html(`<p>Time: ${d.target.__data__.time}</p>`+
                                    `<p>Tide Height: ${d.target.__data__.tide}m</p>`)
                    }
                    function dotsMouseleave(){
                        tooltip.style('opacity', 0);
                        svg.selectAll('.dashed-X').remove();
                        svg.selectAll('.dashed-Y').remove();
                        }          


                        const legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("transform", "translate(" + (rwdSvgWidth - margin) + "," + (margin / 2) + ")");
                
                    // 添加矩形和對應的文字
                    const colors = ["black", "blue", "red", "orange", "green","navy","lime","orchid","brown"]; // 對應線的顏色
                    const labels = ["Actual", "1 hour", "2 hours", "3 hours", "4 hours","5 hours","6 hours","7 hours","8 hours"]; // 對應線的名稱
                
                    legend.selectAll("rect")
                        .data(colors)
                        .enter()
                        .append("rect")
                        .attr("x", 0)
                        .attr("y", (d, i) => i * 20)
                        .attr("width", 10)
                        .attr("height", 10)
                        .attr("fill", d => d);
                
                    legend.selectAll("text")
                        .data(labels)
                        .enter()
                        .append("text")
                        .attr("x", 20)
                        .attr("y", (d, i) => i * 20 + 10)
                        .style("font-size", "14px")
                        .text(d => d);      
                        
                         // Add event listeners to checkboxes
                    d3.select("#checkbox2-black").on("change", () => toggleLineVisibility2("black", "chart2"));
                    d3.select("#checkbox2-blue").on("change", () => toggleLineVisibility2("blue", "chart2"));
                    d3.select("#checkbox2-red").on("change", () => toggleLineVisibility2("red", "chart2"));
                    d3.select("#checkbox2-orange").on("change", () => toggleLineVisibility2("orange", "chart2"));
                    d3.select("#checkbox2-green").on("change", () => toggleLineVisibility2("green", "chart2"));
                    d3.select("#checkbox2-navy").on("change", () => toggleLineVisibility2("navy", "chart2"));
                    d3.select("#checkbox2-lime").on("change", () => toggleLineVisibility2("lime", "chart2"));
                    d3.select("#checkbox2-orchid").on("change", () => toggleLineVisibility2("orchid", "chart2"));
                    d3.select("#checkbox2-brown").on("change", () => toggleLineVisibility2("brown", "chart2"));

                    function toggleLineVisibility2(color, chartName) {
                        const isChecked2 = d3.select(`#checkbox2-${color}`).property("checked");
                        
                        console.log(`Toggle #checkbox2-${color} visibility: ${isChecked2}`);
                        
                        const line2 = d3.select(`.line2[stroke="${color}"]`);
                        console.log(`Selected line for color ${color}:`, line2.node());
                        line2.style("display", isChecked2 ? "initial" : "none");
                        
                        const scatterGroup2 = d3.selectAll(`ellipse[fill="${color}"]`);
                        console.log(`Selected scatterGroup2 for color ${color}:`, scatterGroup2.nodes());
                        scatterGroup2.style("display", isChecked2 ? "initial" : "none");
                    }
        }
        d3.select(window).on('resize', drawChart2);
}

function old_perfor(hour,pointer,location){

    if(hour == "first_hour"){
        times = "1";
    }
    if(hour == "second_hour"){
        times = "2";
    }
    if(hour == "third_hour"){
        times = "3";
    }
    if(hour == "forth_hour"){
        times = "4";
    }

    if(pointer == "MAE"){
        p = "1";
        a();
    }
    if(pointer == "RMSE"){
        p = "2";
        b();
    }
    if(pointer == "R2"){
        p = "3";
        c();
    }

    function a(){
        let data = []; 
        async function getData() {
            dataGet = await d3.json(Url1+pointer+"/"+hour+"/"+location+"_temp_"+times+p);
            data = dataGet        
            console.log(data)
            drawBarChart();
            // concat(dataGet.slice(10, 15)) // 選取10到14筆資料
            //           .concat(dataGet.slice(20, 25)); // 選取20到24筆資料
        };
        getData()
        function drawBarChart(){
            d3.select('.chart3 svg').remove();        
            const rwdSvgWidth = (parseInt(d3.select('.chart3').style('width'))) * 1,
              rwdSvgHeight = rwdSvgWidth * 0.4,
              margin = 80,
              bandWidth = 20,
              marginLeft = (rwdSvgWidth / 100), // 25
              marginBottom = (rwdSvgHeight / 80); // 30
                const svg = d3.select('.chart3')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight)
    
                
                xData = data.map((i) => i['name']);
                yData = data.map((i) => parseFloat(i.mae));
    
                console.log(xData)
                console.log(yData)
    
                const xScale = d3.scaleBand()
                    .domain(xData)
                    .range([margin*2, rwdSvgWidth - margin]) // 寬度
                    .padding(0.3)
                
                    
    
                const xAxis = d3.axisBottom(xScale)
                        .tickFormat(function(d) {
                            // 在这里根据需要自定义刻度名称
                            return customTickLabelFunction(d);
                        });
    
                const xAxisGroup = svg.append("g")
                          .call(xAxis)
                          .attr("transform", `translate(0,${rwdSvgHeight - marginBottom*3.1})`)
                          .selectAll("text")
                            .style("font-size", "16px")
                            .style("fill", "black"); 
    
                const yScale = d3.scaleLinear()
                            .domain([0,2])
                          .range([rwdSvgHeight - marginBottom, margin]) // 數值要顛倒，才會從低往高排
                          .nice() // 補上終點值
    
                const yAxis = d3.axisLeft(yScale)
                          .ticks(15)
                          .tickSize(1)
                          
                    
                const yAxisGroup = svg.append("g")
                          .call(yAxis)
                          .attr("transform", `translate(${margin*2},0)`)
                          .selectAll("text")
                        .style("font-size","16px")
    
                
                const bar = svg.selectAll("rect")
                          .data(data)
                          .join("rect")
                          .attr("x", d => xScale(d['name'])) // 讓長條圖在刻度線中間
                          .attr("y", d => yScale(parseFloat(d['mae'])))
                          .attr("width", xScale.bandwidth())
                          .attr('height', d => rwdSvgHeight*0.965 - yScale(d.mae))
                          .attr("fill", "#69b3a2")
                          .attr('cursor', 'pointer')
    
                          function customTickLabelFunction(tickValue) {
                            // 根据刻度值映射自定义刻度名称
                            // 这是一个示例，你可以根据实际的刻度值和名称进行扩展
                            const customNames = {
                                Amae1_1_1: "Adaboost",
                                Bmae1_1_1: "LSTM",
                                Cmae1_1_1: "MAE",
                                Dmae1_1_1: "MLR",
                                Emae1_1_1: "RF",
                                Fmae1_1_1: "SAM",
                                Gmae1_1_1: "SVM",
                                Amae2_1_1: "Adaboost",
                                Bmae2_1_1: "LSTM",
                                Cmae2_1_1: "MAE",
                                Dmae2_1_1: "MLR",
                                Emae2_1_1: "RF",
                                Fmae2_1_1: "SAM",
                                Gmae2_1_1: "SVM"
    
                                // ... 可以继续添加更多映射关系
                            };
                    
                            // 如果有对应的自定义名称，则返回自定义名称，否则返回原刻度值
                            return customNames[tickValue] || tickValue;
                        }
                        
                                              
        }
        d3.select(window).on('resize', drawBarChart);
    }

    function b(){
        let data = []; 
        async function getData() {
            dataGet = await d3.json(Url1+pointer+"/"+hour+"/"+location+"_temp_"+times+p);
            data = dataGet        
            console.log(data)
            drawBarChart2();
            // concat(dataGet.slice(10, 15)) // 選取10到14筆資料
            //           .concat(dataGet.slice(20, 25)); // 選取20到24筆資料
        };
        getData()
        function drawBarChart2(){
            d3.select('.chart3 svg').remove();        
            const rwdSvgWidth = (parseInt(d3.select('.chart3').style('width'))) * 1,
              rwdSvgHeight = rwdSvgWidth * 0.4,
              margin = 80,
              bandWidth = 20,
              marginLeft = (rwdSvgWidth / 100), // 25
              marginBottom = (rwdSvgHeight / 80); // 30
                const svg = d3.select('.chart3')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight)
    
                
                xData = data.map((i) => i['name']);
                yData = data.map((i) => parseFloat(i.rmse));
    
                console.log(xData)
                console.log(yData)
    
                const xScale = d3.scaleBand()
                    .domain(xData)
                    .range([margin*2, rwdSvgWidth - margin]) // 寬度
                    .padding(0.3)
                
                    
    
                const xAxis = d3.axisBottom(xScale)
                        .tickFormat(function(d) {
                            // 在这里根据需要自定义刻度名称
                            return customTickLabelFunction(d);
                        });
    
                const xAxisGroup = svg.append("g")
                          .call(xAxis)
                          .attr("transform", `translate(0,${rwdSvgHeight - marginBottom*3})`)
                          .selectAll("text")
                            .style("font-size", "16px")
                            .style("fill", "black"); 
    
                const yScale = d3.scaleLinear()
                            .domain([0,2])
                          .range([rwdSvgHeight - marginBottom, margin]) // 數值要顛倒，才會從低往高排
                          .nice() // 補上終點值
    
                const yAxis = d3.axisLeft(yScale)
                          .ticks(15)
                          .tickSize(1)
                          
                    
                const yAxisGroup = svg.append("g")
                          .call(yAxis)
                          .attr("transform", `translate(${margin*2},0)`)
                          .selectAll("text")
                        .style("font-size","16px")
    
                
                const bar = svg.selectAll("rect")
                          .data(data)
                          .join("rect")
                          .attr("x", d => xScale(d['name'])) // 讓長條圖在刻度線中間
                          .attr("y", d => yScale(parseFloat(d['mae'])))
                          .attr("width", xScale.bandwidth())
                          .attr('height', d => rwdSvgHeight*0.965 - yScale(d.rmse))
                          .attr("fill", "#69b3a2")
                          .attr('cursor', 'pointer')
    
                          function customTickLabelFunction(tickValue) {
                            // 根据刻度值映射自定义刻度名称
                            // 这是一个示例，你可以根据实际的刻度值和名称进行扩展
                            const customNames = {
                                Amae1_1_1: "Adaboost",
                                Bmae1_1_1: "LSTM",
                                Cmae1_1_1: "MAE",
                                Dmae1_1_1: "MLR",
                                Emae1_1_1: "RF",
                                Fmae1_1_1: "SAM",
                                Gmae1_1_1: "SVM",
                                Amae2_1_1: "Adaboost",
                                Bmae2_1_1: "LSTM",
                                Cmae2_1_1: "MAE",
                                Dmae2_1_1: "MLR",
                                Emae2_1_1: "RF",
                                Fmae2_1_1: "SAM",
                                Gmae2_1_1: "SVM"
    
                                // ... 可以继续添加更多映射关系
                            };
                    
                            // 如果有对应的自定义名称，则返回自定义名称，否则返回原刻度值
                            return customNames[tickValue] || tickValue;
                        }
                                              
        }
        d3.select(window).on('resize', drawBarChart2);
    }

    function c(){
        let data = []; 
        async function getData() {
            dataGet = await d3.json(Url1+pointer+"/"+hour+"/"+location+"_temp_"+times+p);
            data = dataGet        
            console.log(data)
            drawBarChart3();
            // concat(dataGet.slice(10, 15)) // 選取10到14筆資料
            //           .concat(dataGet.slice(20, 25)); // 選取20到24筆資料
        };
        getData()
        function drawBarChart3(){
            d3.select('.chart3 svg').remove();        
            const rwdSvgWidth = (parseInt(d3.select('.chart3').style('width'))) * 1,
              rwdSvgHeight = rwdSvgWidth * 0.4,
              margin = 80,
              bandWidth = 20,
              marginLeft = (rwdSvgWidth / 100), // 25
              marginBottom = (rwdSvgHeight / 80); // 30
                const svg = d3.select('.chart3')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight)
    
                
                xData = data.map((i) => i['name']);
                yData = data.map((i) => parseFloat(i.r2));
    
                console.log(xData)
                console.log(yData)
    
                const xScale = d3.scaleBand()
                    .domain(xData)
                    .range([margin*2, rwdSvgWidth - margin]) // 寬度
                    .padding(0.3)
                
                    
    
                const xAxis = d3.axisBottom(xScale)
                        .tickFormat(function(d) {
                            // 在这里根据需要自定义刻度名称
                            return customTickLabelFunction(d);
                        });
    
                const xAxisGroup = svg.append("g")
                          .call(xAxis)
                          .attr("transform", `translate(0,${rwdSvgHeight - marginBottom*3.1})`)
                          .selectAll("text")
                            .style("font-size", "16px")
                            .style("fill", "black"); 
    
                const yScale = d3.scaleLinear()
                            .domain([0,2])
                          .range([rwdSvgHeight - marginBottom, margin]) // 數值要顛倒，才會從低往高排
                          .nice() // 補上終點值
    
                const yAxis = d3.axisLeft(yScale)
                          .ticks(15)
                          .tickSize(1)
                          
                    
                const yAxisGroup = svg.append("g")
                          .call(yAxis)
                          .attr("transform", `translate(${margin*2},0)`)
                          .selectAll("text")
                        .style("font-size","16px")
    
                
                const bar = svg.selectAll("rect")
                          .data(data)
                          .join("rect")
                          .attr("x", d => xScale(d['name'])) // 讓長條圖在刻度線中間
                          .attr("y", d => yScale(parseFloat(d['mae'])))
                          .attr("width", xScale.bandwidth())
                          .attr('height', d => rwdSvgHeight*0.965 - yScale(d.r2))
                          .attr("fill", "#69b3a2")
                          .attr('cursor', 'pointer')
    
                          function customTickLabelFunction(tickValue) {
                            // 根据刻度值映射自定义刻度名称
                            // 这是一个示例，你可以根据实际的刻度值和名称进行扩展
                            const customNames = {
                                Amae1_1_1: "Adaboost",
                                Bmae1_1_1: "LSTM",
                                Cmae1_1_1: "MAE",
                                Dmae1_1_1: "MLR",
                                Emae1_1_1: "RF",
                                Fmae1_1_1: "SAM",
                                Gmae1_1_1: "SVM",
                                Amae2_1_1: "Adaboost",
                                Bmae2_1_1: "LSTM",
                                Cmae2_1_1: "MAE",
                                Dmae2_1_1: "MLR",
                                Emae2_1_1: "RF",
                                Fmae2_1_1: "SAM",
                                Gmae2_1_1: "SVM"
    
                                // ... 可以继续添加更多映射关系
                            };
                    
                            // 如果有对应的自定义名称，则返回自定义名称，否则返回原刻度值
                            return customNames[tickValue] || tickValue;
                        }
                                              
        }
        d3.select(window).on('resize', drawBarChart3);
    }


    // d3.select(window).on('resize', drawBarChart);
    // d3.select(window).on('resize', drawBarChart2);
    // d3.select(window).on('resize', drawBarChart3);
}

function old_perfor2(hour,pointer){

    let data = []; 
    async function getData() {
        dataGet = await d3.json(Url1+pointer+"/"+hour);
        data = dataGet.slice(5, 10) // 選取0到4筆資料
                  .concat(dataGet.slice(15, 20)) // 選取10到14筆資料
                  .concat(dataGet.slice(25, 30)); // 選取20到24筆資料
        console.log(data)
        drawBarChart();
    };
    getData()
    function drawBarChart(){
        d3.select('.chart svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
            const svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', rwdSvgWidth)
                    .attr('height', rwdSvgHeight)
    }
    d3.select(window).on('resize', drawBarChart);
}

function old_perfor3(hour,pointer,location){

    if(hour == "first_hour"){
        times = "1";
    }

    let data = []; 
    async function getData() {
        dataGet = await d3.json(Url1+pointer+"/"+hour+"/"+location+"_temp_"+times);
        data = dataGet        
        console.log(data)
        drawBarChart();
        // concat(dataGet.slice(10, 15)) // 選取10到14筆資料
        //           .concat(dataGet.slice(20, 25)); // 選取20到24筆資料
    };
    getData()
    function drawBarChart(){
        d3.select('.chart3 svg').remove();        
        const rwdSvgWidth = (parseInt(d3.select('.chart3').style('width'))) * 1,
          rwdSvgHeight = rwdSvgWidth * 0.4,
          margin = 80,
          bandWidth = 20,
          marginLeft = (rwdSvgWidth / 100), // 25
          marginBottom = (rwdSvgHeight / 80); // 30
            const svg = d3.select('.chart3')
            .selectAll('svg')
            .data(data)
            .enter()
            .append('svg')
            .attr('width', rwdSvgWidth)
            .attr('height', rwdSvgHeight)
            .attr('class', 'individual-chart');

            xData = data.map((i) => i['name']);
            yData = data.map((i) => parseFloat(i.mae));

            console.log(xData)
            console.log(yData)

            const xScale = d3.scaleBand()
                .domain(xData)
                .range([margin*2, rwdSvgWidth - margin]) // 寬度
                .padding(0.3)
            
                

            const xAxis = d3.axisBottom(xScale)

            const xAxisGroup = svg.append("g")
                      .call(xAxis)
                      .attr("transform", `translate(0,${rwdSvgHeight - marginBottom*3})`)
                      .selectAll("text")
                        .style("font-size", "16px")
                        .style("fill", "black"); 

            const yScale = d3.scaleLinear()
                        .domain([0,1])
                      .range([rwdSvgHeight - marginBottom, margin]) // 數值要顛倒，才會從低往高排
                      .nice() // 補上終點值

            const yAxis = d3.axisLeft(yScale)
                      .ticks(5)
                      .tickSize(1)
                      
                
            const yAxisGroup = svg.append("g")
                      .call(yAxis)
                      .attr("transform", `translate(${margin*2},0)`)
                      .selectAll("text")
                    .style("font-size","16px")

            
            const bar = svg.selectAll("rect")
                      .data(data)
                      .join("rect")
                      .attr("x", d => xScale(d['name'])) // 讓長條圖在刻度線中間
                      .attr("y", d => yScale(parseFloat(d['mae'])))
                      .attr("width", xScale.bandwidth())
                      .attr('height', d => rwdSvgHeight*0.965 - yScale(d.mae))
                      .attr("fill", "#69b3a2")
                      .attr('cursor', 'pointer')

        
    }
    d3.select(window).on('resize', drawBarChart);
}

function perfor_temp(start,end,hour,pointer,kind){
    d3.select('.chart3 svg').remove();
    get_all_data();
    function get_all_data(){
        getData();
        async function getData() {
            dataGet = await d3.json(Url+"dongji");
            data = dataGet.filter(i => i.time >= start && i.time <= end);
            getData1()
        };
        async function getData1() {
            dataGet1 = await d3.json(Url2+"Mlr_dongji_temp"+hour);
            data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
            getData2()
        };
        async function getData2() {
            dataGet2 = await d3.json(Url2+"Ada_dongji_temp"+hour);
            data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
            getData3()
        };
        async function getData3() {
            dataGet3 = await d3.json(Url2+"Lstm_dongji_temp"+hour);
            data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
            getData4()
        };
        async function getData4() {
            dataGet4 = await d3.json(Url2+"Mae_dongji_temp"+hour);
            data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
            getData5()
        };
        async function getData5() {
            dataGet5 = await d3.json(Url2+"Rf_dongji_temp"+hour);
            data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
            getData6()
        };
        async function getData6() {
            dataGet6 = await d3.json(Url2+"Sam_dongji_temp"+hour);
            data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
            getData7()
        };
        async function getData7() {
            dataGet7 = await d3.json(Url2+"Svm_dongji_temp"+hour);
            data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
            getData8()
        };
        async function getData8() {
            dataGet8 = await d3.json(Url+"jiangjyun");
            data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
            getData9()
        };
        async function getData9() {
            dataGet9 = await d3.json(Url2+"Mlr_jiangjyun_temp"+hour);
            data9 = dataGet9.filter(i => i.time >= start && i.time <= end);
            getData10()
        };
        async function getData10() {
            dataGet10 = await d3.json(Url2+"Ada_jiangjyun_temp"+hour);
            data10 = dataGet10.filter(i => i.time >= start && i.time <= end);
            getData11()
        };
        async function getData11() {
            dataGet11 = await d3.json(Url2+"Lstm_jiangjyun_temp"+hour);
            data11 = dataGet11.filter(i => i.time >= start && i.time <= end);
            getData12()
        };
        async function getData12() {
            dataGet12 = await d3.json(Url2+"Mae_jiangjyun_temp"+hour);
            data12 = dataGet12.filter(i => i.time >= start && i.time <= end);
            getData13()
        };
        async function getData13() {
            dataGet13 = await d3.json(Url2+"Rf_jiangjyun_temp"+hour);
            data13 = dataGet13.filter(i => i.time >= start && i.time <= end);
            getData14()
        };
        async function getData14() {
            dataGet14 = await d3.json(Url2+"Sam_jiangjyun_temp"+hour);
            data14 = dataGet14.filter(i => i.time >= start && i.time <= end);
            getData15()
        };
        async function getData15() {
            dataGet15 = await d3.json(Url2+"Svm_jiangjyun_temp"+hour);
            data15 = dataGet15.filter(i => i.time >= start && i.time <= end);
            getData16()
        };
        async function getData16() {
            dataGet16 = await d3.json(Url+"jibei");
            data16 = dataGet16.filter(i => i.time >= start && i.time <= end);
            getData17()
        };
        async function getData17() {
            dataGet17 = await d3.json(Url2+"Mlr_jibei_temp"+hour);
            data17 = dataGet17.filter(i => i.time >= start && i.time <= end);
            getData18()
        };
        async function getData18() {
            dataGet18 = await d3.json(Url2+"Ada_jibei_temp"+hour);
            data18 = dataGet18.filter(i => i.time >= start && i.time <= end);
            getData19()
        };
        async function getData19() {
            dataGet19 = await d3.json(Url2+"Lstm_jibei_temp"+hour);
            data19 = dataGet19.filter(i => i.time >= start && i.time <= end);
            getData20()
        };
        async function getData20() {
            dataGet20 = await d3.json(Url2+"Mae_jibei_temp"+hour);
            data20 = dataGet20.filter(i => i.time >= start && i.time <= end);
            getData21()
        };
        async function getData21() {
            dataGet21 = await d3.json(Url2+"Rf_jibei_temp"+hour);
            data21 = dataGet21.filter(i => i.time >= start && i.time <= end);
            getData22()
        };
        async function getData22() {
            dataGet22 = await d3.json(Url2+"Sam_jibei_temp"+hour);
            data22 = dataGet22.filter(i => i.time >= start && i.time <= end);
            getData23()
        };
        async function getData23() {
            dataGet23 = await d3.json(Url2+"Svm_jibei_temp"+hour);
            data23 = dataGet23.filter(i => i.time >= start && i.time <= end);
            getData24()
        };
        async function getData24() {
            dataGet24 = await d3.json(Url+"penghu");
            data24 = dataGet24.filter(i => i.time >= start && i.time <= end);
            getData25()
        };
        async function getData25() {
            dataGet25 = await d3.json(Url2+"Mlr_penghu_temp"+hour);
            data25 = dataGet25.filter(i => i.time >= start && i.time <= end);
            getData26()
        };
        async function getData26() {
            dataGet26 = await d3.json(Url2+"Ada_penghu_temp"+hour);
            data26 = dataGet26.filter(i => i.time >= start && i.time <= end);
            getData27()
        };
        async function getData27() {
            dataGet27 = await d3.json(Url2+"Lstm_penghu_temp"+hour);
            data27 = dataGet27.filter(i => i.time >= start && i.time <= end);
            getData28()
        };
        async function getData28() {
            dataGet28 = await d3.json(Url2+"Mae_penghu_temp"+hour);
            data28 = dataGet28.filter(i => i.time >= start && i.time <= end);
            getData29()
        };
        async function getData29() {
            dataGet29 = await d3.json(Url2+"Rf_penghu_temp"+hour);
            data29 = dataGet29.filter(i => i.time >= start && i.time <= end);
            getData30()
        };
        async function getData30() {
            dataGet30 = await d3.json(Url2+"Sam_penghu_temp"+hour);
            data30 = dataGet30.filter(i => i.time >= start && i.time <= end);
            getData31()
        };
        async function getData31() {
            dataGet31 = await d3.json(Url2+"Svm_penghu_temp"+hour);
            data31 = dataGet31.filter(i => i.time >= start && i.time <= end);
            getData32()
        };
        async function getData32() {
            dataGet32 = await d3.json(Url+"wengang");
            data32 = dataGet32.filter(i => i.time >= start && i.time <= end);
            getData33()
        };
        async function getData33() {
            dataGet33 = await d3.json(Url2+"Mlr_wengang_temp"+hour);
            data33 = dataGet33.filter(i => i.time >= start && i.time <= end);
            getData34()
        };
        async function getData34() {
            dataGet34 = await d3.json(Url2+"Ada_wengang_temp"+hour);
            data34 = dataGet34.filter(i => i.time >= start && i.time <= end);
            getData35()
        };
        async function getData35() {
            dataGet35 = await d3.json(Url2+"Lstm_wengang_temp"+hour);
            data35 = dataGet35.filter(i => i.time >= start && i.time <= end);
            getData36()
        };
        async function getData36() {
            dataGet36 = await d3.json(Url2+"Mae_wengang_temp"+hour);
            data36 = dataGet36.filter(i => i.time >= start && i.time <= end);
            getData37()
        };
        async function getData37() {
            dataGet37 = await d3.json(Url2+"Rf_wengang_temp"+hour);
            data37 = dataGet37.filter(i => i.time >= start && i.time <= end);
            getData38()
        };
        async function getData38() {
            dataGet38 = await d3.json(Url2+"Sam_wengang_temp"+hour);
            data38 = dataGet38.filter(i => i.time >= start && i.time <= end);
            getData39()
        };
        async function getData39() {
            dataGet39 = await d3.json(Url2+"Svm_wengang_temp"+hour);
            data39 = dataGet39.filter(i => i.time >= start && i.time <= end);
            performance();
        };
    }
    
    function performance(){
        if (pointer === "MAE") {
            const calculateMAE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (sum / count).toFixed(2) : 0;
            };
        
            // dongji
            const mae1_1 = calculateMAE(data, data1);
            const mae1_2 = calculateMAE(data, data2);
            const mae1_3 = calculateMAE(data, data3);
            const mae1_4 = calculateMAE(data, data4);
            const mae1_5 = calculateMAE(data, data5);
            const mae1_6 = calculateMAE(data, data6);
            const mae1_7 = calculateMAE(data, data7);

            // jiangjyun
            const mae2_1 = calculateMAE(data8, data9);
            const mae2_2 = calculateMAE(data8, data10);
            const mae2_3 = calculateMAE(data8, data11);
            const mae2_4 = calculateMAE(data8, data12);
            const mae2_5 = calculateMAE(data8, data13);
            const mae2_6 = calculateMAE(data8, data14);
            const mae2_7 = calculateMAE(data8, data15);

            // jibei
            const mae3_1 = calculateMAE(data16, data17);
            const mae3_2 = calculateMAE(data16, data18);
            const mae3_3 = calculateMAE(data16, data19);
            const mae3_4 = calculateMAE(data16, data20);
            const mae3_5 = calculateMAE(data16, data21);
            const mae3_6 = calculateMAE(data16, data22);
            const mae3_7 = calculateMAE(data16, data23);

            // penghu
            const mae4_1 = calculateMAE(data24, data25);
            const mae4_2 = calculateMAE(data24, data26);
            const mae4_3 = calculateMAE(data24, data27);
            const mae4_4 = calculateMAE(data24, data28);
            const mae4_5 = calculateMAE(data24, data29);
            const mae4_6 = calculateMAE(data24, data30);
            const mae4_7 = calculateMAE(data24, data31);

            // wengang
            const mae5_1 = calculateMAE(data32, data33);
            const mae5_2 = calculateMAE(data32, data34);
            const mae5_3 = calculateMAE(data32, data35);
            const mae5_4 = calculateMAE(data32, data36);
            const mae5_5 = calculateMAE(data32, data37);
            const mae5_6 = calculateMAE(data32, data38);
            const mae5_7 = calculateMAE(data32, data39);

            var total_data = [
                { location: 'dongji', value: [mae1_1, mae1_2, mae1_3, mae1_4, mae1_5, mae1_6, mae1_7] },
                { location: 'jiangjyun', value: [mae2_1, mae2_2, mae2_3, mae2_4, mae2_5, mae2_6, mae2_7] },
                { location: 'jibei', value: [mae3_1, mae3_2, mae3_3, mae3_4, mae3_5, mae3_6, mae3_7] },
                { location: 'penghu', value: [mae4_1, mae4_2, mae4_3, mae4_4, mae4_5, mae4_6, mae4_7] },
                { location: 'wengang', value: [mae5_1, mae5_2, mae5_3, mae5_4, mae5_5, mae5_6, mae5_7] }
            ];
            console.log(total_data);
            drawBarChart(total_data,pointer);
            showtable(total_data,pointer);
        }
        if(pointer == "R2"){
            const calculateR2 = (data, dataToMatch) => {
                let actual_count = 0;
                let actual_sum = 0;
                let sum = 0;
                let count = 0;
                let sum2 = 0 ;
                let count2 = 0;
                data.forEach(item => {
                    // 获取当前条目的时间
                    if (item.temp && item.temp !== "-") {
                        var a = parseFloat(item.temp);
                        actual_sum = actual_sum + a;
                        actual_count = actual_count + 1;
                        } 
                });
                avg_actual = actual_sum/actual_count;

                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp)*Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;

                        const diff2 = (item.temp - avg_actual)*(item.temp - avg_actual);
                        sum2 = sum2 + diff2;
                    }
                });
        
                return (count > 0) ? (1 - sum / sum2).toFixed(2) : 0;
            };


            // dongji
            const r21_1 = calculateR2(data, data1);
            const r21_2 = calculateR2(data, data2);
            const r21_3 = calculateR2(data, data3);
            const r21_4 = calculateR2(data, data4);
            const r21_5 = calculateR2(data, data5);
            const r21_6 = calculateR2(data, data6);
            const r21_7 = calculateR2(data, data7);

            // jiangjyun
            const r22_1 = calculateR2(data8, data9);
            const r22_2 = calculateR2(data8, data10);
            const r22_3 = calculateR2(data8, data11);
            const r22_4 = calculateR2(data8, data12);
            const r22_5 = calculateR2(data8, data13);
            const r22_6 = calculateR2(data8, data14);
            const r22_7 = calculateR2(data8, data15);

            // jibei
            const r23_1 = calculateR2(data16, data17);
            const r23_2 = calculateR2(data16, data18);
            const r23_3 = calculateR2(data16, data19);
            const r23_4 = calculateR2(data16, data20);
            const r23_5 = calculateR2(data16, data21);
            const r23_6 = calculateR2(data16, data22);
            const r23_7 = calculateR2(data16, data23);

            // penghu
            const r24_1 = calculateR2(data24, data25);
            const r24_2 = calculateR2(data24, data26);
            const r24_3 = calculateR2(data24, data27);
            const r24_4 = calculateR2(data24, data28);
            const r24_5 = calculateR2(data24, data29);
            const r24_6 = calculateR2(data24, data30);
            const r24_7 = calculateR2(data24, data31);

            // wengang
            const r25_1 = calculateR2(data32, data33);
            const r25_2 = calculateR2(data32, data34);
            const r25_3 = calculateR2(data32, data35);
            const r25_4 = calculateR2(data32, data36);
            const r25_5 = calculateR2(data32, data37);
            const r25_6 = calculateR2(data32, data38);
            const r25_7 = calculateR2(data32, data39);
            var total_data = [
                { location: 'dongji', value: [r21_1, r21_2, r21_3, r21_4, r21_5, r21_6, r21_7] },
                { location: 'jiangjyun', value: [r22_1, r22_2, r22_3, r22_4, r22_5, r22_6, r22_7] },
                { location: 'jibei', value: [r23_1, r23_2, r23_3, r23_4, r23_5, r23_6, r23_7] },
                { location: 'penghu', value: [r24_1, r24_2, r24_3, r24_4, r24_5, r24_6, r24_7] },
                { location: 'wengang', value: [r25_1, r25_2, r25_3, r25_4, r25_5, r25_6, r25_7] }
            ];
            console.log(total_data);
            drawBarChart(total_data,pointer);
            showtable(total_data,pointer);
        }
        if(pointer == "RMSE"){
            const calculateRMSE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp)*Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (Math.sqrt(sum / count)).toFixed(2) : 0;
            };

            // dongji
            const rmse1_1 = calculateRMSE(data, data1);
            const rmse1_2 = calculateRMSE(data, data2);
            const rmse1_3 = calculateRMSE(data, data3);
            const rmse1_4 = calculateRMSE(data, data4);
            const rmse1_5 = calculateRMSE(data, data5);
            const rmse1_6 = calculateRMSE(data, data6);
            const rmse1_7 = calculateRMSE(data, data7);

            // jiangjyun
            const rmse2_1 = calculateRMSE(data8, data9);
            const rmse2_2 = calculateRMSE(data8, data10);
            const rmse2_3 = calculateRMSE(data8, data11);
            const rmse2_4 = calculateRMSE(data8, data12);
            const rmse2_5 = calculateRMSE(data8, data13);
            const rmse2_6 = calculateRMSE(data8, data14);
            const rmse2_7 = calculateRMSE(data8, data15);

            // jibei
            const rmse3_1 = calculateRMSE(data16, data17);
            const rmse3_2 = calculateRMSE(data16, data18);
            const rmse3_3 = calculateRMSE(data16, data19);
            const rmse3_4 = calculateRMSE(data16, data20);
            const rmse3_5 = calculateRMSE(data16, data21);
            const rmse3_6 = calculateRMSE(data16, data22);
            const rmse3_7 = calculateRMSE(data16, data23);

            // penghu
            const rmse4_1 = calculateRMSE(data24, data25);
            const rmse4_2 = calculateRMSE(data24, data26);
            const rmse4_3 = calculateRMSE(data24, data27);
            const rmse4_4 = calculateRMSE(data24, data28);
            const rmse4_5 = calculateRMSE(data24, data29);
            const rmse4_6 = calculateRMSE(data24, data30);
            const rmse4_7 = calculateRMSE(data24, data31);

            // wengang
            const rmse5_1 = calculateRMSE(data32, data33);
            const rmse5_2 = calculateRMSE(data32, data34);
            const rmse5_3 = calculateRMSE(data32, data35);
            const rmse5_4 = calculateRMSE(data32, data36);
            const rmse5_5 = calculateRMSE(data32, data37);
            const rmse5_6 = calculateRMSE(data32, data38);
            const rmse5_7 = calculateRMSE(data32, data39);

            var total_data = [
                { location: 'dongji', value: [rmse1_1, rmse1_2, rmse1_3, rmse1_4, rmse1_5, rmse1_6, rmse1_7] },
                { location: 'jiangjyun', value: [rmse2_1, rmse2_2, rmse2_3, rmse2_4, rmse2_5, rmse2_6, rmse2_7] },
                { location: 'jibei', value: [rmse3_1, rmse3_2, rmse3_3, rmse3_4, rmse3_5, rmse3_6, rmse3_7] },
                { location: 'penghu', value: [rmse4_1, rmse4_2, rmse4_3, rmse4_4, rmse4_5, rmse4_6, rmse4_7] },
                { location: 'wengang', value: [rmse5_1, rmse5_2, rmse5_3, rmse5_4, rmse5_5, rmse5_6, rmse5_7] }
            ];
            console.log(total_data);
            drawBarChart(total_data,pointer);
            showtable(total_data,pointer);
        }
    }

    function drawBarChart(total_data,pointer){
        
        // 设置画布大小和边距
        var margin = { top: 50, right: 30, bottom: 80, left: 80 },
            width = 1200 - margin.left - margin.right,

            height = 600 - margin.top - margin.bottom;

        // 创建一个SVG元素
        var svg = d3.select(".chart3")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
        // 获取所有地点的数组
        var locations = total_data.map(function(d) { return d.location; });

        // 设置x轴和y轴的比例尺
        var x = d3.scaleBand()
            .domain(locations)
            .rangeRound([0, width]) // 使用rangeRound
            .padding(0.3); // 控制间隔大小

        var y = d3.scaleLinear()
            .domain([0, d3.max(total_data, function(d) { return d3.max(d.value); })])
            .nice()
            .range([height, 0]);

        // 添加x轴和y轴
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .style("font-weight", "bold")
            .style("font-size", "20px");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .style("font-weight", "bold")
            .style("font-size", "16px");

        // 创建複合長條圖
        var colors = d3.schemeCategory10; // 颜色方案

        var groups = svg.selectAll(".location")
            .data(total_data)
            .enter().append("g")
            .attr("class", "location")
            .attr("transform", function(d) { return "translate(" + x(d.location) + ",0)"; });

        var barWidth = x.bandwidth() / 7; // 计算每个长条的宽度

        groups.selectAll("rect")
            .data(function(d) { return d.value; })
            .enter().append("rect")
            .attr("width", barWidth) // 使用相同的宽度
            .attr("x", function(d, i) { return (barWidth * i) + ((barWidth / 7) * i); }) // 添加空格
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("fill", function(d, i) { return colors[i]; });

        // 添加图例
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(200," + (height + 30) + ")"); // 调整图例的位置

        legend.selectAll("rect")
            .data(total_data[0].value)
            .enter().append("rect")
            .attr("x", function(d, i) { return 100 + i * 70; }) // 调整图例矩形的位置
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d, i) { return colors[i]; });

        legend.selectAll("text")
            .data(["MLR", "ADA", "LSTM", "MAE", "RF", "SAM", "SVM"])
            .enter().append("text")
            .attr("x", function(d, i) { return 125 + i * 70; }) // 调整图例文本的位置
            .attr("y", 15)
            .style("text-anchor", "start")
            .style("font-weight", "bold")
            .text(function(d, i) { return d; });
        
        svg.append("text")
            .attr("x", width / 2) // 設置文本的x座標為畫布的中心
            .attr("y", height + 75) // 設置文本的y座標，下方留出一些空間
            .style("text-anchor", "middle") // 設置文本的對齊方式為居中
            .style("font-size", "20px") // 設置字體大小
            .style("font-weight", "bold")
            .text(start+" to "+end+" "+kind+" Predicted "+ hour + " hour models " +pointer+" comparsion");

    }
    d3.select(window).on('resize', drawBarChart);

    function clearTable() {
        var tableBody = document.getElementById('table-body');
        // 移除所有子元素
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    function showtable(total_data,pointer){
        clearTable();
        var tableBody = document.getElementById('table-body');

        for (var i = 0; i < total_data.length; i++) {
            var row = document.createElement('tr');
            var locationCell = document.createElement('td');
            locationCell.textContent = total_data[i].location;
            row.appendChild(locationCell);

            for (var j = 0; j < total_data[i].value.length; j++) {
                var valueCell = document.createElement('td');
                valueCell.textContent = total_data[i].value[j];
                row.appendChild(valueCell);
            }

            tableBody.appendChild(row);
        }
    }
}

function perfor_tide(start,end,hour,pointer,kind){
    d3.select('.chart3 svg').remove();
    get_all_data2();
    function get_all_data2(){
        getData();
        async function getData() {
            dataGet = await d3.json(Url+"dongji");
            data = dataGet.filter(i => i.time >= start && i.time <= end);
            getData1()
        };
        async function getData1() {
            dataGet1 = await d3.json(Url2+"Mlr_dongji_tide"+hour);
            data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
            getData2()
        };
        async function getData2() {
            dataGet2 = await d3.json(Url2+"Ada_dongji_tide"+hour);
            data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
            getData3()
        };
        async function getData3() {
            dataGet3 = await d3.json(Url2+"Lstm_dongji_tide"+hour);
            data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
            getData4()
        };
        async function getData4() {
            dataGet4 = await d3.json(Url2+"Mae_dongji_tide"+hour);
            data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
            getData5()
        };
        async function getData5() {
            dataGet5 = await d3.json(Url2+"Rf_dongji_tide"+hour);
            data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
            getData6()
        };
        async function getData6() {
            dataGet6 = await d3.json(Url2+"Sam_dongji_tide"+hour);
            data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
            getData7()
        };
        async function getData7() {
            dataGet7 = await d3.json(Url2+"Svm_dongji_tide"+hour);
            data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
            getData8()
        };
        async function getData8() {
            dataGet8 = await d3.json(Url+"jiangjyun");
            data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
            getData9()
        };
        async function getData9() {
            dataGet9 = await d3.json(Url2+"Mlr_jiangjyun_tide"+hour);
            data9 = dataGet9.filter(i => i.time >= start && i.time <= end);
            getData10()
        };
        async function getData10() {
            dataGet10 = await d3.json(Url2+"Ada_jiangjyun_tide"+hour);
            data10 = dataGet10.filter(i => i.time >= start && i.time <= end);
            getData11()
        };
        async function getData11() {
            dataGet11 = await d3.json(Url2+"Lstm_jiangjyun_tide"+hour);
            data11 = dataGet11.filter(i => i.time >= start && i.time <= end);
            getData12()
        };
        async function getData12() {
            dataGet12 = await d3.json(Url2+"Mae_jiangjyun_tide"+hour);
            data12 = dataGet12.filter(i => i.time >= start && i.time <= end);
            getData13()
        };
        async function getData13() {
            dataGet13 = await d3.json(Url2+"Rf_jiangjyun_tide"+hour);
            data13 = dataGet13.filter(i => i.time >= start && i.time <= end);
            getData14()
        };
        async function getData14() {
            dataGet14 = await d3.json(Url2+"Sam_jiangjyun_tide"+hour);
            data14 = dataGet14.filter(i => i.time >= start && i.time <= end);
            getData15()
        };
        async function getData15() {
            dataGet15 = await d3.json(Url2+"Svm_jiangjyun_tide"+hour);
            data15 = dataGet15.filter(i => i.time >= start && i.time <= end);
            getData16()
        };
        async function getData16() {
            dataGet16 = await d3.json(Url+"jibei");
            data16 = dataGet16.filter(i => i.time >= start && i.time <= end);
            getData17()
        };
        async function getData17() {
            dataGet17 = await d3.json(Url2+"Mlr_jibei_tide"+hour);
            data17 = dataGet17.filter(i => i.time >= start && i.time <= end);
            getData18()
        };
        async function getData18() {
            dataGet18 = await d3.json(Url2+"Ada_jibei_tide"+hour);
            data18 = dataGet18.filter(i => i.time >= start && i.time <= end);
            getData19()
        };
        async function getData19() {
            dataGet19 = await d3.json(Url2+"Lstm_jibei_tide"+hour);
            data19 = dataGet19.filter(i => i.time >= start && i.time <= end);
            getData20()
        };
        async function getData20() {
            dataGet20 = await d3.json(Url2+"Mae_jibei_tide"+hour);
            data20 = dataGet20.filter(i => i.time >= start && i.time <= end);
            getData21()
        };
        async function getData21() {
            dataGet21 = await d3.json(Url2+"Rf_jibei_tide"+hour);
            data21 = dataGet21.filter(i => i.time >= start && i.time <= end);
            getData22()
        };
        async function getData22() {
            dataGet22 = await d3.json(Url2+"Sam_jibei_tide"+hour);
            data22 = dataGet22.filter(i => i.time >= start && i.time <= end);
            getData23()
        };
        async function getData23() {
            dataGet23 = await d3.json(Url2+"Svm_jibei_tide"+hour);
            data23 = dataGet23.filter(i => i.time >= start && i.time <= end);
            getData24()
        };
        async function getData24() {
            dataGet24 = await d3.json(Url+"penghu");
            data24 = dataGet24.filter(i => i.time >= start && i.time <= end);
            getData25()
        };
        async function getData25() {
            dataGet25 = await d3.json(Url2+"Mlr_penghu_tide"+hour);
            data25 = dataGet25.filter(i => i.time >= start && i.time <= end);
            getData26()
        };
        async function getData26() {
            dataGet26 = await d3.json(Url2+"Ada_penghu_tide"+hour);
            data26 = dataGet26.filter(i => i.time >= start && i.time <= end);
            getData27()
        };
        async function getData27() {
            dataGet27 = await d3.json(Url2+"Lstm_penghu_tide"+hour);
            data27 = dataGet27.filter(i => i.time >= start && i.time <= end);
            getData28()
        };
        async function getData28() {
            dataGet28 = await d3.json(Url2+"Mae_penghu_tide"+hour);
            data28 = dataGet28.filter(i => i.time >= start && i.time <= end);
            getData29()
        };
        async function getData29() {
            dataGet29 = await d3.json(Url2+"Rf_penghu_tide"+hour);
            data29 = dataGet29.filter(i => i.time >= start && i.time <= end);
            getData30()
        };
        async function getData30() {
            dataGet30 = await d3.json(Url2+"Sam_penghu_tide"+hour);
            data30 = dataGet30.filter(i => i.time >= start && i.time <= end);
            getData31()
        };
        async function getData31() {
            dataGet31 = await d3.json(Url2+"Svm_penghu_tide"+hour);
            data31 = dataGet31.filter(i => i.time >= start && i.time <= end);
            getData32()
        };
        async function getData32() {
            dataGet32 = await d3.json(Url+"wengang");
            data32 = dataGet32.filter(i => i.time >= start && i.time <= end);
            getData33()
        };
        async function getData33() {
            dataGet33 = await d3.json(Url2+"Mlr_wengang_tide"+hour);
            data33 = dataGet33.filter(i => i.time >= start && i.time <= end);
            getData34()
        };
        async function getData34() {
            dataGet34 = await d3.json(Url2+"Ada_wengang_tide"+hour);
            data34 = dataGet34.filter(i => i.time >= start && i.time <= end);
            getData35()
        };
        async function getData35() {
            dataGet35 = await d3.json(Url2+"Lstm_wengang_tide"+hour);
            data35 = dataGet35.filter(i => i.time >= start && i.time <= end);
            getData36()
        };
        async function getData36() {
            dataGet36 = await d3.json(Url2+"Mae_wengang_tide"+hour);
            data36 = dataGet36.filter(i => i.time >= start && i.time <= end);
            getData37()
        };
        async function getData37() {
            dataGet37 = await d3.json(Url2+"Rf_wengang_tide"+hour);
            data37 = dataGet37.filter(i => i.time >= start && i.time <= end);
            getData38()
        };
        async function getData38() {
            dataGet38 = await d3.json(Url2+"Sam_wengang_tide"+hour);
            data38 = dataGet38.filter(i => i.time >= start && i.time <= end);
            getData39()
        };
        async function getData39() {
            dataGet39 = await d3.json(Url2+"Svm_wengang_tide"+hour);
            data39 = dataGet39.filter(i => i.time >= start && i.time <= end);
            performance2();
        };
    }
    
    function performance2(){
        if (pointer === "MAE") {
            const calculateMAE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (sum / count).toFixed(2) : 0;
            };
        
            // dongji
            const mae1_1 = calculateMAE(data, data1);
            const mae1_2 = calculateMAE(data, data2);
            const mae1_3 = calculateMAE(data, data3);
            const mae1_4 = calculateMAE(data, data4);
            const mae1_5 = calculateMAE(data, data5);
            const mae1_6 = calculateMAE(data, data6);
            const mae1_7 = calculateMAE(data, data7);

            // jiangjyun
            const mae2_1 = calculateMAE(data8, data9);
            const mae2_2 = calculateMAE(data8, data10);
            const mae2_3 = calculateMAE(data8, data11);
            const mae2_4 = calculateMAE(data8, data12);
            const mae2_5 = calculateMAE(data8, data13);
            const mae2_6 = calculateMAE(data8, data14);
            const mae2_7 = calculateMAE(data8, data15);

            // jibei
            const mae3_1 = calculateMAE(data16, data17);
            const mae3_2 = calculateMAE(data16, data18);
            const mae3_3 = calculateMAE(data16, data19);
            const mae3_4 = calculateMAE(data16, data20);
            const mae3_5 = calculateMAE(data16, data21);
            const mae3_6 = calculateMAE(data16, data22);
            const mae3_7 = calculateMAE(data16, data23);

            // penghu
            const mae4_1 = calculateMAE(data24, data25);
            const mae4_2 = calculateMAE(data24, data26);
            const mae4_3 = calculateMAE(data24, data27);
            const mae4_4 = calculateMAE(data24, data28);
            const mae4_5 = calculateMAE(data24, data29);
            const mae4_6 = calculateMAE(data24, data30);
            const mae4_7 = calculateMAE(data24, data31);

            // wengang
            const mae5_1 = calculateMAE(data32, data33);
            const mae5_2 = calculateMAE(data32, data34);
            const mae5_3 = calculateMAE(data32, data35);
            const mae5_4 = calculateMAE(data32, data36);
            const mae5_5 = calculateMAE(data32, data37);
            const mae5_6 = calculateMAE(data32, data38);
            const mae5_7 = calculateMAE(data32, data39);

            var total_data2 = [
                { location: 'dongji', value: [mae1_1, mae1_2, mae1_3, mae1_4, mae1_5, mae1_6, mae1_7] },
                { location: 'jiangjyun', value: [mae2_1, mae2_2, mae2_3, mae2_4, mae2_5, mae2_6, mae2_7] },
                { location: 'jibei', value: [mae3_1, mae3_2, mae3_3, mae3_4, mae3_5, mae3_6, mae3_7] },
                { location: 'penghu', value: [mae4_1, mae4_2, mae4_3, mae4_4, mae4_5, mae4_6, mae4_7] },
                { location: 'wengang', value: [mae5_1, mae5_2, mae5_3, mae5_4, mae5_5, mae5_6, mae5_7] }
            ];
            console.log(total_data2);
            drawBarChart2(total_data2,pointer);
            showtable2(total_data2,pointer);
        }
        if(pointer == "R2"){
            const calculateR2 = (data, dataToMatch) => {
                let actual_count = 0;
                let actual_sum = 0;
                let sum = 0;
                let count = 0;
                let sum2 = 0 ;
                let count2 = 0;
                data.forEach(item => {
                    // 获取当前条目的时间
                    if (item.tide && item.tide !== "-") {
                        var a = parseFloat(item.tide);
                        actual_sum = actual_sum + a;
                        actual_count = actual_count + 1;
                        } 
                });
                avg_actual = actual_sum/actual_count;

                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide)*Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;

                        const diff2 = (item.tide - avg_actual)*(item.tide - avg_actual);
                        sum2 = sum2 + diff2;
                    }
                });
        
                return (count > 0) ? (1 - sum / sum2).toFixed(2) : 0;
            };


            // dongji
            const r21_1 = calculateR2(data, data1);
            const r21_2 = calculateR2(data, data2);
            const r21_3 = calculateR2(data, data3);
            const r21_4 = calculateR2(data, data4);
            const r21_5 = calculateR2(data, data5);
            const r21_6 = calculateR2(data, data6);
            const r21_7 = calculateR2(data, data7);

            // jiangjyun
            const r22_1 = calculateR2(data8, data9);
            const r22_2 = calculateR2(data8, data10);
            const r22_3 = calculateR2(data8, data11);
            const r22_4 = calculateR2(data8, data12);
            const r22_5 = calculateR2(data8, data13);
            const r22_6 = calculateR2(data8, data14);
            const r22_7 = calculateR2(data8, data15);

            // jibei
            const r23_1 = calculateR2(data16, data17);
            const r23_2 = calculateR2(data16, data18);
            const r23_3 = calculateR2(data16, data19);
            const r23_4 = calculateR2(data16, data20);
            const r23_5 = calculateR2(data16, data21);
            const r23_6 = calculateR2(data16, data22);
            const r23_7 = calculateR2(data16, data23);

            // penghu
            const r24_1 = calculateR2(data24, data25);
            const r24_2 = calculateR2(data24, data26);
            const r24_3 = calculateR2(data24, data27);
            const r24_4 = calculateR2(data24, data28);
            const r24_5 = calculateR2(data24, data29);
            const r24_6 = calculateR2(data24, data30);
            const r24_7 = calculateR2(data24, data31);

            // wengang
            const r25_1 = calculateR2(data32, data33);
            const r25_2 = calculateR2(data32, data34);
            const r25_3 = calculateR2(data32, data35);
            const r25_4 = calculateR2(data32, data36);
            const r25_5 = calculateR2(data32, data37);
            const r25_6 = calculateR2(data32, data38);
            const r25_7 = calculateR2(data32, data39);
            var total_data2 = [
                { location: 'dongji', value: [r21_1, r21_2, r21_3, r21_4, r21_5, r21_6, r21_7] },
                { location: 'jiangjyun', value: [r22_1, r22_2, r22_3, r22_4, r22_5, r22_6, r22_7] },
                { location: 'jibei', value: [r23_1, r23_2, r23_3, r23_4, r23_5, r23_6, r23_7] },
                { location: 'penghu', value: [r24_1, r24_2, r24_3, r24_4, r24_5, r24_6, r24_7] },
                { location: 'wengang', value: [r25_1, r25_2, r25_3, r25_4, r25_5, r25_6, r25_7] }
            ];
            console.log(total_data2);
            drawBarChart2(total_data2,pointer);
            showtable2(total_data2,pointer);
        }
        if(pointer == "RMSE"){
            const calculateRMSE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide)*Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (Math.sqrt(sum / count)).toFixed(2) : 0;
            };

            // dongji
            const rmse1_1 = calculateRMSE(data, data1);
            const rmse1_2 = calculateRMSE(data, data2);
            const rmse1_3 = calculateRMSE(data, data3);
            const rmse1_4 = calculateRMSE(data, data4);
            const rmse1_5 = calculateRMSE(data, data5);
            const rmse1_6 = calculateRMSE(data, data6);
            const rmse1_7 = calculateRMSE(data, data7);

            // jiangjyun
            const rmse2_1 = calculateRMSE(data8, data9);
            const rmse2_2 = calculateRMSE(data8, data10);
            const rmse2_3 = calculateRMSE(data8, data11);
            const rmse2_4 = calculateRMSE(data8, data12);
            const rmse2_5 = calculateRMSE(data8, data13);
            const rmse2_6 = calculateRMSE(data8, data14);
            const rmse2_7 = calculateRMSE(data8, data15);

            // jibei
            const rmse3_1 = calculateRMSE(data16, data17);
            const rmse3_2 = calculateRMSE(data16, data18);
            const rmse3_3 = calculateRMSE(data16, data19);
            const rmse3_4 = calculateRMSE(data16, data20);
            const rmse3_5 = calculateRMSE(data16, data21);
            const rmse3_6 = calculateRMSE(data16, data22);
            const rmse3_7 = calculateRMSE(data16, data23);

            // penghu
            const rmse4_1 = calculateRMSE(data24, data25);
            const rmse4_2 = calculateRMSE(data24, data26);
            const rmse4_3 = calculateRMSE(data24, data27);
            const rmse4_4 = calculateRMSE(data24, data28);
            const rmse4_5 = calculateRMSE(data24, data29);
            const rmse4_6 = calculateRMSE(data24, data30);
            const rmse4_7 = calculateRMSE(data24, data31);

            // wengang
            const rmse5_1 = calculateRMSE(data32, data33);
            const rmse5_2 = calculateRMSE(data32, data34);
            const rmse5_3 = calculateRMSE(data32, data35);
            const rmse5_4 = calculateRMSE(data32, data36);
            const rmse5_5 = calculateRMSE(data32, data37);
            const rmse5_6 = calculateRMSE(data32, data38);
            const rmse5_7 = calculateRMSE(data32, data39);

            var total_data2 = [
                { location: 'dongji', value: [rmse1_1, rmse1_2, rmse1_3, rmse1_4, rmse1_5, rmse1_6, rmse1_7] },
                { location: 'jiangjyun', value: [rmse2_1, rmse2_2, rmse2_3, rmse2_4, rmse2_5, rmse2_6, rmse2_7] },
                { location: 'jibei', value: [rmse3_1, rmse3_2, rmse3_3, rmse3_4, rmse3_5, rmse3_6, rmse3_7] },
                { location: 'penghu', value: [rmse4_1, rmse4_2, rmse4_3, rmse4_4, rmse4_5, rmse4_6, rmse4_7] },
                { location: 'wengang', value: [rmse5_1, rmse5_2, rmse5_3, rmse5_4, rmse5_5, rmse5_6, rmse5_7] }
            ];
            console.log(total_data2);
            drawBarChart2(total_data2,pointer);
            showtable2(total_data2,pointer);
        }
    }

    function drawBarChart2(total_data2,pointer){
        
        // 设置画布大小和边距
        var margin = { top: 50, right: 30, bottom: 80, left: 80 },
            width = 1200 - margin.left - margin.right,

            height = 600 - margin.top - margin.bottom;

        // 创建一个SVG元素
        var svg = d3.select(".chart3")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 获取所有地点的数组
        var locations = total_data2.map(function(d) { return d.location; });

        // 设置x轴和y轴的比例尺
        var x = d3.scaleBand()
            .domain(locations)
            .rangeRound([0, width]) // 使用rangeRound
            .padding(0.3); // 控制间隔大小

        if(pointer == "R2"){
            var y = d3.scaleLinear()
                .domain([0, 1])
                .nice()
                .range([height, 0]);
        }
        if(pointer == "MAE" || pointer == "RMSE"){
            var y = d3.scaleLinear()
            .domain([0, d3.max(total_data2, function(d) { return d3.max(d.value); })])
            .nice()
            .range([height, 0]);
        }

        // 添加x轴和y轴
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .style("font-weight", "bold")
            .style("font-size", "20px");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .style("font-weight", "bold")
            .style("font-size", "16px");

        // 创建複合長條圖
        var colors = d3.schemeCategory10; // 颜色方案

        var groups = svg.selectAll(".location")
            .data(total_data2)
            .enter().append("g")
            .attr("class", "location")
            .attr("transform", function(d) { return "translate(" + x(d.location) + ",0)"; });

        var barWidth = x.bandwidth() / 7; // 计算每个长条的宽度

        groups.selectAll("rect")
            .data(function(d) { return d.value; })
            .enter().append("rect")
            .attr("width", barWidth) // 使用相同的宽度
            .attr("x", function(d, i) { return (barWidth * i) + ((barWidth / 7) * i); }) // 添加空格
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("fill", function(d, i) { return colors[i]; });

        // 添加图例
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(200," + (height + 30) + ")"); // 调整图例的位置

        legend.selectAll("rect")
            .data(total_data2[0].value)
            .enter().append("rect")
            .attr("x", function(d, i) { return 100 + i * 70; }) // 调整图例矩形的位置
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d, i) { return colors[i]; });

        legend.selectAll("text")
            .data(["MLR", "ADA", "LSTM", "MAE", "RF", "SAM", "SVM"])
            .enter().append("text")
            .attr("x", function(d, i) { return 125 + i * 70; }) // 调整图例文本的位置
            .attr("y", 15)
            .style("text-anchor", "start")
            .style("font-weight", "bold")
            .text(function(d, i) { return d; });

        svg.append("text")
            .attr("x", width / 2) // 設置文本的x座標為畫布的中心
            .attr("y", height + 75) // 設置文本的y座標，下方留出一些空間
            .style("text-anchor", "middle") // 設置文本的對齊方式為居中
            .style("font-size", "20px") // 設置字體大小
            .style("font-weight", "bold")
            .text(start+" to "+end+" "+kind+" Predicted "+ hour + " hour models " +pointer+" comparsion");

    }
    d3.select(window).on('resize', drawBarChart2);

    function clearTable() {
        var tableBody = document.getElementById('table-body');
        // 移除所有子元素
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    function showtable2(total_data2,pointer){
        clearTable();
        var tableBody = document.getElementById('table-body');

        for (var i = 0; i < total_data2.length; i++) {
            var row = document.createElement('tr');
            var locationCell = document.createElement('td');
            locationCell.textContent = total_data2[i].location;
            row.appendChild(locationCell);

            for (var j = 0; j < total_data2[i].value.length; j++) {
                var valueCell = document.createElement('td');
                valueCell.textContent = total_data2[i].value[j];
                row.appendChild(valueCell);
            }

            tableBody.appendChild(row);
        }
    }
}

function perfor_temp2(start,end,area,pointer,kind){
    d3.select('.chart4 svg').remove();
    get_all_data3();
    function get_all_data3(){
        getData();
        async function getData() {
            dataGet = await d3.json(Url+area);
            data = dataGet.filter(i => i.time >= start && i.time <= end);
            getData1()
        };
        async function getData1() {
            dataGet1 = await d3.json(Url2+"Mlr_"+area+"_temp1");
            data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
            getData2()
        };
        async function getData2() {
            dataGet2 = await d3.json(Url2+"Ada_"+area+"_temp1");
            data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
            getData3()
        };
        async function getData3() {
            dataGet3 = await d3.json(Url2+"Lstm_"+area+"_temp1");
            data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
            getData4()
        };
        async function getData4() {
            dataGet4 = await d3.json(Url2+"Mae_"+area+"_temp1");
            data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
            getData5()
        };
        async function getData5() {
            dataGet5 = await d3.json(Url2+"Rf_"+area+"_temp1");
            data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
            getData6()
        };
        async function getData6() {
            dataGet6 = await d3.json(Url2+"Sam_"+area+"_temp1");
            data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
            getData7()
        };
        async function getData7() {
            dataGet7 = await d3.json(Url2+"Svm_"+area+"_temp1");
            data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
            getData8()
        };
        async function getData8() {
            dataGet8 = await d3.json(Url2+"Mlr_"+area+"_temp2");
            data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
            getData9()
        };
        async function getData9() {
            dataGet9 = await d3.json(Url2+"Ada_"+area+"_temp2");
            data9 = dataGet9.filter(i => i.time >= start && i.time <= end);
            getData10()
        };
        async function getData10() {
            dataGet10 = await d3.json(Url2+"Lstm_"+area+"_temp2");
            data10 = dataGet10.filter(i => i.time >= start && i.time <= end);
            getData11()
        };
        async function getData11() {
            dataGet11 = await d3.json(Url2+"Mae_"+area+"_temp2");
            data11 = dataGet11.filter(i => i.time >= start && i.time <= end);
            getData12()
        };
        async function getData12() {
            dataGet12 = await d3.json(Url2+"Rf_"+area+"_temp2");
            data12 = dataGet12.filter(i => i.time >= start && i.time <= end);
            getData13()
        };
        async function getData13() {
            dataGet13 = await d3.json(Url2+"Sam_"+area+"_temp2");
            data13 = dataGet13.filter(i => i.time >= start && i.time <= end);
            getData14()
        };
        async function getData14() {
            dataGet14 = await d3.json(Url2+"Svm_"+area+"_temp2");
            data14 = dataGet14.filter(i => i.time >= start && i.time <= end);
            getData15()
        };
        async function getData15() {
            dataGet15 = await d3.json(Url2+"Mlr_"+area+"_temp3");
            data15 = dataGet15.filter(i => i.time >= start && i.time <= end);
            getData16()
        };
        async function getData16() {
            dataGet16 = await d3.json(Url2+"Ada_"+area+"_temp3");
            data16 = dataGet16.filter(i => i.time >= start && i.time <= end);
            getData17()
        };
        async function getData17() {
            dataGet17 = await d3.json(Url2+"Lstm_"+area+"_temp3");
            data17 = dataGet17.filter(i => i.time >= start && i.time <= end);
            getData18()
        };
        async function getData18() {
            dataGet18 = await d3.json(Url2+"Mae_"+area+"_temp3");
            data18 = dataGet18.filter(i => i.time >= start && i.time <= end);
            getData19()
        };
        async function getData19() {
            dataGet19 = await d3.json(Url2+"Rf_"+area+"_temp3");
            data19 = dataGet19.filter(i => i.time >= start && i.time <= end);
            getData20()
        };
        async function getData20() {
            dataGet20 = await d3.json(Url2+"Sam_"+area+"_temp3");
            data20 = dataGet20.filter(i => i.time >= start && i.time <= end);
            getData21()
        };
        async function getData21() {
            dataGet21 = await d3.json(Url2+"Svm_"+area+"_temp3");
            data21 = dataGet21.filter(i => i.time >= start && i.time <= end);
            getData22()
        };
        async function getData22() {
            dataGet22 = await d3.json(Url2+"Mlr_"+area+"_temp4");
            data22 = dataGet22.filter(i => i.time >= start && i.time <= end);
            getData23()
        };
        async function getData23() {
            dataGet23 = await d3.json(Url2+"Ada_"+area+"_temp4");
            data23 = dataGet23.filter(i => i.time >= start && i.time <= end);
            getData24()
        };
        async function getData24() {
            dataGet24 = await d3.json(Url2+"Lstm_"+area+"_temp4");
            data24 = dataGet24.filter(i => i.time >= start && i.time <= end);
            getData25()
        };
        async function getData25() {
            dataGet25 = await d3.json(Url2+"Mae_"+area+"_temp4");
            data25 = dataGet25.filter(i => i.time >= start && i.time <= end);
            getData26()
        };
        async function getData26() {
            dataGet26 = await d3.json(Url2+"Rf_"+area+"_temp4");
            data26 = dataGet26.filter(i => i.time >= start && i.time <= end);
            getData27()
        };
        async function getData27() {
            dataGet27 = await d3.json(Url2+"Sam_"+area+"_temp4");
            data27 = dataGet27.filter(i => i.time >= start && i.time <= end);
            getData28()
        };
        async function getData28() {
            dataGet28 = await d3.json(Url2+"Svm_"+area+"_temp4");
            data28 = dataGet28.filter(i => i.time >= start && i.time <= end);
            getData29()
        };
        async function getData29() {
            dataGet29 = await d3.json(Url2+"Mlr_"+area+"_temp5");
            data29 = dataGet29.filter(i => i.time >= start && i.time <= end);
            getData30()
        };
        async function getData30() {
            dataGet30 = await d3.json(Url2+"Ada_"+area+"_temp5");
            data30 = dataGet30.filter(i => i.time >= start && i.time <= end);
            getData31()
        };
        async function getData31() {
            dataGet31 = await d3.json(Url2+"Lstm_"+area+"_temp5");
            data31 = dataGet31.filter(i => i.time >= start && i.time <= end);
            getData32()
        };
        async function getData32() {
            dataGet32 = await d3.json(Url2+"Mae_"+area+"_temp5");
            data32 = dataGet32.filter(i => i.time >= start && i.time <= end);
            getData33()
        };
        async function getData33() {
            dataGet33 = await d3.json(Url2+"Rf_"+area+"_temp5");
            data33 = dataGet33.filter(i => i.time >= start && i.time <= end);
            getData34()
        };
        async function getData34() {
            dataGet34 = await d3.json(Url2+"Sam_"+area+"_temp5");
            data34 = dataGet34.filter(i => i.time >= start && i.time <= end);
            getData35()
        };
        async function getData35() {
            dataGet35 = await d3.json(Url2+"Svm_"+area+"_temp5");
            data35 = dataGet35.filter(i => i.time >= start && i.time <= end);
            getData36()
        };
        async function getData36() {
            dataGet36 = await d3.json(Url2+"Mlr_"+area+"_temp6");
            data36 = dataGet36.filter(i => i.time >= start && i.time <= end);
            getData37()
        };
        async function getData37() {
            dataGet37 = await d3.json(Url2+"Ada_"+area+"_temp6");
            data37 = dataGet37.filter(i => i.time >= start && i.time <= end);
            getData38()
        };
        async function getData38() {
            dataGet38 = await d3.json(Url2+"Lstm_"+area+"_temp6");
            data38 = dataGet38.filter(i => i.time >= start && i.time <= end);
            getData39()
        };
        async function getData39() {
            dataGet39 = await d3.json(Url2+"Mae_"+area+"_temp6");
            data39 = dataGet39.filter(i => i.time >= start && i.time <= end);
            getData40()
        };
        async function getData40() {
            dataGet40 = await d3.json(Url2+"Rf_"+area+"_temp6");
            data40 = dataGet40.filter(i => i.time >= start && i.time <= end);
            getData41()
        };
        async function getData41() {
            dataGet41 = await d3.json(Url2+"Sam_"+area+"_temp6");
            data41 = dataGet41.filter(i => i.time >= start && i.time <= end);
            getData42()
        };
        async function getData42() {
            dataGet42 = await d3.json(Url2+"Svm_"+area+"_temp6");
            data42 = dataGet42.filter(i => i.time >= start && i.time <= end);
            getData43()
        };
        async function getData43() {
            dataGet43 = await d3.json(Url2+"Mlr_"+area+"_temp7");
            data43 = dataGet43.filter(i => i.time >= start && i.time <= end);
            getData44()
        };
        async function getData44() {
            dataGet44 = await d3.json(Url2+"Ada_"+area+"_temp7");
            data44 = dataGet44.filter(i => i.time >= start && i.time <= end);
            getData45()
        };
        async function getData45() {
            dataGet45 = await d3.json(Url2+"Lstm_"+area+"_temp7");
            data45 = dataGet45.filter(i => i.time >= start && i.time <= end);
            getData46()
        };
        async function getData46() {
            dataGet46 = await d3.json(Url2+"Mae_"+area+"_temp7");
            data46 = dataGet46.filter(i => i.time >= start && i.time <= end);
            getData47()
        };
        async function getData47() {
            dataGet47 = await d3.json(Url2+"Rf_"+area+"_temp7");
            data47 = dataGet47.filter(i => i.time >= start && i.time <= end);
            getData48()
        };
        async function getData48() {
            dataGet48 = await d3.json(Url2+"Sam_"+area+"_temp7");
            data48 = dataGet48.filter(i => i.time >= start && i.time <= end);
            getData49()
        };
        async function getData49() {
            dataGet49 = await d3.json(Url2+"Svm_"+area+"_temp7");
            data49 = dataGet49.filter(i => i.time >= start && i.time <= end);
            getData50()
        };
        async function getData50() {
            dataGet50 = await d3.json(Url2+"Mlr_"+area+"_temp8");
            data50 = dataGet50.filter(i => i.time >= start && i.time <= end);
            getData51()
        };
        async function getData51() {
            dataGet51 = await d3.json(Url2+"Ada_"+area+"_temp8");
            data51 = dataGet51.filter(i => i.time >= start && i.time <= end);
            getData52()
        };
        async function getData52() {
            dataGet52 = await d3.json(Url2+"Lstm_"+area+"_temp8");
            data52 = dataGet52.filter(i => i.time >= start && i.time <= end);
            getData53()
        };
        async function getData53() {
            dataGet53 = await d3.json(Url2+"Mae_"+area+"_temp8");
            data53 = dataGet53.filter(i => i.time >= start && i.time <= end);
            getData54()
        };
        async function getData54() {
            dataGet54 = await d3.json(Url2+"Rf_"+area+"_temp8");
            data54 = dataGet54.filter(i => i.time >= start && i.time <= end);
            getData55()
        };
        async function getData55() {
            dataGet55 = await d3.json(Url2+"Sam_"+area+"_temp8");
            data55 = dataGet55.filter(i => i.time >= start && i.time <= end);
            getData56()
        };
        async function getData56() {
            dataGet56 = await d3.json(Url2+"Svm_"+area+"_temp8");
            data56 = dataGet56.filter(i => i.time >= start && i.time <= end);
            performance3();
        };
        
    }
    
    function performance3(){
        if (pointer === "MAE") {
            const calculateMAE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (sum / count).toFixed(2) : 0;
            };
        
            // 1 hour
            const mae1_1 = calculateMAE(data, data1);
            const mae1_2 = calculateMAE(data, data2);
            const mae1_3 = calculateMAE(data, data3);
            const mae1_4 = calculateMAE(data, data4);
            const mae1_5 = calculateMAE(data, data5);
            const mae1_6 = calculateMAE(data, data6);
            const mae1_7 = calculateMAE(data, data7);

            // 2 hour
            const mae2_1 = calculateMAE(data, data8);
            const mae2_2 = calculateMAE(data, data9);
            const mae2_3 = calculateMAE(data, data10);
            const mae2_4 = calculateMAE(data, data11);
            const mae2_5 = calculateMAE(data, data12);
            const mae2_6 = calculateMAE(data, data13);
            const mae2_7 = calculateMAE(data, data14);

            // 3 hour
            const mae3_1 = calculateMAE(data, data15);
            const mae3_2 = calculateMAE(data, data16);
            const mae3_3 = calculateMAE(data, data17);
            const mae3_4 = calculateMAE(data, data18);
            const mae3_5 = calculateMAE(data, data19);
            const mae3_6 = calculateMAE(data, data20);
            const mae3_7 = calculateMAE(data, data21);

            // 4 hour
            const mae4_1 = calculateMAE(data, data22);
            const mae4_2 = calculateMAE(data, data23);
            const mae4_3 = calculateMAE(data, data24);
            const mae4_4 = calculateMAE(data, data25);
            const mae4_5 = calculateMAE(data, data26);
            const mae4_6 = calculateMAE(data, data27);
            const mae4_7 = calculateMAE(data, data28);

            // 5 hour
            const mae5_1 = calculateMAE(data, data29);
            const mae5_2 = calculateMAE(data, data30);
            const mae5_3 = calculateMAE(data, data31);
            const mae5_4 = calculateMAE(data, data32);
            const mae5_5 = calculateMAE(data, data33);
            const mae5_6 = calculateMAE(data, data34);
            const mae5_7 = calculateMAE(data, data35);

            // 6 hour
            const mae6_1 = calculateMAE(data, data36);
            const mae6_2 = calculateMAE(data, data37);
            const mae6_3 = calculateMAE(data, data38);
            const mae6_4 = calculateMAE(data, data39);
            const mae6_5 = calculateMAE(data, data34);
            const mae6_6 = calculateMAE(data, data41);
            const mae6_7 = calculateMAE(data, data42);

            // 7 hour
            const mae7_1 = calculateMAE(data, data43);
            const mae7_2 = calculateMAE(data, data44);
            const mae7_3 = calculateMAE(data, data45);
            const mae7_4 = calculateMAE(data, data46);
            const mae7_5 = calculateMAE(data, data47);
            const mae7_6 = calculateMAE(data, data48);
            const mae7_7 = calculateMAE(data, data49);

            // 8 hour
            const mae8_1 = calculateMAE(data, data50);
            const mae8_2 = calculateMAE(data, data51);
            const mae8_3 = calculateMAE(data, data52);
            const mae8_4 = calculateMAE(data, data53);
            const mae8_5 = calculateMAE(data, data54);
            const mae8_6 = calculateMAE(data, data55);
            const mae8_7 = calculateMAE(data, data56);

            var total_data3 = [
                { location: '1 hour', value: [mae1_1, mae1_2, mae1_3, mae1_4, mae1_5, mae1_6, mae1_7] },
                { location: '2 hours', value: [mae2_1, mae2_2, mae2_3, mae2_4, mae2_5, mae2_6, mae2_7] },
                { location: '3 hours', value: [mae3_1, mae3_2, mae3_3, mae3_4, mae3_5, mae3_6, mae3_7] },
                { location: '4 hours', value: [mae4_1, mae4_2, mae4_3, mae4_4, mae4_5, mae4_6, mae4_7] },
                { location: '5 hours', value: [mae5_1, mae5_2, mae5_3, mae5_4, mae5_5, mae5_6, mae5_7] },
                { location: '6 hours', value: [mae6_1, mae6_2, mae6_3, mae6_4, mae6_5, mae6_6, mae6_7] },
                { location: '7 hours', value: [mae7_1, mae7_2, mae7_3, mae7_4, mae7_5, mae7_6, mae7_7] },
                { location: '8 hours', value: [mae8_1, mae8_2, mae8_3, mae8_4, mae8_5, mae8_6, mae8_7] }
            ];
            console.log(total_data3);
            drawBarChart3(total_data3,pointer);
            showtable3(total_data3,pointer);
        }
        if(pointer == "R2"){
            const calculateR2 = (data, dataToMatch) => {
                let actual_count = 0;
                let actual_sum = 0;
                let sum = 0;
                let count = 0;
                let sum2 = 0 ;
                let count2 = 0;
                data.forEach(item => {
                    // 获取当前条目的时间
                    if (item.temp && item.temp !== "-") {
                        var a = parseFloat(item.temp);
                        actual_sum = actual_sum + a;
                        actual_count = actual_count + 1;
                        } 
                });
                avg_actual = actual_sum/actual_count;

                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp)*Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;

                        const diff2 = (item.temp - avg_actual)*(item.temp - avg_actual);
                        sum2 = sum2 + diff2;
                    }
                });
        
                return (count > 0) ? (1 - sum / sum2).toFixed(2) : 0;
            };


            // 1 hour
            const r21_1 = calculateR2(data, data1);
            const r21_2 = calculateR2(data, data2);
            const r21_3 = calculateR2(data, data3);
            const r21_4 = calculateR2(data, data4);
            const r21_5 = calculateR2(data, data5);
            const r21_6 = calculateR2(data, data6);
            const r21_7 = calculateR2(data, data7);

            // 2 hours
            const r22_1 = calculateR2(data, data8);
            const r22_2 = calculateR2(data, data9);
            const r22_3 = calculateR2(data, data10);
            const r22_4 = calculateR2(data, data11);
            const r22_5 = calculateR2(data, data12);
            const r22_6 = calculateR2(data, data13);
            const r22_7 = calculateR2(data, data14);

            // 3 hours
            const r23_1 = calculateR2(data, data15);
            const r23_2 = calculateR2(data, data16);
            const r23_3 = calculateR2(data, data17);
            const r23_4 = calculateR2(data, data18);
            const r23_5 = calculateR2(data, data19);
            const r23_6 = calculateR2(data, data20);
            const r23_7 = calculateR2(data, data21);

            // 4 hours
            const r24_1 = calculateR2(data, data22);
            const r24_2 = calculateR2(data, data23);
            const r24_3 = calculateR2(data, data24);
            const r24_4 = calculateR2(data, data25);
            const r24_5 = calculateR2(data, data26);
            const r24_6 = calculateR2(data, data27);
            const r24_7 = calculateR2(data, data28);

            // 5 hours
            const r25_1 = calculateR2(data, data29);
            const r25_2 = calculateR2(data, data30);
            const r25_3 = calculateR2(data, data31);
            const r25_4 = calculateR2(data, data32);
            const r25_5 = calculateR2(data, data33);
            const r25_6 = calculateR2(data, data34);
            const r25_7 = calculateR2(data, data35);

            // 6 hours
            const r26_1 = calculateR2(data, data36);
            const r26_2 = calculateR2(data, data37);
            const r26_3 = calculateR2(data, data38);
            const r26_4 = calculateR2(data, data39);
            const r26_5 = calculateR2(data, data40);
            const r26_6 = calculateR2(data, data41);
            const r26_7 = calculateR2(data, data42);

            // 7 hours
            const r27_1 = calculateR2(data, data43);
            const r27_2 = calculateR2(data, data44);
            const r27_3 = calculateR2(data, data45);
            const r27_4 = calculateR2(data, data46);
            const r27_5 = calculateR2(data, data47);
            const r27_6 = calculateR2(data, data48);
            const r27_7 = calculateR2(data, data49);

            // 8 hours
            const r28_1 = calculateR2(data, data50);
            const r28_2 = calculateR2(data, data54);
            const r28_3 = calculateR2(data, data54);
            const r28_4 = calculateR2(data, data53);
            const r28_5 = calculateR2(data, data54);
            const r28_6 = calculateR2(data, data55);
            const r28_7 = calculateR2(data, data56);

            var total_data3 = [
                { location: '1 hour', value: [r21_1, r21_2, r21_3, r21_4, r21_5, r21_6, r21_7] },
                { location: '2 hours', value: [r22_1, r22_2, r22_3, r22_4, r22_5, r22_6, r22_7] },
                { location: '3 hours', value: [r23_1, r23_2, r23_3, r23_4, r23_5, r23_6, r23_7] },
                { location: '4 hours', value: [r24_1, r24_2, r24_3, r24_4, r24_5, r24_6, r24_7] },
                { location: '5 hours', value: [r25_1, r25_2, r25_3, r25_4, r25_5, r25_6, r25_7] },
                { location: '6 hours', value: [r26_1, r26_2, r26_3, r26_4, r26_5, r26_6, r26_7] },
                { location: '7 hours', value: [r27_1, r27_2, r27_3, r27_4, r27_5, r27_6, r27_7] },
                { location: '8 hours', value: [r28_1, r28_2, r28_3, r28_4, r28_5, r28_6, r28_7] }
            ];
            console.log(total_data3);
            drawBarChart3(total_data3,pointer);
            showtable3(total_data3,pointer);
        }
        if(pointer == "RMSE"){
            const calculateRMSE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.temp && item.temp !== "-" && matchingItem.temp && matchingItem.temp !== "-") {
                        const diff = Math.abs(item.temp - matchingItem.temp)*Math.abs(item.temp - matchingItem.temp);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (Math.sqrt(sum / count)).toFixed(2) : 0;
            };

            // 1 hour
            const rmse1_1 = calculateRMSE(data, data1);
            const rmse1_2 = calculateRMSE(data, data2);
            const rmse1_3 = calculateRMSE(data, data3);
            const rmse1_4 = calculateRMSE(data, data4);
            const rmse1_5 = calculateRMSE(data, data5);
            const rmse1_6 = calculateRMSE(data, data6);
            const rmse1_7 = calculateRMSE(data, data7);

            // 2 hours
            const rmse2_1 = calculateRMSE(data, data8);
            const rmse2_2 = calculateRMSE(data, data9);
            const rmse2_3 = calculateRMSE(data, data10);
            const rmse2_4 = calculateRMSE(data, data11);
            const rmse2_5 = calculateRMSE(data, data12);
            const rmse2_6 = calculateRMSE(data, data13);
            const rmse2_7 = calculateRMSE(data, data14);

            // 3 hours
            const rmse3_1 = calculateRMSE(data, data15);
            const rmse3_2 = calculateRMSE(data, data16);
            const rmse3_3 = calculateRMSE(data, data17);
            const rmse3_4 = calculateRMSE(data, data18);
            const rmse3_5 = calculateRMSE(data, data19);
            const rmse3_6 = calculateRMSE(data, data20);
            const rmse3_7 = calculateRMSE(data, data21);

            // 4 hours
            const rmse4_1 = calculateRMSE(data, data22);
            const rmse4_2 = calculateRMSE(data, data23);
            const rmse4_3 = calculateRMSE(data, data24);
            const rmse4_4 = calculateRMSE(data, data25);
            const rmse4_5 = calculateRMSE(data, data26);
            const rmse4_6 = calculateRMSE(data, data27);
            const rmse4_7 = calculateRMSE(data, data28);

            // 5 hours
            const rmse5_1 = calculateRMSE(data, data29);
            const rmse5_2 = calculateRMSE(data, data30);
            const rmse5_3 = calculateRMSE(data, data31);
            const rmse5_4 = calculateRMSE(data, data32);
            const rmse5_5 = calculateRMSE(data, data33);
            const rmse5_6 = calculateRMSE(data, data34);
            const rmse5_7 = calculateRMSE(data, data35);

            // 6 hours
            const rmse6_1 = calculateRMSE(data, data36);
            const rmse6_2 = calculateRMSE(data, data37);
            const rmse6_3 = calculateRMSE(data, data38);
            const rmse6_4 = calculateRMSE(data, data39);
            const rmse6_5 = calculateRMSE(data, data40);
            const rmse6_6 = calculateRMSE(data, data41);
            const rmse6_7 = calculateRMSE(data, data42);

            // 7 hours
            const rmse7_1 = calculateRMSE(data, data43);
            const rmse7_2 = calculateRMSE(data, data44);
            const rmse7_3 = calculateRMSE(data, data45);
            const rmse7_4 = calculateRMSE(data, data46);
            const rmse7_5 = calculateRMSE(data, data47);
            const rmse7_6 = calculateRMSE(data, data48);
            const rmse7_7 = calculateRMSE(data, data49);

            // 8 hours
            const rmse8_1 = calculateRMSE(data, data50);
            const rmse8_2 = calculateRMSE(data, data51);
            const rmse8_3 = calculateRMSE(data, data52);
            const rmse8_4 = calculateRMSE(data, data53);
            const rmse8_5 = calculateRMSE(data, data54);
            const rmse8_6 = calculateRMSE(data, data55);
            const rmse8_7 = calculateRMSE(data, data56);

            var total_data3 = [
                { location: '1 hour', value: [rmse1_1, rmse1_2, rmse1_3, rmse1_4, rmse1_5, rmse1_6, rmse1_7] },
                { location: '2 hours', value: [rmse2_1, rmse2_2, rmse2_3, rmse2_4, rmse2_5, rmse2_6, rmse2_7] },
                { location: '3 hours', value: [rmse3_1, rmse3_2, rmse3_3, rmse3_4, rmse3_5, rmse3_6, rmse3_7] },
                { location: '4 hours', value: [rmse4_1, rmse4_2, rmse4_3, rmse4_4, rmse4_5, rmse4_6, rmse4_7] },
                { location: '5 hours', value: [rmse5_1, rmse5_2, rmse5_3, rmse5_4, rmse5_5, rmse5_6, rmse5_7] },
                { location: '6 hours', value: [rmse6_1, rmse6_2, rmse6_3, rmse6_4, rmse6_5, rmse6_6, rmse6_7] },
                { location: '7 hours', value: [rmse7_1, rmse7_2, rmse7_3, rmse7_4, rmse7_5, rmse7_6, rmse7_7] },
                { location: '8 hours', value: [rmse8_1, rmse8_2, rmse8_3, rmse8_4, rmse8_5, rmse8_6, rmse8_7] }
            ];
            console.log(total_data3);
            drawBarChart3(total_data3,pointer);
            showtable3(total_data3,pointer);
        }
    }

    function drawBarChart3(total_data,pointer){
        
        // 设置画布大小和边距
        var margin = { top: 50, right: 30, bottom: 80, left: 80 },
            width = 1600 - margin.left - margin.right,

            height = 600 - margin.top - margin.bottom;

        // 创建一个SVG元素
        var svg = d3.select(".chart4")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // 获取所有時間的数组
        var locations = total_data.map(function(d) { return d.location; });

        // 设置x轴和y轴的比例尺
        var x = d3.scaleBand()
            .domain(locations)
            .rangeRound([0, width]) // 使用rangeRound
            .padding(0.3); // 控制间隔大小

        var y = d3.scaleLinear()
            .domain([0, d3.max(total_data, function(d) { return d3.max(d.value); })])
            .nice()
            .range([height, 0]);

        // 添加x轴和y轴
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .style("font-weight", "bold")
            .style("font-size", "20px");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .style("font-weight", "bold")
            .style("font-size", "16px");

        // 创建複合長條圖
        var colors = d3.schemeCategory10; // 颜色方案

        var groups = svg.selectAll(".location")
            .data(total_data)
            .enter().append("g")
            .attr("class", "location")
            .attr("transform", function(d) { return "translate(" + x(d.location) + ",0)"; });

        var barWidth = x.bandwidth() / 7; // 计算每个长条的宽度

        groups.selectAll("rect")
            .data(function(d) { return d.value; })
            .enter().append("rect")
            .attr("width", barWidth) // 使用相同的宽度
            .attr("x", function(d, i) { return (barWidth * i) + ((barWidth / 7) * i); }) // 添加空格
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("fill", function(d, i) { return colors[i]; });

        // 添加图例
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(500," + (height + 30) + ")"); // 调整图例的位置

        legend.selectAll("rect")
            .data(total_data[0].value)
            .enter().append("rect")
            .attr("x", function(d, i) { return 100 + i * 70; }) // 调整图例矩形的位置
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d, i) { return colors[i]; });

        legend.selectAll("text")
            .data(["MLR", "ADA", "LSTM", "MAE", "RF", "SAM", "SVM"])
            .enter().append("text")
            .attr("x", function(d, i) { return 125 + i * 70; }) // 调整图例文本的位置
            .attr("y", 15)
            .style("text-anchor", "start")
            .style("font-weight", "bold")
            .text(function(d, i) { return d; });
        
        svg.append("text")
            .attr("x", width / 2) // 設置文本的x座標為畫布的中心
            .attr("y", height + 75) // 設置文本的y座標，下方留出一些空間
            .style("text-anchor", "middle") // 設置文本的對齊方式為居中
            .style("font-size", "20px") // 設置字體大小
            .style("font-weight", "bold")
            .text(start+" to "+end+" "+kind+" "+area+" Predicted 1 to 8 hours models " +pointer+" comparsion");

    }
    d3.select(window).on('resize', drawBarChart3);

    function clearTable3() {
        var tableBody = document.getElementById('table-body');
        // 移除所有子元素
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    function showtable3(total_data,pointer){
        clearTable3();
        var tableBody = document.getElementById('table-body');

        for (var i = 0; i < total_data.length; i++) {
            var row = document.createElement('tr');
            var locationCell = document.createElement('td');
            locationCell.textContent = total_data[i].location;
            row.appendChild(locationCell);

            for (var j = 0; j < total_data[i].value.length; j++) {
                var valueCell = document.createElement('td');
                valueCell.textContent = total_data[i].value[j];
                row.appendChild(valueCell);
            }

            tableBody.appendChild(row);
        }
    }
}

function perfor_tide2(start,end,area,pointer,kind){
    d3.select('.chart4 svg').remove();
    get_all_data4();
    function get_all_data4(){
        getData();
        async function getData() {
            dataGet = await d3.json(Url+area);
            data = dataGet.filter(i => i.time >= start && i.time <= end);
            getData1()
        };
        async function getData1() {
            dataGet1 = await d3.json(Url2+"Mlr_"+area+"_tide1");
            data1 = dataGet1.filter(i => i.time >= start && i.time <= end);
            getData2()
        };
        async function getData2() {
            dataGet2 = await d3.json(Url2+"Ada_"+area+"_tide1");
            data2 = dataGet2.filter(i => i.time >= start && i.time <= end);
            getData3()
        };
        async function getData3() {
            dataGet3 = await d3.json(Url2+"Lstm_"+area+"_tide1");
            data3 = dataGet3.filter(i => i.time >= start && i.time <= end);
            getData4()
        };
        async function getData4() {
            dataGet4 = await d3.json(Url2+"Mae_"+area+"_tide1");
            data4 = dataGet4.filter(i => i.time >= start && i.time <= end);
            getData5()
        };
        async function getData5() {
            dataGet5 = await d3.json(Url2+"Rf_"+area+"_tide1");
            data5 = dataGet5.filter(i => i.time >= start && i.time <= end);
            getData6()
        };
        async function getData6() {
            dataGet6 = await d3.json(Url2+"Sam_"+area+"_tide1");
            data6 = dataGet6.filter(i => i.time >= start && i.time <= end);
            getData7()
        };
        async function getData7() {
            dataGet7 = await d3.json(Url2+"Svm_"+area+"_tide1");
            data7 = dataGet7.filter(i => i.time >= start && i.time <= end);
            getData8()
        };
        async function getData8() {
            dataGet8 = await d3.json(Url2+"Mlr_"+area+"_tide2");
            data8 = dataGet8.filter(i => i.time >= start && i.time <= end);
            getData9()
        };
        async function getData9() {
            dataGet9 = await d3.json(Url2+"Ada_"+area+"_tide2");
            data9 = dataGet9.filter(i => i.time >= start && i.time <= end);
            getData10()
        };
        async function getData10() {
            dataGet10 = await d3.json(Url2+"Lstm_"+area+"_tide2");
            data10 = dataGet10.filter(i => i.time >= start && i.time <= end);
            getData11()
        };
        async function getData11() {
            dataGet11 = await d3.json(Url2+"Mae_"+area+"_tide2");
            data11 = dataGet11.filter(i => i.time >= start && i.time <= end);
            getData12()
        };
        async function getData12() {
            dataGet12 = await d3.json(Url2+"Rf_"+area+"_tide2");
            data12 = dataGet12.filter(i => i.time >= start && i.time <= end);
            getData13()
        };
        async function getData13() {
            dataGet13 = await d3.json(Url2+"Sam_"+area+"_tide2");
            data13 = dataGet13.filter(i => i.time >= start && i.time <= end);
            getData14()
        };
        async function getData14() {
            dataGet14 = await d3.json(Url2+"Svm_"+area+"_tide2");
            data14 = dataGet14.filter(i => i.time >= start && i.time <= end);
            getData15()
        };
        async function getData15() {
            dataGet15 = await d3.json(Url2+"Mlr_"+area+"_tide3");
            data15 = dataGet15.filter(i => i.time >= start && i.time <= end);
            getData16()
        };
        async function getData16() {
            dataGet16 = await d3.json(Url2+"Ada_"+area+"_tide3");
            data16 = dataGet16.filter(i => i.time >= start && i.time <= end);
            getData17()
        };
        async function getData17() {
            dataGet17 = await d3.json(Url2+"Lstm_"+area+"_tide3");
            data17 = dataGet17.filter(i => i.time >= start && i.time <= end);
            getData18()
        };
        async function getData18() {
            dataGet18 = await d3.json(Url2+"Mae_"+area+"_tide3");
            data18 = dataGet18.filter(i => i.time >= start && i.time <= end);
            getData19()
        };
        async function getData19() {
            dataGet19 = await d3.json(Url2+"Rf_"+area+"_tide3");
            data19 = dataGet19.filter(i => i.time >= start && i.time <= end);
            getData20()
        };
        async function getData20() {
            dataGet20 = await d3.json(Url2+"Sam_"+area+"_tide3");
            data20 = dataGet20.filter(i => i.time >= start && i.time <= end);
            getData21()
        };
        async function getData21() {
            dataGet21 = await d3.json(Url2+"Svm_"+area+"_tide3");
            data21 = dataGet21.filter(i => i.time >= start && i.time <= end);
            getData22()
        };
        async function getData22() {
            dataGet22 = await d3.json(Url2+"Mlr_"+area+"_tide4");
            data22 = dataGet22.filter(i => i.time >= start && i.time <= end);
            getData23()
        };
        async function getData23() {
            dataGet23 = await d3.json(Url2+"Ada_"+area+"_tide4");
            data23 = dataGet23.filter(i => i.time >= start && i.time <= end);
            getData24()
        };
        async function getData24() {
            dataGet24 = await d3.json(Url2+"Lstm_"+area+"_tide4");
            data24 = dataGet24.filter(i => i.time >= start && i.time <= end);
            getData25()
        };
        async function getData25() {
            dataGet25 = await d3.json(Url2+"Mae_"+area+"_tide4");
            data25 = dataGet25.filter(i => i.time >= start && i.time <= end);
            getData26()
        };
        async function getData26() {
            dataGet26 = await d3.json(Url2+"Rf_"+area+"_tide4");
            data26 = dataGet26.filter(i => i.time >= start && i.time <= end);
            getData27()
        };
        async function getData27() {
            dataGet27 = await d3.json(Url2+"Sam_"+area+"_tide4");
            data27 = dataGet27.filter(i => i.time >= start && i.time <= end);
            getData28()
        };
        async function getData28() {
            dataGet28 = await d3.json(Url2+"Svm_"+area+"_tide4");
            data28 = dataGet28.filter(i => i.time >= start && i.time <= end);
            getData29()
        };
        async function getData29() {
            dataGet29 = await d3.json(Url2+"Mlr_"+area+"_tide5");
            data29 = dataGet29.filter(i => i.time >= start && i.time <= end);
            getData30()
        };
        async function getData30() {
            dataGet30 = await d3.json(Url2+"Ada_"+area+"_tide5");
            data30 = dataGet30.filter(i => i.time >= start && i.time <= end);
            getData31()
        };
        async function getData31() {
            dataGet31 = await d3.json(Url2+"Lstm_"+area+"_tide5");
            data31 = dataGet31.filter(i => i.time >= start && i.time <= end);
            getData32()
        };
        async function getData32() {
            dataGet32 = await d3.json(Url2+"Mae_"+area+"_tide5");
            data32 = dataGet32.filter(i => i.time >= start && i.time <= end);
            getData33()
        };
        async function getData33() {
            dataGet33 = await d3.json(Url2+"Rf_"+area+"_tide5");
            data33 = dataGet33.filter(i => i.time >= start && i.time <= end);
            getData34()
        };
        async function getData34() {
            dataGet34 = await d3.json(Url2+"Sam_"+area+"_tide5");
            data34 = dataGet34.filter(i => i.time >= start && i.time <= end);
            getData35()
        };
        async function getData35() {
            dataGet35 = await d3.json(Url2+"Svm_"+area+"_tide5");
            data35 = dataGet35.filter(i => i.time >= start && i.time <= end);
            getData36()
        };
        async function getData36() {
            dataGet36 = await d3.json(Url2+"Mlr_"+area+"_tide6");
            data36 = dataGet36.filter(i => i.time >= start && i.time <= end);
            getData37()
        };
        async function getData37() {
            dataGet37 = await d3.json(Url2+"Ada_"+area+"_tide6");
            data37 = dataGet37.filter(i => i.time >= start && i.time <= end);
            getData38()
        };
        async function getData38() {
            dataGet38 = await d3.json(Url2+"Lstm_"+area+"_tide6");
            data38 = dataGet38.filter(i => i.time >= start && i.time <= end);
            getData39()
        };
        async function getData39() {
            dataGet39 = await d3.json(Url2+"Mae_"+area+"_tide6");
            data39 = dataGet39.filter(i => i.time >= start && i.time <= end);
            getData40()
        };
        async function getData40() {
            dataGet40 = await d3.json(Url2+"Rf_"+area+"_tide6");
            data40 = dataGet40.filter(i => i.time >= start && i.time <= end);
            getData41()
        };
        async function getData41() {
            dataGet41 = await d3.json(Url2+"Sam_"+area+"_tide6");
            data41 = dataGet41.filter(i => i.time >= start && i.time <= end);
            getData42()
        };
        async function getData42() {
            dataGet42 = await d3.json(Url2+"Svm_"+area+"_tide6");
            data42 = dataGet42.filter(i => i.time >= start && i.time <= end);
            getData43()
        };
        async function getData43() {
            dataGet43 = await d3.json(Url2+"Mlr_"+area+"_tide7");
            data43 = dataGet43.filter(i => i.time >= start && i.time <= end);
            getData44()
        };
        async function getData44() {
            dataGet44 = await d3.json(Url2+"Ada_"+area+"_tide7");
            data44 = dataGet44.filter(i => i.time >= start && i.time <= end);
            getData45()
        };
        async function getData45() {
            dataGet45 = await d3.json(Url2+"Lstm_"+area+"_tide7");
            data45 = dataGet45.filter(i => i.time >= start && i.time <= end);
            getData46()
        };
        async function getData46() {
            dataGet46 = await d3.json(Url2+"Mae_"+area+"_tide7");
            data46 = dataGet46.filter(i => i.time >= start && i.time <= end);
            getData47()
        };
        async function getData47() {
            dataGet47 = await d3.json(Url2+"Rf_"+area+"_tide7");
            data47 = dataGet47.filter(i => i.time >= start && i.time <= end);
            getData48()
        };
        async function getData48() {
            dataGet48 = await d3.json(Url2+"Sam_"+area+"_tide7");
            data48 = dataGet48.filter(i => i.time >= start && i.time <= end);
            getData49()
        };
        async function getData49() {
            dataGet49 = await d3.json(Url2+"Svm_"+area+"_tide7");
            data49 = dataGet49.filter(i => i.time >= start && i.time <= end);
            getData50()
        };
        async function getData50() {
            dataGet50 = await d3.json(Url2+"Mlr_"+area+"_tide8");
            data50 = dataGet50.filter(i => i.time >= start && i.time <= end);
            getData51()
        };
        async function getData51() {
            dataGet51 = await d3.json(Url2+"Ada_"+area+"_tide8");
            data51 = dataGet51.filter(i => i.time >= start && i.time <= end);
            getData52()
        };
        async function getData52() {
            dataGet52 = await d3.json(Url2+"Lstm_"+area+"_tide8");
            data52 = dataGet52.filter(i => i.time >= start && i.time <= end);
            getData53()
        };
        async function getData53() {
            dataGet53 = await d3.json(Url2+"Mae_"+area+"_tide8");
            data53 = dataGet53.filter(i => i.time >= start && i.time <= end);
            getData54()
        };
        async function getData54() {
            dataGet54 = await d3.json(Url2+"Rf_"+area+"_tide8");
            data54 = dataGet54.filter(i => i.time >= start && i.time <= end);
            getData55()
        };
        async function getData55() {
            dataGet55 = await d3.json(Url2+"Sam_"+area+"_tide8");
            data55 = dataGet55.filter(i => i.time >= start && i.time <= end);
            getData56()
        };
        async function getData56() {
            dataGet56 = await d3.json(Url2+"Svm_"+area+"_tide8");
            data56 = dataGet56.filter(i => i.time >= start && i.time <= end);
            performance4();
        };
        
    }
    
    function performance4(){
        if (pointer === "MAE") {
            const calculateMAE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (sum / count).toFixed(2) : 0;
            };
        
            // 1 hour
            const mae1_1 = calculateMAE(data, data1);
            const mae1_2 = calculateMAE(data, data2);
            const mae1_3 = calculateMAE(data, data3);
            const mae1_4 = calculateMAE(data, data4);
            const mae1_5 = calculateMAE(data, data5);
            const mae1_6 = calculateMAE(data, data6);
            const mae1_7 = calculateMAE(data, data7);

            // 2 hour
            const mae2_1 = calculateMAE(data, data8);
            const mae2_2 = calculateMAE(data, data9);
            const mae2_3 = calculateMAE(data, data10);
            const mae2_4 = calculateMAE(data, data11);
            const mae2_5 = calculateMAE(data, data12);
            const mae2_6 = calculateMAE(data, data13);
            const mae2_7 = calculateMAE(data, data14);

            // 3 hour
            const mae3_1 = calculateMAE(data, data15);
            const mae3_2 = calculateMAE(data, data16);
            const mae3_3 = calculateMAE(data, data17);
            const mae3_4 = calculateMAE(data, data18);
            const mae3_5 = calculateMAE(data, data19);
            const mae3_6 = calculateMAE(data, data20);
            const mae3_7 = calculateMAE(data, data21);

            // 4 hour
            const mae4_1 = calculateMAE(data, data22);
            const mae4_2 = calculateMAE(data, data23);
            const mae4_3 = calculateMAE(data, data24);
            const mae4_4 = calculateMAE(data, data25);
            const mae4_5 = calculateMAE(data, data26);
            const mae4_6 = calculateMAE(data, data27);
            const mae4_7 = calculateMAE(data, data28);

            // 5 hour
            const mae5_1 = calculateMAE(data, data29);
            const mae5_2 = calculateMAE(data, data30);
            const mae5_3 = calculateMAE(data, data31);
            const mae5_4 = calculateMAE(data, data32);
            const mae5_5 = calculateMAE(data, data33);
            const mae5_6 = calculateMAE(data, data34);
            const mae5_7 = calculateMAE(data, data35);

            // 6 hour
            const mae6_1 = calculateMAE(data, data36);
            const mae6_2 = calculateMAE(data, data37);
            const mae6_3 = calculateMAE(data, data38);
            const mae6_4 = calculateMAE(data, data39);
            const mae6_5 = calculateMAE(data, data34);
            const mae6_6 = calculateMAE(data, data41);
            const mae6_7 = calculateMAE(data, data42);

            // 7 hour
            const mae7_1 = calculateMAE(data, data43);
            const mae7_2 = calculateMAE(data, data44);
            const mae7_3 = calculateMAE(data, data45);
            const mae7_4 = calculateMAE(data, data46);
            const mae7_5 = calculateMAE(data, data47);
            const mae7_6 = calculateMAE(data, data48);
            const mae7_7 = calculateMAE(data, data49);

            // 8 hour
            const mae8_1 = calculateMAE(data, data50);
            const mae8_2 = calculateMAE(data, data51);
            const mae8_3 = calculateMAE(data, data52);
            const mae8_4 = calculateMAE(data, data53);
            const mae8_5 = calculateMAE(data, data54);
            const mae8_6 = calculateMAE(data, data55);
            const mae8_7 = calculateMAE(data, data56);

            var total_data4 = [
                { location: '1 hour', value: [mae1_1, mae1_2, mae1_3, mae1_4, mae1_5, mae1_6, mae1_7] },
                { location: '2 hours', value: [mae2_1, mae2_2, mae2_3, mae2_4, mae2_5, mae2_6, mae2_7] },
                { location: '3 hours', value: [mae3_1, mae3_2, mae3_3, mae3_4, mae3_5, mae3_6, mae3_7] },
                { location: '4 hours', value: [mae4_1, mae4_2, mae4_3, mae4_4, mae4_5, mae4_6, mae4_7] },
                { location: '5 hours', value: [mae5_1, mae5_2, mae5_3, mae5_4, mae5_5, mae5_6, mae5_7] },
                { location: '6 hours', value: [mae6_1, mae6_2, mae6_3, mae6_4, mae6_5, mae6_6, mae6_7] },
                { location: '7 hours', value: [mae7_1, mae7_2, mae7_3, mae7_4, mae7_5, mae7_6, mae7_7] },
                { location: '8 hours', value: [mae8_1, mae8_2, mae8_3, mae8_4, mae8_5, mae8_6, mae8_7] }
            ];
            console.log(total_data4);
            drawBarChart4(total_data4,pointer);
            showtable4(total_data4,pointer);
        }
        if(pointer == "R2"){
            const calculateR2 = (data, dataToMatch) => {
                let actual_count = 0;
                let actual_sum = 0;
                let sum = 0;
                let count = 0;
                let sum2 = 0 ;
                let count2 = 0;
                data.forEach(item => {
                    // 获取当前条目的时间
                    if (item.tide && item.tide !== "-") {
                        var a = parseFloat(item.tide);
                        actual_sum = actual_sum + a;
                        actual_count = actual_count + 1;
                        } 
                });
                avg_actual = actual_sum/actual_count;

                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide)*Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;

                        const diff2 = (item.tide - avg_actual)*(item.tide - avg_actual);
                        sum2 = sum2 + diff2;
                    }
                });
        
                return (count > 0) ? (1 - sum / sum2).toFixed(2) : 0;
            };


            // 1 hour
            const r21_1 = calculateR2(data, data1);
            const r21_2 = calculateR2(data, data2);
            const r21_3 = calculateR2(data, data3);
            const r21_4 = calculateR2(data, data4);
            const r21_5 = calculateR2(data, data5);
            const r21_6 = calculateR2(data, data6);
            const r21_7 = calculateR2(data, data7);

            // 2 hours
            const r22_1 = calculateR2(data, data8);
            const r22_2 = calculateR2(data, data9);
            const r22_3 = calculateR2(data, data10);
            const r22_4 = calculateR2(data, data11);
            const r22_5 = calculateR2(data, data12);
            const r22_6 = calculateR2(data, data13);
            const r22_7 = calculateR2(data, data14);

            // 3 hours
            const r23_1 = calculateR2(data, data15);
            const r23_2 = calculateR2(data, data16);
            const r23_3 = calculateR2(data, data17);
            const r23_4 = calculateR2(data, data18);
            const r23_5 = calculateR2(data, data19);
            const r23_6 = calculateR2(data, data20);
            const r23_7 = calculateR2(data, data21);

            // 4 hours
            const r24_1 = calculateR2(data, data22);
            const r24_2 = calculateR2(data, data23);
            const r24_3 = calculateR2(data, data24);
            const r24_4 = calculateR2(data, data25);
            const r24_5 = calculateR2(data, data26);
            const r24_6 = calculateR2(data, data27);
            const r24_7 = calculateR2(data, data28);

            // 5 hours
            const r25_1 = calculateR2(data, data29);
            const r25_2 = calculateR2(data, data30);
            const r25_3 = calculateR2(data, data31);
            const r25_4 = calculateR2(data, data32);
            const r25_5 = calculateR2(data, data33);
            const r25_6 = calculateR2(data, data34);
            const r25_7 = calculateR2(data, data35);

            // 6 hours
            const r26_1 = calculateR2(data, data36);
            const r26_2 = calculateR2(data, data37);
            const r26_3 = calculateR2(data, data38);
            const r26_4 = calculateR2(data, data39);
            const r26_5 = calculateR2(data, data40);
            const r26_6 = calculateR2(data, data41);
            const r26_7 = calculateR2(data, data42);

            // 7 hours
            const r27_1 = calculateR2(data, data43);
            const r27_2 = calculateR2(data, data44);
            const r27_3 = calculateR2(data, data45);
            const r27_4 = calculateR2(data, data46);
            const r27_5 = calculateR2(data, data47);
            const r27_6 = calculateR2(data, data48);
            const r27_7 = calculateR2(data, data49);

            // 8 hours
            const r28_1 = calculateR2(data, data50);
            const r28_2 = calculateR2(data, data54);
            const r28_3 = calculateR2(data, data54);
            const r28_4 = calculateR2(data, data53);
            const r28_5 = calculateR2(data, data54);
            const r28_6 = calculateR2(data, data55);
            const r28_7 = calculateR2(data, data56);

            var total_data4 = [
                { location: '1 hour', value: [r21_1, r21_2, r21_3, r21_4, r21_5, r21_6, r21_7] },
                { location: '2 hours', value: [r22_1, r22_2, r22_3, r22_4, r22_5, r22_6, r22_7] },
                { location: '3 hours', value: [r23_1, r23_2, r23_3, r23_4, r23_5, r23_6, r23_7] },
                { location: '4 hours', value: [r24_1, r24_2, r24_3, r24_4, r24_5, r24_6, r24_7] },
                { location: '5 hours', value: [r25_1, r25_2, r25_3, r25_4, r25_5, r25_6, r25_7] },
                { location: '6 hours', value: [r26_1, r26_2, r26_3, r26_4, r26_5, r26_6, r26_7] },
                { location: '7 hours', value: [r27_1, r27_2, r27_3, r27_4, r27_5, r27_6, r27_7] },
                { location: '8 hours', value: [r28_1, r28_2, r28_3, r28_4, r28_5, r28_6, r28_7] }
            ];
            console.log(total_data4);
            drawBarChart4(total_data4,pointer);
            showtable4(total_data4,pointer);
        }
        if(pointer == "RMSE"){
            const calculateRMSE = (data, dataToMatch) => {
                let sum = 0;
                let count = 0;
        
                data.forEach(item => {
                    const time = item.time;
                    const matchingItem = dataToMatch.find(item1 => item1.time === time);
        
                    if (matchingItem && item.tide && item.tide !== "-" && matchingItem.tide && matchingItem.tide !== "-") {
                        const diff = Math.abs(item.tide - matchingItem.tide)*Math.abs(item.tide - matchingItem.tide);
                        sum += diff;
                        count++;
                    }
                });
        
                return (count > 0) ? (Math.sqrt(sum / count)).toFixed(2) : 0;
            };

            // 1 hour
            const rmse1_1 = calculateRMSE(data, data1);
            const rmse1_2 = calculateRMSE(data, data2);
            const rmse1_3 = calculateRMSE(data, data3);
            const rmse1_4 = calculateRMSE(data, data4);
            const rmse1_5 = calculateRMSE(data, data5);
            const rmse1_6 = calculateRMSE(data, data6);
            const rmse1_7 = calculateRMSE(data, data7);

            // 2 hours
            const rmse2_1 = calculateRMSE(data, data8);
            const rmse2_2 = calculateRMSE(data, data9);
            const rmse2_3 = calculateRMSE(data, data10);
            const rmse2_4 = calculateRMSE(data, data11);
            const rmse2_5 = calculateRMSE(data, data12);
            const rmse2_6 = calculateRMSE(data, data13);
            const rmse2_7 = calculateRMSE(data, data14);

            // 3 hours
            const rmse3_1 = calculateRMSE(data, data15);
            const rmse3_2 = calculateRMSE(data, data16);
            const rmse3_3 = calculateRMSE(data, data17);
            const rmse3_4 = calculateRMSE(data, data18);
            const rmse3_5 = calculateRMSE(data, data19);
            const rmse3_6 = calculateRMSE(data, data20);
            const rmse3_7 = calculateRMSE(data, data21);

            // 4 hours
            const rmse4_1 = calculateRMSE(data, data22);
            const rmse4_2 = calculateRMSE(data, data23);
            const rmse4_3 = calculateRMSE(data, data24);
            const rmse4_4 = calculateRMSE(data, data25);
            const rmse4_5 = calculateRMSE(data, data26);
            const rmse4_6 = calculateRMSE(data, data27);
            const rmse4_7 = calculateRMSE(data, data28);

            // 5 hours
            const rmse5_1 = calculateRMSE(data, data29);
            const rmse5_2 = calculateRMSE(data, data30);
            const rmse5_3 = calculateRMSE(data, data31);
            const rmse5_4 = calculateRMSE(data, data32);
            const rmse5_5 = calculateRMSE(data, data33);
            const rmse5_6 = calculateRMSE(data, data34);
            const rmse5_7 = calculateRMSE(data, data35);

            // 6 hours
            const rmse6_1 = calculateRMSE(data, data36);
            const rmse6_2 = calculateRMSE(data, data37);
            const rmse6_3 = calculateRMSE(data, data38);
            const rmse6_4 = calculateRMSE(data, data39);
            const rmse6_5 = calculateRMSE(data, data40);
            const rmse6_6 = calculateRMSE(data, data41);
            const rmse6_7 = calculateRMSE(data, data42);

            // 7 hours
            const rmse7_1 = calculateRMSE(data, data43);
            const rmse7_2 = calculateRMSE(data, data44);
            const rmse7_3 = calculateRMSE(data, data45);
            const rmse7_4 = calculateRMSE(data, data46);
            const rmse7_5 = calculateRMSE(data, data47);
            const rmse7_6 = calculateRMSE(data, data48);
            const rmse7_7 = calculateRMSE(data, data49);

            // 8 hours
            const rmse8_1 = calculateRMSE(data, data50);
            const rmse8_2 = calculateRMSE(data, data51);
            const rmse8_3 = calculateRMSE(data, data52);
            const rmse8_4 = calculateRMSE(data, data53);
            const rmse8_5 = calculateRMSE(data, data54);
            const rmse8_6 = calculateRMSE(data, data55);
            const rmse8_7 = calculateRMSE(data, data56);

            var total_data4 = [
                { location: '1 hour', value: [rmse1_1, rmse1_2, rmse1_3, rmse1_4, rmse1_5, rmse1_6, rmse1_7] },
                { location: '2 hours', value: [rmse2_1, rmse2_2, rmse2_3, rmse2_4, rmse2_5, rmse2_6, rmse2_7] },
                { location: '3 hours', value: [rmse3_1, rmse3_2, rmse3_3, rmse3_4, rmse3_5, rmse3_6, rmse3_7] },
                { location: '4 hours', value: [rmse4_1, rmse4_2, rmse4_3, rmse4_4, rmse4_5, rmse4_6, rmse4_7] },
                { location: '5 hours', value: [rmse5_1, rmse5_2, rmse5_3, rmse5_4, rmse5_5, rmse5_6, rmse5_7] },
                { location: '6 hours', value: [rmse6_1, rmse6_2, rmse6_3, rmse6_4, rmse6_5, rmse6_6, rmse6_7] },
                { location: '7 hours', value: [rmse7_1, rmse7_2, rmse7_3, rmse7_4, rmse7_5, rmse7_6, rmse7_7] },
                { location: '8 hours', value: [rmse8_1, rmse8_2, rmse8_3, rmse8_4, rmse8_5, rmse8_6, rmse8_7] }
            ];
            console.log(total_data4);
            drawBarChart4(total_data4,pointer);
            showtable4(total_data4,pointer);
        }
    }

    function drawBarChart4(total_data,pointer){
        
        // 设置画布大小和边距
        var margin = { top: 50, right: 30, bottom: 80, left: 80 },
            width = 1600 - margin.left - margin.right,

            height = 600 - margin.top - margin.bottom;

        // 创建一个SVG元素
        var svg = d3.select(".chart4")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // 获取所有時間的数组
        var locations = total_data.map(function(d) { return d.location; });

        // 设置x轴和y轴的比例尺
        var x = d3.scaleBand()
            .domain(locations)
            .rangeRound([0, width]) // 使用rangeRound
            .padding(0.3); // 控制间隔大小

        var y = d3.scaleLinear()
            .domain([0, d3.max(total_data, function(d) { return d3.max(d.value); })])
            .nice()
            .range([height, 0]);

        // 添加x轴和y轴
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .style("font-weight", "bold")
            .style("font-size", "20px");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .style("font-weight", "bold")
            .style("font-size", "16px");

        // 创建複合長條圖
        var colors = d3.schemeCategory10; // 颜色方案

        var groups = svg.selectAll(".location")
            .data(total_data)
            .enter().append("g")
            .attr("class", "location")
            .attr("transform", function(d) { return "translate(" + x(d.location) + ",0)"; });

        var barWidth = x.bandwidth() / 7; // 计算每个长条的宽度

        groups.selectAll("rect")
            .data(function(d) { return d.value; })
            .enter().append("rect")
            .attr("width", barWidth) // 使用相同的宽度
            .attr("x", function(d, i) { return (barWidth * i) + ((barWidth / 7) * i); }) // 添加空格
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("fill", function(d, i) { return colors[i]; });

        // 添加图例
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(500," + (height + 30) + ")"); // 调整图例的位置

        legend.selectAll("rect")
            .data(total_data[0].value)
            .enter().append("rect")
            .attr("x", function(d, i) { return 100 + i * 70; }) // 调整图例矩形的位置
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d, i) { return colors[i]; });

        legend.selectAll("text")
            .data(["MLR", "ADA", "LSTM", "MAE", "RF", "SAM", "SVM"])
            .enter().append("text")
            .attr("x", function(d, i) { return 125 + i * 70; }) // 调整图例文本的位置
            .attr("y", 15)
            .style("text-anchor", "start")
            .style("font-weight", "bold")
            .text(function(d, i) { return d; });
        
        svg.append("text")
            .attr("x", width / 2) // 設置文本的x座標為畫布的中心
            .attr("y", height + 75) // 設置文本的y座標，下方留出一些空間
            .style("text-anchor", "middle") // 設置文本的對齊方式為居中
            .style("font-size", "20px") // 設置字體大小
            .style("font-weight", "bold")
            .text(start+" to "+end+" "+kind+" "+area+" Predicted 1 to 8 hours models " +pointer+" comparsion");

    }
    d3.select(window).on('resize', drawBarChart4);

    function clearTable4() {
        var tableBody = document.getElementById('table-body');
        // 移除所有子元素
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    function showtable4(total_data,pointer){
        clearTable4();
        var tableBody = document.getElementById('table-body');

        for (var i = 0; i < total_data.length; i++) {
            var row = document.createElement('tr');
            var locationCell = document.createElement('td');
            locationCell.textContent = total_data[i].location;
            row.appendChild(locationCell);

            for (var j = 0; j < total_data[i].value.length; j++) {
                var valueCell = document.createElement('td');
                valueCell.textContent = total_data[i].value[j];
                row.appendChild(valueCell);
            }

            tableBody.appendChild(row);
        }
    }
}