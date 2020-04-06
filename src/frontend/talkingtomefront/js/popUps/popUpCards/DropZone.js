"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var material_ui_dropzone_1 = require("material-ui-dropzone");
var DropZone = /** @class */ (function (_super) {
    __extends(DropZone, _super);
    function DropZone(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            files: [],
        };
        return _this;
    }
    DropZone.prototype.handleChange = function (files) {
        this.setState({
            files: files,
        });
    };
    DropZone.prototype.render = function () {
        return (<material_ui_dropzone_1.DropzoneArea onChange={this.handleChange.bind(this)} acceptedFiles={['application/ppt']} dropzoneText="Drop your ppt file here, or click for file explorer"/>);
    };
    return DropZone;
}(react_1.Component));
exports.default = DropZone;
//export default DropZone = withSearchValue(DropZone);
