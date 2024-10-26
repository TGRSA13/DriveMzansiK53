const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'DriveMzansiK53',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

