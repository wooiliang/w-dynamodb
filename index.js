'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WDynamoDB = function () {
  function WDynamoDB(awsDefaultRegion) {
    _classCallCheck(this, WDynamoDB);

    _awsSdk2.default.config.update({
      region: awsDefaultRegion,
      endpoint: 'https://dynamodb.' + awsDefaultRegion + '.amazonaws.com'
    });

    this.docClient = new _awsSdk2.default.DynamoDB.DocumentClient();
  }

  _createClass(WDynamoDB, [{
    key: 'get',
    value: function get(params, callback) {
      this.docClient.get(params, function (error, data) {
        callback(error, data);
      });
    }
  }, {
    key: 'put',
    value: function put(params, callback) {
      var uuid = _shortid2.default.generate();
      var now = new Date();
      params.Item.id = uuid;
      params.Item.createdAt = now.toISOString();
      params.Item.updatedAt = now.toISOString();
      this.docClient.put(params, function (error, data) {
        if (error) {
          callback(error);
        } else {
          data.id = uuid;
          callback(null, data);
        }
      });
    }
  }, {
    key: 'scan',
    value: function scan(params, callback) {
      this.docClient.scan(params, function (error, data) {
        callback(error, data);
      });
    }
  }, {
    key: 'remove',
    value: function remove(params, callback) {
      this.docClient.delete(params, function (error, data) {
        callback(error, data);
      });
    }
  }]);

  return WDynamoDB;
}();

exports.default = WDynamoDB;