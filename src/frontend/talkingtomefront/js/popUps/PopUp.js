"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var CreateTalkPopUp_1 = __importDefault(require("./popUpCards/CreateTalkPopUp"));
function PopUp() {
    var _a = react_1.default.useState(false), open = _a[0], setOpen = _a[1];
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    return (<div>
      <Button_1.default variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new Talk
      </Button_1.default>
      <Dialog_1.default open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle_1.default id="form-dialog-title">Create new Talk</DialogTitle_1.default>
        <DialogContent_1.default>
          <CreateTalkPopUp_1.default />
        </DialogContent_1.default>
        <DialogActions_1.default>
          <Button_1.default onClick={handleClose} color="primary">
            Cancel
          </Button_1.default>
          <Button_1.default onClick={handleClose} color="primary">
            Submit
          </Button_1.default>
        </DialogActions_1.default>
      </Dialog_1.default>
    </div>);
}
exports.default = PopUp;
