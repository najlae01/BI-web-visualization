import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
})
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

const ArticleChart = () => {
  const [chartDataAllDownloads, setChartDataAllDownloads] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    // Fetch data from MongoDB
    const fetchData = async () => {
      try {
        // Replace this with your actual MongoDB API endpoint
        const response = await fetch('/api/getArticles')
        const data = await response.json()

        // Check if data is an array before mapping
        if (Array.isArray(data)) {
          // Transform data into a format suitable for charting
          const aggregatedData = data.reduce((result, article) => {
            const date = article.date_publication
            if (!result[date]) {
              result[date] = {
                downloads: article.downloads,
              }
            } else {
              result[date].downloads += article.downloads
            }
            return result
          }, {})

          setChartDataAllDownloads({
            labels: Object.keys(aggregatedData),
            datasets: [
              {
                label: 'Downloads Over Time',
                data: Object.values(aggregatedData).map(
                  (item) => item.downloads
                ),
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
              title: {
                display: true,
                text: 'Downloads',
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
    <div>
      <h2>Article Downloads</h2>
      <Bar data={chartDataAllDownloads} options={chartOptions} />
    </div>
  )
}

export default ArticleChart
