
var d3;
var dataset;

var margin = {top: 20, right: 40, bottom: 30, left: 10};
var width;
var height;
var dateFormat;
var xScale;
var yScale;

// line matching data points
var line = d3.line()
    .x(function(d) { return xScale(d.Date); })
    .y(function(d) { return yScale(d.Close); });


var chart_bar = (function(d) {return xScale(d.Date); });


// reduce/parse data
function getDataset(data) { 

    dataset = [];

    var rowConverter = function(d) {
        var parseTime = d3.timeParse("%Y-%m-%d");
        return {
            Date: parseTime(d.Date),
            Open: parseInt(d.Open),
            Close: parseFloat(d.Close),
        }
    }

    // store every 7th data to reduce number of data points
    data.forEach(function(d,i) {
        if (i % 7 == 0) {
            dataset.push(d);
        }
    });

    // parse data
    dataset.forEach(function(d,i) {
        dataset[i] = rowConverter(d);
    });
    return dataset;
}

function getXScale(dataset, minW, maxW) {
    var padding = 20;
    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.Date; }),
            d3.max(dataset, function(d) { return d.Date; }),
        ])
        .range([minW, maxW]);
    return xScale;
}

function getYScale(dataset, minH, maxH) {
    var padding = 20;
    yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function(d) { return d.Close })-padding,
            d3.max(dataset, function(d) { return d.Close })+padding,
        ])
        .range([maxH,minH]);
    return yScale;
}



function resize() {
    width = parseInt(d3.select("#left-div").style("width"));
    height = parseInt(d3.select("#left-div").style("height"));

    // Update the range of the scale with new width/height
    xScale.range([0, width]);
    yScale.range([height, 0]);

    // Force D3 to recalculate and update the line
    d3.select(".line")
        .attr("d", function(d) { return line(d); });
    d3.select(".area")
        .attr("d", function(d) { return area(d); });
    d3.selectAll(".chart-bar")
        .attr("x", function(d) { return xScale(d.Date); }); 
};


function layout(d3_, data, symbol, current) {
    d3 = d3_;

    if (data.length == 0) {
        return;
    }

    var dataset = getDataset(data);

    width = parseInt(d3.select("div#left-div").style("width"));
    height = parseInt(d3.select("div#left-div").style("height"));
    dateFormat = d3.timeFormat("%b %d %Y");
    xScale = getXScale(dataset, 0, width);
    yScale = getYScale(dataset, 0, height);


    var graph_chart = d3.select("#graph-chart")
        .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .on("mouseleave", function() {
            title.text(symbol + " $" + current.Close)
            d3.select(".selected")
                .classed("hidden", true)
                .classed("selected", false)
            d3.select("#tooltip")
                .classed("hidden", true)
        });

    // tooltip indicating date
    var tooltip = graph_chart.append("text")
        .attr("id", "tooltip")
        .classed("hidden", true);


    graph_chart.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);


    // bar indicating current data point
    graph_chart.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "chart-bar")
        .attr("x", function(d) {
            return xScale(d.Date);
        })
        .attr("y", 0)
        .attr("width", function() { return width/dataset.length } )
        .attr("height", height)
        .classed("hidden", true)
        .on("mouseover", function(d) {
            d3.select(".selected")
                .classed("hidden", true)
                .classed("selected", false)
            d3.select(this)
                .classed("hidden", false)
                .classed("selected", true)
            d3.select("#tooltip")
                .attr("x", xScale(d.Date))
                .attr("y", 10)
                .classed("hidden", false)
                .text(dateFormat(d.Date))
            title.text(symbol + " $" + d.Close)
        });


    // text chart
    var title = d3.select("div#text-chart")
        .append("h1")
        .attr("id", "title")
        .text(symbol + " $" + current.Close)



    d3.select(window).on('resize', resize);
    resize();
}
