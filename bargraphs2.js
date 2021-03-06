function bargraphs2() {
  d3.csv('nobel_prize_by_winner.csv', d3.autoType).then((data) => {
    data = data.filter(d => d['country'] != null && d['gender'] != null && d['gender'] != "org" && (d['country'] == "USA" || d['country'] == "Germany" || d['country'] == "France" || d['country'] == "United Kingdom" || d['country'] == "Switzerland"));
    const svg = d3.select("#vis3").append('svg').attr('width', 725).attr('height', 350);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const margins = { top: 50, right: 5, left: 100, bottom: 30 };
    let chartArea = svg.append('g').attr('transform', `translate(${margins.left},${margins.top})`);
    let chartWidth = width - margins.left - margins.right;
    let chartHeight = height - margins.top - margins.bottom;
    let winningCountries = {};
    data.forEach(d => {
      let country = d['country'];
      let gender = d['gender'];
      if (country in winningCountries) {
        winningCountries[country][gender] += 1;
        winningCountries[country]['total'] += 1;
      } else {
        winningCountries[country] = { 'country': country, 'male': 0, 'female': 0, 'org': 0, 'total': 0 };
        winningCountries[country][gender] += 1;
        winningCountries[country]['total'] += 1;
      }
    });
    console.log(winningCountries);
    const countriesList = Object.values(winningCountries);
    const numberMax = d3.max(countriesList, c => c['total']);
    const numberScale = d3.scaleLinear().domain([0, numberMax]).range([0, chartWidth]);

    let bottomAxis = d3.axisBottom(numberScale)
    let bottomGridlines = d3.axisBottom(numberScale)
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
    const labels = svg.append('g')
      .attr('transform', `translate(0, ${margins.top})`)
    const botlabels = svg.append('g')
      .attr('transform', `translate(0, ${margins.right})`)
    //console.log(Object.keys(winningCountries).length);
    var subgroups = [male, female]
    let y = 20
    let count = 0
    let axis = 0
    let xc = 200

    console.log(Object.entries(winningCountries).length);
    for (const [key, val] of Object.entries(winningCountries)) {
      labels.append('text')
        .attr('x', 0)
        .attr('y', y + 20)
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '0.8em')
        .text(val.country);
      chartArea.append('rect')
        .attr('width', numberScale(val.male))
        .attr('x', 0)
        .attr('opacity', 0.4)
        .attr('y', y)
        .attr('height', 50)
        .text(val.total)
        .style('fill', 'steelblue');

      chartArea.append('rect')
        .attr('width', numberScale(val.female))
        .attr('x', numberScale(val.male))
        .attr('opacity', 0.4)
        .attr('y', y)
        .attr('height', 50)
        .style('fill', 'red');
      if (val.country == "USA") {
        chartArea.append('text')
          .attr('x', numberScale(val.total) - 20)
          .attr('y', y - 20)
          .attr('dominant-baseline', 'middle')
          .attr('font-size', '0.8em')
          .text(val.total);
      }
      else {
        chartArea.append('text')
          .attr('x', numberScale(val.total) + 2)
          .attr('y', y + 22)
          .attr('dominant-baseline', 'middle')
          .attr('font-size', '0.8em')
          .text(val.total);
      }


      count += 1;
      y += 50;
    };





  })
  d3.select("div#vis3")
    .append('div')
    .attr("id", "legend3")
    .style('background-color', '#f7f7f7')
    .style('border', '1px solid black')
    .style('width', 'max-content')
    .style('padding', '10 20 10 20')
  let female_guide = d3.select("#legend3").append('div')
    .style('color', 'red')
  female_guide.append('text')
    .text('female')
    .style('display', 'inline')
  let male_guide = d3.select("#legend3")
    .append('div')
    .style('color', 'steelblue')
  male_guide.append('text').text('male')
}