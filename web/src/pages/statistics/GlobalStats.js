import React, { useEffect } from 'react';
import CanvasJSReact from './canvasjs.react';
import { useInput } from '../../hooks/input';
import {
  Card, CardContent, CardMedia,
  CssBaseline,
  Grid,TextField,MenuItem
} from '@material-ui/core';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export default function GlobalStats() {

  const [IEInfo, setIEInfo] = React.useState();
  const [TSInfo, setTSInfo] = React.useState();
  const [TRInfo, setTRInfo] = React.useState();
  const [ILInfo, setILInfo] = React.useState();
  const [IDInfo, setIDInfo] = React.useState();  

  const [value, setValue] = React.useState();
  const { value: house, bind: bindHouse } = useInput('');



  const getHouseInfo = (e) => {
    let post_body =
      "&house_id=" + e;
    fetch('http://localhost:8080/house/detail', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: post_body
    })
      .then(response => response.json())
      .then(response => {

        switch(e) {
          case 1:
            setIEInfo(response)
            break;
          case 2:
            setTSInfo(response)
            break;
          case 3:
            setTRInfo(response)
            break;
          case 4:
            setILInfo(response)
            break;
          case 5:
            setIDInfo(response)
            break;
          default:
            // code block
        } 

      })
  }


function houseChoice(e) {
  switch(e) {
    case 1:
      setValue(IEInfo)
      break;
    case 2:
      setValue(TSInfo)
      break;
    case 3:
      setValue(TRInfo)
      break;
    case 4:
      setValue(ILInfo)
      break;
    case 5:
      setValue(IDInfo)
      break;
    default:
      // code block
  } 

  return;
}
  useEffect(() => {
    getHouseInfo(1);
    getHouseInfo(2);
    getHouseInfo(3);
    getHouseInfo(4);
    getHouseInfo(5);
  }, []);

  useEffect(() => {
    houseChoice(house)
  }, [house]);
  

/*
  const data = [
        { name: "Unsatisfied", y: 5 },
        { name: "Very Unsatisfied", y: 31 },
        { name: "Very Satisfied", y: 40 },
        { name: "Satisfied", y: 17 },
        { name: "Neutral", y: 7 }
  ];
  */


  var option = function(dataIE,dataTS,dataTR,dataIL,dataID, titre,) {
    return{
    animationEnabled: true,
    title: {
      text: titre
    },
    data: [{
      type: "doughnut", //change type to bar, line, area, pie, etc
      showInLegend: true,
		  axisYType: "secondary",
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###",
      dataPoints:[{name:"IE", y:dataIE},
                  {name:"TS", y:dataTS,},
                  {name:"TR", y:dataTR,},
                  {name:"IL", y:dataIL,},
                  {name:"ID", y:dataID,}], 
    }]
  }
  };

  var option1 = function(dataIE,dataTS,dataTR,dataIL,dataID, titre,yName,xName) {
    return{
    animationEnabled: true,
    title: {
      text: yName
    },
    axisX:{
      title: xName,
    },
    axisY:{
      title: yName,
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
		  legendMarkerColor: "grey",
      dataPoints:[{label:"IE", y:dataIE},
                  {label:"TS", y:dataTS,},
                  {label:"TR", y:dataTR,},
                  {label:"IL", y:dataIL,},
                  {label:"ID", y:dataID,}], 
    }]
  }
  };

  var option2 = function(dataIE,dataTS,dataTR,dataIL,dataID, titre,yName,xName) {
    return{
    animationEnabled: true,
    title: {
      text: yName
    },
    axisX:{
      title: xName,
      interval: 1
    },
    axisY:{
      title: yName,
    },
    data: [{
      type: "bar", //change type to bar, line, area, pie, etc
		  axisYType: "secondary",
      yValueFormatString: "#,###",
      dataPoints:[{label:"IE", y:dataIE},
                  {label:"TS", y:dataTS,},
                  {label:"TR", y:dataTR,},
                  {label:"IL", y:dataIL,},
                  {label:"ID", y:dataID,}], 
    }]
  }
  };
  
  var option3 = function( points_month, nb_posts, nb_subjects, nb_participants, nb_victory, nb_members, titre,yName,xName) {
    return{
    animationEnabled: true,
    title: {
      text: yName
    },
    axisX:{
      title: xName,
      interval: 1
    },
    axisY:{
      title: yName,
    },
    axisY2:{
      logarithmic: true
    },
    data: [{
      type: "bar", //change type to bar, line, area, pie, etc
		  axisYType: "secondary",
      yValueFormatString: "#,###",
      dataPoints:[{label:"Points", y:points_month},
                  {label:"posts", y:nb_posts,},
                  {label:"sujet", y:nb_subjects,},
                  {label:"participation", y:nb_participants,},
                  {label:"victoires", y:nb_victory,},                            
                  {label:"membres", y:nb_members,}, 
                ],         
    }]
  }
  };
  //const { data: chartData } = data;

  function addSymbols(e){
    var suffixes = ["", "K", "M", "B"];
  
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
      order = suffixes.length - 1;
  
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }


  return (

    <main>
      <CssBaseline />
      <br/>
      <Grid container spacing={5} direction="row" justify="center" alignItems="stretch">  
        { <TextField
            style={{ minWidth: 200 }}
            id="user-house"
            label="Maison"
            variant="outlined"
            {...bindHouse}
            select>
            <MenuItem value={1}>Systèmes informatiques embarqués</MenuItem>
            <MenuItem value={2}>Sécurité informatique</MenuItem>
            <MenuItem value={3}>Réseaux et systèmes</MenuItem>
            <MenuItem value={4}>Informatique logicielle</MenuItem>
            <MenuItem value={5}>Ingénierie des données</MenuItem>
          </TextField>
        }
      </Grid>

      <Grid container spacing={5} direction="row" justify="center" alignItems="stretch"> 
        {value &&    
          <Grid item xs={3}>
            <Card>
              <div style={{ justifyContent:'center' }}>
                <CardMedia
                  image="https://i.imgur.com/NSM8kNK.png"
                  title="Image title" />
                <CardContent>
                {value &&
                  <CanvasJSChart 
                  options = {option3(value.points_month,value.nb_posts,value.nb_subjects,value.nb_participants,value.nb_victory, value.nb_members,'House stat',"nombre", "maisons")}     
                />}
                </CardContent>
              </div>  
            </Card>
          </Grid>
        }
      </Grid>
      
      <br/>
      <br/>
      <br/>
      <Grid container spacing={5} direction="row" justify="center" alignItems="stretch">
        
          <Grid item xs={3}>
            <Card>
              <div style={{ justifyContent:'center' }}>
                <CardMedia
                  image="https://i.imgur.com/NSM8kNK.png"
                  title="Image title" />
                <CardContent>
                {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                  <CanvasJSChart 
                  options = {option1(IEInfo.nb_members,TSInfo.nb_members,TRInfo.nb_members,ILInfo.nb_members,IDInfo.nb_members,'Membre',"#membres", "maisons")}
                />}
                </CardContent>
              </div>  
            </Card>

          </Grid>

          <Grid item xs={3}>
            
            <Card>
              <div style={{ justifyContent:'center' }}>
                <CardMedia
                  image="https://i.imgur.com/NSM8kNK.png"
                  title="Image title" />
                <CardContent>
                {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                  <CanvasJSChart 
                  options = {option1(IEInfo.nb_victory,TSInfo.nb_victory,TRInfo.nb_victory,ILInfo.nb_victory,IDInfo.nb_victory,'Victoire',"#victoire", "maisons")}
                />}
                </CardContent>
              </div>  
            </Card>
          </Grid>
          <Grid item xs={3}>
          <Card>
            <div style={{ justifyContent:'center' }}>
              <CardMedia
                image="https://i.imgur.com/NSM8kNK.png"
                title="Image title" />
              <CardContent>
              {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                <CanvasJSChart 
                options = {option2(IEInfo.nb_participants,TSInfo.nb_participants,TRInfo.nb_participants,ILInfo.nb_participants,IDInfo.nb_participants,'Participations',"#participation", "maisons")}
              />}
              </CardContent>
            </div>  
          </Card>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <br/>
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={3}>
          <Card>
            <div style={{ justifyContent:'center' }}>
              <CardMedia
                image="https://i.imgur.com/NSM8kNK.png"
                title="Image title" />
              <CardContent>
              {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                <CanvasJSChart 
                options = {option2(IEInfo.nb_subjects,TSInfo.nb_subjects,TRInfo.nb_subjects,ILInfo.nb_subjects,IDInfo.nb_subjects,'Sujets',"#sujet", "maisons","#sujets", "maisons")}
              />}
              </CardContent>
            </div>  
          </Card>
        </Grid>
        
        <Grid item xs={3}>
          <Card>
            <div style={{ justifyContent:'center' }}>
              <CardMedia
                image="https://i.imgur.com/NSM8kNK.png"
                title="Image title" />
              <CardContent>
              {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                <CanvasJSChart 
                options = {option(IEInfo.nb_posts,TSInfo.nb_posts,TRInfo.nb_posts,ILInfo.nb_posts,IDInfo.nb_posts,'Posts')}
              />}
              </CardContent>
            </div>  
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <div style={{ justifyContent:'center' }}>
              <CardMedia
                image="https://i.imgur.com/NSM8kNK.png"
                title="Image title" />
              <CardContent>
              {IEInfo && TSInfo && TRInfo && ILInfo && IDInfo &&
                <CanvasJSChart 
                options = {option(IEInfo.points_month,TSInfo.points_month,TRInfo.points_month,ILInfo.points_month,IDInfo.points_month,'Points')}
              />}
              </CardContent>
            </div>  
          </Card>
        </Grid>
      </Grid>
    

    </main>
  );
}

/*
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  RowDetailState,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  scaleBand,
} from '@devexpress/dx-chart-core';
import {
  ArgumentScale,
  Stack,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { citiesCount, regionsCount } from '../../../demo-data/chart-data';

const detailContainerStyles = theme => ({
  detailContainer: {
    marginBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
  paper: {
    paddingTop: theme.spacing(3.5),
  },
});
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});

const currencyFormatter = ({ value }) => (
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
);
const AxisLabel = ({ text, ...restProps }) => (
  <ValueAxis.Label {...restProps} text={currencyFormatter({ value: text })} />
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    {...props}
    formatterComponent={currencyFormatter}
  />
);

const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    className={classes.root}
  />
);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);

const LegendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);

const barSeriesForCity = regionCities => Object
  .keys(regionCities[0])
  .reduce((acc, item, index) => {
    if (item !== 'year') {
      acc.push(
        <BarSeries
          key={index.toString()}
          valueField={item}
          argumentField="year"
          name={item}
        />,
      );
    }
    return acc;
  }, []);

const gridDetailContainerBase = data => ({ row, classes }) => {
  const regionCities = data.reduce((acc, item) => {
    const currentCities = item.cities.reduce((current, itemCity) => {
      let currentObj = {};
      if (itemCity.region === row.region) {
        currentObj = { [itemCity.cityName]: itemCity.count };
      }
      return { ...current, ...currentObj };
    }, []);
    return [...acc, { year: item.year, ...currentCities }];
  }, []);

  return (
    <div className={classes.detailContainer}>
      <h5 className={classes.title}>
        {`Economics of ${row.region}`}
      </h5>
      <Paper className={classes.paper}>
        <Chart
          data={regionCities}
          height={300}
        >
          <ArgumentScale
            factory={scaleBand}
          />
          <ArgumentAxis
            showTicks={false}
          />
          <ValueAxis
            labelComponent={AxisLabel}
          />
          {barSeriesForCity(regionCities)}
          <Stack />
          <Legend
            rootComponent={LegendRoot}
            labelComponent={LegendLabel}
            position="bottom"
          />
        </Chart>
      </Paper>
    </div>
  );
};
const gridDetailContainer = data => withStyles(detailContainerStyles, { name: 'ChartContainer' })(gridDetailContainerBase(data));

export default function GlobalStats() {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'count2013', title: '2013' },
    { name: 'count2014', title: '2014' },
    { name: 'count2015', title: '2015' },
  ]);
  const [rows] = useState(regionsCount);
  const [data] = useState(citiesCount);
  const [columnBands] = useState([
    {
      title: 'Year',
      children: [
        { columnName: 'count2013' },
        { columnName: 'count2014' },
        { columnName: 'count2015' },
      ],
    },
  ]);
  const [currencyColumns] = useState(['count2013', 'count2014', 'count2015']);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <RowDetailState
          defaultExpandedRowIds={[1]}
        />
        <Table />
        <TableHeaderRow />
        <TableRowDetail
          contentComponent={gridDetailContainer(data)}
        />
        <TableBandHeader
          columnBands={columnBands}
        />
      </Grid>
    </Paper>
  );
};
*/