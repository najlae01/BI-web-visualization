import React, { useEffect, useMemo, useState } from 'react'
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

const ArticleChartDownloads = () => {
  const [chartDataAllDownloads, setChartDataAllDownloads] = useState({
    datasets: [],
  })

  const [chartDataBlockchainDownloads, setChartDataBlockchainDownloads] =
    useState({
      datasets: [],
    })

  const [chartDataBitcoinDownloads, setChartDataBitcoinDownloads] = useState({
    datasets: [],
  })

  const [chartDataBigDataDownloads, setChartDataBigDataDownloads] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({})

  const memoChartData = useMemo(
    () => chartDataAllDownloads,
    [chartDataAllDownloads]
  )
  const memoChartOptions = useMemo(() => chartOptions, [chartOptions])
  useEffect(() => {
    // Fetch data from MongoDB
    const fetchData = async () => {
      try {
        // Replace this with your actual MongoDB API endpoint
        const response = await fetch('/api/getArticles')
        const data = await response.json()
        console.log(data)
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
              // title: {
              // display: true,
              // text: 'Downloads',
              // },
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

  useEffect(() => {
    // Fetch data from MongoDB
    const fetchData = async () => {
      try {
        // Replace this with your actual MongoDB API endpoint
        const response = await fetch(
          '/api/getArticlesWithTitle?title=Blockchain'
        )
        const data = await response.json()
        console.log(data)
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

          setChartDataBlockchainDownloads({
            labels: Object.keys(aggregatedData),
            datasets: [
              {
                label: 'Blockchain Articles Downloads Over Time',
                data: Object.values(aggregatedData).map(
                  (item) => item.downloads
                ),
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
        const response = await fetch('/api/getArticlesWithTitle?title=Bitcoin')
        const data = await response.json()
        console.log(data)
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

          setChartDataBitcoinDownloads({
            labels: Object.keys(aggregatedData),
            datasets: [
              {
                label: 'Bitcoin Articles Downloads Over Time',
                data: Object.values(aggregatedData).map(
                  (item) => item.downloads
                ),
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
        const response = await fetch('/api/getArticlesWithTitle?title=Big Data')
        const data = await response.json()
        console.log(data)
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

          setChartDataBigDataDownloads({
            labels: Object.keys(aggregatedData),
            datasets: [
              {
                label: 'Big Data Articles Downloads Over Time',
                data: Object.values(aggregatedData).map(
                  (item) => item.downloads
                ),
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

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <Bar data={memoChartData} options={memoChartOptions} />
        </div>
        <div className='col-md-6'>
          <Bar data={chartDataBlockchainDownloads} options={memoChartOptions} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <Bar data={chartDataBitcoinDownloads} options={memoChartOptions} />
        </div>
        <div className='col-md-6'>
          <Bar data={chartDataBigDataDownloads} options={memoChartOptions} />
        </div>
      </div>
    </div>
  )
}

export default ArticleChartDownloads
