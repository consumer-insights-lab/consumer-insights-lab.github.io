// Generated from the preserved report by generate_hospital_overview_charts.py
try {
const root=document.getElementById('quarto-document-content');
const coverageData={
        AK:{reviews:157,avg:3.16,places:9},AL:{reviews:3075,avg:3.68,places:112},AR:{reviews:2581,avg:3.72,places:95},AZ:{reviews:7738,avg:3.65,places:315},CA:{reviews:32948,avg:3.48,places:1841},CO:{reviews:5112,avg:3.64,places:226},CT:{reviews:1473,avg:3.12,places:82},DE:{reviews:221,avg:2.77,places:12},FL:{reviews:25026,avg:3.97,places:821},GA:{reviews:5511,avg:3.43,places:233},HI:{reviews:708,avg:3.75,places:36},IA:{reviews:1933,avg:2.97,places:117},ID:{reviews:924,avg:3.67,places:41},IL:{reviews:8479,avg:3.23,places:475},IN:{reviews:4835,avg:3.48,places:230},KS:{reviews:2717,avg:3.79,places:114},KY:{reviews:1084,avg:3.15,places:65},LA:{reviews:3507,avg:3.39,places:201},MA:{reviews:3832,avg:3.07,places:210},MD:{reviews:2894,avg:3.24,places:123},ME:{reviews:80,avg:3.02,places:4},MI:{reviews:7323,avg:3.34,places:351},MN:{reviews:4027,avg:3.22,places:263},MO:{reviews:3308,avg:3.31,places:141},MS:{reviews:1577,avg:3.63,places:73},MT:{reviews:616,avg:3.37,places:36},NC:{reviews:3395,avg:3.08,places:177},ND:{reviews:582,avg:3.23,places:37},NE:{reviews:1163,avg:3.53,places:58},NH:{reviews:580,avg:3.17,places:34},NJ:{reviews:4245,avg:3.40,places:190},NM:{reviews:1408,avg:3.64,places:42},NV:{reviews:3580,avg:3.88,places:141},NY:{reviews:2942,avg:2.86,places:144},OH:{reviews:6643,avg:3.25,places:382},OK:{reviews:3061,avg:3.81,places:113},OR:{reviews:2425,avg:3.58,places:110},PA:{reviews:3272,avg:3.03,places:175},RI:{reviews:842,avg:3.18,places:51},SC:{reviews:3240,avg:3.41,places:144},SD:{reviews:372,avg:3.77,places:17},TN:{reviews:5578,avg:3.65,places:231},TX:{reviews:27221,avg:3.86,places:1000},UT:{reviews:2496,avg:3.75,places:104},VA:{reviews:1888,avg:3.12,places:83},VT:{reviews:84,avg:2.68,places:12},WA:{reviews:5781,avg:3.44,places:289},WI:{reviews:3505,avg:3.46,places:188},WV:{reviews:804,avg:3.37,places:50},WY:{reviews:342,avg:3.39,places:19}
      };
      const coverageNames={AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};
      const coverageFips={1:'AL',2:'AK',4:'AZ',5:'AR',6:'CA',8:'CO',9:'CT',10:'DE',11:'DC',12:'FL',13:'GA',15:'HI',16:'ID',17:'IL',18:'IN',19:'IA',20:'KS',21:'KY',22:'LA',23:'ME',24:'MD',25:'MA',26:'MI',27:'MN',28:'MS',29:'MO',30:'MT',31:'NE',32:'NV',33:'NH',34:'NJ',35:'NM',36:'NY',37:'NC',38:'ND',39:'OH',40:'OK',41:'OR',42:'PA',44:'RI',45:'SC',46:'SD',47:'TN',48:'TX',49:'UT',50:'VT',51:'VA',53:'WA',54:'WV',55:'WI',56:'WY'};
      async function renderCoverageMap(spec){
        const host=root.querySelector('#chart-13');
        const modules=await Promise.all([import('https://cdn.jsdelivr.net/npm/d3@7/+esm'),import('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm')]);
        const d3=modules[0],topojson=modules[1];
        const source=spec.layer[0].data.values;
        const states=topojson.feature(source,source.objects.states).features;
        const featureCollection={type:'FeatureCollection',features:states};
        const projection=d3.geoAlbersUsa().fitSize([940,590],featureCollection);
        const path=d3.geoPath(projection);
        const svg=d3.select(host.querySelector('[data-map-svg]'));
        const stateLayer=svg.select('[data-map-states]');
        const pointLayer=svg.select('[data-map-points]');
        const metric=host.querySelector('#coverage-map-measure');
        const stateSelect=host.querySelector('#coverage-map-state');
        const toggle=host.querySelector('#coverage-map-points');
        const detail=host.querySelector('[data-map-detail]');
        const status=host.querySelector('[data-map-status]');
        const low=host.querySelector('[data-legend-low]');
        const high=host.querySelector('[data-legend-high]');
        const codes=Object.keys(coverageData).sort((a,b)=>coverageNames[a].localeCompare(coverageNames[b]));
        stateSelect.innerHTML=codes.map(code=>'<option value="'+code+'">'+coverageNames[code]+'</option>').join('');
        stateSelect.value='TX';
        const statePaths=stateLayer.selectAll('path').data(states).join('path').attr('class','coverage-state').attr('d',path).on('click',(_,d)=>{const code=coverageFips[Number(d.id)];if(coverageData[code]){stateSelect.value=code;renderDetail();}});
        statePaths.append('title');
        const facilityRows=Object.values(spec.datasets)[0];
        const points=facilityRows.map(row=>projection([Number(row.longitude),Number(row.latitude)])).filter(Boolean);
        pointLayer.selectAll('circle').data(points).join('circle').attr('cx',d=>d[0]).attr('cy',d=>d[1]).attr('r',.85).style('fill','var(--foreground)').attr('fill-opacity',.28);
        pointLayer.style('display','none');
        function metricLabel(key){return key==='reviews'?'Review count':key==='places'?'Listing count':'Average rating'}
        function format(key,value){return key==='avg'?value.toFixed(2)+' / 5':value.toLocaleString('en-US')}
        function scaleFor(key){const values=Object.values(coverageData).map(row=>row[key]);return key==='avg'?d3.scaleLinear().domain(d3.extent(values)).range([.16,1]).clamp(true):d3.scaleSqrt().domain([0,d3.max(values)]).range([.12,1]);}
        function renderDetail(){const code=stateSelect.value,row=coverageData[code];detail.innerHTML='<strong>'+coverageNames[code]+'</strong><span>'+row.reviews.toLocaleString('en-US')+' sampled reviews</span><span>'+row.places.toLocaleString('en-US')+' listings</span><span>Average rating '+row.avg.toFixed(2)+' / 5</span>';statePaths.classed('is-selected',d=>coverageFips[Number(d.id)]===code);}
        function renderMap(){const key=metric.value,scale=scaleFor(key),values=Object.values(coverageData).map(row=>row[key]);d3.select(host).selectAll('.coverage-legend-ramp span').style('opacity',(_,i)=>(key==='avg'?.16:.12)+(key==='avg'?.84:.88)*i/4);statePaths.style('fill',d=>coverageData[coverageFips[Number(d.id)]]?'var(--viz-series-1)':'var(--muted)').attr('fill-opacity',d=>{const row=coverageData[coverageFips[Number(d.id)]];return row?scale(row[key]):1;});statePaths.select('title').text(d=>{const code=coverageFips[Number(d.id)],row=coverageData[code];return row?coverageNames[code]+': '+format(key,row[key]):'No sampled data'});low.textContent=format(key,key==='avg'?d3.min(values):0);high.textContent=format(key,d3.max(values));status.textContent=metricLabel(key)+' selected. Listing locations '+(toggle.checked?'shown.':'hidden.');renderDetail();}
        function renderPoints(){pointLayer.style('display',toggle.checked?null:'none').attr('aria-hidden',toggle.checked?'false':'true');status.textContent=metricLabel(metric.value)+' selected. Listing locations '+(toggle.checked?'shown.':'hidden.');}
        metric.addEventListener('change',renderMap);
        stateSelect.addEventListener('change',renderDetail);
        toggle.addEventListener('change',renderPoints);
        renderMap();renderPoints();
      }
      async function renderExperienceMap(spec,facilitySpec){
        const host=root.querySelector('#chart-35');
        const modules=await Promise.all([import('https://cdn.jsdelivr.net/npm/d3@7/+esm'),import('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm')]);
        const d3=modules[0],topojson=modules[1];
        const source=spec.layer[0].data.values;
        const states=topojson.feature(source,source.objects.states).features;
        const featureCollection={type:'FeatureCollection',features:states};
        const projection=d3.geoAlbersUsa().fitSize([940,590],featureCollection);
        const path=d3.geoPath(projection);
        const svg=d3.select(host.querySelector('[data-map-svg]'));
        const stateLayer=svg.select('[data-map-states]');
        const pointLayer=svg.select('[data-map-points]');
        const metric=host.querySelector('#experience-map-measure');
        const stateSelect=host.querySelector('#experience-map-state');
        const toggle=host.querySelector('#experience-map-points');
        const detail=host.querySelector('[data-map-detail]');
        const status=host.querySelector('[data-map-status]');
        const low=host.querySelector('[data-legend-low]');
        const high=host.querySelector('[data-legend-high]');
        const ramp=d3.select(host).selectAll('.coverage-legend-ramp span');
        const rows=Object.values(spec.datasets)[0];
        const experienceData=Object.fromEntries(rows.map(row=>[row.state,row]));
        const codes=Object.keys(coverageData).sort((a,b)=>coverageNames[a].localeCompare(coverageNames[b]));
        stateSelect.innerHTML=codes.map(code=>'<option value="'+code+'">'+coverageNames[code]+'</option>').join('');
        stateSelect.value='NY';
        const statePaths=stateLayer.selectAll('path').data(states).join('path').attr('class','coverage-state').attr('d',path).on('click',(_,d)=>{const code=coverageFips[Number(d.id)];if(coverageData[code]){stateSelect.value=code;renderDetail();}});
        statePaths.append('title');
        const facilityRows=Object.values(facilitySpec.datasets)[0];
        const points=facilityRows.map(row=>projection([Number(row.longitude),Number(row.latitude)])).filter(Boolean);
        pointLayer.selectAll('circle').data(points).join('circle').attr('cx',d=>d[0]).attr('cy',d=>d[1]).attr('r',.85).style('fill','var(--foreground)').attr('fill-opacity',.28);
        pointLayer.style('display','none');
        function metricLabel(key){return key==='neg_share'?'Negative share':'Statement count'}
        function format(key,value){return key==='neg_share'?value.toFixed(1)+'%':value.toLocaleString('en-US')}
        function renderDetail(){const code=stateSelect.value,row=experienceData[code];detail.innerHTML=row?'<strong>'+coverageNames[code]+'</strong><span>'+row.neg_share.toFixed(1)+'% negative statements</span><span>'+row.statements.toLocaleString('en-US')+' statements</span><span>Meets the 1,500-statement threshold</span>':'<strong>'+coverageNames[code]+'</strong><span>Below the 1,500-statement threshold</span><span>No state estimate shown</span>';statePaths.classed('is-selected',d=>coverageFips[Number(d.id)]===code);}
        function renderMap(){
          const key=metric.value,values=rows.map(row=>row[key]),minimum=d3.min(values),maximum=d3.max(values);
          if(key==='neg_share'){
            const scale=d3.scaleLinear().domain([minimum,maximum]).range(['#fbe3e2','#8f1f1f']).clamp(true);
            statePaths.style('fill',d=>{const row=experienceData[coverageFips[Number(d.id)]];return row?scale(row[key]):'var(--muted)';}).attr('fill-opacity',1);
            ramp.style('background',(_,i)=>scale(minimum+(maximum-minimum)*i/4)).style('opacity',1);
          }else{
            const scale=d3.scaleSqrt().domain([0,maximum]).range([.12,1]);
            statePaths.style('fill',d=>experienceData[coverageFips[Number(d.id)]]?'var(--viz-series-1)':'var(--muted)').attr('fill-opacity',d=>{const row=experienceData[coverageFips[Number(d.id)]];return row?scale(row[key]):1;});
            ramp.style('background','var(--viz-series-1)').style('opacity',(_,i)=>.12+.88*i/4);
          }
          statePaths.select('title').text(d=>{const code=coverageFips[Number(d.id)],row=experienceData[code];return row?coverageNames[code]+': '+format(key,row[key]):coverageNames[code]+': below threshold';});
          low.textContent=format(key,key==='neg_share'?minimum:0);high.textContent=format(key,maximum);status.textContent=metricLabel(key)+' selected. Listing locations '+(toggle.checked?'shown.':'hidden.');renderDetail();
        }
        function renderPoints(){pointLayer.style('display',toggle.checked?null:'none').attr('aria-hidden',toggle.checked?'false':'true');status.textContent=metricLabel(metric.value)+' selected. Listing locations '+(toggle.checked?'shown.':'hidden.');}
        metric.addEventListener('change',renderMap);
        stateSelect.addEventListener('change',renderDetail);
        toggle.addEventListener('change',renderPoints);
        renderMap();renderPoints();
      }

const specs=await fetch(new URL('./map-data.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Map data unavailable');return r.json()});
await Promise.all([renderCoverageMap(specs['13']),renderExperienceMap(specs['35'],specs['13'])]);

} catch(error) { document.querySelectorAll(".hospital-map [data-map-status]").forEach(d=>{d.className="";d.textContent="Map could not load. The supporting report retains the original map. "+error.message;}); }
