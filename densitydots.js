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
  const ageMax = d3.max(data, d => d['age']);
  const ageScale = d3.scaleLinear().domain([10, ageMax]).range([0, chartWidth]);

  const sideLabels = svg.append('g')
    .attr('transform', `translate(0, ${margins.top})`)

  categories.forEach(cat => sideLabels.append('text')
    .attr('x', 10)
    .attr('y', categoryScale(cat))
    .text(cat))

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
  d3.select("div#vis3")
    .append('div')
    .attr("id", "legend3")
    .style('background-color', '#f7f7f7')
    .style('border', '1px solid black')
    .style('width', 'max-content');
  let female_guide = d3.select("#legend3").append('div')
    .attr("id", "female")
    .style('padding-left', '10')
    .style('display', 'inline')
  female_guide.append('text').text('female').style('color', 'red')
  let male_guide = d3.select("#legend3")
    .append('div')
    .attr("id", "female")
    .style('padding-left', '10')
    .style('padding-right', '10')
    .style('display', 'inline')
  male_guide.append('text').text('male').style('color', 'blue')

  let lumScale1 = d3.select("div#vis3").append('svg').attr('width', 100).attr('height', 20);
  let lumScale2 = d3.select("div#vis3").append('svg').attr('width', 100).attr('height', 20);
  for (i = 0; i < 5; i++) {
    for (j = 0; j <= i; j++) {
      lumScale1.append('rect')
        .attr('x', 20 * i)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'steelblue')
        .style('opacity', 0.3)

      lumScale2.append('rect')
        .attr('x', 20 * i)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', 'red')
        .style('opacity', 0.3)
    }
  }
  // TODO: add another guide to show how the luminosity corresponds to people


}