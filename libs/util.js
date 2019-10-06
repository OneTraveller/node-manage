const crypto = require('crypto');
const fs = require('fs');

module.exports = {
  unlink (path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  sha512 (buffer) {
    const hash = crypto.createHash('sha512');
    hash.update(buffer);
    return hash.digest('hex');
  }
}
