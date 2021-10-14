function densitydots(svg, data) {
  // we only want to use data where we are dealing with people who have birth years
  data = data.filter(d => (d['born'] != null && d['born'] != '0000/00/00' && d['year'] != null && d['category'] != null));

  let margins = { 'left': 100, 'top': 10, 'bottom': 30, 'right': 10 };
  let chartArea = svg.append('g').attr('transform', `translate(${margins.left},${margins.top})`);
  let chartWidth = svg.attr('width') - margins.left - margins.right;
  let chartHeight = svg.attr('height') - margins.top - margins.bottom;
  data.forEach(d => {
    let birthYear = Number(d['born'].substring(d['born'].length - 4));
    d['age'] = d['year'] - birthYear;
  })
  console.log(data);
  const categories = ['peace', 'chemistry', 'physics', 'medicine', 'literature', 'economics'];
  const categoryPositions = [...Array(6).keys()].map(x => chartHeight / 12 + x * (chartHeight / 6));
  const categoryScale = d3.scaleOrdinal().domain(categories).range(categoryPositions);
  console.log(categoryScale.range());
  const ageMax = d3.max(data, d => d['age']);
  console.log(data.find(d => d['age'] == ageMax));
  const ageScale = d3.scaleLinear().domain([10, ageMax]).range([0, chartWidth]);

  const sideLabels = svg.append('g')
    .attr('transform', `translate(0, ${margins.top})`)

  let i = 0;
  categories.forEach(cat => {
    sideLabels.append('text')
      .attr('x', 10)
      .attr('y', categoryScale(cat))
      .attr('dominant-baseline', 'middle')
      .text(cat);
    if (i % 2 == 1) {
      chartArea.append('rect')
        .attr('x', 0)
        .attr('y', categoryScale(cat) - 30)
        .attr('width', chartWidth)
        .attr('height', 60)
        .style('stroke', 'lightgrey')
        .style('stroke-width', 1)
        .style('fill', 'none')
    }
    i++;
  })

  let bottomAxis = d3.axisBottom(ageScale)
  let bottomGridlines = d3.axisBottom(ageScale)
    .tickSize(-chartHeight - 10)
    .tickFormat("")
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margins.left}, ${chartHeight + margins.top + 10})`)
    .call(bottomAxis);
  svg.append("g")
    .attr("class", "x gridlines")
    .attr("transform", `translate(${margins.left}, ${chartHeight + margins.top + 10})`)
    .call(bottomGridlines);

  data.forEach(d => {
    if (d['gender'] == 'male') {
      chartArea.append('circle')
        .attr('cx', ageScale(d['age']))
        .attr('cy', categoryScale(d['category']) + 10)
        .attr('r', 5)
        .style('fill', 'steelblue')
        .style('opacity', 0.3);
    }
    else {
      chartArea.append('circle')
        .attr('cx', ageScale(d['age']))
        .attr('cy', categoryScale(d['category']) - 10)
        .attr('r', 5)
        .style('fill', 'red')
        .style('opacity', 0.3);
    }
  })
}

function densitydotslegend() {
  d3.select("div#vis2")
    .append('div')
    .attr("id", "legend2")
    .style('background-color', '#f7f7f7')
    .style('border', '1px solid black')
    .style('width', 'max-content')
    .style('padding', '10 20 10 20')
  let female_guide = d3.select("#legend2").append('div')
    .attr("id", "female")
    .style('color', 'red')
  female_guide.append('text')
    .text('female')
    .style('display', 'inline')
    .style('padding-right', '10')
  female_guide.append('text').text('1 person').style('padding-right', 5)
  let male_guide = d3.select("#legend2")
    .append('div')
    .attr("id", "male")
    .style('color', 'steelblue')
  male_guide.append('text').text('male').style('padding-right', '10')
  male_guide.append('text').text('1 person').style('padding-right', 5)

  let lumScale1 = d3.select("#male").append('svg').attr('width', 140).attr('height', 20);
  let lumScale2 = d3.select("#female").append('svg').attr('width', 100).attr('height', 20);

  for (i = 0; i < 7; i++) {
    for (j = 0; j <= i; j++) {
      lumScale1.append('rect')
        .attr('x', 20 * i)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'steelblue')
        .style('opacity', 0.3)
    }
  }

  for (i = 0; i < 5; i++) {
    for (j = 0; j <= i; j++) {
      lumScale2.append('rect')
        .attr('x', 20 * i)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'red')
        .style('opacity', 0.3)
    }
  }
  female_guide.append('text').text('5 people').style('padding-left', 5)
  male_guide.append('text').text('7 people').style('padding-left', 5)


}