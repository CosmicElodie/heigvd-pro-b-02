import React, {useContext, useState} from 'react';
import {MainContext} from '../../context/MainContext';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { 
    Card, CardContent, CardMedia, 
    CssBaseline, 
    Grid, 
    Table, TableBody, TableCell, TableHead, TableContainer, TableRow, 
    Paper} from '@material-ui/core';

import { ColumnChart } from '@opd/g2plot-react'

/*

import { ColumnChart } from '@opd/g2plot-react'

const config = {title: {
  visible: true,
  text: '基础柱状图',
},
forceFit: true,
data: [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
],
padding: 'auto',
xField: 'type',
yField: 'sales',
meta: {
  type: {
    alias: '类别',
  },
  sales: {
    alias: '销售额(万)',
  },
},
}

export default function GlobalStats() {
  return (
  <section>
    <h2>ColumnChart Example</h2>
    <ColumnChart {...config} />
  </section>
  );
}

*/

const dataTemp = {title: 
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
    <React.Fragment>
      <CssBaseline/>
      <main>
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
    </React.Fragment>
  );
}