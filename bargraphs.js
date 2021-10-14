function bargraphs(svg, svg1, data) {
    d3.csv('nobel_prize_by_winner.csv', d3.autoType).then((data) => {
        data = data.filter((d) => { return ((d['country'] != null) && (d['country'] == "USA" || d['country'] == "Germany" || d['country'] == "Switzerland" || d['country'] == "France" || d['country'] == "United Kingdom")); });
        data = data.filter((d) => { return (d['bornCountry'] != null); });
        const width = svg.attr('width');
        const height = svg.attr('height');
        const margins = { top: 80, right: 5, left: 100, bottom: 5 };
        let chartArea = svg.append('g').attr('transform', `translate(${margins.left},${margins.top})`);
        let chartWidth = width - margins.left - margins.right;
        let chartHeight = height - margins.top - margins.bottom;
        var winningCountries = {};
        var bornCountries = {};
        data.forEach(d => {
            if ((!(d['country'] in winningCountries)) && (d['country'] == "USA" || d['country'] == "Germany" || d['country'] == "Switzerland" || d['country'] == "France" || d['country'] == "United Kingdom")) {
                winningCountries[d['country']] = 1;
            }
            else {
                winningCountries[d['country']] += 1;
            }
            if (!(d['bornCountry'] in bornCountries)) {
                bornCountries[d['bornCountry']] = 1;
            }
            else {
                bornCountries[d['bornCountry']] += 1;
            }
        });
        var wvalues = Object.keys(winningCountries).map(function (country) {
            return winningCountries[country];
        });
        var bvalues = Object.keys(bornCountries).map(function (country) {
            return bornCountries[country];
        });
        const countriesMax = d3.max(wvalues);
        console.log(winningCountries["Alsace (then Germany, now France)"]);
        const bornCountriesMax = d3.max(bvalues);
        const winScale = d3.scaleLinear().domain([0, countriesMax]).range([1, 420]);
        const bornScale = d3.scaleLinear().domain([0, bornCountriesMax])
            .range([5, 380]);
        const xWScale = d3.scaleLinear().domain([0, Object.keys(winningCountries).length])
            .range([0, 500]);
        const xBScale = d3.scaleLinear().domain([0, Object.keys(bornCountries).length])
            .range([5, 395]);
        //vertical

        console.log(bornCountries);
        for (let i = 200; i <= 1000; i += 50) {
            svg.append("line")
                .attr("x1", i)
                .attr("x2", i)
                .attr("y1", 100)
                .attr("y2", 350)
                .style("stroke", "lightgrey")
        };
        //horizontal
        for (let i = 100; i <= 350; i += 50) {
            svg.append("line")
                .attr("x1", 200)
                .attr("x2", 700)
                .attr("y1", i)
                .attr("y2", i)
                .style("stroke", "lightgrey");

        };
        const labels = svg.append('g')
            .attr('transform', `translate(0, ${margins.top})`)
        const botlabels = svg.append('g')
            .attr('transform', `translate(0, ${margins.right})`)

        //console.log(Object.keys(winningCountries).length);

        let y = 20
        let count = 0
        let axis = 0
        let xc = 200
        for (const [key, val] of Object.entries(winningCountries)) {
            labels.append('text')
                .attr('x', 0)
                .attr('y', y + 20)
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '1.5em')
                .text(key);
            if (count % 2 == 0) {
                chartArea.append('rect')
                    .attr('width', winScale(val))
                    .attr('x', 100)
                    .attr('opacity', 0.4)
                    .attr('y', y)
                    .attr('height', 50)
                    .text(val)
                    .style('fill', 'darkblue');
            }
            else {
                chartArea.append('rect')
                    .attr('width', winScale(val))
                    .attr('x', 100)
                    .attr('opacity', 0.4)
                    .attr('y', y)
                    .attr('height', 50)
                    .style('fill', 'green');
            }
            count += 1;
            y += 50;



        };

        for (let i = 0; i <= 10; i += 1) {
            botlabels.append('text')
                .attr('x', xc)
                .attr('y', 375)
                .attr('dominant-baseline', 'middle')
                .text(axis);
            axis += 40
            if (axis > 99) {
                xc += 51;
            }
            else {
                xc += 40;
            }


        }



    });

}
