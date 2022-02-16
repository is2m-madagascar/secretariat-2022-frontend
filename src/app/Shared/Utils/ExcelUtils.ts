import * as XLSX from 'xlsx';

const convertExcelToJson = (ev: any, callback: any) => {
  let workBook: any = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = async (_) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = await workBook.SheetNames.reduce((initial: any, name: any) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    callback(jsonData);
  };
  reader.readAsBinaryString(file);
};

export { convertExcelToJson };
