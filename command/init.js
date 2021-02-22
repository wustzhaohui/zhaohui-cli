/*
 * @Author: zhaohui
 * @Date: 2021-02-22 14:24:20
 * @LastEditTime: 2021-02-22 15:02:37
 * @LastEditors: zhaohui
 * @Description:
 * @FilePath: /qz-cli/command/init.js
 */

'use strict';
const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');

module.exports = () => {
    co(function*(params) {
        let tplName = yield prompt('Template name: ');
        let projectName = yield prompt('Project name: ');
        let gitUrl;
        let branch;
        if (!config.tpl[tplName]) {
            console.log(chalk('The template do not exit!'));
            process.exit();
        }
        gitUrl = config.tpl[tplName].url;
        branch = config.tpl[tplName].branch;

        // git命令远程拉去项目并自定义项目名称
        let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
        console.log(chalk.white('\n Start generating...'));

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                process.exit();
            } else {
                console.log(chalk.green('\n ✅ Generation completed!'));
                console.log(`\n cd ${projectName} && yarn \n`);
                process.exit();
            }
        });
    });
};
