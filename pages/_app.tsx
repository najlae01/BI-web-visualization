import ArticleChartDownloads from './ArticleChartDownloads';
// import ArticleChartInYear from './ArticleChartInYear'
import './styles.css'

const Home = () => {
  return (
    <div>
    <div>
      <h1 className='header'>Downloads</h1>
      <ArticleChartDownloads />
    </div>
    {/* <div>
      <h1 className='header'>Articles Per Year</h1>
      <ArticleChartInYear/>
    </div> */}
    </div>
  );
};

export default Home;