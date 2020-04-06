"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
var DropZone_1 = __importDefault(require("./DropZone"));
function CreateTalkPopUp() {
    return (<>
      <DialogContent_1.default>
        <DialogContentText_1.default>
          Creating a new Talk, please enter its name and ulpload your
          presentation (ppt format)
        </DialogContentText_1.default>
        <TextField_1.default autoFocus margin="dense" id="name" label="Talk name" type="email" fullWidth/>
        <p>
          <DropZone_1.default />
        </p>
      </DialogContent_1.default>
    </>);
}
exports.default = CreateTalkPopUp;
