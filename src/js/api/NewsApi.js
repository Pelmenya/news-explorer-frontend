export default class NewsApi {
  _initalDates(daysAgo) {
    this.date = new Date();
    this.from = new Date(+this.date - 3600 * 24 * 1000 * daysAgo).toISOString().slice(0, 19);
    this.to = this.date.toISOString().slice(0, 19);
  }

  constructor(props) {
    this.serverUrl = props.serverUrlNews;
    this.apiKey = props.apiKeyNews;
    this.pageSize = props.pageSizeNews;
    this._initalDates(props.numberOfDays);
  }

  getNews(keyWord) {
    const urlReq = `${this.serverUrl}?q=${keyWord}&pageSize=${this.pageSize}&from=${this
      .from}&to=${this.to}&apiKey=${this.apiKey}`;
    const req = new Request(urlReq);
    return fetch(req).then((res) => res.json()).catch((err) => err);
  }
}
