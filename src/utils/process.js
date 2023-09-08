const axios = require('axios');
const cheerio = require('cheerio');

const crawInfor = ({
  mssv,
  aNET_SessionId,
  aBNI_persistence,
  aBNES_ASP,
  type = 'one',
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        `https://online.hcmue.edu.vn/Portlets/UIS_MySpace/Student/Informations/StudentInfo.aspx?StudentID=${mssv}`,
        {
          headers: {
            Cookie: `ASP.NET_SessionId=${aNET_SessionId}; BNI_persistence=${aBNI_persistence}; BNES_ASP.NET_SessionId=${aBNES_ASP}`,
          },
        },
      );
      const html = cheerio.load(result.data);

      if (type == 'one') {
        html('#imgBanner').remove();
        html('#__VIEWSTATEGENERATOR').remove();
        html('#__VIEWSTATE').remove();

        const bodyHTML = html('body').html();
        resolve(bodyHTML);
      } else if (type == 'many') {
        resolve({
          CCCD: html('#lbCMND').text(),
          ngaySinh: html('#lbNgaysinh').text(),
          name: html('#lbHoVaTen').text(),
        });
      }
    } catch (error) {
      if (error.response.status == 404) {
        reject();
      }
    }
  });
};

const crawScore = ({ mssv }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post(
        'https://script.google.com/macros/s/AKfycbzKoAPoce-qd2aAmsZNF-7JXHex6klgo74Ju4Yn2MYEVwmaB78WZojg3RBTfAQvX3vTwA/callback?nocache_id=6&token=AJuLMu3NIuKOwxCOR3ioeSDyduGjtPvS-w%3A1693380569329',
        {
          request: [
            '"processForm_HB"',
            ['48.01.101.074', '29/06/2004', '075204009356'],
            null,
            [0],
            null,
            null,
            1,
            0,
          ],
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Cookie:
              '__Secure-OSID=Vgj5IbY3X1FlW19VthJVV9C1JXJ1gdPQ0eHP-Fdqxme8sJHIscBOkd9WUqU8c7_nqJBg0Q.; 1P_JAR=2023-08-02-15; __Secure-3PAPISID=PHHc4TCjjEt0jJIY/AV-wwaRLtieQ0Xu6n; __Secure-3PSID=aQj5IQYj0rCr1G5ShwgvWcjyRsKjRBO3XlTYX0fffm7m36JedZiSWIKmH2MLUWa78n4LLw.; NID=511=DYhUcL-kdKZ224XdEQaDE3UFiLu7HYPEnXAq9jBAjVchKfZMXKVWH9BD1-rXvcj2GJwidwTOQ_w6f6mHxejIeiSkMJP6yXAl29h6avHDEzlIl2V-vu4ak18DW72rVFOrAUdRzJoOF2wLwRA4t4vStFgBU7EYdW495VYdsid2WtOcDLWXdAbKJTCU7mym9SjjSWzTk4QD7WvsPRtC2RA2jsCR4Ln9F5rd9Ci-V_eySGz-wqVagwkOSVLkTzsY8_klaBR24fPFccr2DwZGgr4GUVl8v0UVZjaQD00jQ1PqZWJwFKLpxrBHVP4ipCs4zg; __Secure-3PSIDCC=APoG2W-WdirPxKzDcOh_WdceSd-GlscpYbatVaT4AxpwgJmYzOW1EoEnhnTZP0S80tIyP2oDJDJ2',
          },
        },
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { crawInfor, crawScore };
