import { Component, OnInit, ViewChild } from '@angular/core';
import { infoTabla } from '../../services/infotabla';
import { Options, LabelType, ChangeContext } from "ng5-slider";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { from } from 'rxjs';


export type ChartOptionsCol = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export interface dispercion {
  x: number;
  y: number;
}

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {
 //Data de tabla open
options = {
  responsive: true,
  legend: {
    position: "top",
    fullWidth: "false",
    display: false,
  },
  scales: {
    yAxes: [{
        ticks: {
        }
    }],
    xAxes: [{
      display: false,
    }]
  },
  Styling:{
    pointBorderWidth:5
  }
};

optionsScatter = {
  responsive: true,
  legend: {
    position: "top",
    fullWidth: "false",
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true,
      }
    }],
    xAxes: [{
      type: 'category',
      labels:[],
      position: 'bottom',
      display: false,
  }]
  }
};

//Data de taba Close
  public selectedItem = null;
  public selectedItem2 = null;
  public selectedItem3 = null;
  public totalDatos: number;
  public listCopia: any;
  public listCopiaACCM: any;
  public listCopiaSupervisor: any;
  public listInfo: dispercion[] = [];
  public listComplete: any[] = [];
  public listData: any;
  public listSupervisor: any[]=[];
  public listACCM: any;
  public listClient: any;
  public listAHT:any[]=[];
  public listCCMS:any[]=[];
  public maximoBox:any;
  public minimoBox:any;
  public quartilUno:number;
  public quartiDos:number;
  public timeNowData: any;
  public timePreData: any;
  public minDataValue: any;
  public maxDataValue: any;
  //Datos para las barras de rango
  public start: Date;
  public end: Date;
  public minValue: number;
  public maxValue: number;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptionsCol>;
  public chartOptionsCol: Partial<ChartOptionsCol>;
  public chartOptionsColNeg: Partial<ChartOptionsCol>;
  public chartOptionsBox: Partial<ChartOptionsCol>;
  public optionsSlider: Options;
  public data: any;
  public data2: any;

  constructor(private getInfo: infoTabla) {
    this.chartOptions = {
      series: [{
        name: "SAMPLE A",
        data: this.listInfo
      }],
      chart: {
        height: 350,
        type: 'scatter',
        offsetX: 10,
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
        type: 'category',
        labels: {
            show: true,
          },
      },
      yaxis: {
        tickAmount: 7
      }
    };

    this.chartOptionsBox = {
      series: [
        {
          name: "candle",
          data: [
            {
              x: new Date().getTime(),
              y: [this.minimoBox, this.maximoBox, this.quartiDos,  this.quartilUno]
            }
          ]
        }
      ],
      chart: {
        type: "candlestick",
        height: 350
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
    // this.chartOptionsCol = {
    //   series: [
    //     {
    //       name: "distibuted",
    //       data: [21, 22, 10, 28, 16, 21, 13, 30]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //     events: {
    //       click: function(chart, w, e) {
    //         // console.log(chart, w, e)
    //       }
    //     }
    //   },
    //   colors: [
    //     "#ee0085d6",
    //   ],
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "45%",
    //       distributed: true
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   legend: {
    //     show: false
    //   },
    //   grid: {
    //     show: false
    //   },
    //   xaxis: {
    //     categories: [
    //       "Tipo 1",
    //       "Tipo 2",
    //       "Tipo 3",
    //       "Tipo 4",
    //       "Tipo 5",
    //       "Tipo 6",
    //       "Tipo 7",
    //       "Tipo 8",
    //     ],
    //     labels: {
    //       style: {
    //         colors: [
    //           "#a10090",
    //           "#00E396",
    //           "#FEB019",
    //           "#FF4560",
    //           "#775DD0",
    //           "#546E7A",
    //           "#26a69a",
    //           "#D10CE8"
    //         ],
    //         fontSize: "12px"
    //       }
    //     }
    //   }
    // };

    // this.chartOptionsColNeg = {
    //   series: [
    //     {
    //       name: "Carga laboral",
    //       data: [
    //         50,
    //         0,
    //         -420,
    //         0,
    //         -346,
    //         0,
    //         250,
    //         0,
    //         550
    //       ]
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   title: {
    //     text: 'left',
    //     align: 'center',
    //     margin: 50,
    //     offsetX: 0,
    //     offsetY: 0,
    //     floating: false,
    //     style: {
    //       fontSize:  '100px',
    //       fontWeight:  'bold',
    //       fontFamily:  undefined,
    //       color:  '#F15B46'
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       colors: {
    //         ranges: [
    //           {
    //             from: 0,
    //             to: 600,
    //             color: "#F15B46"
    //           },
    //           {
    //             from: -600,
    //             to: 0,
    //             color: "#28a745"
    //           }
    //         ]
    //       },
    //       columnWidth: "80%"
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   yaxis: {
    //     title: {
    //       text: "Horas"
    //     },
    //     labels: {
    //       formatter: function(y) {
    //         return y.toFixed(0);
    //       }
    //     }
    //   },
    //   xaxis: {
    //     categories: [
    //       "Tipo 1",
    //       "",
    //       "Tipo 2",
    //       "",
    //       "Tipo 3",
    //       "",
    //       "Tipo 4",
    //       "",
    //       "Tipo 5"
    //     ],
    //     labels: {
    //       rotate: -90
    //     }
    //   }
    // };
  }
  ngOnInit(): void {
    this.ajustarRango();
  }

  getData() {
    let media:number=0;
    let varianza:number = 0;
    this.selectedItem = null;
    this.selectedItem2 = null;
    this.selectedItem3 = null;
    this.listInfo=[];
    this.listAHT = [];
    this.listCCMS = [];
    this.getInfo.getInfo().subscribe(res => {
      this.listData = res;
      this.listCopia = res;
      let fecha = new Date();
      this.listData.forEach((value, index) => {
        let valor: any[] = [];
        let time = value.FranjaCon.split(":");
        fecha.setHours(time[0]);
        fecha.setMinutes(time[1]);
        if(fecha.getTime() >= this.minValue && fecha.getTime() <= this.maxValue && value.idccms!="NULL"){
          // valor.push(value.idccms);
          // valor.push(value.AHT);
          this.listCCMS.push(value.idccms)
          this.listComplete.push(value);
        }
      });
      let hash = {};
      this.listCCMS = this.listCCMS.filter(o => hash[o] ? false : hash[o] = true);
      this.listCCMS.forEach((value, index) => {
          let listValor: dispercion;
          let I_ACDTIME :number=0;
          let I_ACWTIME :number=0;
          let HOLDTIME :number=0;
          let ACDCALLS :number=0;
          let idccms :number=0;
          let totalAHT :number=0;
          let valor:any[] = this.listComplete.filter(o => o.idccms === value);
          if(valor.length>1){
            valor.forEach((value, index) => {
              I_ACDTIME=I_ACDTIME+value.i_acdtime;
              I_ACWTIME=I_ACWTIME+value.i_acwtime;
              HOLDTIME=HOLDTIME+value.holdtime;
              ACDCALLS=ACDCALLS+value.acdcalls;
              idccms=value.idccms;
            });
            totalAHT= (I_ACDTIME+I_ACWTIME+HOLDTIME)/ACDCALLS;
            totalAHT = Math.trunc(totalAHT);
            listValor={x: idccms, y:totalAHT};
          }else{
            listValor={x: valor[0].idccms, y: Math.trunc(valor[0].AHT)};
          }
          this.listAHT.push(listValor.y);
          this.listInfo.push(listValor);
          media=media+listValor.y;
          console.log(listValor.x);
      });

      media=media/this.listInfo.length;
      this.listAHT.forEach((value, index) => {
        varianza = varianza + Math.pow((value-media),2);
      });
      varianza = Math.sqrt(varianza/media);
      this.totalDatos=(varianza/(media*6))*100;
      this.totalDatos = Math.trunc(this.totalDatos);

      hash = {};
      this.listSupervisor = this.listData.filter(o => hash[o.Supervisor] ? false : hash[o.Supervisor] = true);
      this.listSupervisor.sort();
      hash = {};
      this.listACCM = this.listData.filter(o => hash[o.ACCM] ? false : hash[o.ACCM] = true);
      hash = {};
      this.listClient = this.listData.filter(o => hash[o.Client] ? false : hash[o.Client] = true);
      this.listClient.sort();
      this.maximoBox= Math.max.apply(null, this.listAHT); 
      this.minimoBox= Math.min.apply(null, this.listAHT); 
      this.quartilUno = parseInt(this.maximoBox,0) * 0.60;
      this.quartilUno = Math.trunc(this.quartilUno);
      this.quartiDos = parseInt(this.minimoBox,0) * 0.30;
      this.quartiDos = Math.trunc(this.quartiDos);
      this.graficaDispersion();
    });
  }

  getFilteredByKey(evento,type) {
    let media:number=0;
    let varianza:number = 0;
    this.listInfo=[];
    this.listAHT = [];
    this.listCCMS = [];
    this.listCopiaSupervisor = this.listCopia;
    this.listCopiaACCM = this.listCopia;
    if(type==='Client'){
      this.listData = this.listCopia;
      this.listData = this.listData.filter(function (a) {
        return a.Client === evento;
      });
      this.listCopiaACCM = this.listData;
      this.listCopiaSupervisor = this.listData;
      this.selectedItem2 = null;
      this.selectedItem3 = null;
    }else if (type==='ACCM'){
      this.listData = this.listCopiaACCM;
      this.listData = this.listData.filter(function (a) {
        return a.ACCM === evento;
      });
      this.listCopiaSupervisor = this.listData;
      this.selectedItem3 = null;
    }else  if (type==='Supervisor'){
      this.listData = this.listCopiaSupervisor;
      this.listData = this.listData.filter(function (a) {
        return a.Supervisor === evento;
      });
    }
    let fecha = new Date();
      this.listData.forEach((value, index) => {
        let valor: any[] = [];
        let time = value.FranjaCon.split(":");
        fecha.setHours(time[0]);
        fecha.setMinutes(time[1]);
        fecha.setSeconds(time[2]);
        if(fecha.getTime() >= this.minValue && fecha.getTime() <= this.maxValue && value.idccms!="NULL"){
          // valor.push(value.idccms);
          // valor.push(value.AHT);
          this.listCCMS.push(value.idccms);
          this.listComplete.push(value);
        }
      });
      let hash = {};
      this.listCCMS = this.listCCMS.filter(o => hash[o] ? false : hash[o] = true);
      console.log( this.listCCMS);
      this.listCCMS.forEach((value, index) => {
        let listValor: dispercion;
        let I_ACDTIME :number=0;
        let I_ACWTIME :number=0;
        let HOLDTIME :number=0;
        let ACDCALLS :number=0;
        let idccms :number=0;
        let totalAHT :number=0;
        let valor:any[] = this.listComplete.filter(o => o.idccms === value);
        if(valor.length>1){
          valor.forEach((value, index) => {
            I_ACDTIME=I_ACDTIME+value.i_acdtime;
            I_ACWTIME=I_ACWTIME+value.i_acwtime;
            HOLDTIME=HOLDTIME+value.holdtime;
            ACDCALLS=ACDCALLS+value.acdcalls;
            idccms=value.idccms;
          });
          totalAHT= (I_ACDTIME+I_ACWTIME+HOLDTIME)/ACDCALLS;
          totalAHT = Math.trunc(totalAHT);
          listValor={x: idccms, y:totalAHT};
        }else{
          listValor={x: valor[0].idccms, y: Math.trunc(valor[0].AHT)};
        }
        this.listAHT.push(listValor.y);
          this.listInfo.push(listValor);
        media=media+listValor.y;
    });
    media=media/this.listInfo.length;
    this.listAHT.forEach((value, index) => {
      varianza = varianza + Math.pow((value-media),2);
    });
    varianza = Math.sqrt(varianza/media);
    this.totalDatos=(varianza/(media*6))*100;
    this.totalDatos = Math.trunc(this.totalDatos);
    this.maximoBox= Math.max.apply(null, this.listAHT);
    this.minimoBox= Math.min.apply(null, this.listAHT); 
    this.quartilUno = parseInt(this.maximoBox,0) * 0.80;
    this.quartilUno = Math.trunc(this.quartilUno);
    this.quartiDos = parseInt(this.minimoBox,0) * 0.30;
    this.quartiDos = Math.trunc(this.quartiDos);
    console.log(this.listAHT);
      if (type==='Client'){
        this.listACCM = this.listData.filter(o => hash[o.ACCM] ? false : hash[o.ACCM] = true);
        hash = {};
        this.listSupervisor = this.listData.filter(o => hash[o.Supervisor] ? false : hash[o.Supervisor] = true);
      }else if(type==='ACCM'){
        hash = {};
        this.listSupervisor = this.listData.filter(o => hash[o.Supervisor] ? false : hash[o.Supervisor] = true);
      }
      this.graficaDispersion();

  }

  graficaDispersion() {
    let minDataValue  = Math.min.apply(null,this.listAHT);
    let maxDataValue = Math.max.apply(null,this.listAHT);
    this.options = {
      responsive: true,
      legend: {
        position: "top",
        fullWidth: "false",
        display: false,
      },
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero:true,
            }
        }],
        xAxes: [{
          display: false,
        }]
      },
      Styling:{
        pointBorderWidth:5
      }
    };
    this.optionsScatter = {
      responsive: true,
      legend: {
        position: "top",
        fullWidth: "false",
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
          }
        }],
        xAxes: [{
          type: 'category',
          labels: this.listCCMS,
          position: 'bottom',
          display: false,
      }]
      }
    };
    this.chartOptions = {
      series: [{
        name: "Data",
        data: this.listInfo
      }],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      dataLabels: {
        enabled: true,
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'category',
        // tickAmount: 'dataPoints',
        // categories: this.listCCMS,
        labels: {
            show: false,
            // formatter: function(val) {
            //   return val;
            // }
          },
        //  tickAmount: -100000,
      },
      yaxis: {
        tickAmount: 8,
      }
    };

    this.data={
      // define label tree
      labels: [""],
      datasets: [
        {
          label: "",
          backgroundColor: "rgb(50 158 73)",
          borderColor: "green",
          borderWidth: 2,
          // barThickness: 10,
          outlierColor: "#008000",
          outlierRadius:2,
          padding: 10,
          itemRadius: 0,
          data: [
              this.listAHT
          ]
        }
      ]
    };

    this.data2={
      // define label tree
      labels: [""],
      datasets: [
        {
          label: "Scatter Dataset",
          data: this.listInfo,
          pointBackgroundColor: "#26a0fc",
          pointBorderWidth: 3,
          pointHitRadius: 5,
          // pointRadius:1
        }
      ]
    };
    
  }
  
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.minValue = changeContext.value;
    this.maxValue = changeContext.highValue;
    this.getFilteredByKey(null,null);
  }

  ajustarRango(){
    this.start = new Date();
    this.end = new Date();
    this.start.setHours( this.start.getHours()- this.start.getHours());
    this.start.setMinutes( this.start.getMinutes()- this.start.getMinutes());
    this.start.setSeconds( this.start.getSeconds()- this.start.getSeconds());
    let timePre = new Date();
    const timeAct = new Date();
    let minutosIni: number = timeAct.getMinutes();
    let minutosSecond: number = timeAct.getMinutes();
    if (minutosIni >= 30) {
      minutosIni = 60 - minutosIni;
      minutosSecond = minutosSecond - 30;
      timePre.setMinutes( timePre.getMinutes() - minutosSecond);
      this.end.setMinutes( this.end.getMinutes() + minutosIni);
    } else {
      minutosIni = 30 - minutosIni;
      timePre.setMinutes( timePre.getMinutes() - minutosSecond);
      this.end.setMinutes( this.end.getMinutes() + minutosIni);
    }
    this.minValue = timePre.getTime();
    this.maxValue = this.end.getTime();
    this.optionsSlider = {
      floor: this.start.getTime(),
      ceil: this.end.getTime(),
      step: 1800000,
      translate: (value: number, label: LabelType): string => {
        return new Date(value).toLocaleTimeString(); // this will translate label to time stamp.
      }
    };
    this.getData();
  }

}
