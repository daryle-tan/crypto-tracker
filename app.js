const userForm = document.getElementById('#user-form');
const input = document.querySelector("input[name='search']");
const containerMain = document.getElementById('containerMain');

const createTokenInfo = (token) => {
    let container3 = document.createElement('container3');
    const tokenSymbol = document.createElement('symbol');
    tokenSymbol.textContent = ` Symbol: ${token.coin.symbol}`;
    const tokenName = document.createElement('name');
    tokenName.textContent = ` Name: ${token.coin.name}`;
    const tokenPrice = document.createElement('price');
    tokenPrice.textContent = ` Price: $${Math.round((token.coin.price + Number.EPSILON) * 10000) / 10000}`;
    const marketCap = document.createElement('marketCap');
    marketCap.textContent =` MarketCap: ${token.coin.marketCap}`;
    const supply= document.createElement('supply');
    supply.textContent = ` Total Supply: ${token.coin.totalSupply}`;
    const rank = document.createElement('rank');
    rank.textContent = ` Rank: ${token.coin.rank}`;
    const website = document.createElement('a');
    website.setAttribute('href', token.coin.websiteUrl);
    website.setAttribute("target", "_blank");
    website.innerText = `Website: ${token.coin.websiteUrl} `
    container3.append(tokenSymbol, tokenName, tokenPrice, marketCap, supply, rank, website);
    containerMain.append(container3); 
  return container3;
};

document.getElementById('user-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let userInput = (document.querySelector("[name='search']").value).toLowerCase();
    const URL =`https://api.coinstats.app/public/v1/coins/${userInput}`
    containerMain.innerText = '';
   
    $.get(URL, (token) => {  
      createTokenInfo(token);
  })
});

document.addEventListener('DOMContentLoaded', () => {
const urlAPI = 'https://api.coinstats.app/public/v1/coins/'
 
  $.get(urlAPI, (token) => {
  
    let arrId = [];
    let arrPrice = [];
    for(let i =0; i <= 9; i++) {
      let tokenId = token.coins[i].id;
      let price = Math.round((token.coins[i].price + Number.EPSILON) * 10000) / 10000;
      arrId.push(tokenId);
      arrPrice.push(price);
    
    Highcharts.chart('container', {
      chart : {
          zoomType : 'x',
      },
      title : {
          text : "Top 10 Cryptocurrency Prices",
      },
      yAxis : {
          title : {
              text : "US Dollar",
          }
      },
      xAxis : {
    // token will get the coin id
          categories : arrId
      },
      series : [{
    // token price will go in data : value
         data: arrPrice,
         name: 'Crytocurrency'
        }]   
      })
    }
  })
});