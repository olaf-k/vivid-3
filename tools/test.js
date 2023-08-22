const { exec } = require('node:child_process');
const { log } = require('node:console');

const NOCHANGE_PREFIX = 'no-change-for-';

exec('git branch --show-current', (err, branch) => {
    if (err) {
        console.error(`exec error while retrieving branch name: ${err}`);
        process.exit(-1);
    }
    branch = branch.trim();

    console.log('branch=', branch);

    exec('git diff origin/main... --name-status --diff-filter=d', (err, status) => {
        if (err) {
            console.error(`exec error while retrieving commit files list: ${err}`);
            process.exit(-1);
        }

        const files = status.trim().split('\n').map(s => s.substring(s.lastIndexOf('\t') + 1));
        if (files.filter(name => name === `.changeset/${NOCHANGE_PREFIX}${branch}` || /^\.changeset\/[-\w]+\.md$/.test(name)).length === 0) {
            console.error(`⚠️ no changeset or bypass file found, please run npm whatever`);
            process.exit(-1);
        }
    });
}); 