class UrlParser {
  url = "";
  params = [];
  pagination = [];

  constructor(url, params, pagination) {
    this.url = url;
    this.params = params;
    this.pagination = pagination;
  }

  addParams = (name, value) => {
    this.params.push({ name, value });
  };

  removeParams = (name) => {
    const temp = [];
    this.params.forEach((element) => {
      if (element.name !== name) {
        temp.push(element);
      }
    });
    this.params = temp;
  };

  paginate = (name, value) => {
    this.params.push({ name, value });
  };

  removePagination = (name) => {
    const temp = [];
    this.pagination.forEach((element) => {
      if (element.name !== name) {
        temp.push(element);
      }
    });
    this.pagination = temp;
  };

  build = () => {
    var stringParams = "";
    this.params.map((element) => {
      stringParams += element.name + "=" + element.value + "&";
    });

    var stringPagination = "";
    this.pagination.map((element) => {
      stringPagination += element.name + "=" + element.value + "&";
    });

    return url + "?" + stringParams + "&" + stringPagination;
  };
}

export default UrlParser;
