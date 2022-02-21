import { useEffect } from "react";
import { useState } from "react";
import { Dimmer, Loader, Select, Card } from "semantic-ui-react";
import Chart from "react-apexcharts";

const options = [
  { value: "USD", text: "USD" },
  { value: "EUR", text: "EUR" },
  { value: "GBP", text: "GPB" },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [article, setArticle] = useState([]);

  //News
  async function fetchNews() {
    const resp = await fetch(`https://crypto-news15.p.rapidapi.com/news/amb`, {
      method: "GET",

      headers: {
        "x-rapidapi-host": "crypto-news15.p.rapidapi.com",
        "x-rapidapi-key": "bdeed566aemshadb9f3f811b9b51p12ec82jsn8f7493768229",
      },
    });
    if (resp.error) {
      throw new Error(resp.error);
    }

    const info = await resp.json();
    setArticle(info);
    console.log(article);
  }

  //BTC Price
  async function fetchData() {
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const data = await res.json();
    setCurrency(data.bpi.USD.code);
    setPriceData(data.bpi);
    getChartData();
  }

  useEffect(() => {
    fetchData();
    fetchNews();
  }, []);

  const interval = setInterval(function () {
    fetchData();
  }, 30000);

  clearInterval(interval);

  const handleSelect = (e, data) => {
    setCurrency(data.value);
  };

  const getChartData = async () => {
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/historical/close.json"
    );
    const data = await res.json();
    const categories = Object.keys(data.bpi);
    const series = Object.values(data.bpi);
    setChartData({
      xaxis: {
        categories: categories,
      },
    });
    setSeries([
      {
        name: "Bitcoin Price",
        data: series,
      },
    ]);
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="Nav">
        Crypto Hub
        <img
          className="btcIcon"
          src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png"
          alt="Bitcoin png"
        ></img>
      </div>
      {loading ? (
        <div>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      ) : (
        <>
          <div className="price-container">
            <div className="form">
              Fiat
              <Select
                placeholder="Select your currency"
                onChange={handleSelect}
                options={options}
              ></Select>
            </div>
            <div className="price">
              <Card>
                <Card.Content>
                  <Card.Header>{currency} Price</Card.Header>
                  <Card.Description>
                    {priceData[currency].rate}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </div>
          <div>
            <h1>Bitcoin</h1>
          </div>
          <div className="Chart">
            <Chart
              className="Chart"
              options={chartData}
              series={series}
              type="line"
              width="100%"
              height="90%"
            />
          </div>

          <div className="video">
            <h1>What is Bitcoin?</h1>
            <iframe
              className="videoembed"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/s4g1XFU8Gto"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div className="Divider"></div>
          </div>
          <div className="keynotes">
            <h1>Key Notes</h1>
            <ul>
              <li className="note">Don't buy at all time highs.</li>
              <li className="note">Protect your wallet keys.</li>
              <li className="note">Dollar Cost Average in (DCA). </li>
              <li className="note">Keep long holds in a cold wallet.</li>
              <li className="note"> Don't panic sell.</li>
              <li className="note">
                Don't invest more than you can afford to lose.
              </li>
            </ul>
          </div>
          <div>
            <img
              className="fearGreed"
              src="https://alternative.me/crypto/fear-and-greed-index.png"
              alt="Bitcoin Fear Greed Index"
            ></img>
          </div>
          <div className="Divider"></div>
          <div className="newsResources">
            <div className="News">
              <h1>Crypto News</h1>
              <div>
                {article.map((newsArticle) => {
                  return (
                    <h2>
                      <ul>
                        <li key="{id}" className="articles">
                          <a href={newsArticle.url} target="_blank">
                            {newsArticle.title}
                          </a>
                        </li>
                      </ul>
                    </h2>
                  );
                })}
              </div>
            </div>
            <div className="Divider"></div>
            <div className="AdditionalResources">
              <div>
                <h1>Additional Resources</h1>
              </div>
              <div>
                <h2>
                  <a
                    href="https://www.pcmag.com/how-to/how-to-avoid-cryptocurrency-scams"
                    target="_blank"
                  >
                    Tips to avoid scams in crypto
                  </a>
                </h2>
                <h2>
                  <a
                    href="https://www.youtube.com/c/WhiteboardCrypto"
                    target="_blank"
                  >
                    Video Explaination of Cryptos
                  </a>
                </h2>
                <h2>
                  <a
                    href="https://alternative.me/crypto/fear-and-greed-index/"
                    target="_blank"
                  >
                    Crypto Greed/Fear index
                  </a>
                </h2>
                <h2>
                  <a
                    href="https://www.youtube.com/watch?v=zpROwouRo_M"
                    target="_blank"
                  >
                    What are NFTs
                  </a>
                </h2>
                <h2>
                  <a
                    href="https://www.youtube.com/watch?v=kZXXDp0_R-w"
                    target="_blank"
                  >
                    What is cryptocurrency mining?
                  </a>
                </h2>
                <h2>
                  <a
                    href="https://www.youtube.com/watch?v=AebT53Lybaw"
                    target="_blank"
                  >
                    What is a Wallet?
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
