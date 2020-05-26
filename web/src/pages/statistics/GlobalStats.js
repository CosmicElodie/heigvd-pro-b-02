import React, { useContext,useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import CanvasJSReact from './canvasjs.react';
import {
  Card, CardContent, CardMedia,
  CssBaseline,
  Grid,
} from '@material-ui/core';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GlobalStats() {

  const [IEInfo, setIEInfo] = React.useState();
  const [TSInfo, setTSInfo] = React.useState();
  const [TRInfo, setTRInfo] = React.useState();
  const [ILInfo, setILInfo] = React.useState();
  const [IDInfo, setIDInfo] = React.useState();  
  const [reformat, setReformat] = React.useState();

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


  useEffect(() => {
    getHouseInfo(1);
    getHouseInfo(2);
    getHouseInfo(3);
    getHouseInfo(4);
    getHouseInfo(5);
  }, []);
  


  const data = [
        { name: "Unsatisfied", y: 5 },
        { name: "Very Unsatisfied", y: 31 },
        { name: "Very Satisfied", y: 40 },
        { name: "Satisfied", y: 17 },
        { name: "Neutral", y: 7 }
  ];
  


  var option = function(dataIE,dataTS,dataTR,dataIL,dataID, titre) {
    return{
    animationEnabled: true,
    title: {
      text: titre
    },
    data: [{
      type: "doughnut",
      showInLegend: true,
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

  const { data: chartData } = data;






  return (

    <main>
      <CssBaseline />
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
                  options = {option(IEInfo.nb_members,TSInfo.nb_members,TRInfo.nb_members,ILInfo.nb_members,IDInfo.nb_members,'Membre')}
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
                  options = {option(IEInfo.nb_victory,TSInfo.nb_victory,TRInfo.nb_victory,ILInfo.nb_victory,IDInfo.nb_victory,'Victoire')}
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
                options = {option(IEInfo.nb_participants,TSInfo.nb_participants,TRInfo.nb_participants,ILInfo.nb_participants,IDInfo.nb_participants,'Participations')}
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
                options = {option(IEInfo.nb_subjects,TSInfo.nb_subjects,TRInfo.nb_subjects,ILInfo.nb_subjects,IDInfo.nb_subjects,'Sujets')}
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