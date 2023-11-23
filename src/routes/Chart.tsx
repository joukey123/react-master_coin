import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistory {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;

}
interface ChartProps {
    coinId : string;
    isDark: boolean;
}

function Chart({ coinId,isDark }:ChartProps) {
    const {isLoading, data} = useQuery<IHistory[]>(["ohlcv",coinId],() => fetchCoinHistory(coinId),{
        refetchInterval: 10000,
    });
    return (
        <div>
            {isLoading ? "Chart Loading..." : 
              <ApexChart 
              type="line"
              series={[
                  {   
                      name: "Price",
                      data: data?.map(price => parseFloat(price.close))?? []
                  },
              ]}
              options={
                  {
                      theme: {
                          mode: isDark ? "dark" : "light",
                      },
                      chart: {
                          width: 500,
                          height:300,
                          toolbar: {
                            show: false
                          },
                          background: "transparent"
                      },
                      grid: {
                          show: false,
                      },
                      stroke: {
                        width: 4,
                        curve: "smooth",
                      },
                      yaxis: {
                        show: false
                      },
                      xaxis :{
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show:false
                        },
                        axisBorder: {
                            show:false
                        },
                        type: "datetime",
                        categories: data?.map(price => new Date(price.time_close*1000).toString()),

                    },
                    fill: {
                        type:"gradient",
                        gradient: {
                            gradientToColors: ["#0be881"],
                            stops:[0,100],
                        },
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value)=>`$ ${value.toFixed(2)}`
                        }
                    }
                  }
              }
          />
            }
        </div>
    )
}
export default Chart;