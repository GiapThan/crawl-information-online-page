const axios = require('axios');
const cheerio = require('cheerio');

class AdminController {
  getin4(req, res, next) {
    fetch('https://dang-giap-than.herokuapp.com/acdm/getdata')
      .then((respon) => {
        console.log(respon);
      })
      .catch();
  }

  async craw(req, res, next) {
    const mssv = req.body.mssv;
    const result = await axios.get(
      `https://online.hcmue.edu.vn/Portlets/UIS_MySpace/Student/Informations/StudentInfo.aspx?StudentID=${mssv}`,
      {
        headers: {
          Cookie: `ASP.NET_SessionId=${process.env.NET_SessionId}; BNI_persistence=${process.env.BNI_persistence}; BNES_ASP.NET_SessionId=${process.env.BNES_ASP}`,
        },
      },
    );
    const html = cheerio.load(result.data);
    html('#imgBanner').remove();
    html('#__VIEWSTATEGENERATOR').remove();
    html('#__VIEWSTATE').remove();
    html('#imgStudents').attr(
      'src',
      'http://192.168.100.116/hinhsv/K46/46.01.104.196.jpg',
    );
    const bodyHTML = html('body').html();
    res.render('admin', { bodyHtml: bodyHTML });
  }

  async crawMany(req, res, next) {
    console.log(req.body);
  }

  index(req, res, next) {
    res.render('admin', { bodyHtml: '' });
  }
}

module.exports = new AdminController();
