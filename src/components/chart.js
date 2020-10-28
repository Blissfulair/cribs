import React, {useMemo} from 'react'
import { Chart as ReactChart } from 'react-charts'
 
const Chart=({type,monthly,yearly,weekly, filter})=> {
  const data = useMemo(
    () => [
      {
        label: 'Series month',
        data: [...monthly]
      }
    ],
    [monthly]
  )
  const dataYearly = useMemo(
    () => [
      {
        label: 'Series year',
        data: [...yearly]
      }
    ],
    [yearly]
  )

  const dataWeekly = useMemo(
    () => [
      {
        label: 'Series week',
        data: [...weekly]
      }
    ],
    [weekly]
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
  const axesYearly = useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      {
        type: 'linear',
        position: 'left',
      }
    ],
    []
  )
  const axesWeekly = useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom', format: d => `Week${d}` },
      {
        type: 'linear',
        position: 'left',
      }
    ],
    []
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
     {
        filter === 'month'?
        <ReactChart data={data} series={series} axes={axes} />
        :
        filter === 'year'?
        <ReactChart data={dataYearly} series={series} axes={axesYearly} />
        :
        <ReactChart data={dataWeekly} series={series} axes={axesWeekly} />
     }
    </div>
  )
  if(monthly.length>1)
  return chart
  else
  return <div>loading...</div>
}
export default Chart