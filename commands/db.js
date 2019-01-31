const {
  handleError
} = require("../utils")

const {
  dbSet,
  dbUpdate,
  dbGet,
  dbDialogGet,
  dbDialogSet,
  dbDialogUpdate
} = require("../utils");

exports.run = async (api, update, args) => {
  try {

    await dbSet('/dialogs', {
      "70": {
        "437920818": {
          "roles": [
            "asd",
            "test"
          ]
        }
      }
    });

    await dbDialogSet('437920818', '70', {
      "roles": [
        "123",
        "321"
      ]
    })

    let d = await dbGet("/");
    let data = await dbDialogGet('437920818', '70');
    console.log(d, data);

  } catch (e) {
    handleError(update, e);
  }
}