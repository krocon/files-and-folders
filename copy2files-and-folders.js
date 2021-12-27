const fse = require('fs-extra')

let targetFolder = '../files-and-folders/apps';

const cp = (sub) => {
  const t = targetFolder + sub;
  fse.ensureDirSync(t);
  fse.copy('dist/apps' + sub, t);
  console.info('Copied to ', t);
};

const ok = fse.existsSync(targetFolder);
if (ok) {
  console.info('Target repository exists. Start copy...');
  fse.removeSync(targetFolder);
  fse.ensureDirSync(targetFolder);

  cp('/api');
  cp('/files-and-folders');
} else {
  console.error('Could not find target repository!');
}



