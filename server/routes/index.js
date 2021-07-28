var express = require('express');
var router = express.Router();
var fs = require("fs");
var reports = {};
var spamReports = []
fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
  reports = data;
  Data = JSON.parse(data);
  Data.elements.forEach(element => {
    // console.log(element.payload.reportType)
    element.payload.reportType == "SPAM" ? spamReports.push(element) : null;
  });
});
router.get('/listReports', function (req, res) {
  fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
    // console.log(data, __dirname);
    res.send(data);
  });
})
function getSpamReports(data) {
  Data = JSON.parse(data);
  var res = [];
  // console.log(data)
  Data.elements.forEach(element => {
    // console.log(element.payload.reportType)
    element.payload.reportType == "SPAM" ? res.push(element) : null;
  });
  // return JSON.stringify(spamReports)
  return JSON.stringify(res)
}
// function getSpamReports(data, id) {
//   Data = JSON.parse(data);
//   var res = {};
//   Data.elements.forEach(element => {
//     console.log(element)
//     element.payload.reportType == "SPAM" && element.id == id ? res = element : null;
//   });

//   return res
// }
router.get('/listSpamReports', function (req, res) {
  fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
    // console.log(getSpamReports(data));
    res.send(getSpamReports(data));
  });
})
// router.get('/listSpamReports/:id', function (req, res) {
//   fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
//     res.send(getSpamReports(data, req.params.id));
//   });
// })
function changeRecordState(data, id, state) {
  Data = JSON.parse(data);
  Data.elements.forEach(element => {
    element.id == id ? element.state = state : null;
  });
  return JSON.stringify(Data);
}
router.put('/updateReport/:id', function (req, res) {
  // console.log(JSON.stringify(req.params.id,));
  console.log(req.body)
  fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
    let result = changeRecordState(data, req.params.id, req.body.ticketState);
    fs.writeFile(__dirname.replace("routes", "reports.json"), result, function (err) {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      console.log("The file was saved!");
      res.sendStatus(200);
    });
  });
})
// router.put('/blockReport/:id', function (req, res) {
//   // First read existing reports.
//   fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
//     let result = changeRecordState(data, req.params.id, "BLOCK");
//     fs.writeFile(__dirname.replace("routes", "reports.json"), result, function (err) {
//       if (err) {
//         res.send(err);
//         return console.log(err);
//       }
//       console.log("The file was saved!");
//       res.send(200);
//     });
//   });
// })
// router.put('/resolveReport/:id', function (req, res) {
//   fs.readFile(__dirname.replace("routes", "reports.json"), 'utf8', function (err, data) {
//     let result = changeRecordState(data, req.params.id, "RESOLVE");
//     fs.writeFile(__dirname.replace("routes", "reports.json"), result, function (err) {
//       if (err) {
//         res.send(err);
//         return console.log(err);

//       }
//       console.log("The file was saved!");
//       res.send(200);
//     });
//   });
// })
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
