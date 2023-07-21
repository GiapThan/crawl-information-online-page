const axios = require('axios');
const cheerio = require('cheerio');

var aNET_SessionId = '';
var aBNI_persistence = '';
var aBNES_ASP = '';

class AdminController {
  async craw(req, res, next) {
    const { mssv } = req.body;
    try {
      console.log(aBNES_ASP);
      console.log(aBNI_persistence);
      console.log(aNET_SessionId);
      const result = await axios.get(
        `https://online.hcmue.edu.vn/Portlets/UIS_MySpace/Student/Informations/StudentInfo.aspx?StudentID=${mssv}`,
        {
          headers: {
            Cookie: `ASP.NET_SessionId=${aNET_SessionId}; BNI_persistence=${aBNI_persistence}; BNES_ASP.NET_SessionId=${aBNES_ASP}`,
          },
        },
      );
      const html = cheerio.load(result.data);
      html('#imgBanner').remove();
      html('#__VIEWSTATEGENERATOR').remove();
      html('#__VIEWSTATE').remove();
      /* html('#imgStudents').attr(
        'src',
        'http://192.168.100.116/hinhsv/K46/46.01.104.196.jpg',
      ); */
      const bodyHTML = html('body').html();
      //res.render('admin', { bodyHtml: bodyHTML });
      res.render('admin.ejs', { bodyHtml: bodyHTML });
    } catch (error) {
      if (error.response.status == 404) {
        res.redirect('/admin/login');
      }
    }
  }

  async crawMany(req, res, next) {
    console.log(req.body);
  }

  async loginview(req, res, next) {
    //res.render('login');
    res.render('login.ejs');
  }

  async logincookie(req, res) {
    aNET_SessionId = req.body.NET_SessionId;
    aBNES_ASP = req.body.BNES_ASP;
    aBNI_persistence = req.body.BNI_persistence;
    res.redirect('/admin');
  }
  async loginform(req, res) {
    const { mssv, password } = req.body;

    const response1 = await axios.get('https://online.hcmue.edu.vn');

    const html1 = cheerio.load(response1.data);
    const VIEWSTATE1 = html1('#__VIEWSTATE').attr('value');
    const VIEWSTATEGENERATOR1 = html1('#__VIEWSTATEGENERATOR').attr('value');
    const EVENTVALIDATION1 = html1('#__EVENTVALIDATION').attr('value');

    const cookieArr1 = response1.headers['set-cookie'];
    const cookie11 = cookieArr1[0].slice(
      cookieArr1[0].indexOf('=') + 1,
      cookieArr1[0].indexOf(';'),
    );
    const cookie12 = cookieArr1[1].slice(
      cookieArr1[1].indexOf('=') + 1,
      cookieArr1[1].indexOf(';'),
    );
    const cookie13 = cookieArr1[2].slice(
      cookieArr1[2].indexOf('=') + 1,
      cookieArr1[2].indexOf(';'),
    );
    aBNES_ASP = cookie13;
    aBNI_persistence = cookie12;
    aNET_SessionId = cookie11;
    /////////////////////////////////////////////////////
    const response2 = await axios.post(
      'https://online.hcmue.edu.vn',
      {
        __EVENTTARGET: 'ctl00$lbtDangnhap',
        __EVENTARGUMENT: '',
        __VIEWSTATE: VIEWSTATE1,
        __VIEWSTATEGENERATOR: VIEWSTATEGENERATOR1,
        __EVENTVALIDATION: EVENTVALIDATION1,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `ASP.NET_SessionId=${aNET_SessionId}; BNI_persistence=${aBNI_persistence}; BNES_ASP.NET_SessionId=${aBNES_ASP}`,
        },
      },
    );

    const html2 = cheerio.load(response2.data);
    const VIEWSTATE2 = html2('#__VIEWSTATE').attr('value');
    const VIEWSTATEGENERATOR2 = html2('#__VIEWSTATEGENERATOR').attr('value');
    const EVENTVALIDATION2 = html2('#__EVENTVALIDATION').attr('value');

    const response3 = await axios.post(
      'https://online.hcmue.edu.vn',
      {
        __EVENTTARGET: '',
        __EVENTARGUMENT: '',
        __VIEWSTATE: VIEWSTATE2,
        __VIEWSTATEGENERATOR: VIEWSTATEGENERATOR2,
        __EVENTVALIDATION: EVENTVALIDATION2,
        ctl00$ContentPlaceHolder1$ctl00$ctl00$Role: 'rbtnStudent',
        ctl00$ContentPlaceHolder1$ctl00$ctl00$txtUserName: mssv,
        ctl00$ContentPlaceHolder1$ctl00$ctl00$txtPassword: password,
        ctl00$ContentPlaceHolder1$ctl00$ctl00$btLogin: 'Đăng nhập',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `ASP.NET_SessionId=${aNET_SessionId}; BNI_persistence=${aBNI_persistence}; BNES_ASP.NET_SessionId=${aBNES_ASP}`,
        },
      },
    );
    const headerRes3 = response3.request._header;
    const stringCookie = headerRes3.slice(
      headerRes3.indexOf('Cookie') + 8,
      headerRes3.indexOf('User-Agent') - 1,
    );
    const cookieArr3 = stringCookie.split(';');
    const cookie31 = cookieArr3[0].slice(
      cookieArr3[0].indexOf('=') + 1,
      cookieArr3[0].indexOf(';'),
    );
    const cookie32 = cookieArr3[1].slice(
      cookieArr3[1].indexOf('=') + 1,
      cookieArr3[1].indexOf(';'),
    );
    const cookie33 = cookieArr3[2].slice(
      cookieArr3[2].indexOf('=') + 1,
      cookieArr3[2].indexOf(';'),
    );
    aBNES_ASP = cookie33;
    aBNI_persistence = cookie32;
    aNET_SessionId = cookie31;

    console.log(aBNES_ASP);
    console.log(aBNI_persistence);
    console.log(aNET_SessionId);

    res.redirect('/admin');
  }

  index(req, res, next) {
    res.render('admin.ejs', { bodyHtml: '' });
  }
}

module.exports = new AdminController();
