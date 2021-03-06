function linecat() {
  function category(category) {
    d3.csv('nobel_prize_by_winner.csv', d3.autoType).then((data) => {
      console.log(data);
      let menCount = data.filter(
        (d) => d['gender'] == 'male' && d['category'] == category
      );
      let menDict = [];
      let menTotal = [];
      let menSum = 0;
      menCount.forEach((d) => {
        index = d['year'];

        if (index in menDict) {
          value = menDict[index];
          menDict[index] = value + 1;
        } else {
          menDict[index] = 1;
        }
      });
      for (const [key, value] of Object.entries(menDict)) {
        menSum += value;
        menTotal[key] = menSum;
      }

      let femCount = data.filter(
        (d) => d['gender'] == 'female' && d['category'] == category
      );
      let femDict = [];
      let femTotal = [];
      let femSum = 0;
      femCount.forEach((d) => {
        index = d['year'];

        if (index in femDict) {
          value = femDict[index];
          femDict[index] = value + 1;
        } else {
          femDict[index] = 1;
        }
      });
      for (const [key, value] of Object.entries(femDict)) {
        femSum += value;
        femTotal[key] = femSum;
      }
      const yearExtent = d3.extent(data, (d) => d['year']);
      femTotal[yearExtent[1]] = femSum;

      const svg = d3
        .select('#vis1-category')
        .append('svg')
        .attr('width', 600)
        .attr('height', 300);
      let margins = { left: 40, top: 30, bottom: 30, right: 15 };
      let chartArea = svg
        .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);
      let chartWidth = svg.attr('width') - margins.left - margins.right;
      let chartHeight = svg.attr('height') - margins.top - margins.bottom;

      const totalScale = d3
        .scaleLinear()
        .domain([0, menSum + 10])
        .range([chartHeight, 0]);

      const yearScale = d3
        .scaleLinear()
        .domain([yearExtent[0] - 1, yearExtent[1]])
        .range([0, chartWidth]);

      let leftAxis = d3.axisLeft(totalScale);
      let leftGridlines = d3
        .axisLeft(totalScale)
        .tickSize(-chartWidth - 10)
        .tickFormat('');
      svg
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${margins.left - 10},${margins.top})`)
        .call(leftAxis);
      svg
        .append('g')
        .attr('class', 'y gridlines')
        .attr('transform', `translate(${margins.left},${margins.top})`)
        .call(leftGridlines);

      let bottomAxis = d3.axisBottom(yearScale).tickFormat(d3.format(''));
      let bottomGridlines = d3
        .axisBottom(yearScale)
        .tickSize(-chartHeight)
        .tickFormat('');
      svg
        .append('g')
        .attr('class', 'x axis')
        .attr(
          'transform',
          `translate(${margins.left},${chartHeight + margins.top + 10})`
        )
        .call(bottomAxis);
      svg
        .append('g')
        .attr('class', 'x gridlines')
        .attr(
          'transform',
          `translate(${margins.left},${chartHeight + margins.top})`
        )
        .call(bottomGridlines);

      var lineGen = d3
        .line()
        .x((d) => yearScale(d[0]))
        .y((d) => totalScale(d[1]))
        .curve(d3.curveMonotoneX);
      chartArea
        .append('path')
        .datum(Object.entries(menTotal))
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 3)
        .attr('d', lineGen);

      var lineGen = d3
        .line()
        .x((d) => yearScale(d[0]))
        .y((d) => totalScale(d[1]))
        .curve(d3.curveMonotoneX);
      chartArea
        .append('path')
        .datum(Object.entries(femTotal))
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
        .attr('d', lineGen);
      chartArea
        .append('circle')
        .attr('cx', yearScale(Object.entries(femTotal)[0][0]))
        .attr('cy', totalScale(Object.entries(femTotal)[0][1]))
        .attr('r', 4)
        .style('fill', 'red');
      chartArea
        .append('circle')
        .attr('cx', yearScale(Object.entries(menTotal)[0][0]))
        .attr('cy', totalScale(Object.entries(menTotal)[0][1]))
        .attr('r', 4)
        .style('fill', 'steelblue');
      chartArea
        .append('text')
        .attr('x', yearScale(yearExtent[1]))
        .attr('y', totalScale(menSum))
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '0.8em')
        .text(menSum);
      chartArea
        .append('text')
        .attr('x', yearScale(yearExtent[1]))
        .attr('y', totalScale(femSum) - 5)
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '0.8em')
        .text(femSum);
      let title =
        category.charAt().toUpperCase() + category.substring(1) + ' awards';
      svg.append('text').text(title).attr('x', 20).attr('y', 20);
    });
  }
  const categories = [
    'peace',
    'chemistry',
    'physics',
    'medicine',
    'literature',
    'economics',
  ];
  categories.forEach((name) => {
    category(name);
  });
}
