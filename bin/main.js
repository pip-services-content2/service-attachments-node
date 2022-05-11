let AttachmentsProcess = require('../obj/src/container/AttachmentsProcess').AttachmentsProcess;

try {
    new AttachmentsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
