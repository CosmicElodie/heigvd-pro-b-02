import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Card, CardContent, CardMedia,
  CssBaseline,
  Grid,
} from '@material-ui/core';

import { ColumnChart } from '@opd/g2plot-react'

const dataTemp = {
  title:
  {
    visible: true,
    text: 'nb événements organisés par orientation',
  },
  forceFit: true,
  data: [
    {
      orientation: 'ID',
      events: 38,
      color: 'red',
    },
    {
      orientation: 'IE',
      events: 52,
    },
    {
      orientation: 'TS',
      events: 61,
    },
    {
      orientation: 'TR',
      events: 145,
    },
  ],

  padding: 'auto',
  xField: 'orientation',
  yField: 'events',
  meta:
  {
    type:
    {
      alias: 'Orientations',
    },
    events:
    {
      alias: 'Nb événements',
    },
  },
}


export default function GlobalStats() {
  return (

    <main>
      <CssBaseline />
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs>
          <Card>
            <h1>Statistiques</h1>
            <CardMedia
              image="https://i.imgur.com/NSM8kNK.png"
              title="Image title" />
            <CardContent>
              <Typography>
                <section>
                  <h2>Nombres d'événements organisés par orientation</h2>
                  <ColumnChart {...dataTemp} />
                </section>
              </Typography>
            </CardContent>
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