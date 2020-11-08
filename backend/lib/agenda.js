const Agenda = require("agenda");
const config = require('../config')

const connectionOpts = {
  db: {
    address: config.mongodbUri,
    collection: "agendaScheduler",
  },
  processEvery: "day",
};

/**
 * Agenda Initialization
 * We can change the database name in which we want to manage the jobs scheduled
 */
const agenda = new Agenda(connectionOpts);

agenda.define('send-report-mail', {priority: 'high', concurrency: 10}, async job => {
  const {to} = job.attrs.data;

  // fetch data and generate report and then send the mail
  // await emailClient.send({
  //   to,
  //   from: 'example@example.com',
  //   subject: 'Email Report',
  //   body: '...'
  // });
});

(async function() {
  await agenda.start();
  const sendReport = agenda.create("send-report-mail",{to: 'admin@example.com'});
  sendReport.repeatEvery("0 0 25 * *", {
    skipImmediate: true,
  });
  await sendReport.save();

})();


