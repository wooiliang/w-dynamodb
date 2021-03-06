import AWS from 'aws-sdk';
import shortid from 'shortid';

export default class WDynamoDB {
  constructor(awsDefaultRegion) {
    AWS.config.update({
      region: awsDefaultRegion,
      endpoint: `https://dynamodb.${awsDefaultRegion}.amazonaws.com`
    });

    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  get(params) {
    return new Promise((resolve, reject) => {
      this.docClient.get(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  batchGet(params) {
    return new Promise((resolve, reject) => {
      this.docClient.batchGet(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  put(params) {
    return new Promise((resolve, reject) => {
      const uuid = shortid.generate();
      const now = new Date();
      if (!params.Item.id) {
        params.Item.id = uuid;
        params.Item.createdAt = now.toISOString();
      }
      params.Item.updatedAt = now.toISOString();
      this.docClient.put(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          data.id = uuid;
          resolve(data);
        }
      });
    });
  }

  update(params) {
    return new Promise((resolve, reject) => {
      this.docClient.update(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  scan(params) {
    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  remove(params) {
    return new Promise((resolve, reject) => {
      this.docClient.delete(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
