import React, {useMemo} from 'react'
import { Chart as ReactChart } from 'react-charts'
 
const Chart=({type})=> {
    // const formatXAxis = () => {

    //     const d = new Date();
    //     return d.toLocaleString('default', { month: 'short' });
    // };

  const data = useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7],[5, 1], [6, 2], [7, 4], [8, 2], [9, 7], [10, 2], [11, 7]]
      }
    ],
    []
  )
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const axes = useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom', format: d => `${months[d]}` },
      {
        type: 'linear',
        position: 'left',
      }
    ],
    [months]
  )
  const series = useMemo(
    () => ({
      type: type
    }),
    [type]
  )
  const chart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <ReactChart data={data} series={series} axes={axes} />
    </div>
  )
  return chart
}
export default Chart