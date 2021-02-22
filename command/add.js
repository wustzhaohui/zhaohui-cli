/*
 * @Author: zhaohui
 * @Date: 2021-02-22 14:23:32
 * @LastEditTime: 2021-02-22 14:40:38
 * @LastEditors: zhaohui
 * @Description:
 * @FilePath: /qz-cli/command/add.js
 */

'use strict'
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');
const fs = require('fs');

module.exports = () => {
    co(function *(params) {
        let tplName = yield prompt('Template name');
        let gitUrl = yield prompt('Git https link');
        let branch = yield prompt('Branch');

        // 避免重复添加
        if (!config.tpl[tplName]) {
            config.tpl[tplName] = [];
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
            config.tpl[tplName]['branch'] = branch;
        } else {
            console.log(chalk.red('Template has already existed'));
            process.exit();
        }
        // 把模版文件写入template.json
        fs.writeFile(__dirname + '/.../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(chalk.green('New template added\n'));
                console.log(chalk.grey('The last template list is:\n'));
                console.log(config);
                console.log('\n');
                process.exit();
            }
        })
    })
}