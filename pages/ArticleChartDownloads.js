import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Doughnut = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ArticleChartInYear = () => {
  const [chartDataYear2020, setChartDataYear2020] = useState({
    datasets: [],
  })

  const [chartDataYear2023, setChartDataYear2023] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    // Fetch data from MongoDB
    const fetchData = async () => {
      try {
        // Replace this with your actual MongoDB API endpoint
        const response = await fetch(
          '/api/getArticlesWithYear?date_publication=2020'
        )
        const data = await response.json()
        console.log(data)
        // Check if data is an array before mapping
        if (Array.isArray(data)) {
          setChartDataYear2020({
            labels: Object.keys(data),
            datasets: [
              {
                label: 'Articles In Year 2020',
                data: Object.values(data).map((item) => item.title),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          })
        } else {
          console.error('Data received is not an array:', data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Fetch data from MongoDB
    const fetchData = async () => {
      try {
        // Replace this with your actual MongoDB API endpoint
        const response = await fetch(
          '/api/getArticlesWithYear?date_publication=2023'
        )
        const data = await response.json()
        console.log(data)
        // Check if data is an array before mapping
        if (Array.isArray(data)) {
          setChartDataYear2023({
            labels: Object.keys(data),
            datasets: [
              {
                label: 'Articles In Year 2023',
                data: Object.values(data).map((item) => item.title),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          })

          setChartOptions({
            plugins: {
              legend: {
                position: 'top',
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          })
        } else {
          console.error('Data received is not an array:', data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <Doughnut data={chartDataYear2020} options={chartOptions} />
        </div>
        <div className='col-md-6'>
          <Doughnut data={chartDataYear2023} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

export default ArticleChartInYear
