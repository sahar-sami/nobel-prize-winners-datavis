function piecharts() {
  d3.csv("nobel_prize_by_winner.csv").then((data) => {

    let svg4 = d3.select('#vis4').append('svg').attr('width', 500).attr('height', 700);

    const color_key = {
      'Harvard University': 'red',
      'Columbia University': 'blue',
      'Cornell University': 'yellow',
      'University of Pennsylvania': 'green',
      'Yale University': 'grey',
      'Dartmouth University': 'purple',
      'Brown University': 'violet',
      'Princeton University': 'orange',
    }
    //Pie chart key
    svg4.append('text')
      .attr('y', 45)
      .attr('x', 250)
      .style('text-anchor', 'middle')
      .text("Key")

    svg4.append("g").attr('transform', `translate(${100},${50})`)
      .attr("class", "colorKey")
      .append('rect')
      .attr("width", 300)
      .attr("height", 210)
      .style("fill", "white")
      .style("stroke", "black")

    function createColorKey(x, y, uni) {
      svg4.selectAll('.colorKey')
        .append('rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", color_key[uni])
        .attr("opacity", 0.5)
        .style("stroke", "black")

      svg4.selectAll('.colorKey')
        .append('text')
        .attr('y', y)
        .attr('x', x + 30)
        .style('font-size', '15px')
        .style('dominant-baseline', 'hanging')
        .text(uni);
    }

    createColorKey(85, 10, 'Harvard University');
    createColorKey(85, 35, 'Columbia University');
    createColorKey(85, 60, 'Cornell University');
    createColorKey(85, 85, 'University of Pennsylvania');
    createColorKey(85, 110, 'Yale University');
    createColorKey(85, 135, 'Dartmouth University');
    createColorKey(85, 160, 'Brown University');
    createColorKey(85, 185, 'Princeton University');



    data = data.filter(d => d.name === 'Harvard University'
      || d.name === 'Columbia University'
      || d.name === 'Cornell University'
      || d.name === 'University of Pennsylvania'
      || d.name === 'Yale University'
      || d.name === 'Dartmouth University'
      || d.name === 'Brown University'
      || d.name === 'Princeton University');

    data_physics = data.filter(d => d.category === 'physics');
    data_chemistry = data.filter(d => d.category === 'chemistry');
    data_medicine = data.filter(d => d.category === 'medicine');
    data_peace = data.filter(d => d.category === 'peace');
    data_economics = data.filter(d => d.category === 'economics');

    function categoryCount(data) {
      const count_dict = {
        'Harvard University': data.filter(d => d.name === 'Harvard University').length,
        'Columbia University': data.filter(d => d.name === 'Columbia University').length,
        'Cornell University': data.filter(d => d.name === 'Cornell University').length,
        'University of Pennsylvania': data.filter(d => d.name === 'University of Pennsylvania').length,
        'Yale University': data.filter(d => d.name === 'Yale University').length,
        'Dartmouth University': data.filter(d => d.name === 'Dartmouth University').length,
        'Brown University': data.filter(d => d.name === 'Brown University').length,
        'Princeton University': data.filter(d => d.name === 'Princeton University').length,
      }
      return count_dict;
    }
    const physics_centerpoint = {
      x: 75,
      y: 400
    };

    const chemistry_centerpoint = {
      x: 240,
      y: 400
    };

    const medicine_centerpoint = {
      x: 400,
      y: 400
    };

    const peace_centerpoint = {
      x: 150,
      y: 600
    };

    const economics_centerpoint = {
      x: 320,
      y: 600
    };

    const translation_amount = {
      'physics': physics_centerpoint,
      'chemistry': chemistry_centerpoint,
      'medicine': medicine_centerpoint,
      'peace': peace_centerpoint,
      'economics': economics_centerpoint,
    };

    //the declaration and use of pie() is referenced from https://www.d3-graph-gallery.com/graph/pie_annotation.html
    let pieGraph = d3.pie().value(function (d) { return d[1]; })

    let data_physics_pie = pieGraph(Object.entries(categoryCount(data_physics)));
    let data_chemistry_pie = pieGraph(Object.entries(categoryCount(data_chemistry)));
    let data_medicine_pie = pieGraph(Object.entries(categoryCount(data_medicine)));
    let data_peace_pie = pieGraph(Object.entries(categoryCount(data_peace)));
    let data_economics_pie = pieGraph(Object.entries(categoryCount(data_economics)));

    //the declaration and use arc() is referenced from https://www.d3-graph-gallery.com/graph/pie_annotation.html
    let arc = d3.arc().innerRadius(0).outerRadius(75);


    //function generates different pie charts for each nobel prize category                      
    function generatePie(data, category) {
      svg4.append('text')
        .attr('y', translation_amount[category].y - 90)
        .attr('x', translation_amount[category].x)
        .style('text-anchor', 'middle')
        .text(category)


      svg4.selectAll('pieCharts' + category)
        .data(data)
        .join(
          function (enter) {
            return enter.append("g")
              .attr("transform",
                `translate(${translation_amount[category].x}, ${translation_amount[category].y})`)
              .append('path')
              .attr('d', arc)
              .attr('fill', function (e) { return (color_key[e.data[0]]) })
              .attr("stroke", "black")
              .attr("opacity", 0.5)
              .style("stroke-width", "1px")
          }
        )

      svg4.selectAll('pieCharts' + category)
        .data(data)
        .join(
          function (enter) {
            return enter.append('text')
              .attr("transform", function (e) {
                const centroid = arc.centroid(e);
                return (`translate(${translation_amount[category].x + centroid[0]},${translation_amount[category].y + centroid[1]})`)
              })
              .text(function (e) {
                if (e.data[1] === 0) {
                  return "";
                }
                else {
                  return e.data[1];
                }
              })
              .style("font-size", 10)
              .style("text-anchor", "middle")
          }
        )

    }

    generatePie(data_physics_pie, 'physics');
    generatePie(data_chemistry_pie, 'chemistry')
    generatePie(data_medicine_pie, 'medicine');
    generatePie(data_peace_pie, 'peace');
    generatePie(data_economics_pie, 'economics');

  });

}