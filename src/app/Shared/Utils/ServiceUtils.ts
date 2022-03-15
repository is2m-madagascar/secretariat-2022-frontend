const makeParams = (params?: { params: String; value: any }[]) => {
  let paramsLink = '';
  params
    ? params.forEach((element) => {
        paramsLink += '&' + element.params + '=' + element.value;
      })
    : '';
  return paramsLink;
};

const makePage = (page?: Number, pageSize?: Number) => {
  const mPage = page ? 'page=' + page : 'page=1';
  const mPageSize = pageSize ? 'pageSize=' + pageSize : 'pageSize=10';
  return mPage + '&' + mPageSize;
};

export { makeParams, makePage };
