const { exec } = require('node:child_process');

const NOCHANGEBRANCH = `.changeset/no-change-for-${process.env.BRANCH_NAME}`;

exec('git diff origin/main... --name-status --diff-filter=d', (err, status) => {
    if (err) {
        console.error(`exec error while retrieving commit files list: ${err}`);
        process.exit(-1);
    }

    const files = status.trim().split('\n').map(s => s.substring(s.lastIndexOf('\t') + 1));
    if (files.filter(name => name === NOCHANGEBRANCH || /^\.changeset\/[-\w]+\.md$/.test(name)).length === 0) {
        console.error(`⚠️ no changeset or bypass file found, please run npm whatever`);
        process.exit(-1);
    }
});